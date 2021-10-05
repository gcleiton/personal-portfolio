export interface AddAccount {
  perform: (input: AddAccount.Input) => Promise<void>
}

export namespace AddAccount {
  export type Input = {
    username: string
    firstName: string
    lastName: string
    password: string
    email: string
  }
}
