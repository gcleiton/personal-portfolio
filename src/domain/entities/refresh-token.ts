import dayjs from 'dayjs'

export class RefreshToken {
  userId: number
  expiresIn: string

  constructor(userId: string) {
    this.userId = parseInt(userId)
    this.expiresIn = dayjs().add(30, 'day').toISOString()
  }
}
