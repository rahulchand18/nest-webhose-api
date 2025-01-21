import { Post } from '@prisma/client';
export interface ApiResponse {
  posts: Post[];
  next?: string;
  totalResults: number;
  moreResultsAvailable: number;
}
