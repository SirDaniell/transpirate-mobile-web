import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Users, Lock, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { mockCommunities, Community } from "@/lib/mockData";

const Communities = () => {
  const navigate = useNavigate();
  const [communities] = useState<Community[]>(mockCommunities);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Communities</h1>
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Communities List */}
        <div className="space-y-3">
          {filteredCommunities.map((community) => (
            <Card
              key={community.community_id}
              className="p-4 cursor-pointer hover:bg-accent/5 transition-colors"
              onClick={() => navigate(`/community/${community.community_id}`)}
            >
              <div className="flex items-start gap-3">
                {community.avatar_url && (
                  <img
                    src={community.avatar_url}
                    alt={community.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {community.name}
                    </h3>
                    {community.is_private && (
                      <Lock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {community.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{community.member_count.toLocaleString()} members</span>
                    </div>
                    <span>•</span>
                    <span>{community.post_count.toLocaleString()} posts</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {community.is_member ? (
                    <Badge variant="secondary">Joined</Badge>
                  ) : (
                    <Button size="sm" className="rounded-full">
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Communities;
