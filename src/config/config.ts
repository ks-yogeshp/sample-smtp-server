import { IAppConfig } from './config.interface';

require('dotenv').config();

export const AppConfig = (): IAppConfig => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  emailService: {
    maitrap: {
      smtpHost: process.env.MAILTRAP_HOST,
      smtpPort: parseInt(process.env.MAILTRAP_PORT, 10) || 587,
      smtpUser: process.env.MAILTRAP_USER,
      smtpPass: process.env.MAILTRAP_PASS,
    },
    brevo: {
      smtpHost: process.env.BREVO_HOST,
      smtpPort: parseInt(process.env.BREVO_PORT, 10) || 587,
      smtpUser: process.env.BREVO_USER,
      smtpPass: process.env.BREVO_PASS,
    },
    sendGrid: {
      smtpHost: process.env.SENDGRID_HOST,
      smtpPort: parseInt(process.env.SENDGRID_PORT, 10) || 587,
      smtpUser: process.env.SENDGRID_USER,
      smtpPass: process.env.SENDGRID_PASS,
    },
    fromEmail: process.env.FROM_EMAIL,
  },
  allowedIPs: {
    ips: process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [],
  },
  server: {
    port: parseInt(process.env.SMTP_PORT, 10) || 3000,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
});
