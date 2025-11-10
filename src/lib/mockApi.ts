// Mock API service layer simulating backend endpoints
// This provides a realistic API interface for frontend development

import { Post, User, Comment, Community, Friendship, FriendRequest } from './mockData';

// ==================== Types ====================

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  csrf_token: string;
  offline_access_token: string;
  offline_access_expires_at: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  parent_account_email?: string;
}

export interface LoginRequest {
  username: string; // Actually email
  password: string;
}

export interface TokenBalance {
  available_balance: number;
  locked_balance: number;
  staked_balance: number;
  pending_rewards: number;
  total_balance: number;
}

export interface TokenTransferRequest {
  recipient_identifier: string;
  amount: number;
  notes?: string;
}

export interface WalletChallenge {
  challenge_code: string;
  message_to_sign: string;
}

export interface WalletVerifyRequest {
  challenge_code: string;
  signature: string;
}

export interface Wallet {
  wallet_id: string;
  wallet_address: string;
  is_primary: boolean;
}

export interface Message {
  message_id: string;
  sender_id: string;
  recipient_id: string;
  subject?: string;
  body: string;
  created_at: string;
  read: boolean;
  sender_username?: string;
  sender_avatar?: string;
}

export interface Conversation {
  other_user_id: string;
  other_user_username: string;
  other_user_avatar?: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export interface StakingPool {
  pool_id: string;
  name: string;
  apy: number;
  min_stake: number;
  total_staked: number;
  participants: number;
}

export interface StakeRequest {
  pool_id: string;
  amount: number;
}

export interface Achievement {
  achievement_id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export interface GamificationProfile {
  total_points: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  achievements_unlocked: number;
  total_achievements: number;
  leaderboard_rank: number;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  avatar_url?: string;
  score: number;
  change: number;
}

// ==================== Mock Data Storage ====================

let currentUser: User | null = {
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
};

const mockTokens: AuthTokens = {
  access_token: "mock_access_token_" + Date.now(),
  refresh_token: "mock_refresh_token_" + Date.now(),
  token_type: "bearer",
  csrf_token: "mock_csrf_token_" + Date.now(),
  offline_access_token: "mock_offline_token_" + Date.now(),
  offline_access_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

const mockMessages: Message[] = [
  {
    message_id: "1",
    sender_id: "2",
    recipient_id: "1",
    subject: "Great analysis!",
    body: "Hey, I really liked your BTC analysis. Can we discuss?",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    sender_username: "Emma Stone",
    sender_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    message_id: "2",
    sender_id: "3",
    recipient_id: "1",
    body: "Check out my latest trade signal!",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    read: true,
    sender_username: "David Bruno",
    sender_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
];

const mockStakingPools: StakingPool[] = [
  {
    pool_id: "1",
    name: "Standard Pool",
    apy: 12.5,
    min_stake: 100,
    total_staked: 1500000,
    participants: 2340,
  },
  {
    pool_id: "2",
    name: "Premium Pool",
    apy: 18.0,
    min_stake: 1000,
    total_staked: 5000000,
    participants: 892,
  },
  {
    pool_id: "3",
    name: "Elite Pool",
    apy: 25.0,
    min_stake: 10000,
    total_staked: 15000000,
    participants: 234,
  },
];

const mockAchievements: Achievement[] = [
  {
    achievement_id: "1",
    name: "First Post",
    description: "Create your first post",
    icon: "🎉",
    points: 10,
    unlocked: true,
  },
  {
    achievement_id: "2",
    name: "Social Butterfly",
    description: "Follow 50 users",
    icon: "🦋",
    points: 25,
    unlocked: true,
    progress: 71,
    target: 50,
  },
  {
    achievement_id: "3",
    name: "Trading Master",
    description: "Post 100 trade signals",
    icon: "📈",
    points: 100,
    unlocked: false,
    progress: 45,
    target: 100,
  },
  {
    achievement_id: "4",
    name: "Community Leader",
    description: "Create a community",
    icon: "👑",
    points: 50,
    unlocked: false,
    progress: 0,
    target: 1,
  },
];

// ==================== Helper Functions ====================

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== Auth APIs ====================

export const authApi = {
  async register(data: RegisterRequest): Promise<User> {
    await delay();
    const newUser: User = {
      user_id: Math.random().toString(36).substr(2, 9),
      username: data.username,
      email: data.email,
      account_type: data.parent_account_email ? 'alias' : 'primary',
      user_type: 'Social',
      kyc_status: 'not_verified',
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
    };
    currentUser = newUser;
    return newUser;
  },

  async login(data: LoginRequest): Promise<AuthTokens> {
    await delay();
    // Mock authentication - accept any credentials
    return mockTokens;
  },

  async getCurrentUser(): Promise<User> {
    await delay();
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    return currentUser;
  },

  async logout(): Promise<void> {
    await delay();
    currentUser = null;
  },
};

// ==================== Social APIs ====================

export const socialApi = {
  async createPost(content_text: string, community_id?: string): Promise<Post> {
    await delay();
    const newPost: Post = {
      post_id: Math.random().toString(36).substr(2, 9),
      user_id: currentUser!.user_id,
      username: currentUser!.username,
      user_avatar: currentUser!.avatar_url,
      content_text,
      post_type: 'standard',
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      created_at: 'just now',
      community_id,
    };
    return newPost;
  },

  async getFeed(page: number = 1, page_size: number = 20): Promise<Post[]> {
    await delay();
    // Return mock posts from mockData
    const { getFeedPosts } = await import('./mockData');
    return getFeedPosts();
  },

  async likePost(post_id: string): Promise<{ liked: boolean }> {
    await delay();
    return { liked: true };
  },

  async unlikePost(post_id: string): Promise<{ liked: boolean }> {
    await delay();
    return { liked: false };
  },

  async commentOnPost(post_id: string, comment_text: string): Promise<Comment> {
    await delay();
    const newComment: Comment = {
      comment_id: Math.random().toString(36).substr(2, 9),
      user_id: currentUser!.user_id,
      username: currentUser!.username,
      user_avatar: currentUser!.avatar_url,
      comment_text,
      created_at: 'just now',
      likes_count: 0,
    };
    return newComment;
  },

  async sendFriendRequest(addressee_id: string): Promise<{ message: string }> {
    await delay();
    return { message: 'Friend request sent.' };
  },

  async acceptFriendRequest(requester_id: string): Promise<{ message: string }> {
    await delay();
    return { message: 'Friend request accepted.' };
  },

  async rejectFriendRequest(requester_id: string): Promise<{ message: string }> {
    await delay();
    return { message: 'Friend request rejected.' };
  },

  async getFriends(): Promise<Friendship[]> {
    await delay();
    const { mockFriends } = await import('./mockData');
    return mockFriends;
  },

  async getFriendRequests(): Promise<FriendRequest[]> {
    await delay();
    const { mockFriendRequests } = await import('./mockData');
    return mockFriendRequests;
  },
};

// ==================== Messaging APIs ====================

export const messagingApi = {
  async sendMessage(recipient_id: string, subject: string, body: string): Promise<Message> {
    await delay();
    const newMessage: Message = {
      message_id: Math.random().toString(36).substr(2, 9),
      sender_id: currentUser!.user_id,
      recipient_id,
      subject,
      body,
      created_at: new Date().toISOString(),
      read: false,
    };
    mockMessages.push(newMessage);
    return newMessage;
  },

  async getConversations(): Promise<Conversation[]> {
    await delay();
    return [
      {
        other_user_id: "2",
        other_user_username: "Emma Stone",
        other_user_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        last_message: "Hey, I really liked your BTC analysis...",
        last_message_at: new Date(Date.now() - 3600000).toISOString(),
        unread_count: 1,
      },
      {
        other_user_id: "3",
        other_user_username: "David Bruno",
        other_user_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        last_message: "Check out my latest trade signal!",
        last_message_at: new Date(Date.now() - 7200000).toISOString(),
        unread_count: 0,
      },
    ];
  },

  async getMessages(other_user_id: string, page: number = 1): Promise<Message[]> {
    await delay();
    return mockMessages.filter(
      m => m.sender_id === other_user_id || m.recipient_id === other_user_id
    );
  },
};

// ==================== Token & Wallet APIs ====================

export const tokenApi = {
  async getBalance(): Promise<TokenBalance> {
    await delay();
    return {
      available_balance: 1250.50,
      locked_balance: 500.00,
      staked_balance: 5000.00,
      pending_rewards: 125.75,
      total_balance: 6876.25,
    };
  },

  async transfer(data: TokenTransferRequest): Promise<{ transaction_id: string; message: string }> {
    await delay();
    return {
      transaction_id: Math.random().toString(36).substr(2, 9),
      message: `Transferred ${data.amount} tokens to ${data.recipient_identifier}`,
    };
  },

  async stake(data: StakeRequest): Promise<{ message: string; stake_id: string }> {
    await delay();
    return {
      stake_id: Math.random().toString(36).substr(2, 9),
      message: `Staked ${data.amount} tokens in pool ${data.pool_id}`,
    };
  },

  async getStakingPools(): Promise<StakingPool[]> {
    await delay();
    return mockStakingPools;
  },
};

export const walletApi = {
  async createChallenge(wallet_address: string): Promise<WalletChallenge> {
    await delay();
    const challenge_code = Math.random().toString(36).substr(2, 20);
    return {
      challenge_code,
      message_to_sign: `Please sign this message to verify your wallet ownership:\n\nChallenge: ${challenge_code}\nTimestamp: ${Date.now()}`,
    };
  },

  async verifyWallet(data: WalletVerifyRequest): Promise<{ message: string }> {
    await delay();
    return {
      message: 'Wallet verified and linked successfully.',
    };
  },

  async getWallets(): Promise<{ wallets: Wallet[] }> {
    await delay();
    return {
      wallets: [
        {
          wallet_id: "1",
          wallet_address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
          is_primary: true,
        },
      ],
    };
  },
};

// ==================== Gamification APIs ====================

export const gamificationApi = {
  async getProfile(): Promise<GamificationProfile> {
    await delay();
    return {
      total_points: 1850,
      level: 12,
      current_streak: 7,
      longest_streak: 23,
      achievements_unlocked: 15,
      total_achievements: 50,
      leaderboard_rank: 234,
    };
  },

  async getAchievements(): Promise<Achievement[]> {
    await delay();
    return mockAchievements;
  },

  async getLeaderboard(type: string = 'top_earners'): Promise<LeaderboardEntry[]> {
    await delay();
    return [
      {
        rank: 1,
        user_id: "3",
        username: "David Bruno",
        avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        score: 15890,
        change: 2,
      },
      {
        rank: 2,
        user_id: "4",
        username: "Sarah Jhaveri",
        avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        score: 14250,
        change: -1,
      },
      {
        rank: 3,
        user_id: "1",
        username: "Michael Bruno",
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        score: 13420,
        change: 1,
      },
    ];
  },
};

// ==================== Community APIs ====================

export const communityApi = {
  async getCommunities(): Promise<Community[]> {
    await delay();
    const { mockCommunities } = await import('./mockData');
    return mockCommunities;
  },

  async getCommunity(community_id: string): Promise<Community> {
    await delay();
    const { getCommunityById } = await import('./mockData');
    const community = getCommunityById(community_id);
    if (!community) throw new Error('Community not found');
    return community;
  },

  async joinCommunity(community_id: string): Promise<{ message: string }> {
    await delay();
    return { message: 'Successfully joined community' };
  },

  async leaveCommunity(community_id: string): Promise<{ message: string }> {
    await delay();
    return { message: 'Successfully left community' };
  },
};

export default {
  auth: authApi,
  social: socialApi,
  messaging: messagingApi,
  token: tokenApi,
  wallet: walletApi,
  gamification: gamificationApi,
  community: communityApi,
};
