// const expect= require('chai').expect  //old way
import {expect} from 'chai'

describe('Operation with number', function () {
  const a = 5
  const b = 7

  it('Addition works properly', function () {
    expect(a + b).eql(12)
  })
  it('Subtraction works properly', function () {
    expect(a - b).to.eq(-2)
  })
})
