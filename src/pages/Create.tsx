import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image, Video, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockUsers } from "@/lib/mockData";
import { toast } from "sonner";

const Create = () => {
  const navigate = useNavigate();
  const currentUser = mockUsers[0];
  const [content, setContent] = useState("");
  const [symbol, setSymbol] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }
    toast.success("Post created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-lg font-semibold text-foreground">Create Post</h1>
          <Button onClick={handleSubmit}>Post</Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4">
        {/* User Info */}
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar_url} />
            <AvatarFallback>{currentUser.username[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h3 className="font-semibold text-sm text-foreground">{currentUser.username}</h3>
            <p className="text-xs text-muted-foreground">Public</p>
          </div>
        </div>

        {/* Content */}
        <Textarea
          placeholder="What's on your mind about trading?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px] mb-4 resize-none border-0 focus-visible:ring-0 text-base"
        />

        {/* Trading Details */}
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol (Optional)</Label>
            <Input
              id="symbol"
              placeholder="e.g., BTCUSD, ETHUSD"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prediction">Prediction (Optional)</Label>
            <Select value={prediction} onValueChange={setPrediction}>
              <SelectTrigger id="prediction">
                <SelectValue placeholder="Select prediction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bullish">Bullish 📈</SelectItem>
                <SelectItem value="bearish">Bearish 📉</SelectItem>
                <SelectItem value="neutral">Neutral ➡️</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Media Options */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex flex-col h-20 gap-1">
            <Image className="h-5 w-5" />
            <span className="text-xs">Photo</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-20 gap-1">
            <Video className="h-5 w-5" />
            <span className="text-xs">Video</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-20 gap-1">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Chart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
