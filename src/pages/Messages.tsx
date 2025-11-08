import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Send, Image, Paperclip } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockUsers } from "@/lib/mockData";

const Messages = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  
  const conversations = mockUsers.slice(1, 6).map(user => ({
    user,
    lastMessage: "Hey! How's your trading going?",
    timestamp: "2h ago",
    unread: Math.random() > 0.5 ? Math.floor(Math.random() * 5) : 0,
  }));

  const selectedConversation = conversations.find(c => c.user.user_id === selectedChat);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Chat List */}
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-96 border-r border-border`}>
        <header className="sticky top-0 z-40 bg-card border-b border-border">
          <div className="px-4 h-14 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">Messages</h1>
            <Button size="icon" variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.user.user_id}
              onClick={() => setSelectedChat(conv.user.user_id)}
              className="flex items-center gap-3 p-4 hover:bg-accent/5 cursor-pointer border-b border-border"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={conv.user.avatar_url} />
                <AvatarFallback>{conv.user.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm text-foreground truncate">
                    {conv.user.username}
                  </h3>
                  <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-semibold">{conv.unread}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedConversation ? (
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-40 bg-card border-b border-border">
            <div className="px-4 h-14 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedChat(null)}
                className="md:hidden"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.user.avatar_url} />
                <AvatarFallback>{selectedConversation.user.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-foreground">{selectedConversation.user.username}</h2>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Mock Messages */}
            <div className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedConversation.user.avatar_url} />
              </Avatar>
              <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2 max-w-[70%]">
                <p className="text-sm">Hey! How's your trading going?</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-2 max-w-[70%]">
                <p className="text-sm">Great! Just made a profitable trade on BTC</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border p-4">
            <div className="flex items-end gap-2">
              <Button variant="ghost" size="icon">
                <Image className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Textarea
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[44px] max-h-32 resize-none"
              />
              <Button size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
          Select a conversation to start messaging
        </div>
      )}
    </div>
  );
};

export default Messages;
