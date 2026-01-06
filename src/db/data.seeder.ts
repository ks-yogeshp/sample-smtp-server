import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from './entitites/user.entity';
import * as bcrypt from 'bcrypt';

export default class DataSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('123456', salt);
    await dataSource.getRepository(User).save({
      username: 'test1',
      password: hashedPassword,
      config: {
        brevo: { weight: 10 },
      },
    });
    await dataSource.getRepository(User).save({
      username: 'test2',
      password: hashedPassword,
      config: {
        sendgrid: { weight: 10 },
      },
    });
    await dataSource.getRepository(User).save({
      username: 'test3',
      password: hashedPassword,
      config: {
        mailtrap: { weight: 10 },
      },
    });
    await dataSource.getRepository(User).save({
      username: 'test4',
      password: hashedPassword,
      config: {
        brevo: { weight: 5 },
        sendgrid: { weight: 5 },
      },
    });
    await dataSource.getRepository(User).save({
      username: 'test5',
      password: hashedPassword,
      config: {
        brevo: { weight: 3 },
        sendgrid: { weight: 4 },
        mailtrap: { weight: 3 },
      },
    });
  }
}
