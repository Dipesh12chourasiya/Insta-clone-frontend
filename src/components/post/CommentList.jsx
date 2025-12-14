const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) return <p className="text-gray-500"></p>;

  return (
    <div className="mt-2 space-y-1">
      {comments.map((comment) => (
        <div key={comment._id} className="text-sm">
          <strong>{comment.user?.username}</strong> {comment.text}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
