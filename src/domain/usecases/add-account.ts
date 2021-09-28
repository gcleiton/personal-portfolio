import { CheckAccountByUsernameRepository } from '@/domain/contracts/repositories/user-account'

export type AddAccountInput = {
  username: string
  firstName: string
  lastName: string
  password: string
  email: string
}

export class AddAccount {
  constructor(
    private readonly accountRepository: CheckAccountByUsernameRepository
  ) {}

  async perform(input: AddAccountInput): Promise<void> {
    await this.accountRepository.checkByUsername({ username: input.username })
  }
}
