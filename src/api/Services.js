import axios from "axios";
import { API_BASE_URL } from "../config";
import { getToken } from "../utils/token";

// Axios instance
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = getToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// AUTH ke APIs
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// user ka APIs
export const followUser = (userId) => API.post(`/users/follow/${userId}`);
export const unfollowUser = (userId) => API.post(`/users/unfollow/${userId}`);
export const getUserProfile = (userId) => {
  return API.get(`/users/${userId}`);
};

// search users
export const searchUsers = (query) => {
  return API.get(`/users/search?query=${query}`);
};


// POST wale APIs
export const createPost = (data) => API.post("/posts", data);
export const getFeed = () => API.get("/posts/feed");
export const likePost = (postId) => API.post(`/posts/${postId}/like`);
export const unlikePost = (postId) => API.post(`/posts/${postId}/unlike`);

export const getPostById = (postId) => {
  return API.get(`/posts/${postId}`);
};

export const addComment = (postId, text) => {
  return API.post(`/posts/${postId}/comment`, { text });
};

export const getComments = (postId) => {
  return API.get(`/posts/${postId}/comments`);
};

export default API;
