import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User } from "@/lib/mockData";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: User;
  showFollowButton?: boolean;
}

export const UserCard = ({ user, showFollowButton = true }: UserCardProps) => {
  return (
    <Card className="p-4 border-0 shadow-sm">
      <Link to={`/profile/${user.user_id}`} className="flex items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar_url} alt={user.username} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-1">
          <h3 className="font-semibold text-sm text-foreground">{user.username}</h3>
          {user.location && (
            <p className="text-xs text-muted-foreground">{user.location}</p>
          )}
        </div>
      </Link>
      {showFollowButton && (
        <Button size="sm" className="w-full mt-3 rounded-full">
          Follow
        </Button>
      )}
    </Card>
  );
};
