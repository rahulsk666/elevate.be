import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS courses(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      subtitle TEXT,
      description TEXT,
      created_by UUID NOT NULL REFERENCES users(id),
      thumbnail_url TEXT,
      status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft','published','archived')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      UNIQUE (created_by, title)
      );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS courses;');
}
