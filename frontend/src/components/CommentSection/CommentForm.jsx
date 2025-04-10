import React, { useState } from 'react';
import { Send, User } from 'lucide-react';

const CommentForm = ({ onSubmit, placeholder = "Add a comment...", autoFocus = false }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    onSubmit(newComment);
    setNewComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="flex-grow">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            autoFocus={autoFocus}
          />
        </div>
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="flex-shrink-0 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default CommentForm;