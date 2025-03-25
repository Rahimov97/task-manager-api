import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Task],
  migrations: ['src/migrations/*.ts']
});
