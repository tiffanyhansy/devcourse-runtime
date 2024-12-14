import { create } from "zustand";
import { axiosInstance } from "../api/axios";

interface PostStore {
  channels: { _id: string; name: string; description: string }[];
  channelId: string | null; // 선택된 채널 ID

  isLoading: boolean; // 로딩 상태
  error: string | null; // 에러 메시지
  setSelectedChannelId: (id: string) => void;
  fetchChannels: () => Promise<void>; // 채널 리스트 GET 요청
  post: (title: string, content: string, channelId: string) => Promise<boolean>; // POST 요청
}

export const usePostStore = create<PostStore>((set) => ({
  channels: [],
  channelId: null,
  isLoading: false,
  error: null,

  // 선택된 채널 ID 업데이트
  setSelectedChannelId: (id: string) => set({ channelId: id }),

  // 채널 리스트 GET 요청
  fetchChannels: async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/channels`
      );

      if (response.data && response.data.length > 0) {
        set({ channels: response.data }); // 채널 리스트 저장
        set({ channelId: response.data[0]._id }); // 첫 번째 채널을 기본 선택
        console.log("Fetched channels:", response.data);
      }
    } catch (error) {
      console.error("Error fetching channels:", error);
      set({ error: "채널 리스트 가져오기 실패" });
    }
  },

  post: async (title: string, content: string, channelId: string) => {
    set({ isLoading: true, error: null });
    try {
      //JSON 문자열로 변환해서 title로 넣기
      const combinedTitle = JSON.stringify({ title, content });
      //디버깅
      console.log("디버깅 체크", title, content, combinedTitle);

      const payload = {
        title: combinedTitle, // 묶은 데이터를 title 필드로 전송
        channelId, // 선택된 채널 ID 포함
      };

      //axiosInstance 사용하기
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/posts/create`,
        payload
      );
      //성공
      console.log("Posting success:", response.data);
      //임시 여기 이쁘게 바꿔보기.
      alert("Post submitted successfully!");
      return true;
    } catch (error: any) {
      console.error("Posting Error:", error);
      set({ error: error.message });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
