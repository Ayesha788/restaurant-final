"use client"
import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
  user: string;
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText && userName) {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
        user: userName,
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText("");
      setUserName("");
    } else {
      alert("Please provide both username and comment.");
    }
  };

  return (
    <div className="w-full px-8 py-8 bg-white">
      <div className="space-y-6 w-full">
        <h3 className="text-3xl font-semibold text-gray-900">Comments</h3>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={userName}
              onChange={handleUserNameChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Add a comment"
              value={commentText}
              onChange={handleCommentChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
            >
              Submit Comment
            </button>
          </div>
        </form>

        {/* Display Comments */}
        <div className="space-y-6 w-full">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-gray-100 rounded-lg border-l-4 border-orange-500 shadow-md"
              >
                <p className="font-semibold text-gray-900">{comment.user}:</p>
                <p className="text-gray-700 mt-2">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
