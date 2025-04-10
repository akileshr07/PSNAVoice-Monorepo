import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ComplaintContent = ({ title, content, authorName }) => {
  const [expanded, setExpanded] = useState(false);

  const words = content.split(' ');
  const isLongContent = words.length > 50;
  const displayContent = expanded ? content : words.slice(0, 50).join(' ');

  return (
    <div>
      <h3 className="mt-3 text-xl font-semibold text-gray-900">{title}</h3>
      
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
      
      {authorName && (
        <p className="mt-4 text-sm text-gray-500">
          Posted by: {authorName}
        </p>
      )}
    </div>
  );
};

export default ComplaintContent;