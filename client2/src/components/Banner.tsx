import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner: React.FC = () => {
  const slides = [
    'https://picsum.photos/1257/743?random=1',
    'https://picsum.photos/1257/743?random=2',
    'https://picsum.photos/1257/743?random=3',
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000); // 5초마다 슬라이드 전환

      return () => clearInterval(slideInterval);
    }
  }, [isPaused, slides.length]);

  return (
    <div className="relative w-[1257px] h-[743px] bg-neutral-700/40 rounded-3xl overflow-hidden">
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
        {/* 고정된 텍스트와 링크 버튼 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white text-base font-bold font-['Arial']">
          <h1 className="mb-4 text-2xl">매일 나를 위한 5분 글쓰기 지원 플랫폼</h1>
          <Link to="/maegeul" className="bg-white text-black py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition-colors">
            지금 쓰러가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

