// src/components/Contents.tsx
import React from 'react';
import ImageSrc1 from '../Image/01.jpeg';
import ImageSrc2 from '../Image/02.jpeg';
import ImageSrc3 from '../Image/03.jpeg';
import ImageSrc4 from '../Image/04.jpeg';
import './Contents.css';
// ArrowIcon ReactComponent로 불러옵니다.
import { ReactComponent as ArrowIcon } from '../Icon/Arrow Right.svg';

const Contents: React.FC = () => {
  const cardContents = [
    { 
      title: '자기 계발', 
      text: '더 단단한 나를 만드는 4가지 일상 실천 콘텐츠를 확인해보세요.', 
      tag: ['독서하기','외국어 배우기','전공 공부하기','버킷리스트 작성하여 실천하기','봉사활동하기'], 
      src: ImageSrc1 
    }, 
    { 
      title: '자기 관리', 
      text: '더 단단한 나를 만드는 4가지 일상 실천 콘텐츠를 확인해보세요.', 
      tag: ['일정한 시간에 잠자고 일어나기', '감사일기 쓰기', '옷,방 정리하기','거울 보면서 웃기', '햇빛 쬐기', '명상·복식호흡하기','반신욕'], 
      src: ImageSrc2 
    },
    { 
      title: '취미 활동', 
      text: '더 단단한 나를 만드는 4가지 일상 실천 콘텐츠를 확인해보세요.', 
      tag: ['맛있는 음식 먹기','영화,드라마,예능보기', '그림그리기', '색칠하기', '식물키우기','여행가기','음악,라디오듣기','쇼핑하기'], 
      src: ImageSrc3 
    }, 
    { 
      title: '건강', 
      text:  '더 단단한 나를 만드는 4가지 일상 실천 콘텐츠를 확인해보세요.', 
      tag: ['스트레칭 하기', '운동하기', '댄스 춤추기','건강식품 섭취하기','체중조절하기'], 
      src: ImageSrc4 
    },
  ];

  return (
    <section className="my-16">
      <h1 className="font-bold text-2xl text-scampi-700 dark:text-scampi-300 mb-4 text-center">매글과 함께 나의 일상 영역을</h1>
      <h1 className="font-bold text-2xl text-scampi-700 dark:text-scampi-300 mb-4 text-center">더욱 확장해 볼까요?</h1>
      <p className="text-sm text-scampi-500 dark:text-scampi-400 mb-8 text-center">더 단단한 나를 만드는 4가지 일상 실천 콘텐츠를 확인해보세요.</p>
      <div className="grid grid-cols-2 gap-6">
        {cardContents.map((content, index) => (
          <Card key={index} title={content.title} text={content.text} tag={content.tag} src={content.src} />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  title: string;
  text: string;
  tag: string[];
  src: string;
}

const Card: React.FC<CardProps> = ({ title, text, tag, src }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-front" style={{ backgroundImage: `url(${src})` }}>
          {/* 카드 전면 : Learn more버튼 하단 고정 */}
          <div className="absolute inset-0 flex flex-col justify-between bg-black/20 rounded-md text-white p-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-left">{text}</p>
            </div>
            <button className="text-stone-50 text-lg py-2 px-6 rounded-full mt-4 hover:bg-stone-300">
              Learn more
              <ArrowIcon className="inline-block ml-2" />
            </button>
          </div>
        </div>
        {/* 카드 후면: 버튼을 하단에 고정 */}
        <div className="card-back">
          <div className="flex flex-col justify-between items-start h-full">
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
              {/* 여러 개의 태그를 렌더링 */}
              <div className="flex flex-wrap justify-items-start space-x-2">
                {tag.map((t, index) => (
                  <span key={index} className="text-sm text-scampi-900 bg-stone-50 py-2 px-6 rounded-full mt-4">{t}</span>
                ))}
              </div>
            </div>
            <button className="text-stone-50 text-lg py-2 px-6 rounded-full mt-4 hover:bg-stone-50 hover:text-scampi-900">
              콘텐츠 탐색하기
              <ArrowIcon className="inline-block ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;

