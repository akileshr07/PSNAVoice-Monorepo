import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const CommentSection = ({ complaintId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8083/api/complaints/${complaintId}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [complaintId]);

  const handleSubmitComment = async (content, parentId = null) => {
    try {
      const response = await fetch(`http://localhost:8083/api/complaints/${complaintId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, parentId }),
      });

      if (!response.ok) throw new Error('Failed to submit comment');

      // Instead of appending the response, re-fetch the updated comment list
      await fetchComments();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleVote = async (commentId, isUpvote) => {
    try {
      const voteType = isUpvote ? 'up' : 'down';
      const response = await fetch(
        `http://localhost:8083/api/complaints/${complaintId}/comments/${commentId}/vote?type=${voteType}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) throw new Error('Failed to vote on comment');

      // Re-fetch comments after voting to reflect updated votes
      await fetchComments();
    } catch (error) {
      console.error('Failed to vote on comment:', error);
    }
  };

  const shouldShowComment = (comment) => {
    const totalVotes = comment.upvotes + comment.downvotes;
    if (totalVotes === 0) return true;
    const downvotePercentage = (comment.downvotes / totalVotes) * 100;
    return downvotePercentage < 60;
  };

  const sortComments = (commentsToSort) => {
    return commentsToSort.sort((a, b) => {
      const scoreA = a.upvotes - a.downvotes;
      const scoreB = b.upvotes - b.downvotes;
      return scoreB - scoreA;
    });
  };

  const rootComments = comments.filter((comment) => !comment.parentId && shouldShowComment(comment));
  const sortedRootComments = sortComments(rootComments);

  return (
    <div className="p-4">
      <CommentForm onSubmit={(content) => handleSubmitComment(content)} />

      <div className="space-y-4">
        {sortedRootComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleSubmitComment}
            onVote={handleVote}
            replies={comments}
            sortedReplies={sortComments(
              comments.filter((c) => c.parentId === comment.id && shouldShowComment(c))
            )}
          />
        ))}
      </div>

      {sortedRootComments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
