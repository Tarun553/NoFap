import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';

interface StatsCardProps {
  currentStreak: number;
  longestStreak: number;
  weeklySuccessRate: number;
  monthlySuccessRate: number;
  totalDays: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  currentStreak,
  longestStreak,
  weeklySuccessRate,
  monthlySuccessRate,
  totalDays
}) => {
  const stats = [
    {
      title: "Current Streak",
      value: currentStreak,
      suffix: "days",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      title: "Longest Streak",
      value: longestStreak,
      suffix: "days",
      icon: Award,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10"
    },
    {
      title: "Weekly Success",
      value: weeklySuccessRate,
      suffix: "%",
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      title: "Monthly Success",
      value: monthlySuccessRate,
      suffix: "%",
      icon: Target,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="pb-2">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <CardDescription className="text-slate-400 text-sm">
              {stat.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-slate-400 ml-1">{stat.suffix}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;