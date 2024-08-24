import React from 'react';
import Header from '../components/Header';
import Contents from '../components/Contents';
import Banner from '../components/Banner';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Header />
      <div className="text-center mt-8 w-full"> {/* 가로 전체로 확장 */}
        <div className="relative overflow-hidden w-full h-96">
          <Banner />
        </div>
        <h1 className="font-bold text-2xl text-gray-600 dark:text-gray-300 mb-4">안녕하세요!</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">SubTitle</p>
        <div className="flex justify-center gap-4">
          <button className="bg-gray-700 dark:bg-gray-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors">
            긍정 글쓰기
          </button>
          <button className="bg-transparent text-gray-600 dark:text-gray-300 py-3 px-6 rounded-full border border-gray-600 dark:border-gray-400 cursor-pointer">
            Writting List
          </button>
        </div>
      </div>
      <Contents />
    </div>
  );
};

export default Home;
