import { mock, MockProxy } from 'jest-mock-extended'

import { CheckAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { AddAccount } from '@/domain/usecases'
import { mockAddAccountInput } from './mocks/mock-account'

describe('AddAccount', () => {
  const fakeAccount = mockAddAccountInput()

  let accountRepository: MockProxy<CheckAccountByUsernameRepository>
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
})
