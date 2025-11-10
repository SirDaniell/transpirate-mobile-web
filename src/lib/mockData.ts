// Mock data types matching the backend API

// User Roles
export type AppRole = 'admin' | 'moderator' | 'user' | 'verifier';

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
  role?: AppRole;
  wallet_address?: string;
  account_type?: 'primary' | 'alias';
  user_type?: 'Social' | 'Trading';
  kyc_status?: 'not_verified' | 'pending' | 'verified';
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
  post_type?: 'standard' | 'chart_analysis' | 'trade_signal';
  // Chart Analysis fields
  target_price?: number;
  stop_loss?: number;
  confidence_level?: 'low' | 'medium' | 'high';
  // Trade Signal fields
  signal_type?: 'buy' | 'sell' | 'hold';
  entry_price?: number;
  risk_reward_ratio?: number;
  // Engagement
  likes_count: number;
  comments_count: number;
  shares_count: number;
  views_count?: number;
  created_at: string;
  is_liked?: boolean;
  visibility?: 'public' | 'friends' | 'community';
  community_id?: string;
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

// Communities
export interface Community {
  community_id: string;
  name: string;
  description: string;
  is_private: boolean;
  creator_id: string;
  member_count: number;
  post_count: number;
  avatar_url?: string;
  created_at: string;
  is_member?: boolean;
}

// Friends
export interface FriendRequest {
  request_id: string;
  requester_id: string;
  requester_username: string;
  requester_avatar?: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Friendship {
  friend_id: string;
  username: string;
  avatar_url?: string;
  mutual_friends?: number;
}

// Watchlist
export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change_24h: number;
  is_watching: boolean;
}

// Settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications_enabled: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  privacy_level: 'public' | 'friends' | 'private';
  chart_preferences: {
    show_volume: boolean;
    default_timeframe: string;
  };
}

// Drafts
export interface Draft {
  draft_id: string;
  content_text: string;
  media_urls?: string[];
  symbol?: string;
  created_at: string;
  updated_at: string;
}

// Transaction Verification
export interface VerificationTask {
  transaction_id: string;
  user_id: string;
  username: string;
  transaction_hash: string;
  amount: number;
  symbol: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  created_at: string;
  verified_by?: string;
}

export interface VerifierStats {
  total_verifications: number;
  approved: number;
  rejected: number;
  flagged: number;
  accuracy_rate: number;
}

