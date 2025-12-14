import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, followUser, unfollowUser } from "../../api/Services";
import { getUser } from "../../utils/token";
import PostCard from "../../components/post/PostCard";
import PostGridItem from "./PostGridItem";

const Profile = () => {
  const { userId } = useParams();
  const loggedInUser = getUser();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getUserProfile(userId);

      setUser(res.data.user);
      setPosts(res.data.posts);
      setIsFollowing(res.data.isFollowing);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">User not found</p>;
  }

  const isOwnProfile = loggedInUser?._id === user._id;

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 py-6 border-b">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h2 className="text-2xl font-semibold">{user.username}</h2>

            {!isOwnProfile && (
              <button
                onClick={handleFollowToggle}
                className={`px-5 py-1.5 rounded text-sm font-medium ${
                  isFollowing
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-600 text-white"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>

          <div className="flex justify-center sm:justify-start gap-6 mt-4 text-sm">
            <span>
              <strong>{posts.length}</strong> posts
            </span>
            <span>
              <strong>{user.followers.length}</strong> followers
            </span>
            <span>
              <strong>{user.following.length}</strong> following
            </span>
          </div>

          <p className="text-gray-600 mt-2">{user.email}</p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mt-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-1">
            {posts.map((post) => (
              <PostGridItem key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
