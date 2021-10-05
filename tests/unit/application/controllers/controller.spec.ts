import { HttpResponse } from '@/application/contracts'
import { Controller } from '@/application/controllers/controller'
import { ValidationComposite } from '@/application/validation/composite'

import { mocked } from 'ts-jest/utils'

jest.mock('@/application/validation/composite')

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
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const response = await sut.handle('any_value')

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(response).toEqual({
      statusCode: 400,
      data: error
    })
  })
})
