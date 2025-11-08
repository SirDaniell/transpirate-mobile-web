import { useState } from "react";
import { Trophy, TrendingUp, Award, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNav } from "@/components/BottomNav";
import { mockUsers } from "@/lib/mockData";

const Leaderboard = () => {
  const [topTraders] = useState(
    mockUsers.map((user, i) => ({
      ...user,
      rank: i + 1,
      winRate: 50 + Math.random() * 40,
      totalProfitPercent: Math.random() * 200,
      trades: Math.floor(Math.random() * 500) + 100,
      followers: Math.floor(Math.random() * 10000) + 500,
    })).sort((a, b) => b.totalProfitPercent - a.totalProfitPercent)
  );

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-warning" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-muted-foreground" />;
    if (rank === 3) return <Trophy className="h-5 w-5 text-[hsl(30,70%,50%)]" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" />
          <h1 className="text-lg font-semibold text-foreground">Leaderboard</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        <Tabs defaultValue="profit" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="profit" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <TrendingUp className="h-4 w-4 mr-2" />
              Profit
            </TabsTrigger>
            <TabsTrigger value="winrate" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Target className="h-4 w-4 mr-2" />
              Win Rate
            </TabsTrigger>
            <TabsTrigger value="followers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Award className="h-4 w-4 mr-2" />
              Followers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profit" className="mt-0 p-4 space-y-3">
            {topTraders.map((trader) => (
              <Card key={trader.user_id} className="p-4 hover:bg-accent/5 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 flex items-center justify-center">
                    {getRankBadge(trader.rank)}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={trader.avatar_url} />
                    <AvatarFallback>{trader.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{trader.username}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{trader.trades} trades</span>
                      <span>•</span>
                      <span>{trader.winRate.toFixed(1)}% win rate</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">
                      +{trader.totalProfitPercent.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Total Profit</div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="winrate" className="mt-0 p-4 space-y-3">
            {[...topTraders].sort((a, b) => b.winRate - a.winRate).map((trader, i) => (
              <Card key={trader.user_id} className="p-4 hover:bg-accent/5 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 flex items-center justify-center">
                    {getRankBadge(i + 1)}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={trader.avatar_url} />
                    <AvatarFallback>{trader.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{trader.username}</h3>
                    <div className="text-xs text-muted-foreground">{trader.trades} trades</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {trader.winRate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="followers" className="mt-0 p-4 space-y-3">
            {[...topTraders].sort((a, b) => b.followers - a.followers).map((trader, i) => (
              <Card key={trader.user_id} className="p-4 hover:bg-accent/5 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 flex items-center justify-center">
                    {getRankBadge(i + 1)}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={trader.avatar_url} />
                    <AvatarFallback>{trader.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{trader.username}</h3>
                    <div className="text-xs text-muted-foreground">
                      {trader.winRate.toFixed(1)}% win rate
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      {trader.followers.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Leaderboard;
