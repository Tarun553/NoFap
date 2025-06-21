
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface ProgressHeatmapProps {
  data: { [date: string]: boolean | null };
}

const ProgressHeatmap: React.FC<ProgressHeatmapProps> = ({ data }) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 90); // Show last 90 days

  const generateDates = () => {
    const dates = [];
    const current = new Date(startDate);
    
    while (current <= today) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };

  const dates = generateDates();
  const weeks = [];
  
  // Group dates by weeks
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getCellColor = (date: Date) => {
    const dateStr = formatDate(date);
    const dayData = data[dateStr];
    
    if (dayData === null || dayData === undefined) {
      return 'bg-slate-700'; // No data
    }
    
    return dayData ? 'bg-green-500' : 'bg-red-500';
  };

  const getCellOpacity = (date: Date) => {
    const dateStr = formatDate(date);
    const dayData = data[dateStr];
    
    if (dayData === null || dayData === undefined) {
      return 'opacity-30';
    }
    
    return 'opacity-100';
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <CardTitle className="text-white">Progress Heatmap</CardTitle>
        </div>
        <CardDescription className="text-slate-400">
          Last 90 days - Green: Success, Red: Relapse, Gray: No data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex gap-1">
              {week.map((date, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`
                    w-4 h-4 rounded-sm heatmap-cell cursor-pointer
                    ${getCellColor(date)} ${getCellOpacity(date)}
                  `}
                  title={`${formatDate(date)}: ${
                    data[formatDate(date)] === true 
                      ? 'Success' 
                      : data[formatDate(date)] === false 
                        ? 'Relapse' 
                        : 'No data'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span>Success</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm" />
            <span>Relapse</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-700 opacity-30 rounded-sm" />
            <span>No data</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressHeatmap;