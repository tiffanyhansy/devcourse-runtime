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
  title: string; // JSON.stringify로 묶인 title과 content
  channel: string | null;
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  author: {
    fullName: string;
    coverImage: string; // 작성자 프로필 이미지
  };
  imageUrl?: string; // 게시글 썸네일 이미지 URL
}

type Author_T = {
  fullName: string;
  coverImage: string;
};

export type Title_T = {
  title: string;
  content: string;
};
