import { useEffect, useState } from "react";
import { useCommentStore } from "../../store/comment";
import PostPreview from "../../components/Community/PostPreview";
import ChannelButton from "../../components/Community/ChannelButton";
import Skeleton from "../../components/Community/Skeleton";
import { t } from "i18next";
import axiosInstance from "axios";
import { Post_T } from "../../api/api";

type ChannelId_T = "sw" | "si" | "da" | "ge";

type Props = {
  channelName?: ChannelId_T;
};

// 디버깅 추가
export default function Community({ channelName = "sw" }: Props) {
  const [loading, setLoading] = useState(false);
  const [activeChannel, setActiveChannel] = useState<ChannelId_T>(channelName);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const {
    posts: zustandPosts,
    fetchChannels,
    fetchPostsByChannel,
  } = useCommentStore();

  // 초기화 로직
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // 채널 데이터 로드
        await fetchChannels();
        // 현재 채널 게시물 로드
        if (activeChannel) {
          await fetchPostsByChannel(activeChannel);
        }
      } catch (error) {
        console.error("초기화 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, [activeChannel]); // 초기화는 한 번만 실행

  // 채널 변경 감지 및 데이터 로드
  useEffect(() => {
    const fetchDataForChannel = async () => {
      setLoading(true); // 로딩 시작
      try {
        await fetchPostsByChannel(activeChannel); // 채널 데이터 로드
      } catch (error) {
        console.error("채널 게시물 로드 실패:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    if (activeChannel) {
      fetchDataForChannel(); // 채널이 있을 때만 호출
    }
  }, [activeChannel]); // activeChannel 변경 시 실행

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/auth-user");
        const { fullName } = response.data;
        setCurrentUser(fullName);
      } catch (error) {}
    };

    fetchCurrentUser();
  }, []);

  return (
    <main className="mt-[80px] overflow-y-auto">
      <nav className="flex items-center py-3 text-lg">
        <ChannelButton
          title={t("소프트웨어 개발")}
          link="/community/"
          label="SW"
          isActive={activeChannel === "sw"}
          onClick={() => {
            setActiveChannel("sw");
          }}
        />
        <ChannelButton
          title={t("시스템/인프라")}
          link="/community/"
          label="SI"
          isActive={activeChannel === "si"}
          onClick={() => {
            setActiveChannel("si");
          }}
        />
        <ChannelButton
          title={t("데이터/AI 개발")}
          link="/community/"
          label="DA"
          isActive={activeChannel === "da"}
          onClick={() => {
            setActiveChannel("da");
          }}
        />
        <ChannelButton
          title={t("게임/QA")}
          link="/community/"
          label="GE"
          isActive={activeChannel === "ge"}
          onClick={() => {
            setActiveChannel("ge");
          }}
        />
      </nav>

      <section className="grid gap-9 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-8 mb-6">
        {loading ? (
          // 로딩 중일 때 항상 스켈레톤 표시
          Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)
        ) : zustandPosts.length > 0 ? (
          // 로딩이 끝난 후 게시글이 있는 경우
          zustandPosts.map((post) => (
            <PostPreview
              preview={post as unknown as Post_T}
              currentUser={currentUser || t("알 수 없음")}
              key={post._id}
            />
          ))
        ) : (
          // 로딩이 끝났지만 게시글이 없는 경우
          <div>{t("게시글이 없습니다")}</div>
        )}
      </section>
    </main>
  );
}
