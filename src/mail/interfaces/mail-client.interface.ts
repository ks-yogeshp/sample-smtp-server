export interface MailClient {
  send(options: { to: string; subject: string; text: string }): Promise<void>;
}
