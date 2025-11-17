import type { Knex } from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Update this configuration to suit your needs
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'db', 'marketplace.db'),
    },
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true,
  },
};

export default config;
