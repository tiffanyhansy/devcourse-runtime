import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import { Post_T } from "../../api/api";
import { usePostStore } from "../../store/postStore";
import PostPreview from "../../components/Community/PostPreview";
import ChannelButton from "../../components/Community/ChannelButton";
import Skeleton from "../../components/Community/Skeleton";
import { t } from "i18next";
type ChannelId_T = "sw" | "si" | "da" | "ge";

type Props = {
  channelName?: ChannelId_T;
};

export default function Community({ channelName = "sw" }: Props) {
  const [posts, setPosts] = useState<Post_T[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState<ChannelId_T>(channelName);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const fetchChannels = usePostStore((state) => state.fetchChannels);
  const channels = usePostStore((state) => state.channels);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      if (channels.length === 0) await fetchChannels();

      const currentChannel = channels.find(
        (channel) => channel.name.toLowerCase() === activeChannel
      );

      if (currentChannel) {
        try {
          const response = await axiosInstance.get(
            `/posts/channel/${currentChannel._id}`
          );
          setPosts(response.data);
        } catch (err) {
          console.error("Error fetching posts:", err);
          setPosts([]);
        }
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeChannel, channels]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/auth-user");
        const { fullName } = response.data;
        setCurrentUser(fullName);
      } catch (error) {
        console.error("현재 사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <main className=" mt-[80px] overflow-y-auto">
      <nav className="flex items-center py-3 text-lg">
        <ChannelButton
          title={t("소프트웨어 개발")}
          link="/community/sw"
          label="SW"
          isActive={activeChannel === "sw"}
          onClick={() => setActiveChannel("sw")}
        />
        <ChannelButton
          title={t("시스템/인프라")}
          link="/community/si"
          label="SI"
          isActive={activeChannel === "si"}
          onClick={() => setActiveChannel("si")}
        />
        <ChannelButton
          title={t("데이터/AI 개발")}
          link="/community/da"
          label="DA"
          isActive={activeChannel === "da"}
          onClick={() => setActiveChannel("da")}
        />
        <ChannelButton
          title={t("게임/QA")}
          link="/community/ge"
          label="GE"
          isActive={activeChannel === "ge"}
          onClick={() => setActiveChannel("ge")}
        />
      </nav>

      <section className="grid gap-9 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-8 mb-6">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostPreview
              preview={post}
              currentUser={currentUser || t("알 수 없음")}
            />
          ))
        ) : (
          <div>{t("게시글이 없습니다")}</div>
        )}
      </section>
    </main>
  );
}
