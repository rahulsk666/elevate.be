import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS course_roadmap (
        course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
        roadmap_order INT,
        PRIMARY KEY (course_id, roadmap_id)
    );`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS course_roadmap');
}
