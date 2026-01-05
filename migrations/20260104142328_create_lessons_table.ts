import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS lessons(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      url TEXT,
      description TEXT,
      created_by UUID REFERENCES users(id),
      lesson_type TEXT NOT NULL DEFAULT 'link',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE roadmap IF EXISTS');
}
