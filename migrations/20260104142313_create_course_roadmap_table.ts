import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS course_roadmap (
        course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
        roadmap_order INT NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        PRIMARY KEY (course_id, roadmap_id),
        UNIQUE (course_id, roadmap_order)
      );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS course_roadmap');
}
