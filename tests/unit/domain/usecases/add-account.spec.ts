import { mock, MockProxy } from 'jest-mock-extended'

import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  CheckAccountByUsernameRepository
} from '@/domain/contracts/repositories'
import { AddAccountUseCase } from '@/domain/usecases'
import { UsernameInUseError, EmailInUseError } from '@/domain/entities/errors'
import { Hasher } from '@/domain/contracts/gateways'

import { mockAddAccountInput } from './mocks/mock-account'
import { ValidationError } from '@/application/errors'

describe('AddAccount', () => {
  const fakeAccount = mockAddAccountInput()

  let accountRepository: MockProxy<
    CheckAccountByUsernameRepository &
      CheckAccountByEmailRepository &
      AddAccountRepository
  >
  let cryptography: MockProxy<Hasher>
  let sut: AddAccountUseCase

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.add.mockResolvedValue({
      id: 'any_id'
    })
    cryptography = mock()
    cryptography.hash.mockResolvedValue('hashed_password')
  })

  beforeEach(() => {
    sut = new AddAccountUseCase(accountRepository, cryptography)
  })

  it('should call CheckAccountByUsernameRepository with correct input', async () => {
    await sut.perform(fakeAccount)

    expect(accountRepository.checkByUsername).toHaveBeenCalledWith({
      username: fakeAccount.username
    })
    expect(accountRepository.checkByUsername).toHaveBeenCalledTimes(1)
  })

  it('should return ValidationError with UsernameInUseError if username already taken', async () => {
    accountRepository.checkByUsername.mockResolvedValueOnce(true)

    const result = await sut.perform(fakeAccount)

    expect(result.error).toEqual(
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

  it('should return EmailInUseError if email already taken', async () => {
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const result = await sut.perform(fakeAccount)

    expect(result.error).toEqual(new ValidationError([new EmailInUseError()]))
  })

  it('should return UsernameInUseError and EmailInUseError if email and username already taken', async () => {
    accountRepository.checkByUsername.mockResolvedValueOnce(true)
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const result = await sut.perform(fakeAccount)

    expect(result.error).toEqual(
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

  it('should return id on success', async () => {
    const result = await sut.perform(fakeAccount)

    expect(result.value).toEqual({
      id: 'any_id'
    })
  })
})
