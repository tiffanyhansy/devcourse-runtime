import { useEffect, useState } from "react";
import PostPreview from "../../components/Community/PostPreview";
import { Link } from "react-router";
import { axiosInstance } from "../../api/axios";
import { Post_T } from "../../api/api";
import { usePostStore } from "../../store/postStore";

type ChannelId_T = "sw" | "si" | "da" | "ge";

type Props = {
  channelName?: ChannelId_T;
};

export default function Community({ channelName = "sw" }: Props) {
  const [posts, setPosts] = useState<Post_T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChannels = usePostStore((state) => state.fetchChannels); // fetchChannels 가져오기
  const channels = usePostStore((state) => state.channels); // 채널 리스트 가져오기

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      // 채널 리스트 비어있을 때 가져오기
      if (channels.length === 0) {
        await fetchChannels();
      }

      // 현재 채널 이름에 해당하는 ID 찾기
      const currentChannel = channels.find(
        (channel) => channel.name.toLowerCase() === channelName
      );

      if (currentChannel) {
        try {
          const response = await axiosInstance.get(
            `/posts/channel/${currentChannel._id}`
          );
          setPosts(response.data); // 게시글 데이터 저장
        } catch (err) {
          console.error("Error fetching posts:", err);
          setPosts([]);
        }
      } else {
        setPosts([]);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [channelName, channels]);

  console.log(posts);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <nav className="mt-[80px] flex py-3 items-center ">
        <div className="mr-4">
          <Link to="/community/sw">SW</Link>
        </div>
        <div className="mr-4">
          <Link to="/community/si">SI</Link>
        </div>
        <div className="mr-4">
          <Link to="/community/da">DA</Link>
        </div>
        <div className="">
          <Link to="/community/ge">GE</Link>
        </div>
      </nav>
      <main className="grid gap-9 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-8 ">
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostPreview preview={post} key={post._id} />)
        ) : (
          <div>게시글이 없습니다</div>
        )}
      </main>
    </>
  );
}