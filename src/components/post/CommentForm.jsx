import { useState } from "react";
import { usePost } from "../../context/PostContext";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const { addNewComment } = usePost();

  const submitComment = async (e) => {
    e.preventDefault();
    if (!text) return;

    await addNewComment(postId, text);
    setText("");
  };

  return (
    <form onSubmit={submitComment} className="flex gap-2 mt-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 border px-2 py-1 rounded"
      />
      <button className="text-blue-500 font-semibold">Post</button>
    </form>
  );
};

export default CommentForm;
