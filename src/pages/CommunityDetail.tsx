import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Users, Lock, MoreVertical, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/PostCard";
import { UserCard } from "@/components/UserCard";
import { mockCommunities, mockPosts, mockUsers } from "@/lib/mockData";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { communityId } = useParams();
  const community = mockCommunities.find(c => c.community_id === communityId) || mockCommunities[0];
  const [isMember, setIsMember] = useState(community.is_member);

  const communityPosts = mockPosts.slice(0, 5);
  const communityMembers = mockUsers.slice(0, 10);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {/* Community Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start gap-3 mb-4">
            {community.avatar_url && (
              <img
                src={community.avatar_url}
                alt={community.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-foreground">{community.name}</h1>
                {community.is_private && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{community.member_count.toLocaleString()} members</span>
                </div>
                <span>•</span>
                <span>{community.post_count.toLocaleString()} posts</span>
              </div>
              <p className="text-sm text-foreground">{community.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {isMember ? (
              <>
                <Button
                  className="flex-1"
                  onClick={() => navigate("/create")}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsMember(false)}
                >
                  Joined
                </Button>
              </>
            ) : (
              <Button
                className="flex-1"
                onClick={() => setIsMember(true)}
              >
                Join Community
              </Button>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Posts
            </TabsTrigger>
            <TabsTrigger value="members" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Members
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            {communityPosts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="members" className="mt-0 p-4 space-y-3">
            {communityMembers.map((user) => (
              <UserCard key={user.user_id} user={user} />
            ))}
          </TabsContent>

          <TabsContent value="about" className="mt-0 p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{community.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Community Rules</h3>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Be respectful to all members</li>
                <li>No spam or self-promotion</li>
                <li>Share quality trading insights</li>
                <li>No financial advice disclaimers required</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityDetail;
