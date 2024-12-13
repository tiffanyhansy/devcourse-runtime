import { create } from "zustand";
import axios from "axios";

interface PostStore {
  post: (title: string, content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const usePostStore = create<PostStore>((set) => ({
  isLoading: false,
  error: null,
  post: async (title, content) => {
    set({ isLoading: true, error: null });
    try {
      //JSON 문자열로 변환해서 title로 넣기
      const combinedTitle = JSON.stringify({ title, content });
      //디버깅
      console.log("디버깅 체크", title, content);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/create`,
        {
          title: combinedTitle,
        }
      );
      console.log("Post successful:", response.data);
      alert("Post submitted successfully!");
    } catch (error: any) {
      console.error("Error posting data:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
