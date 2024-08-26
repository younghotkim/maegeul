// src/components/Contents.tsx
import React from 'react';
import ImageSrc1 from '../Image/01.jpeg';
import ImageSrc2 from '../Image/02.jpeg';
import ImageSrc3 from '../Image/03.jpeg';
import ImageSrc4 from '../Image/04.jpeg';

const Contents: React.FC = () => {
  const cardContents = [
    { title: '자기 계발', text: '독서하기', src: ImageSrc1 }, 
    { title: '자기 관리', text: '일정한 시간에 잠자고 일어나기', src: ImageSrc2},
    { title: '취미 활동', text: '맛있는 음식 먹기', src: ImageSrc3 }, 
    { title: '건강', text: '스트레칭 하기', src: ImageSrc4 },
  ];

  return (
    <section className="my-16">
      <h1 className="font-bold text-2xl text-scampi-700 dark:text-scampi-300 mb-4 text-center">매글과 함께 나의 일상 영역을</h1>
      <h1 className="font-bold text-2xl text-scampi-700 dark:text-scampi-300 mb-4 text-center">더욱 확장해 볼까요?</h1>
      <p className="text-sm text-scampi-500 dark:text-scampi-400 mb-8 text-center">더 단단한 나를 만드는 4가지 일상 실천 콘텐츠를 확인해보세요.</p>
      <div className="grid grid-cols-2 gap-6">
        {cardContents.map((content, index) => (
          <Card key={index} title={content.title} text={content.text} src={content.src} />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  title: string;
  text: string;
  src: string;
}

const Card: React.FC<CardProps> = ({ title, text, src }) => {
  return (
    <div className="relative w-full aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden">
      <img src={src} alt={title} className="w-96 h-96 object-cover" />
      <div className="absolute inset-0 flex flex-col justify-center items-left bg-black/50 text-white p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-left">{text}</p>
      </div>
    </div>
  );
};

export default Contents;
