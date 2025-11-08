import { useState } from "react";
import { Search as SearchIcon, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/PostCard";
import { UserCard } from "@/components/UserCard";
import { BottomNav } from "@/components/BottomNav";
import { mockPosts, mockUsers } from "@/lib/mockData";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingSearches] = useState([
    "Bitcoin analysis",
    "Day trading tips",
    "ETH price prediction",
    "Trading signals",
    "Crypto news",
  ]);

  const filteredPosts = mockPosts.filter(post =>
    post.content_text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, people, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {!searchQuery ? (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <TrendingUp className="h-4 w-4" />
              Trending Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                All
              </TabsTrigger>
              <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                Posts ({filteredPosts.length})
              </TabsTrigger>
              <TabsTrigger value="people" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                People ({filteredUsers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="p-4 space-y-4">
                <h3 className="font-semibold text-foreground">Posts</h3>
                {filteredPosts.slice(0, 3).map((post) => (
                  <PostCard key={post.post_id} post={post} />
                ))}
                <h3 className="font-semibold text-foreground mt-6">People</h3>
                {filteredUsers.slice(0, 3).map((user) => (
                  <UserCard key={user.user_id} user={user} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="posts" className="mt-0">
              {filteredPosts.map((post) => (
                <PostCard key={post.post_id} post={post} />
              ))}
            </TabsContent>

            <TabsContent value="people" className="mt-0 p-4 space-y-3">
              {filteredUsers.map((user) => (
                <UserCard key={user.user_id} user={user} />
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Search;
