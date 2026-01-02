import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserConfig {
  SENDGRID = 'sendgrid',
  BREVO = 'brevo',
  MAILTRAP = 'mailtrap',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  config: UserConfig;
}
