import dayjs from 'dayjs'

export class RefreshToken {
  userId: string
  expiresIn: string

  constructor(userId: string) {
    this.userId = userId
    this.expiresIn = dayjs().add(30, 'day').toISOString()
  }
}
