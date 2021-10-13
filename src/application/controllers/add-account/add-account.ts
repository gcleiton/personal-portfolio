import { HttpResponse } from '@/application/contracts'
import { Controller } from '@/application/controllers/controller'
import { ValidationError } from '@/application/errors'
import { conflict, ok } from '@/application/helpers'
import { Validation } from '@/application/validation'
import { AddAccount, Authentication } from '@/domain/contracts/usecases'

type Model =
  | ValidationError
  | {
      accessToken: string
      refreshToken: string
    }

export type HttpRequest = {
  username: string
  firstName: string
  lastName: string
  password: string
  email: string
}

export class AddAccountController extends Controller {
  constructor(
    validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {
    super(validation)
  }

  async perform(request: HttpRequest): Promise<HttpResponse<Model>> {
    const addAccountResult = await this.addAccount.perform(request)
    if (addAccountResult.isFailure) {
      if (addAccountResult.error instanceof ValidationError) {
        return conflict(addAccountResult.error)
      }
    }

    const authenticationResult = await this.authentication.perform({
      username: request.username,
      password: request.password
    })

    return ok(authenticationResult.value)
  }
}
