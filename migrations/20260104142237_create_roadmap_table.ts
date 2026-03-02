import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS roadmaps(
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      subtitle TEXT,
      description TEXT,
      created_by UUID NOT NULL REFERENCES users(id),
      roadmap_status TEXT NOT NULL DEFAULT 'draft'
        CHECK (roadmap_status IN ('draft','published','archived')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS roadmaps');
}
