import { RefreshToken } from '@/domain/entities'

jest.useFakeTimers().setSystemTime(new Date('2021-01-01'))
describe('Refresh Token', () => {
  it('should expires in after 30 days', () => {
    const sut = new RefreshToken('any_user_id')

    const expiresDateInstance = new Date(sut.expiresIn)

    expect(expiresDateInstance.getDate()).toBe(30)
  })
})
