export default {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: `${
    process.env.APP_ENV === 'production' ? 'dist' : 'src'
  }/infra/repositories/postgres/entities/index.{js,ts}`
}
