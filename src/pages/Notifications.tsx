import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNav } from "@/components/BottomNav";
import { mockUsers } from "@/lib/mockData";
import { Heart, MessageCircle, UserPlus } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: "1",
      user: mockUsers[1],
      type: "like",
      message: "liked your post",
      time: "5m ago",
      icon: Heart,
    },
    {
      id: "2",
      user: mockUsers[2],
      type: "follow",
      message: "started following you",
      time: "1h ago",
      icon: UserPlus,
    },
    {
      id: "3",
      user: mockUsers[3],
      type: "comment",
      message: "commented on your post",
      time: "2h ago",
      icon: MessageCircle,
    },
    {
      id: "4",
      user: mockUsers[1],
      type: "like",
      message: "liked your analysis on BTCUSD",
      time: "3h ago",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        <div className="divide-y divide-border">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div key={notification.id} className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={notification.user.avatar_url} />
                  <AvatarFallback>{notification.user.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{notification.user.username}</span>{" "}
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
                </div>
                <div
                  className={`p-2 rounded-full ${
                    notification.type === "like"
                      ? "bg-destructive/10"
                      : notification.type === "follow"
                      ? "bg-primary/10"
                      : "bg-info/10"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      notification.type === "like"
                        ? "text-destructive"
                        : notification.type === "follow"
                        ? "text-primary"
                        : "text-info"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Notifications;
