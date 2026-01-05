export function selectAllRoadmap(): string {
  return `
  SELECT id,
    title,
    subtitle,
    description, 
    roadmap_status,
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
    roadmap_status,
    created_by AS "createdBy",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM roadmaps
    WHERE id = $1;
    `;
  const values = [id];
  return { query, values };
}

export function selectRoadmapByTitle(name: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  SELECT id,
    title,
    subtitle,
    description, 
    roadmap_status,
    created_by AS "createdBy",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM roadmaps
    WHERE title LIKE $1;
    `;
  const values = [name];
  return { query, values };
}
