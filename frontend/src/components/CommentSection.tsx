import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Send, User } from 'lucide-react';
import type { Comment } from '../types';
import VotingSystem from './VotingSystem';

interface CommentSectionProps {
  complaintId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ complaintId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Fetch comments from API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:8083/api/comments/${complaintId}`);
        const data: Comment[] = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    fetchComments();
  }, [complaintId]);

  // Submit new comment or reply
  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentPayload = {
      content: newComment,
      parentId: parentId || null,
      complaintId
    };

    try {
      const res = await fetch('http://localhost:8083/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentPayload)
      });

      if (!res.ok) throw new Error('Failed to submit comment');

      const newCommentFromServer: Comment = await res.json();
      setComments([...comments, newCommentFromServer]);
      setNewComment('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  // Handle upvote/downvote
  const handleVote = async (commentId: string, isUpvote: boolean) => {
    try {
      const res = await fetch(`http://localhost:8083/api/comments/${commentId}/vote`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upvote: isUpvote })
      });

      if (!res.ok) throw new Error('Failed to vote');

      const updated: Comment = await res.json();
      const updatedList = comments.map(c => (c.id === commentId ? updated : c));
      setComments(updatedList);
    } catch (error) {
      console.error('Voting error:', error);
    }
  };

  // Logic for hiding spammy comments
  const shouldShowComment = (comment: Comment): boolean => {
    const totalVotes = comment.upvotes + comment.downvotes;
    if (totalVotes === 0) return true;
    const downvotePercentage = (comment.downvotes / totalVotes) * 100;
    return downvotePercentage < 60;
  };

  // Sort by score
  const sortComments = (commentsToSort: Comment[]): Comment[] => {
    return commentsToSort.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  };

  const renderComment = (comment: Comment, depth = 0) => {
    if (!shouldShowComment(comment)) return null;

    return (
      <div
        key={comment.id}
        className={`p-4 ${depth > 0 ? 'ml-8 border-l-2 border-gray-100' : ''}`}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{comment.authorName || 'Anonymous'}</span>
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
                onVote={(isUpvote) => handleVote(comment.id, isUpvote)}
              />
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-sm text-gray-500 hover:text-indigo-600"
              >
                Reply
              </button>
            </div>

            {replyingTo === comment.id && (
              <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Recursive rendering of replies */}
        <div className="mt-2 space-y-4">
          {sortComments(comments.filter(c => c.parentId === comment.id))
            .map(reply => renderComment(reply, depth + 1))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Comment input */}
      <form onSubmit={(e) => handleSubmit(e)} className="mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div className="flex-grow">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Render top-level comments */}
      <div className="space-y-4">
        {sortComments(comments.filter(comment => !comment.parentId))
          .map(comment => renderComment(comment))}
      </div>
    </div>
  );
};

export default CommentSection;
