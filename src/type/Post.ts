export type Post_T = {
  _id: string;
  author: Author_T;
  comments: Comments_T[];
  createdAt: string;
  updatedAt: string;
  likes: Likes_T[];
  title: string;
};

type Author_T = {
  fullName: string;
  // 프사 없음
};

type Comments_T = {
  // 뭔지 모름
};

type Likes_T = {};
