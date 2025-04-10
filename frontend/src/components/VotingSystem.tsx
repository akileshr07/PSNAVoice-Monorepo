import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import Cookies from 'js-cookie';
import type { VoteState } from '../types';

interface VotingSystemProps {
  upvotes: number;
  downvotes: number;
  itemId: string;
  onVote?: (isUpvote: boolean) => void;
}

const VotingSystem: React.FC<VotingSystemProps> = ({ upvotes: initialUpvotes, downvotes: initialDownvotes, itemId, onVote }) => {
  const [votes, setVotes] = useState({ upvotes: initialUpvotes, downvotes: initialDownvotes });
  const [voteState, setVoteState] = useState<VoteState>({ upvoted: false, downvoted: false });

  useEffect(() => {
    const savedVote = Cookies.get(`vote_${itemId}`);
    if (savedVote) {
      setVoteState(JSON.parse(savedVote));
    }
  }, [itemId]);

  const handleVote = async (isUpvote: boolean) => {
    const newVoteState = { ...voteState };
    let updatedVotes = { ...votes };
  
    if (isUpvote) {
      if (voteState.upvoted) {
        newVoteState.upvoted = false;
        updatedVotes.upvotes -= 1;
      } else {
        newVoteState.upvoted = true;
        newVoteState.downvoted = false;
        updatedVotes.upvotes += 1;
        if (voteState.downvoted) updatedVotes.downvotes -= 1;
      }
    } else {
      if (voteState.downvoted) {
        newVoteState.downvoted = false;
        updatedVotes.downvotes -= 1;
      } else {
        newVoteState.downvoted = true;
        newVoteState.upvoted = false;
        updatedVotes.downvotes += 1;
        if (voteState.upvoted) updatedVotes.upvotes -= 1;
      }
    }
  
    // Update frontend state
    setVoteState(newVoteState);
    setVotes(updatedVotes);
    Cookies.set(`vote_${itemId}`, JSON.stringify(newVoteState));
  
    // API call to persist vote update
    try {
      await fetch(`http://localhost:8083/api/complaints/${itemId}/vote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          upvotes: updatedVotes.upvotes,
          downvotes: updatedVotes.downvotes
        })
      });
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  
    if (onVote) {
      onVote(isUpvote);
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