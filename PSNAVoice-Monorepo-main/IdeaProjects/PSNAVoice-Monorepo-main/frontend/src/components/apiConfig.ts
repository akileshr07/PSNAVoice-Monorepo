
const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const API = {
  COMPLAINTS: `${BASE_URL}/complaints`,
  SINGLE_COMPLAINT: (id: string | number) => `${BASE_URL}/complaints/${id}`,
  COMMENTS: (complaintId: string | number) => `${BASE_URL}/complaints/${complaintId}/comments`,
  COMMENT_VOTE: (complaintId: string | number, commentId: string | number, isUpvote: boolean) =>
    `${BASE_URL}/complaints/${complaintId}/comments/${commentId}/vote?type=${isUpvote ? 'up' : 'down'}`,
  VOTE_COMPLAINT: (id: string | number) => `${BASE_URL}/complaints/${id}/vote`,
};

export default API;
