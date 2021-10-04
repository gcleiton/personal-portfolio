import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 32, unique: true })
  username!: string

  @Column({ name: 'first_name', length: 64 })
  firstName!: string

  @Column({ name: 'last_name', length: 64 })
  lastName!: string

  @Column()
  password!: string

  @Column({ length: 128, unique: true })
  email!: string
}
