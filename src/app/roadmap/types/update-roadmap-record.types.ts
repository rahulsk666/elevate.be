import { roadmapStatus } from './roadmap-status.types';

export interface UpdateRoadmapRecord {
  title?: string;
  subtitle?: string;
  description?: string;
  roadmapStatus?: roadmapStatus;
}
