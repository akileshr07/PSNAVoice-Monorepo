/**
 * Calculate a score for a complaint based on votes, comments, and age
 * 
 * @param {Object} complaint - The complaint object
 * @returns {number} - The calculated score
 */
export const calculateScore = (complaint) => {
  const now = new Date();
  const createdAt = new Date(complaint.createdAt);
  const ageInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
  
  return (
    (complaint.upvotes - complaint.downvotes) + 
    (complaint.commentCount * 2) + 
    (100 / (ageInHours + 2))
  );
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
 * Sort complaints by score and filter out low-quality ones
 * 
 * @param {Array} complaints - Array of complaint objects
 * @returns {Array} - Filtered and sorted array of complaints
 */
export const sortComplaints = (complaints) => {
  return complaints
    .filter(complaint => !shouldRemoveComplaint(complaint))
    .sort((a, b) => calculateScore(b) - calculateScore(a));
};