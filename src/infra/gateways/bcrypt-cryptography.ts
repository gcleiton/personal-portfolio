import { Hasher } from '@/domain/contracts/gateways'
import bcrypt from 'bcrypt'

export class BcryptCryptography {
  constructor(private readonly salt: number) {}

  async hash(input: Hasher.Input): Promise<void> {
    await bcrypt.hash(input.plainText, this.salt)
  }
}
