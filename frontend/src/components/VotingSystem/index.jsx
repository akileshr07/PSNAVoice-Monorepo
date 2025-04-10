import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import Cookies from 'js-cookie';

const VotingSystem = ({ upvotes: initialUpvotes, downvotes: initialDownvotes, itemId, onVote }) => {
  const [votes, setVotes] = useState({ upvotes: initialUpvotes, downvotes: initialDownvotes });
  const [voteState, setVoteState] = useState({ upvoted: false, downvoted: false });

  useEffect(() => {
    const savedVote = Cookies.get(`vote_${itemId}`);
    if (savedVote) {
      setVoteState(JSON.parse(savedVote));
    }
  }, [itemId]);

  const handleVote = async (isUpvote) => {
    const newVoteState = { ...voteState };

    // Determine if user is toggling the same vote
    const alreadyVoted = isUpvote ? voteState.upvoted : voteState.downvoted;

    try {
      const response = await fetch(`http://localhost:8083/api/complaints/${itemId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isUpvote })
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      // Update UI vote count based on the vote type
      if (isUpvote) {
        if (alreadyVoted) {
          newVoteState.upvoted = false;
          setVotes(prev => ({ ...prev, upvotes: prev.upvotes - 1 }));
        } else {
          newVoteState.upvoted = true;
          newVoteState.downvoted = false;
          setVotes(prev => ({
            upvotes: prev.upvotes + 1,
            downvotes: voteState.downvoted ? prev.downvotes - 1 : prev.downvotes
          }));
        }
      } else {
        if (alreadyVoted) {
          newVoteState.downvoted = false;
          setVotes(prev => ({ ...prev, downvotes: prev.downvotes - 1 }));
        } else {
          newVoteState.downvoted = true;
          newVoteState.upvoted = false;
          setVotes(prev => ({
            downvotes: prev.downvotes + 1,
            upvotes: voteState.upvoted ? prev.upvotes - 1 : prev.upvotes
          }));
        }
      }

      setVoteState(newVoteState);
      Cookies.set(`vote_${itemId}`, JSON.stringify(newVoteState));

      if (onVote) {
        onVote(isUpvote);
      }
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleVote(true)}
        className={`flex items-center space-x-1 ${
          voteState.upvoted ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
        }`}
      >
        <ThumbsUp className="h-5 w-5" />
        <span>{votes.upvotes}</span>
      </button>

      <button
        onClick={() => handleVote(false)}
        className={`flex items-center space-x-1 ${
          voteState.downvoted ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
        }`}
      >
        <ThumbsDown className="h-5 w-5" />
        <span>{votes.downvotes}</span>
      </button>
    </div>
  );
};

export default VotingSystem;
