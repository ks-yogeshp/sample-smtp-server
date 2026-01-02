interface IDatabase {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface IRedis {
  url: string;
}

interface IEmailService {
  maitrap: IMaitrap;
  brevo: IBrevo;
  sendGrid: ISendGrid;
  fromEmail: string;
}
interface IMaitrap {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
}
interface IBrevo {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
}
interface ISendGrid {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
}
interface IAllowedIPs {
  ips: string[];
}

interface IServer {
  port: number;
  user: string;
  pass: string;
}

export interface IAppConfig {
  database: IDatabase;
  redis: IRedis;
  emailService: IEmailService;
  allowedIPs: IAllowedIPs;
  server: IServer;
}
