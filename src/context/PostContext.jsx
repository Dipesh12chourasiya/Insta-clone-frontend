import { createContext, useContext, useState } from "react";
import {
  getFeed,
  likePost,
  unlikePost,
  addComment,
  getPostById,
} from "../api/Services";

const PostContext = createContext();

export const usePost = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Fetch feed
  const fetchFeed = async () => {
    setLoading(true);
    try {
      const res = await getFeed();
      setPosts(res.data || []);
    } catch (err) {
      console.error("Feed error", err);
    } finally {
      setLoading(false);
    }
  };

  //  Fetch single post
  const fetchSinglePost = async (postId) => {
    const res = await getPostById(postId);
    return res.data;
  };

  //  Like / Unlike (Optimistic)
  const toggleLike = async (postId, userId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id !== postId) return post;

        const isLiked = post.likes?.includes(userId);

        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((id) => id !== userId)
            : [...(post.likes || []), userId],
        };
      })
    );

    try {
      const post = posts.find((p) => p._id === postId);
      if (post?.likes?.includes(userId)) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (error) {
      console.error("Like error", error);
    }
  };

  //  Add Comment (NO refresh)
const addNewComment = async (postId, text) => {
  try {
    const res = await addComment(postId, text); // API call

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [
                ...(Array.isArray(post.comments) ? post.comments : []),
                res.data.comment || res.data,
              ],
            }
          : post
      )
    );
  } catch (error) {
    console.error("Add comment error:", error);
  }
};


  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        fetchFeed,
        fetchSinglePost,
        toggleLike,
        addNewComment,
        setPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
