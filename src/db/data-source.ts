import { AppConfig } from 'src/config/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user.entity';

const CONFIG = AppConfig();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: CONFIG.database.host,
  port: CONFIG.database.port,
  username: CONFIG.database.user,
  password: CONFIG.database.password,
  database: CONFIG.database.database,
  entities: [User],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
