import { StringMaxFieldError, StringMinFieldError } from '@/application/errors'
import {
  StringMaxValidator,
  StringMinValidator
} from '@/application/validation/validators/size'

const fieldValue = 'any_field_value'

describe('StringMinValidator', () => {
  it('should return StringMinFieldError if quantity of characters in the field is less than minimum value', () => {
    const sut = new StringMinValidator(fieldValue, fieldValue.length + 1)

    const error = sut.validate()

    expect(error).toEqual(new StringMinFieldError(fieldValue.length + 1))
  })

  it('should return undefined if quantity of characters in the field is equal minimum value', () => {
    const sut = new StringMinValidator(fieldValue, fieldValue.length)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if quantity of characters in the field is greater than minimum value', () => {
    const sut = new StringMinValidator(fieldValue, fieldValue.length - 1)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('StringMaxValidator', () => {
  it('should return StringMaxFieldError if quantity of characters in the field is greater than maximum value', () => {
    const sut = new StringMaxValidator(fieldValue, fieldValue.length - 1)

    const error = sut.validate()

    expect(error).toEqual(new StringMaxFieldError(fieldValue.length - 1))
  })

  it('should return undefined if quantity of characters in the field is equal maximum value', () => {
    const sut = new StringMaxValidator(fieldValue, fieldValue.length)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if quantity of characters in the field is greater than maximum value', () => {
    const sut = new StringMaxValidator(fieldValue, fieldValue.length + 1)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
