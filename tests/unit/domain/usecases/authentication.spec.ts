import { LoadAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { AuthenticationUseCase } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mockAuthenticationInput } from './mocks/mock-account'

describe('Authentication UseCase', () => {
  const fakeAuthenticationInput = mockAuthenticationInput()

  let accountRepository: MockProxy<LoadAccountByUsernameRepository>
  let sut: AuthenticationUseCase

  beforeAll(() => {
    accountRepository = mock()
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
})
