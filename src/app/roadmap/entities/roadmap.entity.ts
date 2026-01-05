import { roadmapStatus } from '../types/roadmap-status.types';

export class Roadmap {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  createdBy: string;
  roadmap_status: roadmapStatus;
  createdAt: Date;
  updatedAt: Date;
}
