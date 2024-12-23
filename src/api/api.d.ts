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
  author: Author_T; // 작성자 정보
  comments: PostComment[]; // 댓글 목록
  createdAt: string; // 생성 날짜
  updatedAt: string; // 수정 날짜
  likes: string[]; // 좋아요를 누른 사용자 ID 배열
  title: string; // 제목 (JSON 형태로 문자열)
  image: string; // 게시물 이미지
  imageUrl?: string; // 선택적으로 제공되는 이미지 URL
  channel: Channel; // 게시물이 속한 채널 정보
}
interface Title {
  title: string;
  content: string;
}

export interface Channel {
  _id: string;
  name: string;
  authRequired: boolean;
  posts: Post_T[];
  description?: string;
}

export type Author_T = {
  fullName?: string;
  image?: string;
  name?: string;
  _id: string;
  role?: string;
  emailVerified?: boolean;
  banned?: boolean;
  isOnline?: boolean;
};

export interface PostComment {
  _id: string; // 댓글 ID
  author: Author_T; // 댓글 작성자 정보
  comment: string; // 댓글 내용
  createdAt: string; // 댓글 작성 시간
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
  likeStates?: {
    [id: string]: {
      isLiked: boolean;
      userId: string;
      myId?: string;
    };
  };
  updateLikeState?: (
    userId: string,
    id: string,
    isLiked: boolean,
    myId?: string
  ) => void;
  imgState?: boolean;
  loading?: boolean;
  list?: {
    post?: string;
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
