// src/pages/Diag.tsx
import React, { useState } from 'react'; // React와 useState 훅을 가져옵니다.
import MoodSlider from '../../components/MoodSlider'; // MoodSlider 컴포넌트를 가져옵니다.
import EnergySlider from '../../components/EnergySlider'; // EnergySlider 컴포넌트를 가져옵니다.
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 컴포넌트를 가져옵니다. 페이지 이동에 사용됩니다.

// Home 컴포넌트를 정의합니다.
const Home: React.FC = () => {
  // moodValue와 energyValue를 관리할 state를 정의합니다.
  const [moodValue, setMoodValue] = useState<number | null>(null);
  const [energyValue, setEnergyValue] = useState<number | null>(null);
  // 제출 여부를 관리할 state를 정의합니다.
  const [submitted, setSubmitted] = useState(false);

  // MoodSlider에서 기분 값을 변경할 때 호출되는 함수입니다.
  const handleMoodChange = (value: number) => {
    setMoodValue(value); // moodValue state를 업데이트합니다.
  };

  // EnergySlider에서 에너지 값을 변경할 때 호출되는 함수입니다.
  const handleEnergyChange = (value: number) => {
    setEnergyValue(value); // energyValue state를 업데이트합니다.
  };

  // 제출 버튼을 클릭했을 때 호출되는 함수입니다.
  const handleSubmit = () => {
    if (moodValue !== null && energyValue !== null) { // moodValue와 energyValue가 모두 null이 아닐 때
      setSubmitted(true); // 제출 상태를 true로 변경합니다.
    }
  };

  // 다시 측정하기 버튼을 클릭했을 때 호출되는 함수입니다.
  const handleRetry = () => {
    setSubmitted(false); // 제출 상태를 false로 변경합니다.
    setMoodValue(null); // moodValue를 null로 초기화합니다.
    setEnergyValue(null); // energyValue를 null로 초기화합니다.
  };

  // 제출 후 표시할 콘텐츠를 결정하는 함수입니다.
  const renderContent = () => {
    if (submitted) { // 제출 상태일 때
      if (moodValue !== null && energyValue !== null) { // moodValue와 energyValue가 모두 null이 아닐 때
        const totalValue = moodValue + energyValue; // 두 값의 합계를 계산합니다.
        return (
          <div className="text-center p-4"> {/* 내용이 가운데 정렬되고 패딩이 추가된 div */}
            <p className="text-scampi-700 dark:text-scampi-300 text-4xl font-bold font-['DM Sans'] leading-10 mb-4">오늘 'user'님의 무드 컬러는 '{totalValue}'이에요.</p> {/* 사용자에게 결과를 보여주는 문장 */}
            <div className="flex justify-center gap-4"> {/* 버튼들을 가운데 정렬합니다. */}
              <button onClick={handleRetry} className="text-sm bg-transparent text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-400 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
                다시 측정하기
              </button>
              <Link to="/mydiary">
                <button className="bg-scampi-500 dark:bg-scampi-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-scampi-400 dark:hover:bg-scampi-700 transition-colors">
                  글쓰러가기
                </button>
              </Link>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="flex flex-col items-center"> {/* MoodSlider와 EnergySlider를 세로로 정렬합니다. */}
        <MoodSlider onValueChange={handleMoodChange} onSubmit={handleSubmit} /> {/* MoodSlider 컴포넌트 */}
        <EnergySlider onValueChange={handleEnergyChange} onSubmit={handleSubmit} /> {/* EnergySlider 컴포넌트 */}
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center'> {/* 전체 레이아웃을 세로로 정렬하고 가운데 정렬합니다. */}
      {renderContent()} {/* 제출 상태에 따라 콘텐츠를 렌더링합니다. */}
    </div>
  );
};

export default Home; // Home 컴포넌트를 내보냅니다.
