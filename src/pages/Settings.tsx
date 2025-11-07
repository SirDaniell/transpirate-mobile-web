import { useState } from "react";
import { ArrowLeft, Moon, Sun, Bell, Lock, User, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { mockSettings, UserSettings } from "@/lib/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>(mockSettings);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings({ ...settings, ...updates });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Appearance */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Appearance
          </h2>
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Theme</span>
                <Select
                  value={settings.theme}
                  onValueChange={(value: any) =>
                    updateSettings({ theme: value })
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h2>
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Enable Notifications</span>
                <Switch
                  checked={settings.notifications_enabled}
                  onCheckedChange={(checked) =>
                    updateSettings({ notifications_enabled: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Email Notifications</span>
                <Switch
                  checked={settings.email_notifications}
                  onCheckedChange={(checked) =>
                    updateSettings({ email_notifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Push Notifications</span>
                <Switch
                  checked={settings.push_notifications}
                  onCheckedChange={(checked) =>
                    updateSettings({ push_notifications: checked })
                  }
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Privacy */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Privacy
          </h2>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Privacy Level</span>
              <Select
                value={settings.privacy_level}
                onValueChange={(value: any) =>
                  updateSettings({ privacy_level: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Quick Actions
          </h2>
          <Card className="p-4">
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/drafts")}
              >
                <FileText className="h-4 w-4 mr-2" />
                My Drafts
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/wallet")}
              >
                <User className="h-4 w-4 mr-2" />
                Wallet Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
