import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createPost } from "../../api/Services";

const CreatePost = () => {
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };


  const uploadToCloudinary = async () => {
    if (!file) return "";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ungigned_preset"); 

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dmhgzv1ix/image/upload",
        data
      );
      return res.data.secure_url; 
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const imageUrl = await uploadToCloudinary();

      if (!imageUrl) {
        setIsError(true);
        setMessage("Image upload failed");
        setLoading(false);
        return;
      }

      await createPost({
        imageUrl,
        caption,
      });

      setMessage("Post created successfully!");
      setIsError(false);

      // Reset
      setCaption("");
      setFile(null);
      setPreview("");

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Create post error:", error);
      setMessage("Failed to create post");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 border">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create a New Post
        </h2>

        {message && (
          <div
            className={`p-3 mb-4 rounded text-sm ${
              isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="mt-1"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-60 object-cover rounded border"
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              rows={3}
              placeholder="Write a caption..."
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-medium ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Posting..." : "Create Post"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;
