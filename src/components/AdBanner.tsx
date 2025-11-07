import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Advertisement } from "@/lib/mockData";

interface AdBannerProps {
  ad: Advertisement;
}

export const AdBanner = ({ ad }: AdBannerProps) => {
  const handleClick = () => {
    // Track click
    window.open(ad.click_url, "_blank");
  };

  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={handleClick}>
      <div className="relative">
        <Badge className="absolute top-2 left-2 text-xs">Sponsored</Badge>
        <img
          src={ad.image_url}
          alt={ad.title}
          className="w-full h-32 object-cover"
        />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-foreground mb-1">{ad.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{ad.description}</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground ml-2 flex-shrink-0" />
        </div>
      </div>
    </Card>
  );
};
