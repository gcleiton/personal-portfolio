import {
  CheckAccountByEmailRepository,
  CheckAccountByUsernameRepository
} from '@/domain/contracts/repositories/user-account'
import {
  ValidationError,
  UsernameInUseError,
  EmailInUseError
} from '@/domain/entities/errors'

export type AddAccountInput = {
  username: string
  firstName: string
  lastName: string
  password: string
  email: string
}

export class AddAccount {
  constructor(
    private readonly accountRepository: CheckAccountByUsernameRepository &
      CheckAccountByEmailRepository
  ) {}

  async perform(input: AddAccountInput): Promise<void> {
    const errors = []
    const isUsernameInUse = await this.accountRepository.checkByUsername({
      username: input.username
    })

    if (isUsernameInUse) {
      errors.push(new UsernameInUseError())
    }

    const isEmailInUse = await this.accountRepository.checkByEmail({
      email: input.email
    })

    if (isEmailInUse) {
      errors.push(new EmailInUseError())
    }

    if (errors.length >= 1) {
      throw new ValidationError(errors)
    }
  }
}
