"use client";

import React, { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import DailyCheckIn from "@/components/DailyCheckIn";
import { P, H1 } from "@/components/ui/Typography";
import StatsCard from "@/components/statsCard";
import ProgressHeatmap from "@/components/progessHeatMap";
import MotivationalContent from "@/components/MotivationalContent";
import { Scene } from "@/components/rubik-s-cube";
import { Card, CardContent } from '@/components/ui/card';
import {Target} from "lucide-react"


// ✅ Define interface first
interface DayData {
  date: string;
  successful: boolean;
}

export default function Home() {
  const [data, setData] = useState<DayData[]>([]);
  const [isStreakBroken, setIsStreakBroken] = useState(false);

  // ✅ Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("nofap-tracker-data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // ✅ Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("nofap-tracker-data", JSON.stringify(data));
  }, [data]);

  const today = new Date().toISOString().split("T")[0];
  const todayData = data.find((d) => d.date === today);

  const handleCheckIn = (successful: boolean) => {
    const newEntry: DayData = { date: today, successful };
    setData((prevData) => {
      const filteredData = prevData.filter((d) => d.date !== today);
      return [...filteredData, newEntry].sort((a, b) => a.date.localeCompare(b.date));
    });
  };

  useEffect(() => {
    if (todayData && !todayData.successful) {
      setIsStreakBroken(true);
      setTimeout(() => setIsStreakBroken(false), 5000); // Hide after 5 seconds
    }
  }, [todayData]);

  const calculateStats = () => {
    if (data.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        weeklySuccessRate: 0,
        monthlySuccessRate: 0,
        totalDays: 0,
      };
    }

    const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date));

    // Current streak
    let currentStreak = 0;
    for (const entry of sortedData) {
      if (entry.successful) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Longest streak
    let longestStreak = 0;
    let tempStreak = 0;

    for (const entry of data.sort((a, b) => a.date.localeCompare(b.date))) {
      if (entry.successful) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    // Weekly success rate (last 7 days)
    const lastWeek = sortedData.slice(0, 7);
    const weeklySuccessRate = lastWeek.length > 0
      ? Math.round((lastWeek.filter((d) => d.successful).length / lastWeek.length) * 100)
      : 0;

    // Monthly success rate (last 30 days)
    const lastMonth = sortedData.slice(0, 30);
    const monthlySuccessRate = lastMonth.length > 0
      ? Math.round((lastMonth.filter((d) => d.successful).length / lastMonth.length) * 100)
      : 0;

    return {
      currentStreak,
      longestStreak,
      weeklySuccessRate,
      monthlySuccessRate,
      totalDays: sortedData.length,
    };
  };
  const stats = calculateStats();


  // Convert data for heatmap
  const heatmapData = data.reduce((acc, entry) => {
    acc[entry.date] = entry.successful;
    return acc;
  }, {} as { [date: string]: boolean });


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔹 3D Rubik Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/60 to-black/80 pointer-events-none">
        <Scene />
      </div>

      {/* 🔹 Foreground App UI */}
      <div className="relative z-10 bg-black/50 backdrop-blur-sm min-h-screen p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* 🔹 Your original content here */}
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <H1>NoFap Tracker</H1>
            </div>
            <P className="text-slate-300 text-lg">
              Master your self-control, one day at a time
            </P>
          </div>

          {/* Daily Check-in Section */}
          <div className="flex justify-center mb-8">
            <DailyCheckIn
              onCheckIn={handleCheckIn}
              hasCheckedInToday={!!todayData}
              todayWasSuccessful={todayData?.successful ?? null}
            />
          </div>

          <StatsCard
            currentStreak={stats.currentStreak}
            longestStreak={stats.longestStreak}
            weeklySuccessRate={stats.weeklySuccessRate}
            monthlySuccessRate={stats.monthlySuccessRate}
            totalDays={stats.totalDays}
          />

          <div className="grid lg:grid-cols-2 gap-6">
            <ProgressHeatmap data={heatmapData} />
            <MotivationalContent
              isStreakBroken={isStreakBroken}
              currentStreak={stats.currentStreak}
            />
          </div>
          {/* footer */}
           <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600">
          <CardContent className="text-center py-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-white font-medium">Remember</span>
            </div>
            <p className="text-slate-300">
              Progress is not linear. Every day is a victory, every setback is a lesson.
            </p>
          </CardContent>
        </Card>

        </div>
      </div>
    </div>
  );

}