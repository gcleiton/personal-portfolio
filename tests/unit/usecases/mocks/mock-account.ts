import { AddAccountInput } from '@/domain/usecases'

export const mockAddAccountInput = (): AddAccountInput => ({
  username: 'any_username',
  firstName: 'any_firstname',
  lastName: 'any_lastName',
  password: 'any_password',
  email: 'any_email'
})
