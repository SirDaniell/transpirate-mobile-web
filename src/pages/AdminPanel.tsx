import { ArrowLeft, Users, DollarSign, ArrowDownLeft, Shield, Gem, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ADMIN_ITEMS = [
  {
    id: 'user-roles',
    name: 'User Role Management',
    description: 'Grant and revoke administrative roles.',
    icon: Users,
    category: 'admin',
  },
  {
    id: 'balance-adjust',
    name: 'User Balance Adjustment',
    description: 'Manually adjust token balances.',
    icon: DollarSign,
    category: 'admin',
  },
  {
    id: 'withdrawals',
    name: 'Withdrawal Requests',
    description: 'View, approve, or reject withdrawal requests.',
    icon: ArrowDownLeft,
    category: 'admin',
  },
];

const OWNER_ITEMS = [
  {
    id: 'contract-control',
    name: 'Contract Control',
    description: 'Pause or unpause main smart contract.',
    icon: Shield,
    category: 'owner',
  },
  {
    id: 'token-management',
    name: 'Token Management (Mint/Burn)',
    description: 'Adjust token supply on-chain.',
    icon: Gem,
    category: 'owner',
  },
  {
    id: 'system-control',
    name: 'System Control (Shutdown/Restart)',
    description: 'Manage backend system processes.',
    icon: Clock,
    category: 'owner',
  },
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (name: string) => {
    toast({
      title: "Action Logged",
      description: `Navigating to: ${name}`,
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
            onClick={() => navigate('/settings')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Admin / Owner Panel</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Warning Alert */}
        <Alert variant="destructive">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Access to critical system and financial controls. Use with caution.
          </AlertDescription>
        </Alert>

        {/* Admin Panel Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Admin Panel
          </h2>
          <div className="space-y-3">
            {ADMIN_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="border-l-4 border-primary cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleAction(item.name)}
                >
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Icon className="h-5 w-5 mr-2 text-primary" />
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Owner Panel Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-destructive" />
            Owner Panel
          </h2>
          <div className="space-y-3">
            {OWNER_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="border-l-4 border-destructive cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleAction(item.name)}
                >
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Icon className="h-5 w-5 mr-2 text-destructive" />
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Status */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract Status:</span>
                <span className="font-semibold text-green-500">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Users:</span>
                <span className="font-semibold">12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending Withdrawals:</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Token Supply:</span>
                <span className="font-semibold">1,000,000 BESHA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default AdminPanel;
