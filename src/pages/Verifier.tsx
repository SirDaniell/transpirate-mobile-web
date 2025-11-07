import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";
import { mockVerificationTasks, mockVerifierStats, VerificationTask } from "@/lib/mockData";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Verifier = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<VerificationTask[]>(mockVerificationTasks);
  const [stats] = useState(mockVerifierStats);
  const [selectedTask, setSelectedTask] = useState<VerificationTask | null>(null);
  const [notes, setNotes] = useState("");

  const handleVerify = (taskId: string, status: "approved" | "rejected" | "flagged") => {
    setTasks(tasks.filter((t) => t.transaction_id !== taskId));
    setSelectedTask(null);
    setNotes("");
    toast({
      title: "Verification Submitted",
      description: `Transaction ${status}`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Verifier Dashboard</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4">
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="tasks">Pending Tasks ({tasks.length})</TabsTrigger>
            <TabsTrigger value="stats">My Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-3 mt-4">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending verification tasks</p>
              </div>
            ) : (
              tasks.map((task) => (
                <Card key={task.transaction_id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{task.username}</h3>
                        <p className="text-sm text-muted-foreground">{task.created_at}</p>
                      </div>
                      <Badge variant="secondary">{task.status}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-semibold text-foreground">
                          {task.amount} {task.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm items-center">
                        <span className="text-muted-foreground">Transaction Hash</span>
                        <div className="flex items-center gap-2">
                          <code className="text-xs text-foreground">
                            {task.transaction_hash.slice(0, 8)}...{task.transaction_hash.slice(-6)}
                          </code>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {selectedTask?.transaction_id === task.transaction_id ? (
                      <div className="space-y-3 pt-3 border-t">
                        <Textarea
                          placeholder="Add verification notes..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleVerify(task.transaction_id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleVerify(task.transaction_id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleVerify(task.transaction_id, "flagged")}
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedTask(task)}
                      >
                        Review Transaction
                      </Button>
                    )}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Verifications</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.total_verifications}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Accuracy Rate</p>
                <p className="text-2xl font-bold text-green-500">
                  {stats.accuracy_rate}%
                </p>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Verification Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-foreground">Approved</span>
                  </div>
                  <span className="font-semibold text-foreground">{stats.approved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-foreground">Rejected</span>
                  </div>
                  <span className="font-semibold text-foreground">{stats.rejected}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-foreground">Flagged</span>
                  </div>
                  <span className="font-semibold text-foreground">{stats.flagged}</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Verifier;
