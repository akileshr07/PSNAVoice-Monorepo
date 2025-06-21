//ComplaintCardShimmer
import React from 'react';

const ComplaintCardShimmer: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
          </div>
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>

        <div className="h-6 w-3/4 bg-gray-300 rounded" />

        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 rounded" />
        </div>

        <div className="h-4 w-32 bg-gray-300 rounded" />

        <div className="mt-6 flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="h-5 w-12 bg-gray-300 rounded" />
            <div className="h-5 w-12 bg-gray-300 rounded" />
          </div>
          <div className="h-5 w-24 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ComplaintCardShimmer;
