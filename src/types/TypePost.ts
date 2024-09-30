export type Post = {
  id?: string;
  isDeleted?: string;
  title: string;
  body: string;
  isActive?: boolean;
  imageUri?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  type?: number;
};
