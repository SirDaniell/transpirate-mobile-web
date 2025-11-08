import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image, Video, BarChart3, Code, Eye } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers } from "@/lib/mockData";
import { toast } from "sonner";

const Create = () => {
  const navigate = useNavigate();
  const currentUser = mockUsers[0];
  const [postType, setPostType] = useState<"standard" | "custom">("standard");
  const [content, setContent] = useState("");
  const [symbol, setSymbol] = useState("");
  const [prediction, setPrediction] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [jsContent, setJsContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = () => {
    if (postType === "standard" && !content.trim()) {
      toast.error("Please add some content to your post");
      return;
    }
    if (postType === "custom" && !htmlContent.trim()) {
      toast.error("Please add HTML content to your custom post");
      return;
    }
    toast.success("Post created successfully!");
    navigate("/");
  };

  const getPreviewHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          ${htmlContent}
          <script>${jsContent}</script>
        </body>
      </html>
    `;
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

        {/* Post Type Selector */}
        <Tabs value={postType} onValueChange={(v) => setPostType(v as any)} className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard Post</TabsTrigger>
            <TabsTrigger value="custom">
              <Code className="h-4 w-4 mr-2" />
              Custom Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-4 mt-4">
            {/* Content */}
            <Textarea
              placeholder="What's on your mind about trading?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none border-0 focus-visible:ring-0 text-base"
            />

            {/* Trading Details */}
            <div className="space-y-4">
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
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Create custom layouts with HTML, CSS, and JavaScript</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? "Edit" : "Preview"}
              </Button>
            </div>

            {previewMode ? (
              <div className="border border-border rounded-lg p-4 min-h-[400px] bg-card">
                <iframe
                  srcDoc={getPreviewHTML()}
                  className="w-full h-[400px] border-0"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            ) : (
              <Tabs defaultValue="html" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                </TabsList>

                <TabsContent value="html" className="mt-2">
                  <Textarea
                    placeholder="Enter your HTML..."
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </TabsContent>

                <TabsContent value="css" className="mt-2">
                  <Textarea
                    placeholder="Enter your CSS..."
                    value={cssContent}
                    onChange={(e) => setCssContent(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </TabsContent>

                <TabsContent value="js" className="mt-2">
                  <Textarea
                    placeholder="Enter your JavaScript..."
                    value={jsContent}
                    onChange={(e) => setJsContent(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Create;
