"use client";

import { useState, useEffect } from 'react';

interface ProgressItem {
  id: string;
  title: string;
  type: 'video' | 'practice' | 'quiz';
  completed: boolean;
  timestamp?: number;
}

interface UnitProgress {
  unitId: string;
  unitName: string;
  items: ProgressItem[];
  overallProgress: number;
}

export default function ProgressTracker({ unitId, unitName, items }: { unitId: string; unitName: string; items: ProgressItem[] }) {
  const [progress, setProgress] = useState<UnitProgress>({
    unitId,
    unitName,
    items,
    overallProgress: 0
  });

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`progress-${unitId}`);
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress(parsed);
    } else {
      // Initialize with default items
      const defaultProgress: UnitProgress = {
        unitId,
        unitName,
        items: items.map(item => ({ ...item, completed: false })),
        overallProgress: 0
      };
      setProgress(defaultProgress);
      localStorage.setItem(`progress-${unitId}`, JSON.stringify(defaultProgress));
    }
  }, [unitId, unitName]);

  const updateProgress = (itemId: string, completed: boolean) => {
    const updatedItems = progress.items.map(item => 
      item.id === itemId 
        ? { ...item, completed, timestamp: completed ? Date.now() : undefined }
        : item
    );
    
    const completedCount = updatedItems.filter(item => item.completed).length;
    const overallProgress = Math.round((completedCount / updatedItems.length) * 100);
    
    const updatedProgress = {
      ...progress,
      items: updatedItems,
      overallProgress
    };
    
    setProgress(updatedProgress);
    localStorage.setItem(`progress-${unitId}`, JSON.stringify(updatedProgress));
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('unit-progress-changed', { detail: { unitId, progress: updatedProgress } }));
      }
    } catch {}
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 30) return 'text-red-400';
    if (percentage < 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 glow-border mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white glow-text">Your Progress</h3>
        <div className={`text-2xl font-bold ${getProgressColor(progress.overallProgress)}`}>
          {progress.overallProgress}%
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
        <div 
          className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(progress.overallProgress)}`}
          style={{ width: `${progress.overallProgress}%` }}
        ></div>
      </div>

      {/* Progress Items */}
      <div className="space-y-3">
        {progress.items.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                item.completed ? 'bg-green-500' : 'bg-gray-600'
              }`}>
                {item.completed ? (
                  <span className="text-white text-sm">✓</span>
                ) : (
                  <span className="text-white text-sm">{index + 1}</span>
                )}
              </div>
              <span className={`text-white ${item.completed ? 'line-through opacity-70' : ''}`}>
                {item.title}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                item.type === 'video' ? 'bg-blue-500/20 text-blue-300' :
                item.type === 'practice' ? 'bg-purple-500/20 text-purple-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                {item.type}
              </span>
            </div>
            <button
              onClick={() => updateProgress(item.id, !item.completed)}
              className={`px-3 py-1 rounded text-sm transition-all duration-300 ${
                item.completed 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-500 text-white'
              }`}
            >
              {item.completed ? 'Completed' : 'Mark Done'}
            </button>
          </div>
        ))}
      </div>

      {progress.overallProgress === 100 && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
          <h4 className="text-green-400 font-semibold text-lg mb-2">🎉 Congratulations!</h4>
          <p className="text-green-300">You've completed {unitName}! Keep up the great work!</p>
        </div>
      )}
    </div>
  );
}
