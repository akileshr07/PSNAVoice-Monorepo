import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { User } from 'lucide-react';
import VotingSystem from '../VotingSystem';
import CommentForm from './CommentForm';

const CommentItem = ({ 
  comment, 
  depth = 0, 
  onReply, 
  onVote, 
  replies = [], 
  sortedReplies = [] 
}) => {
  const [replyingTo, setReplyingTo] = useState(false);

  const handleReplySubmit = (content) => {
    onReply(content, comment.id);
    setReplyingTo(false);
  };

  return (
    <div
      className={`p-4 ${depth > 0 ? 'ml-8 border-l-2 border-gray-100' : ''}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">
              {comment.authorName || 'Anonymous'}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <p className="mt-1 text-gray-700">{comment.content}</p>
          
          <div className="mt-2 flex items-center space-x-4">
            <VotingSystem
              upvotes={comment.upvotes}
              downvotes={comment.downvotes}
              itemId={comment.id}
              onVote={(isUpvote) => onVote(comment.id, isUpvote)}
            />
            
            <button
              onClick={() => setReplyingTo(!replyingTo)}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              Reply
            </button>
          </div>

          {replyingTo && (
            <div className="mt-4">
              <CommentForm 
                onSubmit={handleReplySubmit} 
                placeholder="Write a reply..." 
                autoFocus={true}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 space-y-4">
        {sortedReplies.map(reply => (
          <CommentItem
            key={reply.id}
            comment={reply}
            depth={depth + 1}
            onReply={onReply}
            onVote={onVote}
            replies={replies}
            sortedReplies={replies.filter(r => r.parentId === reply.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentItem;