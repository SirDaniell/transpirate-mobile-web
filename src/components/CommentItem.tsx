import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Comment } from "@/lib/mockData";
import { useState } from "react";

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes_count);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="flex gap-3 py-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={comment.user_avatar} alt={comment.username} />
        <AvatarFallback>{comment.username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-foreground">{comment.username}</h4>
            <p className="text-sm text-muted-foreground mt-1">{comment.comment_text}</p>
            <span className="text-xs text-muted-foreground mt-1 inline-block">
              {comment.created_at}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 hover:bg-transparent ml-2"
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 ${
                isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
