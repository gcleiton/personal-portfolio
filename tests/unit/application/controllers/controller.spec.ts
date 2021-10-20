import { mock, MockProxy } from 'jest-mock-extended'

import { HttpResponse } from '@/application/contracts'
import { Controller } from '@/application/controllers/controller'
import { ServerError } from '@/application/errors'
import { Validation } from '@/application/validation'

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform(httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let validation: MockProxy<Validation>
  let sut: ControllerStub

  beforeAll(() => {
    validation = mock()
  })

  beforeEach(() => {
    sut = new ControllerStub(validation)
  })

  it('should call Validation with correct input', async () => {
    await sut.handle('any_value')

    expect(validation.validate).toHaveBeenCalled()
    expect(validation.validate).toHaveBeenCalledTimes(1)
  })

  it('should not call Validation if not inject', async () => {
    const sut = new ControllerStub()

    await sut.handle('any_value')

    expect(validation.validate).not.toHaveBeenCalled()
  })

  it('should return 422 if Validation returns errors', async () => {
    const errors = [new Error('any_error')]
    validation.validate.mockReturnValueOnce(errors)

    const response = await sut.handle('any_value')

    expect(response).toEqual({
      statusCode: 422,
      data: errors
    })
  })

  it('should return 500 if perform throws', async () => {
    const error = new Error('perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const response = await sut.handle('any_value')

    expect(response).toEqual({
      statusCode: 500,
      data: new ServerError()
    })
  })

  it('should return same result as perform', async () => {
    const response = await sut.handle('any_value')

    expect(response).toEqual(sut.result)
  })
})
