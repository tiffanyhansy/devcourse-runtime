export interface userType {
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: string[];
  likes: string[];
  comments: string[];
  followers: {
    _id: string;
    user: string;
    follower: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  following: {
    _id: string;
    user: string;
    follower: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  notifications: string[];
  messages: string[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  username?: {
    username: string;
    website: string;
    field: string;
  };
  image: string;
  isCover?: boolean;
}

interface followType {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Post_T {
  _id: string;
  author: Author_T;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  likes: string[];
  title: string; //Title_T가 string으로 들어옴
  image: string;
  imageUrl?: string;
}

type Author_T = {
  fullName: string;
  image: string;
};

export type Title_T = {
  title: string;
  content: string;
};
