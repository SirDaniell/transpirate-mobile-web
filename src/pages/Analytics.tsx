import { BarChart3, TrendingUp, Target, DollarSign, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";

const Analytics = () => {
  const stats = [
    { label: "Total Profit", value: "+$12,450", change: "+24.5%", icon: DollarSign, color: "text-success" },
    { label: "Win Rate", value: "68.5%", change: "+5.2%", icon: Target, color: "text-primary" },
    { label: "Total Trades", value: "247", change: "+12", icon: Activity, color: "text-info" },
    { label: "Avg Return", value: "+8.2%", change: "+2.1%", icon: TrendingUp, color: "text-warning" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Analytics</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-xs text-success font-semibold">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Performance Chart */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Performance Overview</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[65, 80, 70, 90, 75, 95, 85, 100, 88, 92, 78, 105].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary to-primary-glow rounded-t transition-all hover:opacity-80"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
        </Card>

        {/* Trade History */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Recent Trades</h3>
          <div className="space-y-3">
            {[
              { symbol: "BTCUSD", type: "Long", profit: "+$450", profitPercent: "+5.2%", time: "2h ago" },
              { symbol: "ETHUSD", type: "Short", profit: "-$120", profitPercent: "-1.8%", time: "5h ago" },
              { symbol: "BTCUSD", type: "Long", profit: "+$890", profitPercent: "+8.9%", time: "1d ago" },
            ].map((trade, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="font-semibold text-foreground">{trade.symbol}</div>
                  <div className="text-xs text-muted-foreground">{trade.type} • {trade.time}</div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${trade.profit.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {trade.profit}
                  </div>
                  <div className="text-xs text-muted-foreground">{trade.profitPercent}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Analytics;
