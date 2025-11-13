import { useState } from "react";
import { ArrowLeft, Shield, Plus, Gem, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MOCK_STAKES = [
  { id: 's1', pool: 'BESHA-USDC', amount: 3000.00, apy: 12.5, lockup: '90 days' },
  { id: 's2', pool: 'BESHA-ETH', amount: 2000.00, apy: 8.9, lockup: '30 days' },
];

const MOCK_USER = {
  beshaBalance: 1250.75,
  pendingRewards: 45.21,
};

const Staking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [strategyPrompt, setStrategyPrompt] = useState(`My current stakes: BESHA-USDC: ${MOCK_STAKES[0].amount}, BESHA-ETH: ${MOCK_STAKES[1].amount}.`);
  const [strategyResult, setStrategyResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateStrategy = async () => {
    setIsLoading(true);
    setStrategyResult('');

    // Simulate API call
    setTimeout(() => {
      const mockStrategy = `• **Diversification**: Consider adding exposure to BESHA-BNB pool for cross-chain yield optimization.\n\n• **Risk Management**: Your 90-day lockup provides higher APY (12.5%) but reduces liquidity. Balance with shorter-term positions.\n\n• **Yield Optimization**: Monitor APY fluctuations and compound rewards weekly for maximum returns.`;
      setStrategyResult(mockStrategy);
      setIsLoading(false);
      toast({
        title: "Strategy Generated",
        description: "Your personalized staking strategy is ready.",
      });
    }, 2000);
  };

  const handleClaimRewards = () => {
    toast({
      title: "Rewards Claimed",
      description: `${MOCK_USER.pendingRewards.toFixed(2)} BESHA claimed successfully!`,
    });
  };

  const handleUnstake = (poolName: string) => {
    toast({
      title: "Unstaking Initiated",
      description: `Your ${poolName} stake is being processed.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Staking Dashboard</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Pending Rewards */}
        <Card className="border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
              Pending Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
              {MOCK_USER.pendingRewards.toFixed(2)} BESHA
            </p>
            <Button onClick={handleClaimRewards} className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Claim All Rewards
            </Button>
          </CardContent>
        </Card>

        {/* Current Stakes */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            Current Stakes ({MOCK_STAKES.length})
          </h2>
          <div className="space-y-3">
            {MOCK_STAKES.map((stake) => (
              <Card key={stake.id} className="border-l-4 border-primary">
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    {stake.pool}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">
                        {stake.amount.toFixed(2)} BESHA
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Lockup: {stake.lockup}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-bold text-green-500 text-lg">
                        {stake.apy}% APY
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleUnstake(stake.pool)}
                      >
                        Unstake
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gemini Strategy Generator */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
            <Gem className="h-6 w-6 mr-2" />
            Strategy Generator
          </h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Get Personalized Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ask AI for a tailored strategy based on your stakes.
              </p>
              <Textarea
                value={strategyPrompt}
                onChange={(e) => setStrategyPrompt(e.target.value)}
                placeholder="Add details about your risk tolerance or goals..."
                rows={3}
                className="resize-none"
              />
              <Button
                onClick={generateStrategy}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Strategy
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {strategyResult && (
            <Card className="mt-4 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">Generated Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: strategyResult
                      .split('\n')
                      .map((line) => line.trim())
                      .join('<br />'),
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Staking;
