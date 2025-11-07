import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Post } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <Card className="mb-4 overflow-hidden border-0 shadow-sm">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user_avatar} alt={post.username} />
            <AvatarFallback>{post.username[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1">
            <h3 className="font-semibold text-sm text-foreground">{post.username}</h3>
            {post.symbol && (
              <p className="text-xs text-primary font-medium">{post.symbol}</p>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{post.created_at}</span>
        </div>

        <p className="text-sm text-foreground mb-3">{post.content_text}</p>

        {post.media_urls && post.media_urls.length > 0 && (
          <Link to={`/post/${post.post_id}`}>
            <img
              src={post.media_urls[0]}
              alt="Post content"
              className="w-full rounded-xl object-cover aspect-[4/3] mb-3"
            />
          </Link>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 hover:bg-transparent"
              onClick={handleLike}
            >
              <Heart
                className={`h-5 w-5 mr-1 ${
                  isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
                }`}
              />
              <span className="text-sm text-muted-foreground">{likesCount}</span>
            </Button>

            <Link to={`/post/${post.post_id}`}>
              <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
                <MessageCircle className="h-5 w-5 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{post.comments_count}</span>
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
              <Share2 className="h-5 w-5 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{post.shares_count}</span>
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-auto p-0 hover:bg-transparent">
            <Bookmark className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
