import { create } from "zustand";
import { axiosInstance } from "../api/axios";

// 게시물 타입 정의
interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  isLiked: boolean; // 사용자가 좋아요를 눌렀는지 여부
}

// 상태 타입 정의
interface LikePostState {
  postLike: Post[]; // 게시물 리스트 (변수명을 postLike로 변경)
  isLoading: boolean; // 로딩 상태
  error: string | null; // 오류 메시지
  fetchPosts: () => Promise<void>; // 게시물 가져오기
  toggleLike: (postId: string) => Promise<void>; // 좋아요/취소 토글
}

const useLikePostStore = create<LikePostState>((set, get) => ({
  postLike: [], // posts를 postLike로 변경
  isLoading: false,
  error: null,

  // 게시물 가져오기
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/posts`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ postLike: response.data, isLoading: false }); // posts -> postLike
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "게시물 로드 실패",
      });
    }
  },

  // 좋아요/취소 토글
  toggleLike: async (postId: string) => {
    const { posts } = get();
    const post = posts.find((p) => p._id === postId);
    if (!post) return;
  
    const isLiked = post.isLiked;
  
    try {
      if (isLiked) {
        // 좋아요 취소 요청
        console.log("좋아요 취소 요청:", { postId });
        await axiosInstance.delete(
          `${import.meta.env.VITE_API_URL}/likes/delete`,
          {
            headers: { "Content-Type": "application/json" },
            data: { postId }, // DELETE 요청에서 데이터 전달
          }
        );
        set({
          posts: posts.map((p) =>
            p._id === postId ? { ...p, likes: p.likes - 1, isLiked: false } : p
          ),
        });
      } else {
        // 좋아요 추가 요청
        console.log("좋아요 요청:", { postId });
        await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/likes/create`,
          { postId },
          { headers: { "Content-Type": "application/json" } }
        );
        set({
          posts: posts.map((p) =>
            p._id === postId ? { ...p, likes: p.likes + 1, isLiked: true } : p
          ),
        });
      }
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
    }
  };
  
}));

export default useLikePostStore;
