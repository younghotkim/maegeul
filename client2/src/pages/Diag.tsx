//src/pages/Diag.tsx
import React from 'react';
import MoodSlider from '../components/MoodSlider';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">오늘의 기분 지수를 측정해 볼까요?</h1>
        <p className="text-lg font-medium text-gray-600 mb-8">
          하루를 보내고 난 지금의 나의 기분은 어떤지 솔직하게 기록해봐요.
        </p>
        <MoodSlider />
      </div>
    </div>
  );
};

export default Home;
