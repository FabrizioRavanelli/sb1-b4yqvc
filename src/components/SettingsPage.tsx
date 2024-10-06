import React, { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-barca-blue">Settings</h2>
      <div className="space-y-6 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg">Sound Effects</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <button
        onClick={onBack}
        className="w-full btn-primary bg-gradient-to-r from-barca-blue to-barca-red hover:from-barca-red hover:to-barca-blue"
      >
        Back
      </button>
    </div>
  );
};

export default SettingsPage;