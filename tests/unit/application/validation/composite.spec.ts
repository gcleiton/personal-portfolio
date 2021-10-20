import { Validator } from '@/application/contracts'
import { ValidationError } from '@/application/errors'
import { ValidationComposite } from '@/application/validation'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  let validator01: MockProxy<Validator>
  let validator02: MockProxy<Validator>
  let validators: Validator[]

  beforeAll(() => {
    validator01 = mock()
    validator01.validate.mockReturnValue(undefined)
    validator02 = mock()
    validator02.validate.mockReturnValue(undefined)
    validators = [validator01, validator02]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  test('should return undefined if all validators returns undefined', () => {
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('should return error if any Validator fails', () => {
    validator02.validate.mockReturnValueOnce(new Error('error02'))

    const error = sut.validate()

    expect(error).toBeInstanceOf(ValidationError)
    expect(error?.errors).toContainEqual(expect.any(Error))
  })

  test('should return errors if all validators returns undefined', () => {
    const errors = [new Error('error01'), new Error('error02')]
    validator01.validate.mockReturnValueOnce(errors[0])
    validator02.validate.mockReturnValueOnce(errors[1])

    const error = sut.validate()

    expect(error).toBeInstanceOf(ValidationError)
    expect(error?.errors).toEqual(errors)
  })
})
