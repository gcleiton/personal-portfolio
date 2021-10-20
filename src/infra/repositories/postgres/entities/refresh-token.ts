import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from '.'

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'user_id' })
  userId!: string

  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column({ name: 'expires_at', type: 'timestamp with time zone' })
  expiresAt!: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date
}
