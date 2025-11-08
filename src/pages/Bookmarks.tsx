import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/PostCard";
import { BottomNav } from "@/components/BottomNav";
import { mockPosts } from "@/lib/mockData";

const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarkedPosts] = useState(mockPosts.slice(0, 5));

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Bookmark className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Bookmarks</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              All Posts
            </TabsTrigger>
            <TabsTrigger value="signals" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Signals
            </TabsTrigger>
            <TabsTrigger value="analysis" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {bookmarkedPosts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="signals" className="mt-0">
            {bookmarkedPosts.filter(p => p.post_type === 'trade_signal').map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="analysis" className="mt-0">
            {bookmarkedPosts.filter(p => p.post_type === 'chart_analysis').map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Bookmarks;
