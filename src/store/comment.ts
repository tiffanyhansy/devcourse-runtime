import { create } from "zustand";
import { axiosInstance } from "../api/axios";

// 댓글 타입 정의
interface Comment {
  _id: string;
  comment: string; // 댓글 내용
  author: {
    fullName: string; // 작성자 이름
  };
  createdAt: string; // 작성 날짜
  post: string; // 댓글이 속한 게시물 ID
}

// 게시물 타입 정의
interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[]; // 댓글 목록
}

// Zustand 스토어 타입 정의
interface CommentStore {
  posts: Post[]; // 게시물 목록
  selectedPostId: string | null; // 현재 선택된 게시물 ID
  currentPostId: string | null; // 현재 선택된 게시물 ID
  currentComments: Comment[]; // 현재 게시물의 댓글 목록
  fetchPosts: () => Promise<void>; // 게시물 목록 가져오기
  addCommentToPost: (postId: string, comment: string) => Promise<void>; // 댓글 추가
  deleteComment: (commentId: string) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  posts: [],
  selectedPostId: null,
  currentPostId: null,
  currentComments: [],

  // 특정 포스트 상세 보기
  fetchPosts: async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/posts`
      );
      const posts = response.data.map((post: any) => ({
        ...post,
        comments: post.comments || [], // 댓글 데이터 초기화
      }));
      set({ posts });
    } catch (error) {
      console.error("게시물 목록 가져오기 실패:", error);
    }
  },

  // 게시물에 댓글 추가

  addCommentToPost: async (postId: string, comment: string) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/comments/create`,
        { postId, comment },
        { headers: { "Content-Type": "application/json" } }
      );

      const newComment = response.data;

      // 특정 게시글의 comments 배열만 업데이트
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? //최신순으로 정렬
              { ...post, comments: [response.data, ...post.comments] }
            : post
        ),
      }));
    } catch (error) {
      console.error("댓글 추가 실패:", error);
      throw error;
    }
  },

  deleteComment: async (commentId: string) => {
    try {
      // DELETE 요청 보내기
      await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/comments/delete`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: { id: commentId }, // commentId를 id 필드로 전달
        }
      );

      // 상태 업데이트
      set((state) => ({
        posts: state.posts.map((post) => ({
          ...post,
          comments: post.comments.filter(
            (comment) => comment._id !== commentId
          ),
        })),
      }));

      console.log("댓글 삭제 성공");
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      throw error;
    }
  },
}));
