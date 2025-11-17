
import knex from 'knex';
import config from '../knexfile.ts';

// This script is a workaround for a broken knex CLI installation.
// It programmatically creates a new migration file.

async function makeMigration() {
  // Ensure we're using the development configuration
  const knexInstance = knex(config.development);

  // Get the migration name from command line arguments
  const migrationName = process.argv[2];
  if (!migrationName) {
    console.error('Error: Migration name must be specified.');
    console.log('Usage: pnpm ts-node scripts/make-migration.ts <migration_name>');
    process.exit(1);
  }

  console.log(`Creating migration: ${migrationName}...`);

  try {
    const result = await knexInstance.migrate.make(migrationName, {
      directory: config.development.migrations?.directory,
      extension: 'ts', // Create a TypeScript migration file
    });
    console.log(`Migration file created: ${result}`);
  } catch (err) {
    console.error('Error creating migration:', err);
    process.exit(1);
  } finally {
    await knexInstance.destroy();
  }
}

makeMigration();
