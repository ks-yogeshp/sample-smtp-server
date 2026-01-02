import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User, UserConfig } from './user.entity';


export default class DataSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {

    await dataSource.getRepository(User).save({username:"test1",config: UserConfig.BREVO});
    await dataSource.getRepository(User).save({username:"test2",config: UserConfig.SENDGRID});
    await dataSource.getRepository(User).save({username:"test3",config: UserConfig.MAILTRAP});
  }
}