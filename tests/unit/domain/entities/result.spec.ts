import { Result } from '@/domain/entities'

describe('Result', () => {
  it('should set error property if failure method is call', () => {
    const sut = Result.failure(new Error('error'))

    expect(sut.error).toEqual(new Error('error'))
  })

  it('should not set value property if failure method is call', () => {
    const sut = Result.failure(new Error('error'))

    expect(sut.value).toBeUndefined()
  })
})
