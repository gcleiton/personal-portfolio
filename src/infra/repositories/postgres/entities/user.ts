import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { RefreshToken } from './refresh-token'

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

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens!: RefreshToken[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
