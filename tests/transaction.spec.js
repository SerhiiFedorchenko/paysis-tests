import UserHelper from '../helpers/user.helper'
import TransactionHelper from '../helpers/transaction.helper'
import {expect} from 'chai'

describe('Transaction', function () {
  const defaultBalance = 1000

  describe('Create', function () {
    describe('With valid data', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = 100
      let createTransactionResponse
      let userIdFrom
      let userIdTo

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
        await userHelper.delete(userIdTo)
      })

      it('Response status code is 200', function () {
        expect(createTransactionResponse.statusCode).to.eq(200)
      })

      it('Response body contains Transaction ID', function () {
        expect(createTransactionResponse.body.id).to.be.a('string')
      })

      it('Response body contains User ID of sender', function () {
        expect(createTransactionResponse.body.from).eql(userIdFrom)
      })

      it('Response body contains User ID of receiver', function () {
        expect(createTransactionResponse.body.to).eql(userIdTo)
      })

      it('Response body contains entered amount', function () {
        expect(createTransactionResponse.body.amount).eql(amount)
      })

      it("Sender's balance -100", async function () {
        const response = await userHelper.get(userIdFrom)
        await expect(response.body.amount).eql(defaultBalance - amount)
      })

      it("Receiver's balance +100", async function () {
        const response = await userHelper.get(userIdTo)
        await expect(response.body.amount).eql(defaultBalance + amount)
      })
    })

    describe('With invalid amount', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = -100
      let createTransactionResponse
      let userIdFrom
      let userIdTo

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
        await userHelper.delete(userIdTo)
      })

      it('Response status code is 400', function () {
        expect(createTransactionResponse.statusCode).to.eq(400)
      })

      it('Response body contains error message', function () {
        expect(createTransactionResponse.body.message).to.eq('Amount must be above zero.')
      })

      it("Sender's balance had not decreased by 100", async function () {
        const response = await userHelper.get(userIdFrom)
        await expect(response.body.amount).eql(defaultBalance)
      })

      it("Receiver's balance had not increased by 100", async function () {
        const response = await userHelper.get(userIdTo)
        await expect(response.body.amount).eql(defaultBalance)
      })
    })

    describe('With exceeding amount', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = defaultBalance + 1
      let createTransactionResponse
      let userIdFrom
      let userIdTo

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
        await userHelper.delete(userIdTo)
      })

      it('Response status code is 400', function () {
        expect(createTransactionResponse.statusCode).to.eq(400)
      })

      it('Response body contains error message', function () {
        expect(createTransactionResponse.body.message).to.eq("Sender doesn't have enough money.")
      })

      it("Sender's balance had not decreased", async function () {
        const response = await userHelper.get(userIdFrom)
        await expect(response.body.amount).eql(defaultBalance)
      })

      it("Receiver's balance had not increased", async function () {
        const response = await userHelper.get(userIdTo)
        await expect(response.body.amount).eql(defaultBalance)
      })
    })

    describe('With non-exceeding sender', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = 100
      let createTransactionResponse
      let userIdFrom = '1'
      let userIdTo

      before(async function () {
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdTo)
      })

      it('Response status code is 400', function () {
        expect(createTransactionResponse.statusCode).to.eq(400)
      })

      it('Response body contains error message', function () {
        expect(createTransactionResponse.body.message).to.eq('Sender not found.')
      })

      it("Receiver's balance had not increased", async function () {
        const response = await userHelper.get(userIdTo)
        await expect(response.body.amount).eql(defaultBalance)
      })
    })

    describe('With non-exceeding receiver', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = 100
      let createTransactionResponse
      let userIdFrom
      let userIdTo = '1'

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
      })

      it('Response status code is 400', function () {
        expect(createTransactionResponse.statusCode).to.eq(400)
      })

      it('Response body contains error message', function () {
        expect(createTransactionResponse.body.message).to.eq('Receiver not found.')
      })

      it("Sender's balance had not decreased", async function () {
        const response = await userHelper.get(userIdFrom)
        await expect(response.body.amount).eql(defaultBalance)
      })
    })
  })

  describe('Get', function () {
    describe('All transactions ', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = 100
      let createTransactionResponse
      let getTransactionResponse
      let userIdFrom
      let userIdTo

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
        getTransactionResponse = await transactionHelper.get()
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
        await userHelper.delete(userIdTo)
      })

      it('Response status code is 200', function () {
        expect(getTransactionResponse.statusCode).to.eq(200)
      })

      it('Response body contains array of at least 2 transaction', function () {
        expect(getTransactionResponse.body.length).to.be.at.least(2)
      })

      it('Response body contains Transaction ID', function () {
        for (let transaction of getTransactionResponse.body) {
          expect(transaction.id).to.be.a('string')
        }
      })

      it('Transaction in response body contains User ID of sender', function () {
        for (let transaction of getTransactionResponse.body) {
          expect(transaction.from).to.be.a('string')
        }
      })

      it('Transaction in response body contains User ID of receiver', function () {
        for (let transaction of getTransactionResponse.body) {
          expect(transaction.to).to.be.a('string')
        }
      })

      it('Response body contains entered amount', function () {
        for (let transaction of getTransactionResponse.body) {
          expect(transaction.amount).eql(amount)
        }
      })
    })

    describe('Single transaction ', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = 100
      let createTransactionResponse
      let getTransactionResponse
      let userIdFrom
      let userIdTo

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
        getTransactionResponse = await transactionHelper.get(createTransactionResponse.body.id)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
        await userHelper.delete(userIdTo)
      })

      it('Response status code is 200', function () {
        expect(getTransactionResponse.statusCode).to.eq(200)
      })

      it('Response body contains Transaction ID', function () {
        expect(getTransactionResponse.body.id).eql(createTransactionResponse.body.id)
      })

      it('Transaction in response body contains User ID of sender', function () {
        expect(getTransactionResponse.body.from).eql(userIdFrom)
      })

      it('Transaction in response body contains User ID of receiver', function () {
        expect(getTransactionResponse.body.to).eql(userIdTo)
      })

      it('Response body contains entered amount', function () {
        expect(getTransactionResponse.body.amount).eql(amount)
      })
    })
  })
})
