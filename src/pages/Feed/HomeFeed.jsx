import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../context/PostContext";
import PostCard from "../../components/post/PostCard";

const HomeFeed = () => {
  const { posts, loading, fetchFeed } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No posts yet.
        </p>
      )}

      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => navigate(`/post/${post._id}`)}
          className="cursor-pointer"
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;
