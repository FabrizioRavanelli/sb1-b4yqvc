import quizData from '../data/quizData.json';
import { Quiz, Question } from '../types';

export const fetchQuizzes = (): Promise<Quiz[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quizData.quizzes);
    }, 1000);
  });
};

export const fetchQuizQuestions = (quizId: number): Promise<Question[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const quiz = quizData.quizzes.find(q => q.id === quizId);
      if (quiz) {
        resolve(quiz.questions);
      } else {
        reject(new Error('Quiz not found'));
      }
    }, 1000);
  });
};