// Advertisements
export interface Advertisement {
  ad_id: string;
  title: string;
  description: string;
  image_url: string;
  click_url: string;
  impressions: number;
  clicks: number;
  type: 'banner' | 'sponsored_post' | 'sidebar';
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
    role: 'user',
    wallet_address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
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
    role: 'moderator',
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
    role: 'verifier',
    wallet_address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
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
    role: 'user',
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    post_id: "1",
    user_id: "1",
    username: "Michael Bruno",
    user_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    content_text: "BTC showing strong support at $68K. Volume analysis indicates accumulation phase. Expecting breakout to $75K within next week.",
    media_urls: ["https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800"],
    symbol: "BTCUSD",
    timeframe: "D1",
    analysis_type: "technical",
    prediction: "bullish",
    post_type: 'chart_analysis',
    target_price: 75000,
    stop_loss: 65000,
    confidence_level: 'high',
    likes_count: 247,
    comments_count: 57,
    shares_count: 33,
    views_count: 1834,
    created_at: "30 min",
    is_liked: false,
    visibility: 'public',
  },
  {
    post_id: "2",
    user_id: "2",
    username: "Emma Stone",
    user_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    content_text: "What! Just amazing. I love your profile contents, look forward to see more.",
    post_type: 'standard',
    likes_count: 128,
    comments_count: 23,
    shares_count: 12,
    views_count: 892,
    created_at: "2h ago",
    visibility: 'public',
  },
  {
    post_id: "3",
    user_id: "4",
    username: "Sarah Jhaveri",
    user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content_text: "Entering SHORT position on ETH. RSI overbought, bearish divergence forming.",
    symbol: "ETHUSD",
    prediction: "bearish",
    post_type: 'trade_signal',
    signal_type: 'sell',
    entry_price: 3500,
    target_price: 3200,
    stop_loss: 3650,
    risk_reward_ratio: 2.0,
    likes_count: 342,
    comments_count: 89,
    shares_count: 45,
    views_count: 2156,
    created_at: "5h ago",
    visibility: 'public',
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

// Mock Communities
export const mockCommunities: Community[] = [
  {
    community_id: "1",
    name: "Bitcoin Traders",
    description: "Professional Bitcoin trading strategies and analysis",
    is_private: false,
    creator_id: "1",
    member_count: 15234,
    post_count: 3421,
    avatar_url: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400",
    created_at: "2023-01-15",
    is_member: true,
  },
  {
    community_id: "2",
    name: "DeFi Enthusiasts",
    description: "Decentralized Finance discussions and opportunities",
    is_private: false,
    creator_id: "3",
    member_count: 8932,
    post_count: 1876,
    avatar_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
    created_at: "2023-03-20",
    is_member: false,
  },
  {
    community_id: "3",
    name: "Elite Traders VIP",
    description: "Exclusive group for verified professional traders",
    is_private: true,
    creator_id: "1",
    member_count: 234,
    post_count: 892,
    created_at: "2023-06-10",
    is_member: false,
  },
];

// Mock Friend Requests
export const mockFriendRequests: FriendRequest[] = [
  {
    request_id: "1",
    requester_id: "2",
    requester_username: "Emma Stone",
    requester_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    addressee_id: "1",
    status: 'pending',
    created_at: "2h ago",
  },
  {
    request_id: "2",
    requester_id: "3",
    requester_username: "David Bruno",
    requester_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    addressee_id: "1",
    status: 'pending',
    created_at: "1d ago",
  },
];

// Mock Friends
export const mockFriends: Friendship[] = [
  {
    friend_id: "4",
    username: "Sarah Jhaveri",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    mutual_friends: 12,
  },
];

// Mock Watchlist
export const mockWatchlist: WatchlistItem[] = [
  {
    symbol: "BTCUSD",
    name: "Bitcoin",
    price: 68234.50,
    change_24h: 3.45,
    is_watching: true,
  },
  {
    symbol: "ETHUSD",
    name: "Ethereum",
    price: 3456.78,
    change_24h: -1.23,
    is_watching: true,
  },
  {
    symbol: "SOLUSD",
    name: "Solana",
    price: 142.34,
    change_24h: 5.67,
    is_watching: true,
  },
];

// Mock User Settings
export const mockSettings: UserSettings = {
  theme: 'system',
  notifications_enabled: true,
  email_notifications: true,
  push_notifications: false,
  privacy_level: 'public',
  chart_preferences: {
    show_volume: true,
    default_timeframe: 'D1',
  },
};

// Mock Drafts
export const mockDrafts: Draft[] = [
  {
    draft_id: "1",
    content_text: "Working on a new analysis for BTC...",
    symbol: "BTCUSD",
    created_at: "2024-11-05",
    updated_at: "2024-11-06",
  },
];

// Mock Verification Tasks
export const mockVerificationTasks: VerificationTask[] = [
  {
    transaction_id: "1",
    user_id: "1",
    username: "Michael Bruno",
    transaction_hash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb123abc",
    amount: 2.5,
    symbol: "ETH",
    status: 'pending',
    created_at: "10 min ago",
  },
  {
    transaction_id: "2",
    user_id: "4",
    username: "Sarah Jhaveri",
    transaction_hash: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7456def",
    amount: 0.5,
    symbol: "BTC",
    status: 'pending',
    created_at: "1h ago",
  },
];

// Mock Verifier Stats
export const mockVerifierStats: VerifierStats = {
  total_verifications: 156,
  approved: 142,
  rejected: 10,
  flagged: 4,
  accuracy_rate: 98.5,
};

// Mock Advertisements
export const mockAds: Advertisement[] = [
  {
    ad_id: "1",
    title: "Trade with confidence",
    description: "Join the best crypto trading platform",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    click_url: "https://example.com",
    impressions: 15234,
    clicks: 892,
    type: 'banner',
  },
  {
    ad_id: "2",
    title: "Learn Technical Analysis",
    description: "Master chart patterns in 30 days",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    click_url: "https://example.com/learn",
    impressions: 8734,
    clicks: 445,
    type: 'sidebar',
  },
];

// Helper functions
export const getCommunityById = (communityId: string): Community | undefined => {
  return mockCommunities.find((c) => c.community_id === communityId);
};

export const getWatchlist = (): WatchlistItem[] => {
  return mockWatchlist;
};

export const getUserSettings = (): UserSettings => {
  return mockSettings;
};

export const getDrafts = (): Draft[] => {
  return mockDrafts;
};

export const getVerificationTasks = (): VerificationTask[] => {
  return mockVerificationTasks;
};

export const getVerifierStats = (): VerifierStats => {
  return mockVerifierStats;
};

export const getFriendRequests = (): FriendRequest[] => {
  return mockFriendRequests;
};

export const getFriends = (): Friendship[] => {
  return mockFriends;
};

export const getAds = (): Advertisement[] => {
  return mockAds;
};
