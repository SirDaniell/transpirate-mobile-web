import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import { getFeedPosts } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const [posts] = useState(getFeedPosts());

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, users, symbols..."
              className="pl-10 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {/* Explore Grid */}
        <div className="grid grid-cols-3 gap-1">
          {[...posts, ...posts].map((post, index) => (
            <div
              key={`${post.post_id}-${index}`}
              className="aspect-square bg-muted cursor-pointer overflow-hidden"
              onClick={() => navigate(`/post/${post.post_id}`)}
            >
              {post.media_urls && post.media_urls[0] ? (
                <img
                  src={post.media_urls[0]}
                  alt="Post"
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <p className="text-xs text-center text-muted-foreground p-2">
                    {post.content_text.slice(0, 30)}...
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Explore;
