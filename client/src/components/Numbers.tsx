// src/components/Nubmers.tsx
import React from "react";
import NumberImage from "../Image/Numbers.png";

const Numbers: React.FC = () => {
  const numberItems = [
    {
      number: "150분",
      title: "하루 5분씩 꾸준히",
      description:
        "잠깐 시간을 내어 나의 일상을 5분간 회고해요. 한 달이면 150분 달성!",
    },
    {
      number: "10m",
      title: "매글에서 아낄 수 있는 시간은?",
      description: "매글을 통해 효율적으로 감정을 기록하고 관리할 수 있어요.",
    },
    {
      number: "2.8k+",
      title: "이미 함께하고 있는 사람은?",
      description: "많은 사람들이 이미 매글과 함께 일상을 기록하고 있어요.",
    },
    {
      number: "7000+",
      title: "매글에 지지해 준 분들은?",
      description: "수많은 분들이 매글의 가치를 인정해주셨어요.",
    },
  ];

  return (
    <div className="flex justify-center py-20 bg-white">
      <div className="max-w-[1140px] w-full flex flex-col lg:flex-row items-start gap-[110px]">
        <div className="flex-1 flex-col justify-start items-start gap-14 inline-flex">
          <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
            <h2 className="self-stretch text-blue-950 text-3xl font-extrabold font-plus-jakarta-sans leading-8 mb-2.5">
              나의 하루를 돌보는 감정일기 플랫폼 매글
            </h2>
            <p className="self-stretch text-slate-500 text-base font-medium font-plus-jakarta-sans leading-5">
              바쁜 일상 속에서 놓치기 쉬운 나의 마음 챙김을 매글에서 쉽게
              시작해보세요. <br />
              하루 중 나의 편안 지수와 에너지 레벨을 측정해 오늘의 무드 컬러를
              알려드려요.
            </p>
          </div>
          <div className="self-stretch grid grid-cols-2 gap-8">
            {numberItems.map((item, index) => (
              <div
                key={index}
                className="flex-col justify-center items-start gap-0.5 inline-grid"
              >
                <div className="self-stretch text-blue-950 text-4xl font-extrabold font-plus-jakarta-sans leading-tight">
                  {item.number}
                </div>
                <div className="self-stretch text-blue-950 text-md font-extrabold font-plus-jakarta-sans leading-5">
                  {item.title}
                </div>
                <div className="self-stretch text-slate-500 text-base font-medium font-plus-jakarta-sans leading-loose">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[555px] h-[506px] lg:h-[506px] px-[150px] relative">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img
              src={NumberImage}
              alt="NumberImage"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
