import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${post.user._id}`);
  };

  return (
    <div className="w-full bg-white md:border md:rounded-xl md:shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 p-3 border-b cursor-pointer"
        onClick={goToProfile}
      >
        <span className="font-semibold text-sm">{post.user.username}</span>
      </div>

      {/* Image */}
      <div className="w-full bg-black flex justify-center">
        <img
          src={post.imageUrl}
          alt="post"
          className="w-full max-h-[500px] object-cover"
        />
      </div>

      {/* Likes & Caption */}
      <div className="p-3">
        <LikeButton post={post} />
        <p className="mt-2 text-sm">
          <span className="font-semibold mr-1">{post.user.username}</span>
          {post.caption}
        </p>
      </div>

      {/* Comments */}
      <div className="px-3 max-h-40 overflow-y-auto">
        <CommentList post={post} />
      </div>

      {/* Add Comment */}
      <div className="border-t p-3">
        <CommentForm postId={post._id} />
      </div>
    </div>
  );
};

export default PostCard;
