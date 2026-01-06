import { UpdateRoadmapRecord } from '../types/update-roadmap-record.types';

export function updateRoadmapQuery(
  id: string,
  roadmap: UpdateRoadmapRecord,
): {
  query: string;
  values: unknown[];
} {
  const columns: string[] = [];
  const values: unknown[] = [];
  let idx: number = 1;

  if (roadmap.title !== undefined) {
    columns.push(`title = $${idx++}`);
    values.push(roadmap.title);
  }

  if (roadmap.subtitle !== undefined) {
    columns.push(`subtitle = $${idx++}`);
    values.push(roadmap.subtitle);
  }

  if (roadmap.description !== undefined) {
    columns.push(`description = $${idx++}`);
    values.push(roadmap.description);
  }

  if (roadmap.roadmapStatus !== undefined) {
    columns.push(`roadmap_status = $${idx++}`);
    values.push(roadmap.roadmapStatus);
  }

  columns.push(`updated_at = NOW()`);

  values.push(id);

  const query = `
  UPDATE roadmaps
    SET ${columns.join(', ')}
    WHERE id = $${idx}
    RETURNING id,
      title,
      subtitle,
      description,
      roadmap_status AS "roadmapStatus",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
`;

  return { query, values };
}
