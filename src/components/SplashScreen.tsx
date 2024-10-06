import React from 'react';
import { Trophy } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-barca-blue to-barca-red text-white">
      <div className="bg-white p-8 rounded-full mb-8">
        <Trophy size={100} className="text-barca-gold" />
      </div>
      <h1 className="text-5xl font-bold mb-4">FC Barcelona Quiz</h1>
      <p className="text-2xl">Test your knowledge of Barça!</p>
      <div className="mt-8 text-barca-gold text-lg font-semibold">Loading...</div>
    </div>
  );
};

export default SplashScreen;