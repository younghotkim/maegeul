// src/components/Contents.tsx
import React from 'react';
import ImageSrc1 from '../Image/01.jpeg';
import ImageSrc2 from '../Image/02.jpeg';
import ImageSrc3 from '../Image/03.jpeg';
import ImageSrc4 from '../Image/04.jpeg';
import './Contents.css';

const Contents: React.FC = () => {
  const cardContents = [
    { title: '자기 계발', text: '독서하기', tag: '#책추천', src: ImageSrc1 }, 
    { title: '자기 관리', text: '일정한 시간에 잠자고 일어나기', tag: '#미라클모닝', src: ImageSrc2},
    { title: '취미 활동', text: '맛있는 음식 먹기', tag: '#식단', src: ImageSrc3 }, 
    { title: '건강', text: '스트레칭 하기', tag: '#명상', src: ImageSrc4 },
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
  tag: string;
  src: string;
}

const Card: React.FC<CardProps> = ({ title, text, tag, src }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-front" style={{ backgroundImage: `url(${src})` }}>
          <div className="absolute inset-0 flex flex-col justify-center items-left bg-black/50 rounded-md text-white p-4">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-left">{text}</p>
          </div>
        </div>
        <div className="card-back">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-sm text-scampi-500">{tag}</p>
            <button className="bg-stone-100 text-neutral-800 text-sm py-2 px-6 rounded-md mt-4 hover:bg-stone-300">콘텐츠 탐색하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;

