import React from 'react';
import { Star } from 'lucide-react';

interface LevelSelectionProps {
  onSelectLevel: (level: number) => void;
  userPoints: number;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ onSelectLevel, userPoints }) => {
  const levels = [
    { level: 1, requiredPoints: 0, name: "Rookie" },
    { level: 2, requiredPoints: 50, name: "Fan" },
    { level: 3, requiredPoints: 150, name: "Expert" },
  ];

  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-barca-blue">Select a Level</h2>
      <p className="mb-6 text-lg">Your points: <span className="font-bold text-barca-red">{userPoints}</span></p>
      <div className="space-y-4">
        {levels.map((level) => (
          <button
            key={level.level}
            onClick={() => onSelectLevel(level.level)}
            disabled={userPoints < level.requiredPoints}
            className={`w-full p-4 text-left rounded-lg flex items-center justify-between ${
              userPoints >= level.requiredPoints
                ? 'bg-gradient-to-r from-barca-blue to-barca-red text-white hover:from-barca-red hover:to-barca-blue'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            <div>
              <span className="text-xl font-bold">Level {level.level}: {level.name}</span>
              {userPoints < level.requiredPoints && (
                <span className="block text-sm mt-1">
                  (Unlock at {level.requiredPoints} points)
                </span>
              )}
            </div>
            <div className="flex">
              {[...Array(level.level)].map((_, i) => (
                <Star key={i} size={24} className="text-barca-gold" fill="currentColor" />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;