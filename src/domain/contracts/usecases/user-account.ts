import { Result } from '@/domain/entities'

export interface AddAccount {
  perform: (input: AddAccount.Input) => Promise<AddAccount.Output>
}

export namespace AddAccount {
  export type Input = {
    username: string
    firstName: string
    lastName: string
    password: string
    email: string
  }

  export type Output = Result<{ id: string }>
}
