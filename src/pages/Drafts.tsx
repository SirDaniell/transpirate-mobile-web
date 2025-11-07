import { useState } from "react";
import { ArrowLeft, FileText, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { mockDrafts, Draft } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const Drafts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [drafts, setDrafts] = useState<Draft[]>(mockDrafts);

  const handleDelete = (draftId: string) => {
    setDrafts(drafts.filter((d) => d.draft_id !== draftId));
    toast({
      title: "Draft Deleted",
      description: "Your draft has been removed",
    });
  };

  const handlePublish = (draftId: string) => {
    setDrafts(drafts.filter((d) => d.draft_id !== draftId));
    toast({
      title: "Draft Published",
      description: "Your post is now live",
    });
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">My Drafts</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-3">
        {drafts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No drafts saved</p>
            <Button className="mt-4" onClick={() => navigate("/create")}>
              Create a Post
            </Button>
          </div>
        ) : (
          drafts.map((draft) => (
            <Card key={draft.draft_id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-foreground line-clamp-2">{draft.content_text}</p>
                    {draft.symbol && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Symbol: {draft.symbol}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Last edited: {draft.updated_at}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(draft.draft_id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/create?draft=${draft.draft_id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handlePublish(draft.draft_id)}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Drafts;
