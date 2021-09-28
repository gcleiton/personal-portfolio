import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  CheckAccountByUsernameRepository
} from '@/domain/contracts/repositories/user-account'
import {
  ValidationError,
  UsernameInUseError,
  EmailInUseError
} from '@/domain/entities/errors'
import { Hasher } from '@/domain/contracts/gateways'

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
      CheckAccountByEmailRepository &
      AddAccountRepository,
    private readonly cryptography: Hasher
  ) {}

  async perform(input: AddAccountInput): Promise<void> {
    const errors = await this.canPerform(input)
    if (errors.length >= 1) {
      throw new ValidationError(errors)
    }

    const hashedPassword = await this.cryptography.hash({
      plainText: input.password
    })

    await this.accountRepository.add({ ...input, password: hashedPassword })
  }

  async canPerform(input: AddAccountInput): Promise<Error[]> {
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

    return errors
  }
}
