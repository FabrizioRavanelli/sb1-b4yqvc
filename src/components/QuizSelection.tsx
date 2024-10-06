import React from 'react';
import { Star } from 'lucide-react';
import { Quiz, UserProgress } from '../types';

interface QuizSelectionProps {
  quizzes: Quiz[];
  onSelectQuiz: (quiz: Quiz) => void;
  userProgress: UserProgress;
}

const QuizSelection: React.FC<QuizSelectionProps> = ({ quizzes, onSelectQuiz, userProgress }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-barca-blue">Select a Quiz</h2>
      <p className="mb-6 text-lg">Your points: <span className="font-bold text-barca-red">{userProgress.points}</span></p>
      <div className="space-y-4">
        {quizzes.map((quiz) => {
          const isCompleted = userProgress.completedQuizzes.includes(quiz.id);
          return (
            <button
              key={quiz.id}
              onClick={() => onSelectQuiz(quiz)}
              className={`w-full p-4 text-left rounded-lg flex items-center justify-between ${
                isCompleted
                  ? 'bg-gradient-to-r from-barca-gold to-barca-red text-white'
                  : 'bg-gradient-to-r from-barca-blue to-barca-red text-white hover:from-barca-red hover:to-barca-blue'
              }`}
            >
              <div>
                <span className="text-xl font-bold">{quiz.title}</span>
                <span className="block text-sm mt-1">{quiz.description}</span>
              </div>
              {isCompleted && (
                <Star size={24} className="text-white" fill="currentColor" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizSelection;