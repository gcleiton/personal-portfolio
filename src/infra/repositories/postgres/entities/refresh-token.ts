import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '.'

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'expires_at', type: 'timestamp with time zone' })
  expiresAt!: string

  @Column({ name: 'user_id' })
  userId!: number

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user!: User

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date
}
