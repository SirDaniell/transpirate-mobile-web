import { useState } from "react";
import { TrendingUp, TrendingDown, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { mockWatchlist, WatchlistItem } from "@/lib/mockData";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(mockWatchlist);

  const toggleWatch = (symbol: string) => {
    setWatchlist(
      watchlist.map((item) =>
        item.symbol === symbol
          ? { ...item, is_watching: !item.is_watching }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Watchlist</h1>
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-3">
        {watchlist.map((item) => (
          <Card key={item.symbol} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => toggleWatch(item.symbol)}
                  className="h-10 w-10"
                >
                  <Star
                    className={`h-5 w-5 ${
                      item.is_watching
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <div>
                  <h3 className="font-semibold text-foreground">{item.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  ${item.price.toLocaleString()}
                </p>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    item.change_24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.change_24h >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{Math.abs(item.change_24h)}%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Watchlist;
