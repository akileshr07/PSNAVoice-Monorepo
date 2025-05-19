// sortingalgorith.js

/**
 * Calculate a "hot" score for a complaint based on Reddit hot ranking style,
 * combining votes, comments, and age (time decay).
 * 
 * @param {Object} complaint - The complaint object
 * @returns {number} - The calculated score
 */
export const calculateScore = (complaint) => {
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  // Net votes
  const netVotes = complaint.upvotes - complaint.downvotes;

  // Use logarithmic scale for votes (minimum 1 to avoid log(0))
  const voteScore = Math.log10(Math.max(Math.abs(netVotes), 1));

  // Preserve vote direction (+ or -)
  const sign = netVotes > 0 ? 1 : netVotes < 0 ? -1 : 0;

  // Weighted comment score (tune weight as needed)
  const commentWeight = 0.3;
  const commentScore = complaint.commentCount * commentWeight;

  // Time decay factor to prioritize newer posts (Reddit uses 45000, here adjusted to hours)
  const timeDecay = ageInHours / 12; // Increase denominator to slow decay

  // Final score calculation
  const score = sign * voteScore + commentScore - timeDecay;

  return score;
};

/**
 * Determine if a complaint should be removed from the feed
 * 
 * @param {Object} complaint - The complaint object
 * @returns {boolean} - True if the complaint should be removed
 */
export const shouldRemoveComplaint = (complaint) => {
  const totalVotes = complaint.upvotes + complaint.downvotes;
  const downvotePercentage = totalVotes > 0 ? (complaint.downvotes / totalVotes) * 100 : 0;
  
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  
  return downvotePercentage >= 60 || ageInDays >= 30;
};

/**
 * Sort complaints by calculated hot score and filter out low-quality ones
 * 
 * @param {Array} complaints - Array of complaint objects
 * @returns {Array} - Filtered and sorted array of complaints
 */
export const sortComplaints = (complaints) => {
  return complaints
    .filter(complaint => !shouldRemoveComplaint(complaint))
    .sort((a, b) => calculateScore(b) - calculateScore(a));
};
