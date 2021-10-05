import { mock, MockProxy } from 'jest-mock-extended'

import {
  AddAccountRepository,
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
import { Hasher } from '@/domain/contracts/gateways'

describe('AddAccount', () => {
  const fakeAccount = mockAddAccountInput()

  let accountRepository: MockProxy<
    CheckAccountByUsernameRepository &
      CheckAccountByEmailRepository &
      AddAccountRepository
  >
  let cryptography: MockProxy<Hasher>
  let sut: AddAccount

  beforeAll(() => {
    accountRepository = mock()
    cryptography = mock()
    cryptography.hash.mockResolvedValue('hashed_password')
  })

  beforeEach(() => {
    sut = new AddAccount(accountRepository, cryptography)
  })

  it('should call CheckAccountByUsernameRepository with correct input', async () => {
    await sut.perform(fakeAccount)

    expect(accountRepository.checkByUsername).toHaveBeenCalledWith({
      username: fakeAccount.username
    })
    expect(accountRepository.checkByUsername).toHaveBeenCalledTimes(1)
  })

  it('should throw ValidationError if username already taken', async () => {
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

  it('should throw ValidationError if email already taken', async () => {
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const errorPromise = sut.perform(fakeAccount)

    await expect(errorPromise).rejects.toThrow(
      new ValidationError([new EmailInUseError()])
    )
  })

  it('should throw ValidationError if email and username already taken', async () => {
    accountRepository.checkByUsername.mockResolvedValueOnce(true)
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const errorPromise = sut.perform(fakeAccount)

    await expect(errorPromise).rejects.toThrow(
      new ValidationError([new UsernameInUseError(), new EmailInUseError()])
    )
  })

  it('should call Hasher with correct input', async () => {
    await sut.perform(fakeAccount)

    expect(cryptography.hash).toHaveBeenCalledWith({
      plainText: fakeAccount.password
    })
    expect(cryptography.hash).toHaveBeenCalledTimes(1)
  })

  it('should call AddAccountRepository with correct input', async () => {
    await sut.perform(fakeAccount)

    expect(accountRepository.add).toHaveBeenCalledWith({
      ...fakeAccount,
      password: 'hashed_password'
    })
    expect(accountRepository.add).toHaveBeenCalledTimes(1)
  })
})