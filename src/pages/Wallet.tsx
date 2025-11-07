import { useState } from "react";
import { ArrowLeft, Wallet as WalletIcon, Copy, ExternalLink, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { mockUsers } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const Wallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(!!mockUsers[0].wallet_address);
  const [walletAddress] = useState(mockUsers[0].wallet_address);

  const handleConnect = () => {
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Successfully connected your Web3 wallet",
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Copied",
        description: "Wallet address copied to clipboard",
      });
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
        {/* Connection Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <WalletIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Wallet Status</h3>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? "Connected" : "Not Connected"}
                </p>
              </div>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : null}
              {isConnected ? "Active" : "Inactive"}
            </Badge>
          </div>

          {isConnected && walletAddress ? (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                <div className="flex items-center justify-between">
                  <code className="text-sm text-foreground">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
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
          ) : (
            <Button className="w-full" onClick={handleConnect}>
              Connect Wallet
            </Button>
          )}
        </Card>

        {/* Supported Wallets */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Supported Wallets
          </h2>
          <div className="space-y-2">
            {["MetaMask", "WalletConnect", "Coinbase Wallet", "Trust Wallet"].map(
              (wallet) => (
                <Card
                  key={wallet}
                  className="p-4 cursor-pointer hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">{wallet}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              )
            )}
          </div>
        </div>

        {/* Info */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm text-foreground">
            Connect your Web3 wallet to verify transactions, earn rewards, and access
            exclusive features on the platform.
          </p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Wallet;
