//sortingalgorith.ts
import type { Complaint } from '../types';

export const calculateScore = (complaint: Complaint): number => {
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  // Net votes
  const netVotes = complaint.upvotes - complaint.downvotes;

  // Use logarithmic scale for votes (minimum 1 to avoid log(0))
  const voteScore = Math.log10(Math.max(Math.abs(netVotes), 1));

  // Preserve vote direction (+ or -)
  const sign = netVotes > 0 ? 1 : netVotes < 0 ? -1 : 0;

  // Weighted comment score (tune weight as needed) - Adjusted from 2 to 0.3 as per description
  const commentWeight = 0.3;
  const commentScore = complaint.commentCount * commentWeight;

  // Time decay factor to prioritize newer posts (Reddit uses 45000, here adjusted to hours)
  // Reverted to the described linear decay 'ageInHours / 12' from 'Math.log10(ageInHours + 2)'
  const timeDecay = ageInHours / 12; // Increase denominator to slow decay

  // Final score calculation
  const score = sign * voteScore + commentScore - timeDecay;

  return score;
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