import { roadmapStatus } from '../types/roadmap-status.types';

export class Roadmap {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  createdBy: string;
  roadmapStatus: roadmapStatus;
  createdAt: Date;
  updatedAt: Date;
}
