//ComplaintFeed
import React, { useState, useEffect } from 'react';
import type { Complaint } from '../types';
import ComplaintCard from './ComplaintCard';
import ComplaintCardShimmer from './ComplaintCardShimmer';
import { sortComplaints } from '../utils/sortingAlgorithm';
import API from './apiConfig';

const ComplaintFeed: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(API.COMPLAINTS);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: Complaint[] = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-20 p-6 space-y-6">
        {[...Array(3)].map((_, idx) => (
          <ComplaintCardShimmer key={idx} />
        ))}
      </div>
    );
  }

  const sortedComplaints = sortComplaints(complaints);

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 space-y-6">
      {sortedComplaints.map(complaint => (
        <ComplaintCard key={complaint.id} complaint={complaint} />
      ))}

      {sortedComplaints.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No feedback yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintFeed;
