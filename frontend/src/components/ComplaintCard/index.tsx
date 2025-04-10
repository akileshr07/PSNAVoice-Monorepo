import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Complaint } from '../../types';
import VotingSystem from '../VotingSystem';
import CommentSection from '../CommentSection';

interface ComplaintCardProps {
  complaint: Complaint;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const words = complaint.content.split(' ');
  const isLongContent = words.length > 50;
  const displayContent = expanded ? complaint.content : words.slice(0, 50).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Building2 className="h-4 w-4" />
            <span>{complaint.department}</span>
          </div>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold text-gray-900">{complaint.title}</h3>
        
        <div className="mt-2 text-gray-600">
          <p>{displayContent}{!expanded && isLongContent && '...'}</p>
          {isLongContent && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
            >
              <span>{expanded ? 'Show less' : 'Read more'}</span>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}
        </div>
        
        {complaint.authorName && (
          <p className="mt-4 text-sm text-gray-500">
            Posted by: {complaint.authorName}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <VotingSystem
            upvotes={complaint.upvotes}
            downvotes={complaint.downvotes}
            itemId={complaint.id}
          />
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600"
          >
            <MessageSquare className="h-5 w-5" />
            <span>{complaint.commentCount} comments</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="border-t border-gray-100">
          <CommentSection complaintId={complaint.id} />
        </div>
      )}
    </div>
  );
};

export default ComplaintCard;