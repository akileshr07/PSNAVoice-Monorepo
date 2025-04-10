export interface Complaint {
  id: string;
  title: string;
  content: string;
  department: string;
  authorName?: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
}

export interface Comment {
  id: string;
  content: string;
  authorName?: string;
  createdAt: string;
  parentId?: string; // optional, for replies
  upvotes: number;
  downvotes: number;
}

export interface VoteState {
  upvoted: boolean;
  downvoted: boolean;
}