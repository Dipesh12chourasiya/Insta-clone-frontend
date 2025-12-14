import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../components/post/PostCard";
import CommentList from "../../components/post/CommentList";
import CommentForm from "../../components/post/CommentForm";
import { usePost } from "../../context/PostContext";

const PostDetail = () => {
  const { postId } = useParams();
  const { posts, fetchSinglePost, toggleLike, addNewComment } = usePost();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const existingPost = posts.find((p) => p._id === postId);
    if (existingPost) {
      setPost(existingPost);
    } else {
      fetchSinglePost(postId).then((data) => setPost(data));
    }
  }, [postId, posts]);

  useEffect(() => {
    const updatedPost = posts.find((p) => p._id === postId);
    if (updatedPost) setPost(updatedPost);
  }, [posts, postId]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* left image */}
        <div className="bg-black flex items-center justify-center">
          <PostCard
            post={post}
            onLike={() => toggleLike(post._id, "currentUserId")}
          />
        </div>

        {/* right side comment list */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 border-b">
            <CommentList comments={post.comments || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
