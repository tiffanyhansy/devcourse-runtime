import { create } from "zustand";
import { axiosInstance } from "../api/axios";

// 댓글 타입 정의
interface Comment {
  _id: string;
  comment: string;
  author: {
    fullName: string;
  };
  createdAt: string;
  post: string;
}

// 게시물 타입 정의
interface Post_T {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
  likes: Like[];
  isLiked: boolean;
}

interface Like {
  _id: string;
  user: string; // 사용자의 ID
  post: string; // 게시물의 ID
  createdAt: string;
  updatedAt: string;
}

type Channel = {
  _id: string; // 채널 ID
  name: string; // 채널 이름
};

// Zustand 스토어 타입 정의
export interface CommentStore {
  posts: Post_T[]; // 게시물 목록
  selectedPostId: string | null;
  channels: Channel[];
  currentUser: string | null;
  currentUserId: string | null;
  currentPostId: string | null;
  currentComments: Comment[]; // 현재 게시물의 댓글 목록
  isFetching: boolean;
  activeChannel: string | null;
  isLoading: boolean;

  fetchPosts: () => Promise<void>;
  addCommentToPost: (postId: string, comment: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  toggleLike: (postId: string, currentUserId: string) => Promise<void>; // 좋아요 토글
  deletePost: (postId: string) => Promise<boolean>;
  updatePosts: (updatedPosts: Post_T[]) => void;
  setActiveChannel: (channelName: string) => void;
  fetchChannels: () => Promise<void>;
  fetchPostsByChannel: (channelName: string) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  posts: [],
  currentComments: [],
  channels: [],
  currentUserId: null,
  selectedPostId: null,
  currentPostId: null,
  isFetching: false,
  currentUser: null,
  isLoading: false,

  activeChannel: null as string | null,

  // 상태 업데이트 메서드 추가
  updatePosts: (updatedPosts: Post_T[]) => set({ posts: updatedPosts }),

  // 채널 정보 가져오기
  fetchChannels: async () => {
    const { channels } = get();
    // 이미 채널이 로드된 경우 추가 호출 방지
    if (channels.length > 0) return;
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/channels`
      );
      set({ channels: response.data });
    } catch (error) {
      console.error("채널 데이터를 가져오는 중 오류 발생:", error);
      set({ channels: [] });
    }
  },

  fetchCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("/auth-user");

      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  },

  //채널 게시글 요청, id찾기
  fetchPostsByChannel: async (channelName: string) => {
    const { channels } = get();
    set({ isLoading: true });
    if (channels.length === 0) await get().fetchChannels();

    // 채널 정보를 다시 가져온 후 검색
    const updatedChannels = get().channels;
    const currentChannel = updatedChannels.find(
      (channel) => channel.name.toLowerCase() === channelName.toLowerCase()
    );

    if (currentChannel) {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}/posts/channel/${currentChannel._id}`
        );
        set({
          posts: response.data.map((post: any) => ({
            ...post,
            isLiked: post.isLiked || false, // 서버 데이터 기반 설정
          })),
        });
      } catch (error) {
        console.error("채널 게시물 데이터를 가져오는 중 오류 발생:", error);
        set({ posts: [] });
      }
    }
    set({ isLoading: false });
  },

  // 활성 채널 변경
  setActiveChannel: (channelName: string) => {
    const { activeChannel } = get();

    // 채널 변경 시에만 업데이트
    if (activeChannel !== channelName) {
      set({ activeChannel: channelName });
    }
  },

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

  // 게시물 삭제
  deletePost: async (postId: string) => {
    try {
      console.log("삭제 요청 게시물 ID:", postId);

      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/posts/delete`,
        {
          data: { id: postId }, // 서버로 게시물 ID 전송
        }
      );

      if (response.status === 200) {
        // 상태에서 게시물 제거
        const updatedPosts = get().posts.filter((post) => post._id !== postId);
        set({ posts: updatedPosts });

        console.log("게시물 삭제 성공:", response.data);
        return true;
      } else {
        console.error("삭제 실패:", response.data);
        return false;
      }
    } catch (error) {
      console.error("게시물 삭제 요청 실패:", error);
      return false;
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
        await axiosInstance.delete(
          `${import.meta.env.VITE_API_URL}/likes/delete`,
          {
            data: { id: likeId },
            headers: { "Content-Type": "application/json" },
          }
        );

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
      likeLoading = false;
    }
  },
}));
