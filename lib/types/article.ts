import { User } from "./users";

export type Article = {
  id?: number;
  title: string;
  story: string;
  category: string;
  date?: string;
  authors: string[];
  image: string;
  imageTitle: string;
  images: string[];
  isDraft: boolean;
  imagesTitle: string[];
  tags: string[];
  disclaimer?: string;
};

export type Articles = {
  articles: Article[];
  users: User;
};

export type CommentProp = {
  id: number;
  comment: string;
  ownerId: string;
  postId: number;
  date: string;
  parentId: number;
};

export type ReplyProps = {
  comment: CommentProp;
  user: User;
};
