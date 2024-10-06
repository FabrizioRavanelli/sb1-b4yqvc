import React, { useState, useEffect } from 'react';
import { HighScore } from '../types';
import { Trophy } from 'lucide-react';

interface HighScorePageProps {
  onBack: () => void;
}

const HighScorePage: React.FC<HighScorePageProps> = ({ onBack }) => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from a backend
    const mockHighScores: HighScore[] = [
      { name: "Messi", score: 300, level: 3 },
      { name: "Xavi", score: 250, level: 3 },
      { name: "Iniesta", score: 200, level: 2 },
      { name: "Puyol", score: 180, level: 2 },
      { name: "Busquets", score: 150, level: 2 },
      { name: "Pique", score: 120, level: 1 },
      { name: "Alba", score: 100, level: 1 },
      { name: "Ter Stegen", score: 90, level: 1 },
      { name: "Pedri", score: 80, level: 1 },
      { name: "Gavi", score: 70, level: 1 },
    ];
    setHighScores(mockHighScores);
  }, []);

  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <Trophy size={36} className="text-barca-gold mr-4" />
        <h2 className="text-3xl font-bold text-barca-blue">High Scores</h2>
      </div>
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-barca-bg text-barca-blue">
            <th className="text-left p-2">Rank</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Score</th>
            <th className="text-left p-2">Level</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2 font-semibold">{score.name}</td>
              <td className="p-2">{score.score}</td>
              <td className="p-2">{score.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onBack}
        className="w-full btn-primary bg-gradient-to-r from-barca-blue to-barca-red hover:from-barca-red hover:to-barca-blue"
      >
        Back
      </button>
    </div>
  );
};

export default HighScorePage;