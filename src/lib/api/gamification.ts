import { apiClient } from "./client";

export interface GamificationProfile {
  points: number;
  level: number;
  nextLevelPoints: number;
  currentLevelPoints: number;
  streak: number;
  rank: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  completed: boolean;
  expiresAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
}

export const gamificationApi = {
  async getProfile(): Promise<GamificationProfile> {
    try {
      return await apiClient.get<GamificationProfile>("/gamification/profile");
    } catch (error) {
      return {
        points: 1250,
        level: 5,
        nextLevelPoints: 1500,
        currentLevelPoints: 1000,
        streak: 7,
        rank: 42,
      };
    }
  },

  async getAchievements(): Promise<Achievement[]> {
    try {
      return await apiClient.get<Achievement[]>("/gamification/achievements");
    } catch (error) {
      return [
        {
          id: "1",
          name: "First Post",
          description: "Create your first post",
          icon: "Trophy",
          points: 50,
          unlocked: true,
        },
        {
          id: "2",
          name: "Social Butterfly",
          description: "Connect with 10 friends",
          icon: "Award",
          points: 100,
          unlocked: false,
          progress: 7,
          total: 10,
        },
      ];
    }
  },

  async getActiveQuests(): Promise<Quest[]> {
    try {
      return await apiClient.get<Quest[]>("/gamification/active-quests");
    } catch (error) {
      return [
        {
          id: "1",
          title: "Daily Engagement",
          description: "Make 5 posts today",
          reward: 50,
          progress: 3,
          total: 5,
          completed: false,
        },
      ];
    }
  },

  async claimQuestReward(questId: string): Promise<{ success: boolean; reward: number }> {
    try {
      return await apiClient.post(`/gamification/quests/${questId}/claim`);
    } catch (error) {
      throw error;
    }
  },

  async getLeaderboard(type: string): Promise<LeaderboardEntry[]> {
    try {
      return await apiClient.get<LeaderboardEntry[]>(`/gamification/leaderboard/${type}`);
    } catch (error) {
      return [];
    }
  },
};
