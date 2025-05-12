//sorting
import type { Complaint } from '../types';
//sortingalgorith.ts

export const calculateScore = (complaint: Complaint): number => {
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  // Calculate engagement score: upvotes - downvotes, weighted comments, age factor
  return (
    (complaint.upvotes - complaint.downvotes) + 
    (complaint.commentCount * 2) + 
    (100 / (ageInHours + 2)) // Time decay factor to prioritize fresh complaints
  );
};

export const shouldRemoveComplaint = (complaint: Complaint): boolean => {
  const totalVotes = complaint.upvotes + complaint.downvotes;
  const downvotePercentage = totalVotes > 0 ? (complaint.downvotes / totalVotes) * 100 : 0;
  
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  
  // Remove complaints with high downvote percentage or older than 30 days
  return downvotePercentage >= 60 || ageInDays >= 30;
};

export const sortComplaints = (complaints: Complaint[]): Complaint[] => {
  return complaints
    .filter(complaint => !shouldRemoveComplaint(complaint)) // Remove unwanted complaints
    .sort((a, b) => calculateScore(b) - calculateScore(a)); // Sort by score, descending
};
