import React from 'react';
import { Question } from '../types';
import { Trophy } from 'lucide-react';

interface QuizResultsProps {
  questions: Question[];
  userAnswers: number[];
  score: number;
  onRestart: () => void;
  quizTitle: string;
}

const QuizResults: React.FC<QuizResultsProps> = ({ questions, userAnswers, score, onRestart, quizTitle }) => {
  const pointsEarned = score * 10;

  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <Trophy size={48} className="text-barca-gold mr-4" />
        <h2 className="text-3xl font-bold text-barca-blue">Quiz Results</h2>
      </div>
      <p className="text-2xl mb-2 text-center">Your score: <span className="font-bold text-barca-red">{score}</span> out of {questions.length}</p>
      <p className="text-xl mb-6 text-center">Points earned: <span className="font-bold text-barca-blue">{pointsEarned}</span></p>
      <div className="space-y-4 mb-6">
        {questions.map((question, index) => (
          <div key={question.id} className="border-b pb-4">
            <p className="font-semibold text-barca-blue">{question.text}</p>
            <p className="text-green-600">Correct answer: {question.options[question.correctAnswer]}</p>
            <p className={userAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
              Your answer: {userAnswers[index] >= 0 && userAnswers[index] < question.options.length 
                ? question.options[userAnswers[index]] 
                : "Time's up"}
            </p>
          </div>
        ))}
      </div>
      <button
        className="w-full btn-primary bg-gradient-to-r from-barca-blue to-barca-red hover:from-barca-red hover:to-barca-blue"
        onClick={onRestart}
      >
        Back to Quiz Selection
      </button>
    </div>
  );
};

export default QuizResults;