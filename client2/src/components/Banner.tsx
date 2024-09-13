//client2/src/components/Banner.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// className prop을 받을 수 있도록 설정
interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className }) => {
  const slides = [
    "https://picsum.photos/1257/743?random=1",
    "https://picsum.photos/1257/743?random=2",
    "https://picsum.photos/1257/743?random=3",
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
    // 전달받은 className을 추가적으로 적용
    <div
      className={`flex items-center justify-center min-h-screen ${className}`}
    >
      {" "}
      {/* Flexbox로 가운데 정렬 */}
      <div className="relative w-[1257px] h-[743px] bg-neutral-700/40 rounded-3xl overflow-hidden justify-center">
        <div
          className="relative w-full h-full justify-center"
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
            <h1 className="mb-4 text-4xl">
              매일 나를 위한 5분 <br />
              글쓰기 지원 플랫폼
            </h1>
            <p className="text-center text-scampi-100 dark:text-scampi-600 text-base font-normal uppercase leading-none tracking-wider mb-4">
              감정일기& AI기록 가이드로 소중한 나의 일상을 가꿔요.
              <br />더 단단한 나를 만드는 하루 5분 글쓰기, 매글
            </p>
            <Link to="/maegeul">
              <button className="text-sm bg-white text-scampi-700 dark:text-scampi-200 py-2 px-4 rounded-full border border-scampi-50 dark:border-scampi-600 hover:bg-scampi-300 dark:hover:bg-scampi-700 cursor-pointer transition-colors">
                지금 쓰러가기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
