export type HackathonStatus = 'upcoming' | 'ongoing' | 'ended';
export type HackathonMode = 'online' | 'offline' | 'hybrid';

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  prizePool: string;
  platform: string;
  organizer: string;
  mode: HackathonMode;
  status: HackathonStatus;
  location?: string;
  tags: string[];
  website: string;
  tracks: string[];
  requirements?: string[];
} 