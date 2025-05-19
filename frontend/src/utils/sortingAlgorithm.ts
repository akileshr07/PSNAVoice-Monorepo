//sorting
import type { Complaint } from '../types';
//sortingalgorith.ts

export const calculateScore = (complaint: Complaint): number => {
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  const netVotes = complaint.upvotes - complaint.downvotes;
  const voteScore = Math.sign(netVotes) * Math.log10(Math.max(Math.abs(netVotes), 1));

  const commentWeight = 2;
  const timeDecay = Math.log10(ageInHours + 2);

  return voteScore + (complaint.commentCount * commentWeight) - timeDecay;
};

/**
 * Check if a complaint should be filtered out based on downvote ratio or age.
 * Filters complaints with 60% or more downvotes or older than 30 days.
 */
export const shouldRemoveComplaint = (complaint: Complaint): boolean => {
  const totalVotes = complaint.upvotes + complaint.downvotes;
  const downvoteRatio = totalVotes > 0 ? (complaint.downvotes / totalVotes) * 100 : 0;

  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

  return downvoteRatio >= 60 || ageInDays >= 30;
};

/**
 * Filter and sort complaints based on their calculated score.
 */
export const sortComplaints = (complaints: Complaint[]): Complaint[] => {
  return complaints
    .filter(complaint => !shouldRemoveComplaint(complaint))
    .sort((a, b) => calculateScore(b) - calculateScore(a));
};