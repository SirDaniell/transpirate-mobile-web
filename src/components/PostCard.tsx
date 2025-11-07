import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, TrendingDown, Target, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
            <div className="flex items-center gap-2 mt-0.5">
              {post.symbol && (
                <span className="text-xs text-primary font-medium">{post.symbol}</span>
              )}
              {post.timeframe && (
                <span className="text-xs text-muted-foreground">• {post.timeframe}</span>
              )}
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{post.created_at}</span>
        </div>

        {/* Post Type Badges */}
        {(post.post_type === 'chart_analysis' || post.post_type === 'trade_signal') && (
          <div className="flex gap-2 mb-2">
            {post.post_type === 'chart_analysis' && (
              <Badge variant="secondary" className="text-xs">
                Chart Analysis
              </Badge>
            )}
            {post.post_type === 'trade_signal' && (
              <Badge variant="secondary" className="text-xs">
                Trade Signal
              </Badge>
            )}
            {post.prediction && (
              <Badge
                variant={post.prediction === 'bullish' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {post.prediction === 'bullish' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {post.prediction}
              </Badge>
            )}
            {post.confidence_level && (
              <Badge variant="outline" className="text-xs">
                {post.confidence_level} confidence
              </Badge>
            )}
          </div>
        )}

        <p className="text-sm text-foreground mb-3">{post.content_text}</p>

        {/* Trading Details for Chart Analysis */}
        {post.post_type === 'chart_analysis' && (
          <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-muted/50 rounded-lg">
            {post.target_price && (
              <div className="flex items-center gap-1 text-xs">
                <Target className="h-3 w-3 text-green-500" />
                <span className="text-muted-foreground">Target:</span>
                <span className="font-semibold text-foreground">${post.target_price.toLocaleString()}</span>
              </div>
            )}
            {post.stop_loss && (
              <div className="flex items-center gap-1 text-xs">
                <Shield className="h-3 w-3 text-red-500" />
                <span className="text-muted-foreground">Stop Loss:</span>
                <span className="font-semibold text-foreground">${post.stop_loss.toLocaleString()}</span>
              </div>
            )}
          </div>
        )}

        {/* Trading Details for Trade Signal */}
        {post.post_type === 'trade_signal' && (
          <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-muted/50 rounded-lg">
            {post.entry_price && (
              <div className="flex flex-col text-xs">
                <span className="text-muted-foreground">Entry</span>
                <span className="font-semibold text-foreground">${post.entry_price.toLocaleString()}</span>
              </div>
            )}
            {post.target_price && (
              <div className="flex flex-col text-xs">
                <span className="text-muted-foreground">Target</span>
                <span className="font-semibold text-green-500">${post.target_price.toLocaleString()}</span>
              </div>
            )}
            {post.stop_loss && (
              <div className="flex flex-col text-xs">
                <span className="text-muted-foreground">Stop Loss</span>
                <span className="font-semibold text-red-500">${post.stop_loss.toLocaleString()}</span>
              </div>
            )}
            {post.risk_reward_ratio && (
              <div className="flex flex-col text-xs">
                <span className="text-muted-foreground">R:R</span>
                <span className="font-semibold text-foreground">{post.risk_reward_ratio}:1</span>
              </div>
            )}
          </div>
        )}

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
