import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Grid3X3, Bookmark, Share2, Link2, Flag, Ban, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";
import { getUserById, mockUsers, getFeedPosts } from "@/lib/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = userId ? getUserById(userId) : mockUsers[0];
  const [posts] = useState(getFeedPosts().slice(0, 9));
  const isOwnProfile = !userId || userId === mockUsers[0].user_id;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pb-20">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-foreground"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">{user.username}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <MoreVertical className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied to clipboard" });
              }}>
                <Link2 className="h-4 w-4 mr-2" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                toast({ title: "Profile shared" });
              }}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </DropdownMenuItem>
              {isOwnProfile ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    toast({ title: "User reported" });
                  }}>
                    <Flag className="h-4 w-4 mr-2" />
                    Report User
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    toast({ title: "User blocked" });
                  }}>
                    <Ban className="h-4 w-4 mr-2" />
                    Block User
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {/* Profile Info */}
        <div className="p-4">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user.username}</h2>
              {user.location && (
                <p className="text-sm text-muted-foreground">{user.location}</p>
              )}
              {user.bio && (
                <p className="text-sm text-foreground mt-2">{user.bio}</p>
              )}
            </div>
          </div>

          <Button className="w-full rounded-full mb-4">Follow</Button>

          {/* Stats */}
          <div className="flex justify-around py-4 border-y border-border">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{user.posts_count || 0}</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">
                {user.followers_count ? (user.followers_count / 1000000).toFixed(1) + "M" : 0}
              </p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{user.following_count || 0}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-12">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div
                  key={post.post_id}
                  className="aspect-square bg-muted cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/post/${post.post_id}`)}
                >
                  {post.media_urls && post.media_urls[0] ? (
                    <img
                      src={post.media_urls[0]}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No saved posts yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
