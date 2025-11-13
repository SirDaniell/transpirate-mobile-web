import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { Wallet, TrendingUp, Award, Bell } from "lucide-react";
import { tokenApi, TokenBalance } from "@/lib/api/tokens";
import { gamificationApi, GamificationProfile } from "@/lib/api/gamification";
import { useToast } from "@/hooks/use-toast";
import { useAddress } from "@thirdweb-dev/react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const address = useAddress();
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [profile, setProfile] = useState<GamificationProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [balanceData, profileData] = await Promise.all([
        tokenApi.getBalance(),
        gamificationApi.getProfile(),
      ]);
      setBalance(balanceData);
      setProfile(profileData);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <button
            onClick={() => navigate("/notifications")}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-accent"
          >
            <Bell className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Welcome Message */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Welcome back!
          </h2>
          <p className="text-sm text-muted-foreground">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect your wallet"}
          </p>
        </div>

        {/* BESHA Balance Card */}
        <Card
          className="cursor-pointer hover:bg-accent/5 transition-colors"
          onClick={() => navigate("/wallet")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              BESHA Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {balance?.available || "0.00"}
                </p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="text-foreground font-semibold">{balance?.staked || "0.00"}</p>
                  <p className="text-xs text-muted-foreground">Staked</p>
                </div>
                <div>
                  <p className="text-success font-semibold">{balance?.pending_rewards || "0.00"}</p>
                  <p className="text-xs text-muted-foreground">Rewards</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gamification Card */}
        <Card
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/gamification")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-primary">Gamification Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{profile?.level || 0}</p>
                <p className="text-xs text-muted-foreground">Level</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{profile?.points || 0}</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{profile?.streak || 0}</p>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="cursor-pointer hover:bg-accent/5 transition-colors"
            onClick={() => navigate("/create")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-foreground">Create Post</p>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer hover:bg-accent/5 transition-colors"
            onClick={() => navigate("/leaderboard")}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Award className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-foreground">Leaderboard</p>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm text-foreground">
              Your social graph and revenue are stored on-chain. All posts and interactions
              contribute to your Web3 reputation and earnings.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
