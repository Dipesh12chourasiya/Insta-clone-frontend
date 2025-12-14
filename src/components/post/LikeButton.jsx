import { usePost } from "../../context/PostContext";
import { getUser } from "../../utils/token";

const LikeButton = ({ post }) => {
  const { toggleLike } = usePost();
  const user = getUser();

  const liked = post.likes.includes(user._id);

  return (
    <button
      onClick={() => toggleLike(post._id, user._id)}
      className="flex items-center gap-2"
    >
      <span className={liked ? "text-red-500" : "text-gray-400"}>
        {liked ? "❤️" : "🤍"}
      </span>
      <span>{post.likes.length}</span>
    </button>
  );
};

export default LikeButton;
