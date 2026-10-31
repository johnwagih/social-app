export interface Imyposts {
  posts: Post[];
}
interface Post {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
  image?: string;
}
interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}