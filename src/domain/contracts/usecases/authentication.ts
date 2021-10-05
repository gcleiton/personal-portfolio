export interface Authentication {
  perform: (input: Authentication.Input) => Promise<Authentication.Output>
}

export namespace Authentication {
  export type Input = {
    username: string
    password: string
  }

  export type Output = {
    accessToken: string
    refreshToken: string
  }
}
