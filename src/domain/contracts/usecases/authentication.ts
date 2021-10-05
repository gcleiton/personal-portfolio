export interface Authentication {
  perform: (input: Authentication.Input) => Promise<void>
}

export namespace Authentication {
  export type Input = {
    username: string
    password: string
  }

  export type Output = {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}
