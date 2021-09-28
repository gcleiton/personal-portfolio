import { mock, MockProxy } from 'jest-mock-extended'

import {
  CheckAccountByEmailRepository,
  CheckAccountByUsernameRepository
} from '@/domain/contracts/repositories'
import { AddAccount } from '@/domain/usecases'
import { mockAddAccountInput } from './mocks/mock-account'
import {
  UsernameInUseError,
  ValidationError,
  EmailInUseError
} from '@/domain/entities/errors'

describe('AddAccount', () => {
  const fakeAccount = mockAddAccountInput()

  let accountRepository: MockProxy<
    CheckAccountByUsernameRepository & CheckAccountByEmailRepository
  >
  let sut: AddAccount

  beforeAll(() => {
    accountRepository = mock()
  })

  beforeEach(() => {
    sut = new AddAccount(accountRepository)
  })

  it('should call CheckAccountByUsernameRepository with correct input', async () => {
    await sut.perform(fakeAccount)

    expect(accountRepository.checkByUsername).toHaveBeenCalledWith({
      username: fakeAccount.username
    })
    expect(accountRepository.checkByUsername).toHaveBeenCalledTimes(1)
  })

  it('should throw ValidationError if username is already taken', async () => {
    accountRepository.checkByUsername.mockResolvedValueOnce(true)

    const errorPromise = sut.perform(fakeAccount)

    await expect(errorPromise).rejects.toThrow(
      new ValidationError([new UsernameInUseError()])
    )
  })

  it('should call CheckAccountByEmailRepository with correct input', async () => {
    await sut.perform(fakeAccount)

    expect(accountRepository.checkByEmail).toHaveBeenCalledWith({
      email: fakeAccount.email
    })
    expect(accountRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw ValidationError if email is already taken', async () => {
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const errorPromise = sut.perform(fakeAccount)

    await expect(errorPromise).rejects.toThrow(
      new ValidationError([new EmailInUseError()])
    )
  })
})
