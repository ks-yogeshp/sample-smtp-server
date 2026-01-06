import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Provider {
  SENDGRID = 'sendgrid',
  BREVO = 'brevo',
  MAILTRAP = 'mailtrap',
}

export type ProviderConfig = {
  [key in Provider]?: {
    weight: number;
  };
};

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'jsonb', default: {} })
  config: ProviderConfig; // OBJECT, not array

  @Column({ default: 50 })
  rateLimitPerDay: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
