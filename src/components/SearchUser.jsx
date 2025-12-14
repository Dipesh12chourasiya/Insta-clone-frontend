import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers, followUser, unfollowUser } from "../api/Services";
import { getUser } from "../utils/token";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedInUser = getUser();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      setLoading(true);
      const res = await searchUsers(query);
      setResults(res.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (user) => {
    try {
      if (user.followers.includes(loggedInUser.id)) {
        await unfollowUser(user._id);
        user.followers = user.followers.filter(f => f !== loggedInUser.id);
      } else {
        await followUser(user._id);
        user.followers.push(loggedInUser.id);
      }
      setResults([...results]); // Refresh UI
    } catch (error) {
      console.error("Follow/unfollow error:", error);
    }
  };

  const goToProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="flex-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>

      {loading && <p>Searching...</p>}

      <div className="space-y-2">
        {results.length === 0 && !loading && <p>No users found.</p>}

        {results.map((user) => {
          const isFollowing = user.followers.includes(loggedInUser.id);
          return (
            <div
              key={user._id}
              className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => goToProfile(user._id)} // Navigate to profile
            >
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchUser;
