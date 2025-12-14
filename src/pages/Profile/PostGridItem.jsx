import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaComment } from "react-icons/fa";
import { usePost } from "../../context/PostContext";

const PostGridItem = ({ post }) => {
  const navigate = useNavigate();
  const { posts } = usePost(); // context posts, reactive for detail page

  // Navigate to PostDetail
  const goToPostDetail = () => {
    navigate(`/post/${post._id}`);
  };

  // Get latest post data from context (optional, ensures state sync)
  const updatedPost = posts.find((p) => p._id === post._id) || post;

  return (
    <div
      onClick={goToPostDetail}
      className="relative aspect-square cursor-pointer group bg-gray-100 overflow-hidden rounded-md"
    >
      {/* Post Image */}
      <img
        src={updatedPost.imageUrl}
        alt="post"
        className="w-full h-full object-cover"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white text-sm font-semibold">
        <div className="flex items-center gap-1">
          <FaHeart />
          {updatedPost.likes?.length || 0}
        </div>
        <div className="flex items-center gap-1">
          <FaComment />
          {updatedPost.comments?.length || 0}
        </div>
      </div>
    </div>
  );
};

export default PostGridItem;
