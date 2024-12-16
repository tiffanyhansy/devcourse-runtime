import { useEffect, useState } from "react";
import PostPreview from "../../components/Community/PostPreview";
import { Link } from "react-router";
import { axiosInstance } from "../../api/axios";
import { Post_T } from "../../type/Post";
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
      <nav className="mt-[80px] flex">
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
      <main className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(310px,1fr))] ">
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostPreview preview={post} key={post._id} />)
        ) : (
          <div>게시글이 없습니다</div>
        )}
      </main>
    </>
  );
}

// const ChannelList: React.FC = () => {
//   const [channels, setChannels] = useState<Channel[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

// fetchChannels(si)
// fetchChannels(nd)

//   const fetchChannels = async (id) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get<Channel[]>("/api/channels/${id}"); // Replace with your API endpoint
//       setChannels(response.data);
//     } catch (err) {
//       setError("Failed to load channels.");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChannels();
//   }, []);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//btn
//       {channels.map((channel) => (
//         <PostPreview
//           key={channel.id}
//           id={channel.id}
//           title={channel.title}
//           author={channel.author}
//           thumbnail={channel.thumbnail}
//           subscribers={channel.subscribers}
//         />
//       ))}
//     </div>
//   );
// };

// export default ChannelList;
