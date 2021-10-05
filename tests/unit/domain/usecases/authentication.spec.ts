import { LoadAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { AuthenticationError } from '@/domain/entities/errors'
import { AuthenticationUseCase } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mockAuthenticationInput } from './mocks/mock-account'

describe('Authentication UseCase', () => {
  const fakeAuthenticationInput = mockAuthenticationInput()

  let accountRepository: MockProxy<LoadAccountByUsernameRepository>
  let sut: AuthenticationUseCase

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.checkByUsername.mockResolvedValue({
      id: 'any_id',
      username: 'any_username',
      password: 'any_hashed_password'
    })
  })

  beforeEach(() => {
    sut = new AuthenticationUseCase(accountRepository)
  })

  it('should call LoadAccountByUsernameRepository with correct input', async () => {
    await sut.perform(fakeAuthenticationInput)

    expect(accountRepository.checkByUsername).toHaveBeenCalledWith({
      username: fakeAuthenticationInput.username
    })
    expect(accountRepository.checkByUsername).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if LoadAccountByUsernameRepository returns undefined', async () => {
    accountRepository.checkByUsername.mockResolvedValueOnce(undefined)

    const promise = sut.perform(fakeAuthenticationInput)

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })
})
