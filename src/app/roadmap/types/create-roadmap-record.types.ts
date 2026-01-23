import { roadmapStatus } from './roadmap-status.types';

export interface CreateRoadmapRecord {
  title: string;
  subtitle?: string;
  description?: string;
  createdBy: string;
  roadmapStatus: roadmapStatus;
}
