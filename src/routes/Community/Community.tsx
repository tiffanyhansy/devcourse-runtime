import React, { useEffect, useState } from "react";
import axios from "axios";
import PostPreview from "../../components/Community/PostPreview";
import { Link } from "react-router";
import { axiosInstance } from "../../api/axios";
import { Post_T } from "../../type/Post";

const channel_id: Record<ChannelId_T, string> = {
  sw: "675aa3f8d3266e29a57e4c61", // real
  si: "675aa3f8d3266e29a57e4c61",
  da: "675aa3f8d3266e29a57e4c61",
  ge: "",
};
type ChannelId_T = "sw" | "si" | "da" | "ge";

type Props = {
  channelName?: ChannelId_T;
};

export default function Community({ channelName = "sw" }: Props) {
  const [posts, setPosts] = useState<Post_T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(
          `/posts/channel/${channel_id[channelName]}`
        );
        response.data.
        setPosts(response.data);
      } catch (err) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [channelName]);

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
