// src/pages/Home.tsx
import React from 'react';
import Header from '../components/Header';
import Contents from '../components/Contents';
import Banner from '../components/Banner';
import Navi from '../components/Navi';
import Guide from '../components/Guide';
import Footer from '../components/Footer'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Header />
      <div className="text-center relative overflow-hidden w-1220 h-720">
          <Banner />
        
        <div className="flex justify-center gap-10">
          <Navi />
        </div>
        
        <div className="flex w-full">
          <Guide />  {/* 글쓰기 스텝 가이드 */}
        </div>
      </div>
      <Contents />
      <Footer />
    </div>
  );
};

export default Home;

