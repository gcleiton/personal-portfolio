import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  CheckAccountByUsernameRepository
} from '@/domain/contracts/repositories/user-account'
import { UsernameInUseError, EmailInUseError } from '@/domain/entities/errors'
import { Hasher } from '@/domain/contracts/gateways'
import { AddAccount } from '@/domain/contracts/usecases'

type Input = AddAccount.Input
type Output = AddAccount.Output

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly accountRepository: CheckAccountByUsernameRepository &
      CheckAccountByEmailRepository &
      AddAccountRepository,
    private readonly cryptography: Hasher
  ) {}

  async perform(input: Input): Promise<Output> {
    const errors = await this.validate(input)
    if (errors.length >= 1) {
      return errors
    }

    const hashedPassword = await this.cryptography.hash({
      plainText: input.password
    })

    await this.accountRepository.add({ ...input, password: hashedPassword })
  }

  async validate(input: Input): Promise<Error[]> {
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
