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
  coverImage: string;
}

interface followType {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type Post_T = {
  _id: string;
  author: Author_T;
  comments: Comments_T[];
  createdAt: string;
  updatedAt: string;
  likes: Likes_T[];
  title: string; //Title_T가 string으로 들어옴
};

type Author_T = {
  fullName: string;
  coverImage: string;
};

export type Title_T = {
  title: string;
  content: string;
};
