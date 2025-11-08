import { useState } from "react";
import { TrendingUp, Flame, Clock, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/PostCard";
import { BottomNav } from "@/components/BottomNav";
import { mockPosts, mockUsers } from "@/lib/mockData";

const Trending = () => {
  const [trendingTopics] = useState([
    { tag: "BTC", posts: 1234, change: "+12%" },
    { tag: "ETH", posts: 892, change: "+8%" },
    { tag: "DayTrading", posts: 654, change: "+25%" },
    { tag: "TechnicalAnalysis", posts: 543, change: "+5%" },
    { tag: "CryptoNews", posts: 432, change: "+18%" },
  ]);

  const [topTraders] = useState(mockUsers.slice(0, 5).map((user, i) => ({
    ...user,
    rank: i + 1,
    winRate: 65 + Math.random() * 30,
    followers: Math.floor(Math.random() * 10000) + 1000,
  })));

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Trending</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Flame className="h-4 w-4 mr-2" />
              Hot Posts
            </TabsTrigger>
            <TabsTrigger value="topics" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <TrendingUp className="h-4 w-4 mr-2" />
              Topics
            </TabsTrigger>
            <TabsTrigger value="traders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Award className="h-4 w-4 mr-2" />
              Top Traders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            {mockPosts.slice(0, 10).map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="topics" className="mt-0 p-4 space-y-3">
            {trendingTopics.map((topic, i) => (
              <Card key={i} className="p-4 hover:bg-accent/5 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-muted-foreground">#{i + 1}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">#{topic.tag}</h3>
                      <p className="text-sm text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success hover:bg-success/20">
                    {topic.change}
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="traders" className="mt-0 p-4 space-y-3">
            {topTraders.map((trader) => (
              <Card key={trader.user_id} className="p-4 hover:bg-accent/5 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-primary">#{trader.rank}</div>
                  <img
                    src={trader.avatar_url}
                    alt={trader.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{trader.username}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{trader.winRate.toFixed(1)}% Win Rate</span>
                      <span>•</span>
                      <span>{trader.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                  <Badge variant="secondary">Follow</Badge>
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

export default Trending;
