import { AddAccount, Authentication } from '@/domain/contracts/usecases'

export const mockAddAccountInput = (): AddAccount.Input => ({
  username: 'any_username',
  firstName: 'any_firstname',
  lastName: 'any_lastName',
  password: 'any_password',
  email: 'any_email'
})

export const mockAuthenticationInput = (): Authentication.Input => ({
  username: 'any_username',
  password: 'any_password'
})
