import { HashComparer, TokenGenerator } from '@/domain/contracts/gateways'
import {
  LoadAccountByUsernameRepository,
  AddRefreshTokenRepository
} from '@/domain/contracts/repositories'
import { AccessToken, RefreshToken } from '@/domain/entities'
import { AuthenticationError } from '@/domain/entities/errors'
import { AuthenticationUseCase } from '@/domain/usecases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mockAuthenticationInput } from './mocks/mock-account'

describe('Authentication UseCase', () => {
  const fakeAuthenticationInput = mockAuthenticationInput()

  let accountRepository: MockProxy<
    LoadAccountByUsernameRepository & AddRefreshTokenRepository
  >
  let cryptography: MockProxy<HashComparer>
  let tokenGenerator: MockProxy<TokenGenerator>

  let sut: AuthenticationUseCase

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.checkByUsername.mockResolvedValue({
      id: 'any_id',
      username: 'any_username',
      password: 'any_hashed_password'
    })
    accountRepository.addRefreshToken.mockResolvedValue({
      id: 'any_refresh_token',
      expiresAt: 'any_expires_at',
      userId: 'any_user_id'
    })
    cryptography = mock()
    cryptography.compare.mockResolvedValue(true)
    tokenGenerator = mock()
    tokenGenerator.generate.mockResolvedValue('any_access_token')
  })

  beforeEach(() => {
    sut = new AuthenticationUseCase(
      accountRepository,
      cryptography,
      tokenGenerator
    )
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

  it('should call HasherComparer with correct input', async () => {
    await sut.perform(fakeAuthenticationInput)

    expect(cryptography.compare).toHaveBeenCalledWith({
      plainText: fakeAuthenticationInput.password,
      digest: 'any_hashed_password'
    })
    expect(cryptography.compare).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if HasherComparer returns false', async () => {
    cryptography.compare.mockResolvedValueOnce(false)

    const promise = sut.perform(fakeAuthenticationInput)

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })

  it('should call TokenGenerator with correct input', async () => {
    await sut.perform(fakeAuthenticationInput)

    expect(tokenGenerator.generate).toHaveBeenCalledWith({
      key: 'any_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(tokenGenerator.generate).toHaveBeenCalledTimes(1)
  })

  it('should call AddRefreshTokenRepository with correct input', async () => {
    await sut.perform(fakeAuthenticationInput)

    expect(accountRepository.addRefreshToken).toHaveBeenCalledWith(
      expect.any(RefreshToken)
    )
    expect(accountRepository.addRefreshToken).toHaveBeenCalledTimes(1)
  })

  it('should return access token and refresh token on success', async () => {
    const output = await sut.perform(fakeAuthenticationInput)

    expect(output).toEqual({
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token'
    })
  })
})
