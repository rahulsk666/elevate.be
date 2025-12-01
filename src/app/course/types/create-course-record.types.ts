export interface CreateCourseRecord {
  title: string;
  subtitle?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  status?: string;
  createdBy: string; // <-- REQUIRED for DB insert
}
