import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "@/components/PostCard";
import { UserCard } from "@/components/UserCard";
import { AdBanner } from "@/components/AdBanner";
import { BottomNav } from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFeedPosts, mockUsers, getAds } from "@/lib/mockData";
import { ChevronRight, MessageSquare, Bookmark, TrendingUp, BarChart3, Users, Settings, Bell, Coins, Award } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Feed = () => {
  const navigate = useNavigate();
  const [posts] = useState(getFeedPosts());
  const [ads] = useState(getAds());
  const featuredUsers = mockUsers.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            Discover
            <span className="inline-block w-2 h-2 rounded-full bg-primary ml-2 mb-1" />
          </h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/notifications")}
              className="relative p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={mockUsers[0].avatar_url} />
                  <AvatarFallback>{mockUsers[0].username[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <Users className="h-4 w-4 mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/token-wallet")}>
                <Coins className="h-4 w-4 mr-2" />
                Token Wallet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/achievements")}>
                <Award className="h-4 w-4 mr-2" />
                Achievements
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/messages")}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/bookmarks")}>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmarks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/trending")}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/analytics")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/leaderboard")}>
                <Users className="h-4 w-4 mr-2" />
                Leaderboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {/* Featured Users Carousel */}
        <ScrollArea className="w-full">
          <div className="flex gap-3 p-4 overflow-x-auto">
            {featuredUsers.map((user) => (
              <div key={user.user_id} className="flex-shrink-0 w-24">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-primary p-0.5 mx-auto">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="absolute top-0 right-2 w-4 h-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    3
                  </span>
                </div>
                <p className="text-xs text-center mt-2 text-foreground truncate">
                  {user.username.split(" ")[0]}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Suggested Users */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">People You May Know</h2>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockUsers.slice(1, 3).map((user) => (
              <UserCard key={user.user_id} user={user} />
            ))}
          </div>
        </div>

        {/* Feed Posts with Tabs */}
        <div className="px-4">
          <Tabs defaultValue="latest" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="latest">Latest Posts</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="newsfeed">News Feed</TabsTrigger>
            </TabsList>

            <TabsContent value="latest" className="mt-0">
              {posts.map((post, index) => (
                <div key={post.post_id}>
                  <PostCard post={post} />
                  {index === 1 && ads[0] && <AdBanner ad={ads[0]} />}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="trending" className="mt-0">
              {posts.slice(0, 5).map((post) => (
                <PostCard key={post.post_id} post={post} />
              ))}
            </TabsContent>

            <TabsContent value="newsfeed" className="mt-0">
              {posts.slice(2, 7).map((post) => (
                <PostCard key={post.post_id} post={post} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Feed;
