import { ArrowLeft, Zap, Trophy, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const MOCK_USER = {
  level: 7,
  gamificationPoints: 850,
  username: 'DaniellB',
};

const MOCK_QUESTS = [
  {
    id: 'q1',
    title: 'Daily Stake',
    description: 'Stake any amount of BESHA today.',
    points: 50,
    progress: 1,
    required: 1,
    status: 'completed',
  },
  {
    id: 'q2',
    title: 'Comment on a Post',
    description: 'Reward pending: 1 more comment needed.',
    points: 30,
    progress: 9,
    required: 10,
    status: 'in-progress',
  },
  {
    id: 'q3',
    title: 'Share Trading Signal',
    description: 'Post a trading signal to the feed.',
    points: 100,
    progress: 0,
    required: 1,
    status: 'not-started',
  },
];

const GamificationProfile = () => {
  const navigate = useNavigate();
  
  const progressToNextLevel = ((MOCK_USER.gamificationPoints % 1000) / 1000) * 100;
  const pointsToNextLevel = 1000 - (MOCK_USER.gamificationPoints % 1000);

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
          <h1 className="text-lg font-semibold">Gamification Profile</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Level Card */}
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-2 border-yellow-500/50">
          <CardContent className="pt-6 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
              Current Level
            </p>
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-16 w-16 text-yellow-600 dark:text-yellow-400" />
              <p className="text-6xl font-extrabold text-yellow-600 dark:text-yellow-400 ml-2">
                {MOCK_USER.level}
              </p>
            </div>
            <p className="text-xl font-bold mb-2">
              {MOCK_USER.gamificationPoints.toLocaleString()} Points
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              {pointsToNextLevel} points to Level {MOCK_USER.level + 1}
            </p>
            <Progress value={progressToNextLevel} className="h-2" />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col"
            onClick={() => navigate('/achievements')}
          >
            <Award className="h-6 w-6 mb-2 text-primary" />
            Achievements
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col"
            onClick={() => navigate('/leaderboard')}
          >
            <Trophy className="h-6 w-6 mb-2 text-primary" />
            Leaderboard
          </Button>
        </div>

        {/* Recent Quests */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Daily Quests</h3>
          <div className="space-y-3">
            {MOCK_QUESTS.map((quest) => (
              <Card
                key={quest.id}
                className={`border-l-4 ${
                  quest.status === 'completed'
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20'
                    : quest.status === 'in-progress'
                    ? 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20'
                    : 'border-muted'
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>{quest.title}</span>
                    {quest.status === 'completed' && (
                      <Award className="h-4 w-4 text-green-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {quest.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {quest.status === 'completed' ? (
                      <span className="text-xs text-green-500 font-semibold">
                        ✓ Completed +{quest.points} Points
                      </span>
                    ) : (
                      <>
                        <span className="text-xs text-muted-foreground">
                          Progress: {quest.progress}/{quest.required}
                        </span>
                        <span className="text-xs font-semibold text-primary">
                          +{quest.points} Points
                        </span>
                      </>
                    )}
                  </div>
                  {quest.status === 'in-progress' && (
                    <Progress
                      value={(quest.progress / quest.required) * 100}
                      className="h-1.5 mt-2"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">This Week's Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Quests</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">450</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">7</p>
                <p className="text-xs text-muted-foreground">Days Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default GamificationProfile;
