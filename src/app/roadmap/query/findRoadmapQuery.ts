export function selectAllRoadmap(): string {
  return `
  SELECT id,
    title,
    subtitle,
    description, 
    roadmap_status AS "roadmapStatus",
    created_by AS "createdBy",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM roadmaps;
    `;
}

export function selectRoadmapById(id: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  SELECT id,
    title,
    subtitle,
    description, 
    roadmap_status AS "roadmapStatus",
    created_by AS "createdBy",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM roadmaps
    WHERE id = $1;
    `;
  const values = [id];
  return { query, values };
}

export function selectRoadmapByTitle(title: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  SELECT id,
    title,
    subtitle,
    description, 
    roadmap_status AS "roadmapStatus",
    created_by AS "createdBy",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM roadmaps
    WHERE title ILIKE $1;
    `;

  const titleString = title ? `%${title}%` : null;

  const values = [titleString];
  return { query, values };
}
