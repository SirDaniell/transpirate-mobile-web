// Mock data types matching the backend API
export interface User {
  user_id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
}

export interface Post {
  post_id: string;
  user_id: string;
  username: string;
  user_avatar?: string;
  content_text: string;
  media_urls?: string[];
  symbol?: string;
  timeframe?: string;
  analysis_type?: string;
  prediction?: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  is_liked?: boolean;
}

export interface Comment {
  comment_id: string;
  user_id: string;
  username: string;
  user_avatar?: string;
  comment_text: string;
  created_at: string;
  likes_count: number;
}

// Mock users
export const mockUsers: User[] = [
  {
    user_id: "1",
    username: "Michael Bruno",
    email: "michael@example.com",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Crypto enthusiast and technical analyst",
    location: "San Francisco, CA",
    followers_count: 1500000,
    following_count: 71,
    posts_count: 109,
  },
  {
    user_id: "2",
    username: "Emma Stone",
    email: "emma@example.com",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "Photographer",
    location: "Los Angeles, CA",
    followers_count: 850000,
    following_count: 123,
    posts_count: 234,
  },
  {
    user_id: "3",
    username: "David Bruno",
    email: "david@example.com",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    bio: "Web3 trader | DeFi enthusiast",
    location: "New York, NY",
    followers_count: 1500000,
    following_count: 71,
    posts_count: 109,
  },
  {
    user_id: "4",
    username: "Sarah Jhaveri",
    email: "sarah@example.com",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Trading signals expert",
    location: "Miami, FL",
    followers_count: 523000,
    following_count: 89,
    posts_count: 78,
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    post_id: "1",
    user_id: "1",
    username: "Michael Bruno",
    user_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    content_text: "Cras gravida bibendum dolor eu varius. Etiam fermentum velit nec eget vulputate.",
    media_urls: ["https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800"],
    symbol: "BTCUSD",
    prediction: "bullish",
    likes_count: 247,
    comments_count: 57,
    shares_count: 33,
    created_at: "30 min",
    is_liked: false,
  },
  {
    post_id: "2",
    user_id: "2",
    username: "Emma Stone",
    user_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    content_text: "What! Just amazing. I love your profile contents, look forward to see more.",
    likes_count: 128,
    comments_count: 23,
    shares_count: 12,
    created_at: "2h ago",
  },
  {
    post_id: "3",
    user_id: "4",
    username: "Sarah Jhaveri",
    user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content_text: "Praesent ipsum nec tempus. Praesent mi rhoncus ipsum non tempus lorem tem praesent.",
    symbol: "ETHUSD",
    prediction: "bearish",
    likes_count: 342,
    comments_count: 89,
    shares_count: 45,
    created_at: "5h ago",
  },
];

// Mock comments
export const mockComments: Comment[] = [
  {
    comment_id: "1",
    user_id: "2",
    username: "Emma Stone",
    user_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    comment_text: "What! Just amazing. I love your profile contents, look forward to see more.",
    created_at: "30 min",
    likes_count: 12,
  },
  {
    comment_id: "2",
    user_id: "4",
    username: "Sarah Jhaveri",
    user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    comment_text: "Praesent ipsum non tempus. Praesent mi rhoncus ipsum non tempus lorem tem praesent.",
    created_at: "45 min",
    likes_count: 8,
  },
];

// Function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find((user) => user.user_id === userId);
};

// Function to get posts for feed
export const getFeedPosts = (): Post[] => {
  return mockPosts;
};

// Function to get post by ID
export const getPostById = (postId: string): Post | undefined => {
  return mockPosts.find((post) => post.post_id === postId);
};

// Function to get comments for a post
export const getPostComments = (postId: string): Comment[] => {
  return mockComments;
};
