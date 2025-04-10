import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Building2 } from 'lucide-react';

const ComplaintHeader = ({ department, createdAt }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Building2 className="h-4 w-4" />
        <span>{department}</span>
      </div>
      <span className="text-sm text-gray-500">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </span>
    </div>
  );
};

export default ComplaintHeader;