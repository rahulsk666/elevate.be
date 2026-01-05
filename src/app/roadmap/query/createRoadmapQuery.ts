import { CreateRoadmapRecord } from '../types/create-roadmap-record.types';

export function createRoadmapQuery(roadmap: CreateRoadmapRecord): {
  query: string;
  values: unknown[];
} {
  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: unknown[] = [];
  let idx: number = 1;

  if (roadmap.title !== undefined) {
    columns.push(`title`);
    placeholders.push(`$${idx++}`);
    values.push(roadmap.title);
  }

  if (roadmap.subtitle !== undefined) {
    columns.push(`subtitle`);
    placeholders.push(`$${idx++}`);
    values.push(roadmap.subtitle);
  }

  if (roadmap.description !== undefined) {
    columns.push(`description`);
    placeholders.push(`$${idx++}`);
    values.push(roadmap.description);
  }

  if (roadmap.createdBy !== undefined) {
    columns.push(`created_by`);
    placeholders.push(`$${idx++}`);
    values.push(roadmap.createdBy);
  }

  if (roadmap.roadmap_status !== undefined) {
    columns.push(`roadmap_status`);
    placeholders.push(`$${idx++}`);
    values.push(roadmap.roadmap_status);
  }

  const query = `
  INSERT INTO roadmaps(${columns.join(', ')}) 
  VALUES (${placeholders.join(', ')})
  RETURNING id,
    title, 
    subtitle, 
    description, 
    roadmap_status,
    created_by,
    created_at AS "createdAt",
    updated_at AS "updatedAt";
  `;

  return { query, values };
}
