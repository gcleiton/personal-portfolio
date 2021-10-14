import {
  AddAccountController,
  AddAccountValidation
} from '@/application/controllers'
import {
  createAddAccountUseCase,
  createAuthenticationUseCase
} from '@/main/factories/usecases'

export const createAddAccountController = (): AddAccountController => {
  const validation = new AddAccountValidation()
  return new AddAccountController(
    validation,
    createAddAccountUseCase(),
    createAuthenticationUseCase()
  )
}
