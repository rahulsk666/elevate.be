import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS roadmap_lesson(
        roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
        lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
        lesson_order INT,
        PRIMARY KEY (roadmap_id,lesson_id)
    );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS roadmap_lesson');
}
