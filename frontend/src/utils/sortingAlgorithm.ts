import type { Complaint } from '../types';

export const calculateScore = (complaint: Complaint): number => {
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
  
  return (
    (complaint.upvotes - complaint.downvotes) + 
    (complaint.commentCount * 2) + 
    (100 / (ageInHours + 2))
  );
};

export const shouldRemoveComplaint = (complaint: Complaint): boolean => {
  const totalVotes = complaint.upvotes + complaint.downvotes;
  const downvotePercentage = totalVotes > 0 ? (complaint.downvotes / totalVotes) * 100 : 0;
  
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  
  return downvotePercentage >= 60 || ageInDays >= 30;
};

export const sortComplaints = (complaints: Complaint[]): Complaint[] => {
  return complaints
    .filter(complaint => !shouldRemoveComplaint(complaint))
    .sort((a, b) => calculateScore(b) - calculateScore(a));
};