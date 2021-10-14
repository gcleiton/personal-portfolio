import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { createAddAccountController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(createAddAccountController()))
}
