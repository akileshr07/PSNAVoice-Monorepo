import React, { useState } from 'react';
import ComplaintHeader from './ComplaintHeader';
import ComplaintContent from './ComplaintContent';
import ComplaintFooter from './ComplaintFooter';
import CommentSection from '../CommentSection';

const ComplaintCard = ({ complaint }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <ComplaintHeader 
          department={complaint.department} 
          createdAt={complaint.createdAt} 
        />
        
        <ComplaintContent 
          title={complaint.title} 
          content={complaint.content} 
          authorName={complaint.authorName} 
        />
        
        <ComplaintFooter 
          complaintId={complaint.id}
          upvotes={complaint.upvotes}
          downvotes={complaint.downvotes}
          commentCount={complaint.commentCount}
          onToggleComments={() => setShowComments(!showComments)}
          showComments={showComments}
        />
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