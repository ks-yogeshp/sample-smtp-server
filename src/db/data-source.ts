import { AppConfig } from 'src/config/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entitites/user.entity';
import { SeederOptions } from 'typeorm-extension';

const CONFIG = AppConfig();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: CONFIG.database.host,
  port: CONFIG.database.port,
  username: CONFIG.database.user,
  password: CONFIG.database.password,
  database: CONFIG.database.database,
  entities: [User],
  synchronize: true,
  seeds: ['src/db/*.seeder.ts'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
