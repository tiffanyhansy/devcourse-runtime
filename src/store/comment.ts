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
  likes: Like[]; // 좋아요 ID 배열
  isLiked: boolean; // 좋아요 상태
}

interface Like {
  _id: string;
  user: string; // 사용자의 ID
  post: string; // 게시물의 ID
  createdAt: string;
  updatedAt: string;
}

// Zustand 스토어 타입 정의
interface CommentStore {
  posts: Post[]; // 게시물 목록
  selectedPostId: string | null;
  currentUserId: string | null;
  currentPostId: string | null;
  currentComments: Comment[]; // 현재 게시물의 댓글 목록
  fetchPosts: () => Promise<void>;
  addCommentToPost: (postId: string, comment: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  toggleLike: (postId: string, currentUserId: string) => Promise<void>; // 좋아요 토글
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  posts: [],
  currentUserId: null,
  selectedPostId: null,
  currentPostId: null,
  currentComments: [],

  // 특정 포스트 상세 보기
  fetchPosts: async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/posts`
      );

      // 상태 업데이트
      set({
        posts: response.data.map((post: any) => ({
          ...post,
          isLiked: false, // 초기 좋아요 상태 설정
        })),
      });
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

      // 특정 게시글의 comments 배열만 업데이트
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? // 최신순으로 정렬
              { ...post, comments: [response.data, ...post.comments] }
            : post
        ),
      }));
    } catch (error) {
      console.error("댓글 추가 실패:", error);
      throw error;
    }
  },

  // DELETE 요청 보내기
  deleteComment: async (commentId: string) => {
    try {
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

  // 좋아요 토글
  toggleLike: async (postId: string) => {
    const { posts } = get();
    const post = posts.find((p) => p._id === postId); // postId로 게시물 찾기

    if (!post) {
      console.error("게시물을 찾을 수 없습니다.");
      return;
    }

    try {
      // 좋아요 취소
      if (post.isLiked && post.likes.length > 0) {
        const likeId = post.likes[post.likes.length - 1]._id; // 최근에 추가된 좋아요 ID 가져오기
        await axiosInstance.delete(
          `${import.meta.env.VITE_API_URL}/likes/delete`,
          {
            data: { id: likeId }, // likeId만 전달
            headers: { "Content-Type": "application/json" },
          }
        );

        // 상태 업데이트
        set({
          posts: posts.map((p) =>
            p._id === postId
              ? {
                  ...p,
                  isLiked: false,
                  likes: p.likes.filter((like) => like._id !== likeId),
                }
              : p
          ),
        });

        console.log(`좋아요 취소 성공: id=${likeId}`);
      } else {
        // 좋아요 추가
        const response = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/likes/create`,
          { postId },
          { headers: { "Content-Type": "application/json" } }
        );

        const newLike = response.data; // 서버가 반환한 좋아요 ID
        if (newLike && newLike._id) {
          set({
            posts: posts.map((p) =>
              p._id === postId
                ? {
                    ...p,
                    isLiked: true,
                    likes: [...p.likes, newLike],
                  }
                : p
            ),
          });

          console.log(`좋아요 추가 성공: id=${newLike._id}`);
        } else {
          console.error("좋아요 ID 생성 실패");
        }
      }
    } catch (error) {
      console.error("좋아요 토글 실패:", error);
    }
  },
}));
