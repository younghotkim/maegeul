//src/components/WritingGuide.tsx
import React, { useState } from 'react';
import Info from '../Icon/Info.png'; 
import Tooltip from './Tooltip';

const WritingGuide: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    // 각 버튼에 따라 표시될 가이드 텍스트를 정의
    const guideTexts: { [key: string]: JSX.Element } = {
        measure: (
            <p className="text-scampi-700 text-lg font-bold font-['DM Sans'] leading-7 text-center">
                우리는 모두 매순간 감정을 경험하는 감정적 존재들이에요. <br />
                지금 나의 감정은 어떤가요? 나에게 호기심을 가져보아요.
                <Tooltip message='매글에서는 러셀 모델을 기반으로 감정을 측정해요. 쾌적함-에너지정도(Balance-Arousal)를 기록하면 현재 느끼는 감정을 "무드컬러"로 알아볼 수 있어요.'>
                <img src={Info} alt="Info" className="inline cursor-pointer" />
                </Tooltip>
            </p>
        ),
        diary: (
            <p className="text-scampi-700 text-lg font-bold font-['DM Sans'] leading-7 text-center">
                가이드2<br />
                지금 나의 감정은 어떤가요? 나에게 호기심을 가져보아요.
                <Tooltip message='매글에서는 러셀 모델을 기반으로 감정을 측정해요. 쾌적함-에너지정도(Balance-Arousal)를 기록하면 현재 느끼는 감정을 "무드컬러"로 알아볼 수 있어요.'>
                <img src={Info} alt="Info" className="inline ml-2 cursor-pointer" />
                </Tooltip>
            </p>
        ),
        aiCheck: (
            <p className="text-scampi-700 text-lg font-bold font-['DM Sans'] leading-7 text-center">
                가이드3<br />
                지금 나의 감정은 어떤가요? 나에게 호기심을 가져보아요.
                <Tooltip message='매글에서는 러셀 모델을 기반으로 감정을 측정해요. 쾌적함-에너지정도(Balance-Arousal)를 기록하면 현재 느끼는 감정을 "무드컬러"로 알아볼 수 있어요.'>
                <img src={Info} alt="Info" className="inline ml-2 cursor-pointer" />
                </Tooltip>
            </p>
        ),
    };
    return (
        <div className="flex flex-row items-center">
            {/* 버튼 부분 */}
            <div className="flex flex-col gap-3 mt-10 mb-10 ml-10">
                <button
                    onClick={() => setActiveButton('measure')}
                    className={`w-40 h-8 flex justify-center items-center shadow-md cursor-pointer transition-colors ${
                        activeButton === 'measure' ? 'bg-scampi-800 text-white' : 'bg-scampi-300 text-white'
                    }`}
                >
                    <span className="text-sm font-['DM Sans']">기분 수치 측정</span>
                </button>
                <button
                    onClick={() => setActiveButton('diary')}
                    className={`w-40 h-8 flex justify-center items-center shadow-md cursor-pointer transition-colors ${
                        activeButton === 'diary' ? 'bg-scampi-800 text-white' : 'bg-scampi-300 text-white'
                    }`}
                >
                    <span className="text-sm font-['DM Sans']">감정 일기 작성</span>
                </button>
                <button
                    onClick={() => setActiveButton('aiCheck')}
                    className={`w-40 h-8 flex justify-center items-center shadow-md cursor-pointer transition-colors ${
                        activeButton === 'aiCheck' ? 'bg-scampi-800 text-white' : 'bg-scampi-300 text-white'
                    }`}
                >
                    <span className="text-sm font-['DM Sans']">AI 하루 진단</span>
                </button>
            </div>

            {/* 가이드 텍스트 부분 */}
            <div className="w-full p-6 ml-10 mr-10 bg-slate-100 rounded-3xl flex justify-center items-center">
                {activeButton ? guideTexts[activeButton] : null}
            </div>
        </div>
    );
};

export default WritingGuide;
//     return (
//         <div className="flex flex-row items-center">
//             {/* 버튼 부분 */}
//             <div className="flex flex-col gap-3 mt-10 mb-10 ml-10">
//                 <button className="w-40 h-8 bg-scampi-300 flex justify-center items-center dark:hover:bg-scampi-700 shadow-md cursor-pointer bg-transparent transition-colors">
//                     <span className="text-white text-sm font-['DM Sans']">기분 수치 측정</span>
//                 </button>
//                 <button className="w-40 h-8 bg-scampi-300 flex justify-center items-center dark:hover:bg-scampi-700 shadow-md ">
//                     <span className="text-white text-sm font-normal font-['DM Sans']">감정 일기 작성</span>
//                 </button>
//                 <button className="w-40 h-8 bg-scampi-300 flex justify-center items-center dark:hover:bg-scampi-700 shadow-md ">
//                     <span className="text-white text-sm font-normal font-['DM Sans']">AI 하루 진단</span>
//                 </button>
//             </div>

//             {/* 가이드 텍스트 부분 */}
//             <div className="w-full p-6 ml-10 mr-10 bg-slate-100 rounded-3xl flex justify-center items-center">
//                 <p className="text-scampi-700 text-lg font-bold font-['DM Sans'] leading-7 text-center">
//                     우리는 모두 매순간 감정을 경험하는 감정적 존재들이에요. <br />
//                     지금 나의 감정은 어떤가요? 나에게 호기심을 가져보아요.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default WritingGuide;


