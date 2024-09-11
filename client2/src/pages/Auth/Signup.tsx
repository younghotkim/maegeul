//client2/src/pages/Auth/Signup.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '../../Icon/Check Circle Icon.png';

// 체크박스의 상태를 관리하기 위한 타입 정의
type CheckedItems = {
  all: boolean;
  personalInfo: boolean;
  usageTerms: boolean;
  marketingConsent: boolean;
};

// 각 섹션의 펼침/접힘 상태를 관리하기 위한 타입 정의
type OpenSections = {
  personalInfo: boolean;
  usageTerms: boolean;
  marketingConsent: boolean;
};

const Signup: React.FC = () => {
  // 체크박스 상태를 관리하기 위한 state
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    all: false,
    personalInfo: false,
    usageTerms: false,
    marketingConsent: false,
  });

  // 각 섹션의 펼침/접힘 상태를 관리하기 위한 state
  const [openSections, setOpenSections] = useState<OpenSections>({
    personalInfo: false,
    usageTerms: false,
    marketingConsent: false,
  });

  // 체크박스 상태 변경 함수
  const handleCheck = (item: keyof CheckedItems) => {
    setCheckedItems((prevState) => {
      const updatedState = { ...prevState, [item]: !prevState[item] };

      // 전체 동의가 체크되면 모든 항목을 체크하거나 해제
      if (item === 'all') {
        return {
          all: updatedState.all,
          personalInfo: updatedState.all,
          usageTerms: updatedState.all,
          marketingConsent: updatedState.all,
        };
      }

      // 필수 항목이 모두 체크되면 전체 동의도 체크
      const allChecked = updatedState.personalInfo && updatedState.usageTerms;
      return {
        ...updatedState,
        all: allChecked && updatedState.marketingConsent,
      };
    });
  };

  // 섹션의 펼침/접힘 상태 변경 함수
  const toggleSection = (section: keyof OpenSections) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 dark:bg-gray-800 dark:text-white">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
        {/* Step 1 Header */}
        <h2 className="text-scampi-700 dark:text-scampi-300 text-xl font-bold mb-4">STEP 1</h2>
        <h3 className="text-gray-700 dark:text-gray-300 text-lg mb-2">이용 약관 체크하기</h3>

        {/* 전체 동의 항목 */}
        <div
          className={`p-4 rounded-md mb-2 flex items-center justify-between cursor-pointer ${
            checkedItems.all ? 'bg-scampi-100' : 'bg-white'
          }`}
          onClick={() => handleCheck('all')}
        >
          <img src={CheckIcon} alt="Check Icon" className="w-6 h-6 mr-2" />
          <span className="flex-grow text-gray-800 dark:text-white">이용약관 전체동의(선택 동의 포함)</span>
        </div>

        {/* 개별 동의 항목 */}
        {['personalInfo', 'usageTerms', 'marketingConsent'].map((item, index) => (
          <div key={index}>
            <div
              className={`p-4 rounded-md mb-2 flex items-center justify-between cursor-pointer ${
                checkedItems[item as keyof CheckedItems] ? 'bg-scampi-100' : 'bg-white'
              }`}
              onClick={() => handleCheck(item as keyof CheckedItems)}
            >
              <div className="flex items-center">
                <img src={CheckIcon} alt="Check Icon" className="w-6 h-6 mr-2" />
                <span className="text-gray-800 dark:text-white">
                  {item === 'personalInfo' && '(필수) 개인 정보 수집 및 이용'}
                  {item === 'usageTerms' && '(필수) 매글 사용 약관'}
                  {item === 'marketingConsent' && '(선택) 매글 마케팅 메시지 수신 동의'}
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleSection(item as keyof OpenSections); }} className="text-gray-500">
                {openSections[item as keyof OpenSections] ? '🔼' : '🔽'}
              </button>
            </div>

            {/* 동의 항목 세부 사항 */}
            {openSections[item as keyof OpenSections] && (
              <div className="ml-8 mb-4 text-gray-600 dark:text-gray-400">
                <p>세부 약관 내용이 여기에 표시됩니다.</p>
              </div>
            )}
          </div>
        ))}

        {/* 다음 버튼 */}
        <div className="flex justify-center mt-6">
          <Link to="/signup2">
            <button className="w-full p-3 text-lg font-semibold text-white bg-scampi-500 rounded-full shadow-md hover:bg-scampi-600 focus:outline-none transition-colors duration-300">
              다음
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
