import { BcryptCryptography, JwtToken } from '@/infra/gateways'

export const createBcryptCryptography = (): BcryptCryptography => {
  const salt = 12
  return new BcryptCryptography(salt)
}

export const createJwtToken = (): JwtToken => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return new JwtToken(process.env.JWT_SECRET!)
}
