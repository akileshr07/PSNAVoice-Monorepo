import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ComplaintCard from '../ComplaintCard';
import { sortComplaints } from '../../utils/sortingAlgorithm';

const ComplaintFeed = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/complaints');
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
  
      const data = await response.json();
      setComplaints(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
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