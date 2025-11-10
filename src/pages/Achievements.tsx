import { useState, useEffect } from "react";
import { Trophy, Award, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { gamificationApi, GamificationProfile, Achievement } from "@/lib/mockApi";
import { toast } from "sonner";

const Achievements = () => {
  const [profile, setProfile] = useState<GamificationProfile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileData, achievementsData] = await Promise.all([
        gamificationApi.getProfile(),
        gamificationApi.getAchievements(),
      ]);
      setProfile(profileData);
      setAchievements(achievementsData);
    } catch (error) {
      toast.error("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading achievements...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <h1 className="text-xl font-bold text-foreground">Achievements</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Stats */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Level {profile?.level}
            </CardTitle>
            <CardDescription>{profile?.total_points} Total Points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{profile?.current_streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{profile?.achievements_unlocked}</p>
                <p className="text-xs text-muted-foreground">Unlocked</p>
              </div>
              <div>
                <p className="text-2xl font-bold">#{profile?.leaderboard_rank}</p>
                <p className="text-xs text-muted-foreground">Rank</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.achievement_id}
                className={achievement.unlocked ? "border-primary/50" : "opacity-60"}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{achievement.name}</h3>
                        {achievement.unlocked && (
                          <Badge variant="default">
                            <Trophy className="h-3 w-3 mr-1" />
                            Unlocked
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary font-medium">
                          +{achievement.points} points
                        </span>
                        {achievement.target && achievement.progress !== undefined && (
                          <span className="text-muted-foreground">
                            {achievement.progress}/{achievement.target}
                          </span>
                        )}
                      </div>
                      {achievement.target && achievement.progress !== undefined && (
                        <Progress
                          value={(achievement.progress / achievement.target) * 100}
                          className="mt-2"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Achievement Progress</span>
                <span className="font-medium">
                  {profile?.achievements_unlocked}/{profile?.total_achievements}
                </span>
              </div>
              <Progress
                value={
                  profile
                    ? (profile.achievements_unlocked / profile.total_achievements) * 100
                    : 0
                }
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">Longest Streak</span>
              <span className="font-semibold">{profile?.longest_streak} days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Achievements;
