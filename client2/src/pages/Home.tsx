import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contents from '../components/Contents';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Header />
      <div className="text-center mt-8">
        <div className="my-16">
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-lg animate-slide"></div>
            <div className="relative text-6xl text-gray-600">배너자리</div>
          </div>
          <h1 className="text-2xl text-gray-600 mb-4">안녕하세요!</h1>
          <p className="text-sm text-gray-500 mb-8">SubTitle</p>
          <div className="flex justify-center gap-4">
            <button className="bg-gray-600 text-white py-3 px-6 rounded-full border-none cursor-pointer">
              긍정 글쓰기
            </button>
            <button className="bg-transparent text-gray-600 py-3 px-6 rounded-full border border-gray-600 cursor-pointer">
              Writting List
            </button>
          </div>
        </div>

        <div className="my-16">
          <Contents />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
