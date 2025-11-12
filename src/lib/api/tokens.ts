import { apiClient } from "./client";

export interface TokenBalance {
  available: string;
  staked: string;
  locked: string;
  pending_rewards: string;
}

export interface StakeResponse {
  stake_id: string;
  amount: string;
  timestamp: number;
  lock_period: number;
}

export interface UserStake {
  id: string;
  amount: string;
  stakedAt: string;
  unlockAt: string;
  apy: number;
  canUnstake: boolean;
}

export const tokenApi = {
  // Get user's token balance
  async getBalance(): Promise<TokenBalance> {
    try {
      return await apiClient.get<TokenBalance>("/tokens/balance");
    } catch (error) {
      // Mock data for development
      return {
        available: "10000.50",
        staked: "5000.00",
        locked: "1000.00",
        pending_rewards: "123.45",
      };
    }
  },

  // Transfer tokens
  async transfer(toAddress: string, amount: string): Promise<{ success: boolean }> {
    try {
      return await apiClient.post("/tokens/transfer", {
        to_address: toAddress,
        amount,
      });
    } catch (error) {
      console.error("Transfer error:", error);
      throw error;
    }
  },

  // Stake tokens
  async stake(amount: string, lockPeriod: number): Promise<StakeResponse> {
    try {
      return await apiClient.post("/tokens/stake", {
        amount,
        lock_period: lockPeriod,
      });
    } catch (error) {
      console.error("Stake error:", error);
      throw error;
    }
  },

  // Unstake tokens
  async unstake(stakeId: string): Promise<{ success: boolean }> {
    try {
      return await apiClient.post("/tokens/unstake", { stake_id: stakeId });
    } catch (error) {
      console.error("Unstake error:", error);
      throw error;
    }
  },

  // Get user stakes
  async getUserStakes(): Promise<UserStake[]> {
    try {
      const response = await apiClient.get<{ stakes: UserStake[] }>("/tokens/staking/user-stakes");
      return response.stakes;
    } catch (error) {
      // Mock data for development
      return [
        {
          id: "1",
          amount: "5000",
          stakedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          unlockAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          apy: 15,
          canUnstake: false,
        },
      ];
    }
  },

  // Claim rewards
  async claimRewards(): Promise<{ amount: string }> {
    try {
      return await apiClient.post("/tokens/claim-rewards");
    } catch (error) {
      console.error("Claim rewards error:", error);
      throw error;
    }
  },

  // Get pending rewards
  async getPendingRewards(): Promise<{ rewards: string }> {
    try {
      return await apiClient.get("/tokens/staking/pending-rewards");
    } catch (error) {
      return { rewards: "123.45" };
    }
  },
};
