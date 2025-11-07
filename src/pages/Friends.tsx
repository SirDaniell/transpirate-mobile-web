import { useState } from "react";
import { UserPlus, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { mockFriendRequests, mockFriends, FriendRequest, Friendship } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const navigate = useNavigate();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(mockFriendRequests);
  const [friends] = useState<Friendship[]>(mockFriends);

  const handleAcceptRequest = (requestId: string) => {
    setFriendRequests(friendRequests.filter((r) => r.request_id !== requestId));
  };

  const handleRejectRequest = (requestId: string) => {
    setFriendRequests(friendRequests.filter((r) => r.request_id !== requestId));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Friends</h1>
          <Button size="icon" variant="ghost">
            <UserPlus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="requests">
              Requests ({friendRequests.length})
            </TabsTrigger>
            <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-3 p-4">
            {friendRequests.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending friend requests</p>
              </div>
            ) : (
              friendRequests.map((request) => (
                <Card key={request.request_id} className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 cursor-pointer" onClick={() => navigate(`/profile/${request.requester_id}`)}>
                      <AvatarImage src={request.requester_avatar} />
                      <AvatarFallback>{request.requester_username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {request.requester_username}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {request.created_at}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="default"
                        className="h-9 w-9 rounded-full"
                        onClick={() => handleAcceptRequest(request.request_id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full"
                        onClick={() => handleRejectRequest(request.request_id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="friends" className="space-y-3 p-4">
            {friends.map((friend) => (
              <Card key={friend.friend_id} className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 cursor-pointer" onClick={() => navigate(`/profile/${friend.friend_id}`)}>
                    <AvatarImage src={friend.avatar_url} />
                    <AvatarFallback>{friend.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{friend.username}</h3>
                    {friend.mutual_friends && (
                      <p className="text-sm text-muted-foreground">
                        {friend.mutual_friends} mutual friends
                      </p>
                    )}
                  </div>
                  <Button size="sm" variant="outline" className="rounded-full">
                    Message
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Friends;
