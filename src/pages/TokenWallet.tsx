import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Coins, TrendingUp, Lock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BottomNav } from "@/components/BottomNav";
import { tokenApi, TokenBalance, StakingPool } from "@/lib/mockApi";
import { toast } from "sonner";

const TokenWallet = () => {
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [stakingPools, setStakingPools] = useState<StakingPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [balanceData, poolsData] = await Promise.all([
        tokenApi.getBalance(),
        tokenApi.getStakingPools(),
      ]);
      setBalance(balanceData);
      setStakingPools(poolsData);
    } catch (error) {
      toast.error("Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tokenApi.transfer({
        recipient_identifier: recipientEmail,
        amount: parseFloat(transferAmount),
      });
      toast.success("Transfer successful!");
      setTransferAmount("");
      setRecipientEmail("");
      loadData();
    } catch (error) {
      toast.error("Transfer failed");
    }
  };

  const handleStake = async (pool_id: string, amount: number) => {
    try {
      await tokenApi.stake({ pool_id, amount });
      toast.success("Tokens staked successfully!");
      loadData();
    } catch (error) {
      toast.error("Staking failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading wallet...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <h1 className="text-xl font-bold text-foreground">Token Wallet</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Balance Overview */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardDescription>Total Balance</CardDescription>
            <CardTitle className="text-4xl">{balance?.total_balance.toFixed(2)} TKN</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Available</p>
                <p className="font-semibold">{balance?.available_balance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Staked</p>
                <p className="font-semibold">{balance?.staked_balance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Locked</p>
                <p className="font-semibold">{balance?.locked_balance.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pending Rewards</p>
                <p className="font-semibold text-green-500">{balance?.pending_rewards.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <ArrowUpRight className="h-5 w-5" />
                Send
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Tokens</DialogTitle>
                <DialogDescription>Transfer tokens to another user</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleTransfer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Email</Label>
                  <Input
                    id="recipient"
                    type="email"
                    placeholder="user@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Send Tokens</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="h-20 flex flex-col gap-2">
            <ArrowDownRight className="h-5 w-5" />
            Receive
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="staking" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="staking">Staking Pools</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="staking" className="space-y-4 mt-4">
            {stakingPools.map((pool) => (
              <Card key={pool.pool_id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{pool.name}</CardTitle>
                      <CardDescription>{pool.participants} participants</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{pool.apy}%</p>
                      <p className="text-xs text-muted-foreground">APY</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-muted-foreground">Min Stake: {pool.min_stake} TKN</span>
                    <span className="text-muted-foreground">Total: {pool.total_staked.toLocaleString()} TKN</span>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleStake(pool.pool_id, pool.min_stake)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Stake Tokens
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Pending Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">{balance?.pending_rewards.toFixed(2)} TKN</div>
                <Button className="w-full">
                  <Coins className="h-4 w-4 mr-2" />
                  Claim Rewards
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reward History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p className="font-medium">Staking Reward</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  <p className="font-semibold text-green-500">+12.50 TKN</p>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p className="font-medium">Community Bonus</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                  <p className="font-semibold text-green-500">+5.00 TKN</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default TokenWallet;
