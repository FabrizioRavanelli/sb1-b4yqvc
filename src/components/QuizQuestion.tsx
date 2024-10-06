import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Clock } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  onTimeout: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLimit: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onAnswer, 
  onTimeout, 
  currentQuestionIndex, 
  totalQuestions,
  timeLimit 
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout, timeLimit]);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [question, timeLimit]);

  return (
    <div className="card bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-barca-blue">
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </span>
        <div className="flex items-center text-barca-red">
          <Clock size={20} className="mr-2" />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-barca-blue">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="w-full text-left p-4 rounded-lg bg-barca-bg hover:bg-barca-blue hover:text-white transition-colors"
            onClick={() => onAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;