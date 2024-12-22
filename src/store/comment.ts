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
interface Post_T {
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
  posts: Post_T[]; // 게시물 목록
  selectedPostId: string | null;
  currentUserId: string | null;
  currentPostId: string | null;
  currentComments: Comment[]; // 현재 게시물의 댓글 목록
  isFetching: boolean;
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
  isFetching: false,

  // 특정 포스트 상세 보기
  fetchPosts: async () => {
    if (get().isFetching) return; //중복 방지
    set({ isFetching: true }); //요청 상태 설정
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/posts`
      );

      //상태 업데이트
      set({
        posts: response.data.map((post: any) => ({
          ...post,
          isLiked: post.isLiked || false, // 서버 데이터 기반 설정
        })),
        isFetching: false, //요청 종료
      });
    } catch (error) {
      set({ isFetching: false }); //요청 종료
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
    let likeLoading = false;
    const { posts } = get();
    const post = posts.find((p) => p._id === postId); // postId로 게시물 찾기

    if (!post) {
      console.error("게시물을 찾을 수 없습니다.");
      return;
    }

    if (likeLoading) return;
    likeLoading = true;

    try {
      if (post.isLiked && post.likes.length > 0) {
        // 최근에 눌렀던 좋아요 ID 가져오기
        const likeId = post.likes[post.likes.length - 1]?._id;

        // 좋아요 ID가 없을 경우 처리
        if (!likeId) {
          console.error("좋아요 ID를 찾을 수 없습니다.");
          return;
        }

        // 좋아요 삭제 요청
        const response = await axiosInstance.delete(
          `${import.meta.env.VITE_API_URL}/likes/delete`,
          {
            data: { id: likeId },
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          console.log("좋아요 취소 성공", response.data);
        }

        // 상태 업데이트
        set((state) => ({
          posts: state.posts.map((currentPost) =>
            currentPost._id === postId
              ? {
                  ...currentPost,
                  isLiked: false,
                  likes: currentPost.likes.filter(
                    (like) => like._id !== likeId
                  ),
                }
              : currentPost
          ),
        }));
      } else {
        // 좋아요 추가 요청
        const response = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/likes/create`,
          { postId },
          { headers: { "Content-Type": "application/json" } }
        );

        //post 상태 업데이트
        const newLike = response.data;

        set((state) => ({
          posts: state.posts.map((currentPost) =>
            currentPost._id === postId
              ? {
                  ...currentPost,
                  isLiked: true,
                  likes: [...currentPost.likes, newLike],
                }
              : currentPost
          ),
        }));
      }
    } catch (error) {
      console.error("잘못된 접근", error);
    } finally {
      likeLoading = false; //요청완료
    }
  },
}));
