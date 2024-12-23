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
  username?:
    | {
        username: string;
        website: string;
        field: string;
      }
    | string;
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

export interface Post_T {
  _id: string;
  author: Author_T;
  comments: PostComment[];
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
  _id: string;
};

export interface PostComment {
  _id: string; // 댓글 ID
  author: Author_T; // 댓글 작성자 정보
  comment: string; // 댓글 내용
  createdAt: string; // 작성 시간
}

export type Title_T = {
  title: string;
  content: string;
};

type notificationsType = {
  seen: boolean;
  _id: string;
  author: {
    image?: string;
    fullName: string;
    _id: string;
  };
  createdAt: string;
  follow?: {
    user: string;
    _id: string;
  };
  like?: {
    _id: string;
    post: {
      title: string;
    };
  };
  comment?: {
    comment: string;
    post: { title: string };
  };
  user: {
    coverImage?: string;
    _id: string;
    following: string[];
  };
};

type createNotiType = {
  notiType: string;
  notiTypeId: string;
  userId: string;
  postId: null | string;
};

type notificationsStore = {
  imgState?: boolean;
  loading?: boolean;
  list?: {
    seen: boolean;
    _id: string;
    author: {
      coverImage?: string;
      fullName: string;
      _id: string;
    };
    createdAt: string;
    follow?: {
      user: string;
      _id: string;
    };
    like?: {
      _id: string;
      post: {
        title: string;
      };
    };
    user: {
      coverImage?: string;
      _id: string;
      following: string[];
    };
  }[];
  update?: boolean;
  listLength?: number;
  seenUpdate?: (i: boolean) => void;
  getNotificationList?: () => void;
  isSeen?: () => void;
  createNotifications?: ({
    notiType,
    notiTypeId,
    userId,
    postId,
  }: {
    notiType: string;
    notiTypeId: string;
    userId: string;
    postId: null | string;
  }) => void;
  isNseenList?: () => void;
};

// 채팅내역 타입입
export interface conversationsUserType {
  _id: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: string[];
  likes: string[];
  comments: string[];
  followers: string[];
  following: string[];
  notifications: string[];
  messages: string[];
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
  imagePublicId: string;
  username: string;
}
export interface conversationsType {
  _id: string;
  message: string;
  createdAt: string;
  sender: conversationsUserType;
  receiver: conversationsUserType;
  seen: boolean;
}
