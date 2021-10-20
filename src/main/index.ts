import 'reflect-metadata'

import { PostgresConnection } from '@/infra/repositories/postgres/helpers'
import { env } from '@/main/configs/env'

PostgresConnection.getInstance()
  .connect()
  .then(async () => {
    const { setupApp } = await import('@/main/configs/app')
    const app = await setupApp()

    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    )
  })
  .catch(console.error)