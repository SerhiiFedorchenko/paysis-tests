import {expect} from 'chai'
import AuthHelper from '../helpers/auth.helper'


describe('Authentication', function () {
  const authHelper = new AuthHelper()

  describe('Log in with valid credentials', function () {
    let response
    before(async function () {
      response = await authHelper.logIn(process.env.LOGIN, process.env.PASSWORD)
    })

    it('Response status code is 200', function () {
      expect(response.statusCode).eql(200)
    })

    it('Response body contains token', function () {
      expect(response.body.token).not.to.be.undefined
    })
  })

  describe('Log in with incorrect credentials', function () {
    let response
    before(async function () {
      response = await authHelper.logIn('invalid', 'invalid')
    })
    it('Response status code is 404', function () {
      expect(response.statusCode).eql(404)
    })

    it('Response body contains error message', function () {
      expect(response.body.message).eql('Wrong login or password.')
    })
  })
})
