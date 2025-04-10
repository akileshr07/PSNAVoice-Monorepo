import React from 'react';
import { MessageSquare } from 'lucide-react';
import VotingSystem from '../VotingSystem';

const ComplaintFooter = ({ 
  complaintId, 
  upvotes, 
  downvotes, 
  commentCount, 
  onToggleComments, 
  showComments 
}) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <VotingSystem
        upvotes={upvotes}
        downvotes={downvotes}
        itemId={complaintId}
        // BACKEND INTEGRATION: Vote on a complaint
        // This would call an API endpoint in a real implementation
      />
      
      <button
        onClick={onToggleComments}
        className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600"
      >
        <MessageSquare className="h-5 w-5" />
        <span>{commentCount} comments</span>
      </button>
    </div>
  );
};

export default ComplaintFooter;