import { PostgresConnection } from '@/infra/repositories/postgres/helpers'
import request from 'supertest'
import { getConnection } from 'typeorm'
import { setupApp } from '@/main/configs/app'
import { Express } from 'express'
import { RefreshToken, User } from '@/infra/repositories/postgres/entities'

describe('Auth Routes', () => {
  let app: Express

  beforeAll(async () => {
    app = setupApp()
    await PostgresConnection.getInstance().connect()
  })

  beforeEach(async () => {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .execute()
    await getConnection().createQueryBuilder().delete().from(User).execute()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('POST /signup', () => {
    test('should return 200 with tokens', async () => {
      const { statusCode, body } = await request(app).post('/api/signup').send({
        firstName: 'Gabriel',
        lastName: 'Cleiton',
        username: 'gcleiton',
        email: 'gcleiton.dev@gmail.com',
        password: '123456'
      })

      expect(statusCode).toBe(200)
      expect(body.accessToken).toBeDefined()
      expect(body.refreshToken).toBeDefined()
    })
  })
})
