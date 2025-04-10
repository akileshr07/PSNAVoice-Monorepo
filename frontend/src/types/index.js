/**
 * @typedef {Object} Complaint
 * @property {string} id - Unique identifier
 * @property {string} title - Complaint title
 * @property {string} content - Complaint content
 * @property {string} department - Department the complaint is about
 * @property {string} [authorName] - Optional name of the author
 * @property {string} createdAt - ISO date string of creation time
 * @property {number} upvotes - Number of upvotes
 * @property {number} downvotes - Number of downvotes
 * @property {number} commentCount - Number of comments
 */

/**
 * @typedef {Object} Comment
 * @property {string} id - Unique identifier
 * @property {string} content - Comment content
 * @property {string} [authorName] - Optional name of the author
 * @property {string} createdAt - ISO date string of creation time
 * @property {string} [parentId] - ID of parent comment if this is a reply
 * @property {number} upvotes - Number of upvotes
 * @property {number} downvotes - Number of downvotes
 */

/**
 * @typedef {Object} VoteState
 * @property {boolean} upvoted - Whether the user has upvoted
 * @property {boolean} downvoted - Whether the user has downvoted
 */