import { useState, useEffect } from "react";
import { ArrowLeft, Wallet as WalletIcon, Copy, ExternalLink, CheckCircle, Send, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { useAddress, useConnect, useDisconnect, ConnectWallet } from "@thirdweb-dev/react";
import { tokenApi, TokenBalance } from "@/lib/api/tokens";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Wallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const address = useAddress();
  const disconnect = useDisconnect();
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  useEffect(() => {
    if (address) {
      loadBalance();
    } else {
      setLoading(false);
    }
  }, [address]);

  const loadBalance = async () => {
    setLoading(true);
    try {
      const balanceData = await tokenApi.getBalance();
      setBalance(balanceData);
    } catch (error) {
      console.error("Error loading balance:", error);
      toast({
        title: "Error",
        description: "Failed to load balance",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const handleTransfer = async () => {
    if (!transferTo || !transferAmount) {
      toast({
        title: "Invalid input",
        description: "Please enter address and amount",
        variant: "destructive",
      });
      return;
    }

    setIsTransferring(true);
    try {
      await tokenApi.transfer(transferTo, transferAmount);
      toast({
        title: "Transfer successful",
        description: `Sent ${transferAmount} BESHA`,
      });
      setTransferTo("");
      setTransferAmount("");
      await loadBalance();
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: "Failed to send tokens",
        variant: "destructive",
      });
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Web3 Wallet</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading wallet data...</p>
          </div>
        ) : !address ? (
          <>
            {/* Connect Wallet Card */}
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <WalletIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your Web3 wallet to access your BESHA tokens
                  </p>
                </div>
                <div className="flex justify-center">
                  <ConnectWallet theme="dark" />
                </div>
              </div>
            </Card>

            {/* Info */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <p className="text-sm text-foreground">
                Connect your Web3 wallet to verify transactions, earn rewards, and access
                exclusive features on the platform.
              </p>
            </Card>
          </>
        ) : (
          <>
            {/* Connection Status */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <WalletIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Wallet Status</h3>
                    <p className="text-sm text-muted-foreground">Connected</p>
                  </div>
                </div>
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                  <div className="flex items-center justify-between">
                    <code className="text-sm text-foreground">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </code>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={copyAddress}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => window.open(`https://polygonscan.com/address/${address}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDisconnect}
                >
                  Disconnect Wallet
                </Button>
              </div>
            </Card>

            {/* Balance Overview */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">BESHA Token Balance</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                  <p className="text-3xl font-bold text-foreground">{balance?.available || "0.00"}</p>
                  <p className="text-xs text-muted-foreground mt-1">BESHA</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Staked</p>
                    <p className="text-lg font-semibold text-foreground">{balance?.staked || "0.00"}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Rewards</p>
                    <p className="text-lg font-semibold text-success">{balance?.pending_rewards || "0.00"}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send BESHA Tokens</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Recipient Address
                      </label>
                      <Input
                        placeholder="0x..."
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleTransfer}
                      disabled={isTransferring}
                    >
                      {isTransferring ? "Sending..." : "Send Tokens"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={() => navigate("/token-wallet")}>
                <Download className="h-4 w-4 mr-2" />
                Staking
              </Button>
            </div>

            {/* Info */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <p className="text-sm text-foreground">
                Your tokens are secured on-chain. All transactions are transparent and verifiable
                on the blockchain.
              </p>
            </Card>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Wallet;
