import express, { Express } from 'express'

import { setupMiddlewares } from '@/main/configs/middlewares'
import { setupRoutes } from '@/main/configs/routes'

export const setupApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
