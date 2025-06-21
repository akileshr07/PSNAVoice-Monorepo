import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Send, User } from 'lucide-react';
import type { Comment } from '../types';
import VotingSystem from './VotingSystem';
import API from './apiConfig';

interface CommentSectionProps {
  complaintId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ complaintId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [visibleCount, setVisibleCount] = useState(5); // 👈 show only top 5 initially

  const fetchComments = async () => {
    try {
      const res = await fetch(API.COMMENTS(complaintId));
      const data: Comment[] = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [complaintId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentPayload = {
      content: newComment,
      complaintId: parseInt(complaintId),
    };

    try {
      const res = await fetch(API.COMMENTS(complaintId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentPayload),
      });

      if (!res.ok) throw new Error('Failed to submit comment');

      await fetchComments();
      setNewComment('');
      setVisibleCount(5); // 👈 reset to top 5 after new comment
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleVote = async (commentId: string, isUpvote: boolean) => {
    try {
      const res = await fetch(API.COMMENT_VOTE(complaintId, commentId, isUpvote), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to vote on comment');
      await fetchComments();
    } catch (error) {
      console.error('Error voting on comment:', error);
    }
  };

  const shouldShowComment = (comment: Comment): boolean => {
    const totalVotes = comment.upvotes + comment.downvotes;
    if (totalVotes === 0) return true;
    const downvotePercentage = (comment.downvotes / totalVotes) * 100;
    return downvotePercentage < 60;
  };

  const sortComments = (commentsToSort: Comment[]): Comment[] => {
    return commentsToSort.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  };

  const renderComment = (comment: Comment) => {
    if (!shouldShowComment(comment)) return null;

    const createdAtDate = new Date(comment.createdAt);
    if (isNaN(createdAtDate.getTime())) {
      console.error(`Invalid date for comment: ${comment.createdAt}`);
      return null;
    }

    return (
      <div key={comment.id} className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{comment.authorName || 'Anonymous'}</span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(createdAtDate, { addSuffix: true })}
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredSortedComments = sortComments(comments.filter(shouldShowComment));
  const visibleComments = filteredSortedComments.slice(0, visibleCount);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-6">
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

      <div className="space-y-4">
        {visibleComments.map(renderComment)}
      </div>

      {visibleCount < filteredSortedComments.length && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 5)}
            className="text-indigo-600 font-medium hover:underline"
          >
            Show More Comments
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
