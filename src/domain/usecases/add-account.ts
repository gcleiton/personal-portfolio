import { CheckAccountByUsernameRepository } from '@/domain/contracts/repositories/user-account'
import { ValidationError, UsernameInUseError } from '@/domain/entities/errors'

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
    const errors = []
    const isUsernameInUse = await this.accountRepository.checkByUsername({
      username: input.username
    })

    if (isUsernameInUse) {
      errors.push(new UsernameInUseError())
    }

    if (errors.length >= 1) {
      throw new ValidationError(errors)
    }
  }
}
