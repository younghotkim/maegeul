import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Banner: React.FC = () => {
  const slides = [
    'https://picsum.photos/1200/600?random=1',
    'https://picsum.photos/1200/600?random=2',
    'https://picsum.photos/1200/600?random=3',
    'https://picsum.photos/1200/600?random=4',
    'https://picsum.photos/1200/600?random=5',
    'https://picsum.photos/1200/600?random=6',
    'https://picsum.photos/1200/600?random=7',
    'https://picsum.photos/1200/600?random=8',
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

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-1100 h-96 bg-neutral-700/40 rounded-3xl overflow-hidden">
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
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;
