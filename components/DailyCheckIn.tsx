"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { P, H1, H2 } from "@/components/ui/Typography";

interface DailyCheckInProps {
  onCheckIn: (successful: boolean) => void;
  hasCheckedInToday: boolean;
  todayWasSuccessful: boolean | null;
}

const DailyCheckIn: React.FC<DailyCheckInProps> = ({
  onCheckIn,
  hasCheckedInToday,
  todayWasSuccessful,
}) => {
  const handleCheckIn = (successful: boolean) => {
    onCheckIn(successful);

    toast({
      title: successful
        ? "Great job! 🎉"
        : "Tomorrow is a new day 💪",
      description: successful
        ? "You stayed strong today. Keep up the amazing work!"
        : "Don't let this setback define you. You've got this!",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
      <CardHeader className="text-center">
      
         <H2> Fapped Today ?</H2>
        
        <CardTitle className="text-xl text-white">Daily Check-In</CardTitle>
        <CardDescription className="text-slate-300">
          How did you do today?
        </CardDescription>
      </CardHeader>

      <CardContent>
        {hasCheckedInToday ? (
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium ${
                todayWasSuccessful
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-red-100 text-red-800 border-red-200"
              }`}
            >
              {todayWasSuccessful ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span>
                {todayWasSuccessful
                  ? "Successful Day!"
                  : "Better luck tomorrow"}
              </span>
            </div>
            <P className="text-sm text-slate-400 mt-3">
              You&apos;ve already checked in for today
            </P>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button
              onClick={() => handleCheckIn(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Success
            </Button>
            <Button
              onClick={() => handleCheckIn(false)}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Relapsed
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyCheckIn;