import ConfigHelper from "../helpers/config.helper";
import { expect } from "chai";

// describe('Patch', function() {
//   describe('Valid data', function() {
//     describe('Both values', function() {
//       let response
//       let configHelper = new ConfigHelper()
//       let entries = 17, amount = 14000
//
//       before(async function(){
//         response = await configHelper.change(entries, amount)
//       })
//
//       it('should return status code 200', function () {
//         expect(response.statusCode).equal(200)
//       })
//
//       it('should change number of entries', function () {
//         expect(response.body.number_of_entries).equal(entries)
//       })
//
//       it('should change initial amount of user credits', function () {
//         expect(response.body.initial_amount).equal(amount)
//       })
//     })
//
//     describe('Both zero values - should not change config', function() {
//       let response
//       let configHelper = new ConfigHelper()
//       let entries = 0, amount = 0
//       let initialValues
//
//       before(async function(){
//         initialValues = (await configHelper.getConfig()).body
//         response = await configHelper.change(entries, amount)
//       })
//
//       it('should return status code 200', function () {
//         expect(response.statusCode).equal(200)
//       })
//
//       it('should not change number of entries', function () {
//         expect(response.body.number_of_entries).equal(initialValues.number_of_entries)
//       })
//
//       it('should not change initial amount of user credits', function () {
//         expect(response.body.initial_amount).equal(initialValues.initial_amount)
//       })
//     })
//
//     describe('Initial entries change', function() {
//       let response
//       let configHelper = new ConfigHelper()
//       let entries = 17
//       let initialAmount
//
//       before(async function(){
//         initialAmount = (await configHelper.getConfig()).body.initial_amount
//         response = await configHelper.change(entries)
//       })
//
//       it('should return status code 200', function () {
//         expect(response.statusCode).equal(200)
//       })
//
//       it('should change number of entries', function () {
//         expect(response.body.number_of_entries).equal(entries)
//       })
//
//       it('should not change initial amount of user credits', function () {
//         expect(response.body.initial_amount).equal(initialAmount)
//       })
//     })
//
//     describe('Initial amount change', function() {
//       let response
//       let configHelper = new ConfigHelper()
//       let amount = 1600
//       let initialEntries
//
//       before(async function(){
//         initialEntries = (await configHelper.getConfig()).body.number_of_entries
//         response = await configHelper.change(0, amount)
//       })
//
//       it('should return status code 200', function () {
//         expect(response.statusCode).equal(200)
//       })
//
//       it('should not change number of entries', function () {
//         expect(response.body.number_of_entries).equal(initialEntries)
//       })
//
//       it('should change initial amount of user credits', function () {
//         expect(response.body.initial_amount).equal(amount)
//       })
//     })
//   })
//
//   describe('Invalid data', function() {
//     describe('Initial Entries', function() {
//       describe('Number not in range [5;25]', function() {
//         let response
//         let configHelper = new ConfigHelper()
//         let entries = 26
//
//         before(async function(){
//           response = await configHelper.change(entries)
//         })
//
//         it('should return status code 400', function () {
//           expect(response.statusCode).equal(400)
//         })
//
//         it('response should contain error message', function() {
//           expect(response.body.message).equal("Number of entries must be between 5 and 25 (inclusively).")
//         })
//       })
//
//       describe('Not number', function() {
//         let response
//         let configHelper = new ConfigHelper()
//         let entries = "number"
//
//         before(async function(){
//           response = await configHelper.change(entries)
//         })
//
//         it('should return status code 400', function () {
//           expect(response.statusCode).equal(400)
//         })
//
//         it('response should contain error message', function() {
//           expect(response.body.message).equal("Invalid number of entries.")
//         })
//       })
//     })
//
//     describe('Initial amount', function() {
//       describe('Negative number', function() {
//         let response
//         let configHelper = new ConfigHelper()
//         let amount = -1600
//
//         before(async function(){
//           response = await configHelper.change(0, amount)
//         })
//
//         it('should return status code 400', function () {
//           expect(response.statusCode).equal(400)
//         })
//
//         it('response should contain error message', function() {
//           expect(response.body.message).equal("Amount must be above zero.")
//         })
//       })
//
//       describe('Not number', function() {
//         let response
//         let configHelper = new ConfigHelper()
//         let amount = "number"
//
//         before(async function(){
//           response = await configHelper.change(0, amount)
//         })
//
//         it('should return status code 400', function () {
//           expect(response.statusCode).equal(400)
//         })
//
//         it('response should contain error message', function() {
//           expect(response.body.message).equal("Invalid minimal amount.")
//         })
//       })
//     })
//   })
// })