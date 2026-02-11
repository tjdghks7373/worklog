export interface WorkLog {
  id: string;
  title: string;
  content?: string | null;
  imageUrl?: string | null;
  startTime?: Date | null;
  endTime?: Date | null;
  duration?: number | null;
  tags: string[];
  status: 'draft' | 'completed' | 'archived';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
