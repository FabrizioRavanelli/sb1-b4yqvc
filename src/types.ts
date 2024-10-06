export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  quizCompleted: boolean;
}

export type AppState = 'splash' | 'quizSelection' | 'quiz' | 'settings' | 'highScore';

export interface HighScore {
  name: string;
  score: number;
  quizId: number;
}

export interface UserProgress {
  points: number;
  completedQuizzes: number[];
}