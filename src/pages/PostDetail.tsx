import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentItem } from "@/components/CommentItem";
import { getPostById, getPostComments } from "@/lib/mockData";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = getPostById(postId || "");
  const [comments] = useState(getPostComments(postId || ""));
  const [isLiked, setIsLiked] = useState(post?.is_liked || false);
  const [likesCount, setLikesCount] = useState(post?.likes_count || 0);
  const [commentText, setCommentText] = useState("");

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleSubmitComment = () => {
    // Mock comment submission
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="max-w-lg mx-auto">
          {/* Top bar */}
          <div className="px-4 h-14 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary-dark"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-dark"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Post Image */}
          {post.media_urls && post.media_urls.length > 0 && (
            <div className="relative">
              <img
                src={post.media_urls[0]}
                alt="Post content"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Pagination dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full ${
                      i === 2 ? "w-6 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-lg mx-auto bg-card">
        {/* Post Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user_avatar} alt={post.username} />
              <AvatarFallback>{post.username[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1">
              <h3 className="font-semibold text-sm text-foreground">{post.username}</h3>
              <p className="text-xs text-primary font-medium">#BeautifulPerson</p>
            </div>
            <span className="text-xs text-muted-foreground">{post.created_at}</span>
          </div>

          <p className="text-sm text-foreground mb-3">{post.content_text}</p>

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

            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{post.comments_count}</span>
            </div>

            <div className="flex items-center">
              <Share2 className="h-5 w-5 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{post.shares_count}</span>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="px-4">
          <h3 className="font-semibold text-foreground py-3">Comments</h3>
          <div className="divide-y divide-border">
            {comments.map((comment) => (
              <CommentItem key={comment.comment_id} comment={comment} />
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div className="sticky bottom-0 p-4 bg-card border-t border-border">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 rounded-full"
            />
            <Button
              size="icon"
              className="rounded-full"
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
