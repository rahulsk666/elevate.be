import * as dotenv from 'dotenv';
dotenv.config();
import type { Knex } from 'knex';

console.log(process.env.DATABASE_URL);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: 'ts',
    },
  },
};

export default config;
