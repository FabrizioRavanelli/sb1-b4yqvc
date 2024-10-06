import React, { useState, useEffect } from 'react';
import { Trophy, Settings, List } from 'lucide-react';
import { fetchQuizzes, fetchQuizQuestions } from './api/quizApi';
import { Question, QuizState, AppState, Quiz, UserProgress } from './types';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';
import SplashScreen from './components/SplashScreen';
import SettingsPage from './components/SettingsPage';
import HighScorePage from './components/HighScorePage';
import QuizSelection from './components/QuizSelection';

const TIME_LIMIT = 15; // 15 seconds per question

function App() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    quizCompleted: false,
  });
  const [appState, setAppState] = useState<AppState>('splash');
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    points: 0,
    completedQuizzes: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setAppState('quizSelection');
      setLoading(false);
    }, 3000);

    fetchQuizzes().then(setQuizzes);
  }, []);

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    fetchQuizQuestions(quiz.id).then((fetchedQuestions) => {
      setQuestions(fetchedQuestions);
      setAppState('quiz');
    });
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const newScore = answerIndex === currentQuestion.correctAnswer ? quizState.score + 1 : quizState.score;
    const newAnswers = [...quizState.answers, answerIndex];
    const newIndex = quizState.currentQuestionIndex + 1;

    setQuizState({
      currentQuestionIndex: newIndex,
      score: newScore,
      answers: newAnswers,
      quizCompleted: newIndex >= questions.length,
    });

    if (newIndex >= questions.length) {
      const pointsEarned = newScore * 10;
      setUserProgress(prev => ({
        points: prev.points + pointsEarned,
        completedQuizzes: [...prev.completedQuizzes, currentQuiz!.id],
      }));
    }
  };

  const handleTimeout = () => {
    handleAnswer(-1); // -1 indicates a timeout (wrong answer)
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      quizCompleted: false,
    });
    setAppState('quizSelection');
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-barca-bg flex flex-col">
      <header className="bg-gradient-to-r from-barca-blue to-barca-red text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Trophy size={24} className="mr-2 text-barca-gold" />
          <h1 className="text-xl font-bold">FC Barcelona Quiz</h1>
        </div>
        <div className="flex items-center">
          <button onClick={() => setAppState('highScore')} className="mr-4 hover:text-barca-gold transition-colors">
            <List size={24} />
          </button>
          <button onClick={() => setAppState('settings')} className="hover:text-barca-gold transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {appState === 'splash' && <SplashScreen />}
          {appState === 'quizSelection' && (
            <QuizSelection 
              quizzes={quizzes} 
              onSelectQuiz={startQuiz} 
              userProgress={userProgress}
            />
          )}
          {appState === 'quiz' && !quizState.quizCompleted && (
            quizState.currentQuestionIndex < questions.length && (
              <QuizQuestion
                question={questions[quizState.currentQuestionIndex]}
                onAnswer={handleAnswer}
                onTimeout={handleTimeout}
                currentQuestionIndex={quizState.currentQuestionIndex}
                totalQuestions={questions.length}
                timeLimit={TIME_LIMIT}
              />
            )
          )}
          {appState === 'quiz' && quizState.quizCompleted && (
            <QuizResults
              questions={questions}
              userAnswers={quizState.answers}
              score={quizState.score}
              onRestart={restartQuiz}
              quizTitle={currentQuiz?.title || ''}
            />
          )}
          {appState === 'settings' && <SettingsPage onBack={() => setAppState('quizSelection')} />}
          {appState === 'highScore' && <HighScorePage onBack={() => setAppState('quizSelection')} />}
        </div>
      </main>
    </div>
  );
}

export default App;