import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import { UserCard } from "@/components/UserCard";
import { BottomNav } from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFeedPosts, mockUsers } from "@/lib/mockData";
import { ChevronRight } from "lucide-react";

const Feed = () => {
  const [posts] = useState(getFeedPosts());
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
          <Avatar className="h-8 w-8">
            <AvatarImage src={mockUsers[0].avatar_url} />
            <AvatarFallback>{mockUsers[0].username[0]}</AvatarFallback>
          </Avatar>
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

        {/* Feed Posts */}
        <div className="px-4">
          <h2 className="font-semibold text-foreground mb-3">Latest Posts</h2>
          {posts.map((post) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Feed;
