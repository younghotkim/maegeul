//src/components/Contents.tsx
import React from 'react';

const Home: React.FC = () => {
  const cardContents = [
    { title: '건강', text: '스트레칭 하기' },
    { title: '자기 계발', text: '독서하기' },
    { title: '자기 관리', text: '일정한 시간에 잠자고 일어나기' },
    { title: '취미 활동', text: '맛있는 음식 먹기' },
  ];

  return (
    <section className="my-16">
      <h1 className="font-bold text-2xl text-gray-600 dark:text-gray-300 mb-4">안녕하세요!</h1>
      <p className="text-sm text-gray-500 mb-8">SubTitle</p>
      <div className="flex justify-center gap-4 flex-wrap">
        {cardContents.map((content, index) => (
          <Card key={index} title={content.title} text={content.text} />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ title, text }) => {
  return (
    <div className="w-52 p-4 bg-gray-100 rounded-lg text-center">
      <div className="w-full h-24 bg-gray-300 rounded-lg mb-4"></div>
      <h3 className="text-2xl font-bold text-cyan-950 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
};

export default Home;

