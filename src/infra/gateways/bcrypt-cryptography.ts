import { HashComparer, Hasher } from '@/domain/contracts/gateways'
import bcrypt from 'bcrypt'

export class BcryptCryptography implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(input: Hasher.Input): Promise<Hasher.Output> {
    return await bcrypt.hash(input.plainText, this.salt)
  }

  async compare(input: HashComparer.Input): Promise<HashComparer.Output> {
    return await bcrypt.compare(input.plainText, input.digest)
  }
}
