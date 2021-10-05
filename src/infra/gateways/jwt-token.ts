import jwt from 'jsonwebtoken'

import { TokenGenerator } from '@/domain/contracts/gateways'

export class JwtToken implements TokenGenerator {
  constructor(private readonly secret: string) {}

  async generate(input: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    return jwt.sign({ id: input.key }, this.secret, {
      expiresIn: input.expirationInMs
    })
  }
}
