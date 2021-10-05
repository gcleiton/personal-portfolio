import { Hasher } from '@/domain/contracts/gateways'
import bcrypt from 'bcrypt'

export class BcryptCryptography implements Hasher {
  constructor(private readonly salt: number) {}

  async hash(input: Hasher.Input): Promise<Hasher.Output> {
    return await bcrypt.hash(input.plainText, this.salt)
  }
}
