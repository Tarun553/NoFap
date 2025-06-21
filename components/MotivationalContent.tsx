
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, RefreshCw, Star } from 'lucide-react';

interface MotivationalContentProps {
  isStreakBroken: boolean;
  currentStreak: number;
}

const MotivationalContent: React.FC<MotivationalContentProps> = ({ 
  isStreakBroken, 
  currentStreak 
}) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "You are stronger than you think and more capable than you imagine.",
    "Every day is a new opportunity to become the person you want to be.",
    "The pain of discipline weighs ounces, but the pain of regret weighs tons.",
    "You don't have to be perfect, you just have to be committed.",
    "Progress, not perfection, is the goal.",
    "Your future self is counting on the decisions you make today.",
    "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
    "The comeback is always stronger than the setback."
  ];

  const recoveryMemes = [
    {
      title: "Back to Day 1? 🔄",
      content: "Remember: Every master was once a beginner. Every pro was once an amateur. Every icon was once an unknown.",
      emoji: "💪"
    },
    {
      title: "Plot Twist! 📖",
      content: "This isn't a setback, it's a setup for a comeback! Your story isn't over yet.",
      emoji: "🚀"
    },
    {
      title: "Phoenix Mode Activated 🔥",
      content: "Like a phoenix, you rise from the ashes stronger than before. Time to soar!",
      emoji: "🦅"
    },
    {
      title: "Oops Mode: ON 😅",
      content: "Mistakes are proof you're trying. Now let's prove you're learning too!",
      emoji: "🎯"
    }
  ];

  const getRandomMeme = () => {
    return recoveryMemes[Math.floor(Math.random() * recoveryMemes.length)];
  };

  const [currentMeme] = useState(getRandomMeme());

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  if (isStreakBroken) {
    return (
      <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-700/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="text-2xl">{currentMeme.emoji}</div>
            <CardTitle className="text-white">{currentMeme.title}</CardTitle>
          </div>
          <CardDescription className="text-blue-200">
            Recovery & Motivation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-blue-100 text-lg leading-relaxed mb-4">
            {currentMeme.content}
          </p>
          <div className="bg-blue-800/30 p-4 rounded-lg border border-blue-600/30">
            <p className="text-blue-200 text-sm italic">
              "Fall seven times, stand up eight. Your journey to self-mastery continues now."
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-green-400" />
            <CardTitle className="text-white">Daily Motivation</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextQuote}
            className="text-green-400 hover:text-green-300 hover:bg-green-800/20"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription className="text-green-200">
          Keep your spirits high on day {currentStreak} of your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <blockquote className="text-green-100 text-lg leading-relaxed mb-4 italic">
          "{quotes[currentQuote]}"
        </blockquote>
        
        {currentStreak > 0 && (
          <div className="bg-green-800/20 p-4 rounded-lg border border-green-600/30">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-green-200 font-medium">Streak Celebration</span>
            </div>
            <p className="text-green-100 text-sm">
              {currentStreak === 1 && "Amazing! You've started your journey! 🎉"}
              {currentStreak === 7 && "One week strong! You're building real habits! 💪"}
              {currentStreak === 30 && "A full month! You're unstoppable! 🔥"}
              {currentStreak === 90 && "90 days! You're a true warrior! 👑"}
              {currentStreak > 1 && currentStreak < 7 && `${currentStreak} days of strength! Keep going! ⭐`}
              {currentStreak > 7 && currentStreak < 30 && `${currentStreak} days and counting! You're amazing! 🚀`}
              {currentStreak > 30 && currentStreak < 90 && `${currentStreak} days of pure determination! 💎`}
              {currentStreak > 90 && `${currentStreak} days! You're an inspiration! 🌟`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MotivationalContent;