import { useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNav } from "@/components/BottomNav";
import { mockUsers } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const mockVids = [
  {
    id: "1",
    video_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
    user: mockUsers[0],
    description: "Amazing sunset at the beach 🌅 #travel #nature",
    likes: 12500,
    comments: 456,
    shares: 234,
  },
  {
    id: "2",
    video_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    user: mockUsers[1],
    description: "Mountain adventure vibes ⛰️ #hiking #adventure",
    likes: 8900,
    comments: 234,
    shares: 123,
  },
  {
    id: "3",
    video_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    user: mockUsers[2],
    description: "Stargazing tonight ✨ #astronomy #night",
    likes: 15600,
    comments: 678,
    shares: 345,
  },
];

const Vids = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentVid = mockVids[currentIndex];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Video Container */}
      <div className="relative h-screen w-full">
        {/* Video/Image */}
        <div className="absolute inset-0">
          <img
            src={currentVid.video_url}
            alt="Video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-white">Vids</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <MoreVertical className="h-6 w-6" />
          </Button>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-32 z-10 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-destructive text-destructive" : ""}`} />
            </Button>
            <span className="text-xs font-semibold text-white">
              {(currentVid.likes + (liked ? 1 : 0)).toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-xs font-semibold text-white">
              {currentVid.comments}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={`h-6 w-6 ${saved ? "fill-primary text-primary" : ""}`} />
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            >
              <Share2 className="h-6 w-6" />
            </Button>
            <span className="text-xs font-semibold text-white">
              {currentVid.shares}
            </span>
          </div>

          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src={currentVid.user.avatar_url} />
            <AvatarFallback>{currentVid.user.username[0]}</AvatarFallback>
          </Avatar>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-24 left-4 right-20 z-10">
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentVid.user.avatar_url} />
              <AvatarFallback>{currentVid.user.username[0]}</AvatarFallback>
            </Avatar>
            <span className="text-white font-semibold">@{currentVid.user.username}</span>
            <Button
              size="sm"
              className="ml-2 h-7 rounded-full bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              Follow
            </Button>
          </div>
          <p className="text-white text-sm">{currentVid.description}</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Vids;
