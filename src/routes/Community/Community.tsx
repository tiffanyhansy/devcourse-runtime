import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import { Post_T } from "../../api/api";
import { usePostStore } from "../../store/postStore";
import PostPreview from "../../components/Community/PostPreview";
import ChannelButton from "../../components/Community/ChannelButton";
import Skeleton from "../../components/Community/Skeleton";
import { Tooltip } from "@mui/material";
import { Link } from "react-router";
type ChannelId_T = "sw" | "si" | "da" | "ge";

type Props = {
  channelName?: ChannelId_T;
};

export default function Community({ channelName = "sw" }: Props) {
  const [posts, setPosts] = useState<Post_T[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState<ChannelId_T>(channelName);

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

  return (
    <>
      <nav className="mt-[80px] flex py-3 items-center text-lg ">
        <Tooltip title="소프트웨어 개발" arrow>
          <div className="mr-4 text-white bg-[#7EACB5] hover:bg-black hover:text-white transition-colors font-bold px-3 py-1 rounded-[10px] w-16 text-center opacity-80 ">
            <Link to="/community/sw">SW</Link>
          </div>
        </Tooltip>
        <Tooltip title="시스템/인프라" arrow>
          <div className="mr-4 text-white bg-[#7EACB5] hover:bg-black hover:text-white transition-colors font-bold px-3 py-1 rounded-[10px] w-16 text-center opacity-80">
            <Link to="/community/si">SI</Link>
          </div>
        </Tooltip>
        <Tooltip title="데이터/AI 개발" arrow>
          <div className="mr-4 text-white bg-[#7EACB5] hover:bg-black hover:text-white transition-colors font-bold px-3 py-1 rounded-[10px] w-16 text-center opacity-80">
            <Link to="/community/da">DA</Link>
          </div>
        </Tooltip>
        <Tooltip title="게임/QA" arrow>
          <div className="text-white bg-[#7EACB5] hover:bg-black hover:text-white transition-colors font-bold px-3 py-1 rounded-[10px] w-16 text-center opacity-80">
            <Link to="/community/ge">GE</Link>
          </div>
        </Tooltip>
      </nav>
      <main className="grid gap-9 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-8 mb-6">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)
        ) : posts.length > 0 ? (
          posts.map((post) => <PostPreview preview={post} key={post._id} />)
        ) : (
          <div>게시글이 없습니다</div>
        )}
      </main>
    </>
  );
}
