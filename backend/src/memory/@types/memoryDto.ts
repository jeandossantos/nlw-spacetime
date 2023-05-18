export interface CreateMemoryDto {
  content: string;
  coverUrl: string;
  isPublic: boolean;
  userId: string;
}

export interface UpdateMemoryDto {
  content: string;
  coverUrl: string;
  isPublic: boolean;
}
