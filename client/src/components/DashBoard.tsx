import React from "react";
import { LineRoundedInfo1 } from "../icons/LineRoundedInfo1";
import {
  Row,
  Col,
  Card,
  Typography,
  Image,
  Divider,
  Space,
  Avatar,
  Button,
} from "antd";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";

const Dashboard: React.FC = () => {
  return (
    <div className="relative w-[1600px] h-[1200px] bg-[#dee1e7]">
      <div className="absolute w-[1444px] h-[990px] top-[105px] left-20">
        <div className="absolute w-[1444px] h-[990px] top-0 left-0">
          <div className="relative w-[1440px] h-[990px] bg-[#ffffff] rounded-[30px] shadow-[0px_44px_84px_6px_#d8d9db]">
            <div className="absolute w-[291px] h-[990px] top-0 left-0 bg-[#f9f9f9] rounded-[20px_0px_0px_20px]">
              <div className="flex w-[200px] items-center gap-2.5 pl-0 pr-5 py-3 absolute top-[153px] left-9 rounded-lg">
                <div className="flex items-center gap-4 relative flex-1 grow">
                  <img
                    className="relative w-6 h-6"
                    alt="Grid"
                    src="/img/grid-1-1.svg"
                  />
                  <div className="flex-1 mt-[-1.00px] font-bold text-[#6956e5] text-lg tracking-[0] relative [font-family:'Manrope',Helvetica] leading-[normal]">
                    대시보드
                  </div>
                </div>
              </div>
              <div className="flex w-[200px] items-center gap-[21px] pl-0 pr-5 py-3 absolute top-[215px] left-9 rounded-lg">
                <img
                  className="relative w-5 h-6 ml-[-1.00px]"
                  alt="Vector"
                  src="/img/vector.svg"
                />
                <div className="relative w-fit mt-[-1.00px] font-medium text-dmvgrey-text text-lg [font-family:'Manrope',Helvetica] tracking-[0] leading-[normal]">
                  나의 일기장
                </div>
              </div>
              <div className="flex flex-col w-[200px] items-start justify-center gap-2.5 pl-0 pr-5 py-3 absolute top-[277px] left-9 rounded-lg">
                <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
                  <img
                    className="relative w-6 h-6"
                    alt="Solar fire bold"
                    src="/img/solar-fire-bold.svg"
                  />
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Manrope',Helvetica] font-medium text-dmvgrey-text text-lg tracking-[0] leading-[normal]">
                    무디타 챌린지
                  </div>
                </div>
              </div>
              <img
                className="absolute w-[218px] h-px top-[402px] left-8 object-cover"
                alt="Vector"
                src="/img/vector-24.svg"
              />
              <div className="absolute w-[221px] h-[197px] top-[743px] left-9">
                <div className="relative w-[219px] h-[197px]">
                  <div className="absolute w-[219px] h-[161px] top-9 left-0 bg-[#6956e5] rounded-xl opacity-10" />
                  <div className="absolute w-[183px] h-[33px] top-[149px] left-[18px] bg-[#ffffff] rounded-md" />
                  <p className="absolute top-[157px] left-[45px] [font-family:'Manrope',Helvetica] font-semibold text-[#6956e5] text-xs tracking-[0] leading-[normal]">
                    마음을 비추는 작은 불, 무디타
                  </p>
                  <div className="absolute w-[150px] h-[155px] top-0 left-[35px]">
                    <div className="relative h-[155px]">
                      <img
                        className="object-cover absolute w-[150px] h-[150px] top-0 left-0"
                        alt="Object"
                        src="/img/object.png"
                      />
                      <div className="bg-[#6956e5] mix-blend-color absolute w-[150px] h-[150px] top-0 left-0" />
                      <img
                        className="absolute w-[127px] h-[43px] top-28 left-[11px]"
                        alt="Vector"
                        src="/img/vector-8.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[745px] h-[407px] top-[523px] left-[331px]">
              <div className="relative w-[741px] h-[407px] bg-[#ffffff] rounded-[10px] shadow-[0px_4px_39px_9px_#51459f17]">
                <div className="absolute top-6 left-6 [font-family:'Manrope',Helvetica] font-bold text-dmvblack text-lg tracking-[0] leading-10 whitespace-nowrap">
                  감정 변화 그래프
                </div>
                <div className="absolute top-6 left-[401px] [font-family:'Manrope',Helvetica] font-bold text-dmvblack text-lg tracking-[0] leading-10 whitespace-nowrap">
                  나의 마음구름
                </div>
              </div>
            </div>
            <div className="absolute w-[362px] h-[344px] top-[139px] left-[331px]">
              <div className="absolute w-[362px] h-[344px] top-0 left-0">
                <div className="relative w-[360px] h-[344px] bg-[#ffffff] rounded-[10px] border border-solid border-[#e6e8ec]">
                  <div className="absolute top-[23px] left-[23px] [font-family:'Manrope',Helvetica] font-bold text-dmvblack text-lg tracking-[0] leading-10 whitespace-nowrap">
                    무드 컬러 그래프
                  </div>
                </div>
              </div>
              <div className="inline-flex items-end justify-center gap-4 absolute top-[76px] left-[26px]">
                <div className="relative w-[69px] h-36">
                  <div className="absolute h-4 top-32 left-[21px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-xs tracking-[0] leading-[normal]">
                    빨강
                  </div>
                  <div className="absolute h-4 top-0 left-[26px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-xs tracking-[0] leading-[normal]">
                    10
                  </div>
                  <div className="absolute w-[65px] h-[104px] top-5 left-0 bg-[#f66a6a] rounded-[8px_8px_0px_0px]" />
                </div>
                <div className="relative w-[69px] h-[84px]">
                  <div className="absolute h-4 top-[68px] left-[21px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-xs tracking-[0] leading-[normal]">
                    파랑
                  </div>
                  <div className="absolute h-4 top-0 left-[29px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-xs tracking-[0] leading-[normal]">
                    3
                  </div>
                  <div className="absolute w-[65px] h-11 top-5 left-0 bg-[#59c6f6] rounded-[8px_8px_0px_0px]" />
                </div>
                <div className="relative w-[69px] h-[117px]">
                  <div className="absolute h-4 top-[101px] left-[21px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-xs tracking-[0] leading-[normal]">
                    노랑
                  </div>
                  <div className="absolute h-4 top-0 left-[29px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-xs tracking-[0] leading-[normal]">
                    5
                  </div>
                  <div className="absolute w-[65px] h-[77px] top-5 left-0 bg-[#fabe7a] rounded-[8px_8px_0px_0px]" />
                </div>
                <div className="relative w-[69px] h-[61px] mr-[-4.00px]">
                  <div className="absolute h-4 top-[45px] left-[22px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-xs tracking-[0] leading-[normal]">
                    초록
                  </div>
                  <div className="absolute h-4 top-0 left-[30px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-xs tracking-[0] leading-[normal]">
                    1
                  </div>
                  <div className="absolute w-[65px] h-[21px] top-5 left-0 bg-[#8ae261] rounded-[8px_8px_0px_0px]" />
                </div>
              </div>
              <LineRoundedInfo1 className="!absolute !w-[15px] !h-[15px] !top-9 !left-[157px]" />
            </div>
            <div className="absolute w-[364px] h-[344px] top-[139px] left-[710px]">
              <div className="relative w-[362px] h-[344px] bg-[#ffffff] rounded-[10px] border border-solid border-[#e6e8ec]">
                <div className="absolute top-[23px] left-[23px] [font-family:'Manrope',Helvetica] font-bold text-dmvblack text-lg tracking-[0] leading-10 whitespace-nowrap">
                  글쓰기 통계
                </div>
                <div className="inline-flex items-center gap-0.5 absolute top-9 left-[220px]">
                  <p className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-semibold text-[#787486] text-xs tracking-[0] leading-[normal]">
                    8월 23일 - 9월 10일
                  </p>
                  <img
                    className="relative w-3.5 h-3.5"
                    alt="Icon arrow down"
                    src="/img/icon-arrow-down.svg"
                  />
                </div>
              </div>
            </div>
            <div className="absolute top-[523px] left-[1102px] [font-family:'Manrope',Helvetica] font-bold text-dmvblack text-lg tracking-[0] leading-10 whitespace-nowrap">
              린다님을 위한 콘텐츠 추천
            </div>
            <div className="absolute top-[905px] left-[1223px] [font-family:'Inter',Helvetica] font-semibold text-[#6956e5] text-sm tracking-[0] leading-6 whitespace-nowrap">
              View All
            </div>
            <div className="inline-flex flex-col items-start gap-4 absolute top-[621px] left-[1102px]">
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                <div className="relative w-[298px] h-14 bg-[#6956e5d9] rounded-[10px]">
                  <div className="relative w-[269px] h-[34px] top-[11px] left-3">
                    <p className="top-0 font-bold text-[#ffffff] text-xs absolute left-0 [font-family:'Manrope',Helvetica] tracking-[0] leading-[normal]">
                      빨강 구역 여행자를 위한 콘텐츠 추천은?
                    </p>
                    <p className="top-5 font-normal text-[#ffffff] text-[10px] absolute left-0 [font-family:'Manrope',Helvetica] tracking-[0] leading-[normal]">
                      감정을 진정시키고 스트레스를 해소할 수 있는 콘텐츠가
                      필요해요.
                    </p>
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                <div className="relative w-[298px] h-14 bg-[#ebe8ff] rounded-[10px]">
                  <img
                    className="absolute w-9 h-9 top-2.5 left-2.5 object-cover"
                    alt="Rectangle"
                    src="/img/rectangle-774.png"
                  />
                  <div className="w-[203px] absolute h-[34px] top-[11px] left-[60px]">
                    <p className="absolute top-0 left-0 [font-family:'Manrope',Helvetica] font-medium text-dmvblack text-xs tracking-[0] leading-[normal]">
                      굳은 몸을 풀어주는 시간별 명상 가이드
                    </p>
                    <p className="top-5 font-normal text-[#708099] text-[10px] absolute left-0 [font-family:'Manrope',Helvetica] tracking-[0] leading-[normal]">
                      호흡 훈련을 통해 어느 순간에도 평정을 유지해요.
                    </p>
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                <div className="relative w-[298px] h-14 bg-[#ebe8ff] rounded-[10px]">
                  <img
                    className="absolute w-9 h-9 top-2.5 left-2.5 object-cover"
                    alt="Rectangle"
                    src="/img/rectangle-774-1.png"
                  />
                  <div className="w-[215px] absolute h-[34px] top-[11px] left-[60px]">
                    <p className="absolute top-0 left-0 [font-family:'Manrope',Helvetica] font-medium text-dmvblack text-xs tracking-[0] leading-[normal]">
                      우울과 불안을 빠르게 해소하는 운동 시리즈
                    </p>
                    <p className="top-5 font-normal text-[#708099] text-[10px] absolute left-0 [font-family:'Manrope',Helvetica] tracking-[0] leading-[normal]">
                      나에게 맞는 운동 루틴을 통해 스트레스를 해소해요.
                    </p>
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                <div className="relative w-[298px] h-14 bg-[#ebe8ff] rounded-[10px]">
                  <img
                    className="absolute w-9 h-9 top-2.5 left-2.5 object-cover"
                    alt="Rectangle"
                    src="/img/rectangle-774-2.png"
                  />
                  <div className="w-[226px] absolute h-[34px] top-[11px] left-[60px]">
                    <p className="absolute top-0 left-0 [font-family:'Manrope',Helvetica] font-medium text-dmvblack text-xs tracking-[0] leading-[normal]">
                      스트레스에 대응하는 나만의 멘탈 루틴 만들기
                    </p>
                    <p className="top-5 font-normal text-[#708099] text-[10px] absolute left-0 [font-family:'Manrope',Helvetica] tracking-[0] leading-[normal]">
                      01 April, 2021 | 03:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[298px] h-[103px] top-[139px] left-[1102px] bg-[#f9a64433] rounded-[10px]">
              <div className="inline-flex flex-col items-center gap-[5px] relative top-3.5 left-11">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-bold text-black text-[22px] tracking-[0.10px] leading-[normal]">
                  19회
                </div>
                <p className="w-fit font-medium text-black text-sm tracking-[0.10px] relative [font-family:'Manrope',Helvetica] leading-[normal]">
                  린다님이 작성한 감정 일기 페이지 수
                </p>
                <p className="w-fit font-medium text-[#787486] text-xs tracking-[0.10px] relative [font-family:'Manrope',Helvetica] leading-[normal]">
                  2024년 8월 12일부터 작성한 누적 일기수
                </p>
              </div>
            </div>
            <div className="absolute w-[298px] h-[102px] top-[260px] left-[1102px] bg-[#44c5e133] rounded-[10px]">
              <div className="inline-flex flex-col items-center gap-[5px] relative top-[13px] left-[25px]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-bold text-black text-[22px] tracking-[0.10px] leading-[normal]">
                  12일
                </div>
                <div className="w-fit font-medium text-black text-sm tracking-[0.10px] relative [font-family:'Manrope',Helvetica] leading-[normal]">
                  연속 글쓰기 작성일 수
                </div>
                <p className="w-fit font-medium text-[#787486] text-xs tracking-[0.10px] relative [font-family:'Manrope',Helvetica] leading-[normal]">
                  마음 챙김을 위한 글쓰기 습관 만들기! 연속 달성 수
                </p>
              </div>
            </div>
            <div className="absolute w-[298px] h-[103px] top-[380px] left-[1102px] bg-[#8382de33] rounded-[10px]">
              <div className="relative w-[225px] h-[75px] top-3 left-9">
                <div className="inline-flex flex-col items-center gap-[5px] relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-bold text-black text-[22px] tracking-[0.10px] leading-[normal]">
                    31%
                  </div>
                  <div className="w-fit font-medium text-black text-sm tracking-[0.10px] relative [font-family:'Manrope',Helvetica] leading-[normal]">
                    긍정 감정 기록 횟수
                  </div>
                  <p className="w-fit font-medium text-[#787486] text-xs tracking-[0.10px] relative [font-family:'Manrope',Helvetica] leading-[normal]">
                    기분수치 측정을 바탕으로 추출된 긍정감정 수
                  </p>
                </div>
              </div>
            </div>
            <header className="absolute w-[495px] h-[61px] top-[30px] left-[331px] bg-transparent">
              <div className="absolute top-0 left-0 [font-family:'Manrope',Helvetica] font-bold text-dmvblack text-[26px] tracking-[0] leading-10 whitespace-nowrap">
                린다님의 감정 일기 대시보드
              </div>
              <p className="absolute h-[19px] top-[42px] left-0 [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-sm tracking-[0] leading-[normal]">
                매글과 함께한 지 10일째! 감정기록과 글쓰기로 나를 이해하는
                마음의 지도를 만들어요!
              </p>
            </header>
          </div>
        </div>
        <p className="absolute top-[566px] left-[1102px] [font-family:'Manrope',Helvetica] font-medium text-[#787486] text-xs tracking-[0.10px] leading-[normal]">
          매글 n일차 린다님의 주요 무드 컬러는 ‘빨강&#39;이에요.
          <br />
          빨강구역에서는 에너지는 높지만 쾌적함이 낮아요.
        </p>
        <div className="inline-flex items-center gap-0.5 absolute top-[175px] left-[556px]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-semibold text-[#787486] text-xs tracking-[0] leading-[normal]">
            8월 23일- 9월 10일
          </div>
          <img
            className="relative w-3.5 h-3.5"
            alt="Icon arrow down"
            src="/img/icon-arrow-down-1.svg"
          />
        </div>
        <div className="flex flex-col w-[200px] items-start justify-center gap-2.5 pl-0 pr-5 py-3 absolute top-[339px] left-9 rounded-lg">
          <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <img
              className="relative w-6 h-6"
              alt="Settings"
              src="/img/settings-1-1.svg"
            />
            <div className="relative flex-1 mt-[-1.00px] [font-family:'Manrope',Helvetica] font-medium text-dmvgrey-text text-lg tracking-[0] leading-[normal]">
              개인 설정
            </div>
          </div>
        </div>
        <img
          className="absolute w-11 h-11 top-[38px] left-[33px]"
          alt="Ph pencil simple"
          src="/img/ph-pencil-simple-line-light.svg"
        />
        <div className="absolute w-[135px] top-[41px] left-[81px] [font-family:'DM_Sans',Helvetica] font-bold text-[#6956e5] text-xl tracking-[0] leading-[38px]">
          MAEGEUL
        </div>
        <div className="absolute w-[311px] h-[70px] top-[377px] left-[355px]">
          <div className="inline-flex flex-col h-[70px] items-start gap-3 relative">
            <div className="inline-flex items-center gap-[11px] relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-sm tracking-[0] leading-[normal]">
                  oo님의 대표 무드 컬러는?
                </div>
              </div>
              <div className="relative w-[38px] h-[26px]">
                <div className="relative w-9 h-[26px] bg-[#f66a6a] rounded">
                  <div className="absolute w-9 h-4 top-[5px] left-0 font-semibold text-[#ffffff] text-xs text-center [font-family:'Manrope',Helvetica] tracking-[0] leading-[normal]">
                    빨강
                  </div>
                </div>
              </div>
              <div className="relative w-fit [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-sm tracking-[0] leading-[normal]">
                분노ㆍ불안ㆍ긴장
              </div>
            </div>
            <div className="inline-flex items-center gap-[11px] relative flex-[0_0_auto]">
              <div className="flex w-[148px] items-center gap-3 relative">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-sm tracking-[0] leading-[normal]">
                  oo님의 잠재 무드 컬러?
                </div>
              </div>
              <div className="relative w-[38px] h-[26px]">
                <div className="relative w-9 h-[26px] bg-[#8ae261] rounded">
                  <div className="absolute w-9 h-4 top-[5px] left-0 font-semibold text-[#ffffff] text-xs text-center [font-family:'Manrope',Helvetica] tracking-[0] leading-[normal]">
                    초록
                  </div>
                </div>
              </div>
              <div className="relative w-fit [font-family:'Manrope',Helvetica] font-semibold text-gray-3 text-sm tracking-[0] leading-[normal]">
                만족ㆍ평온ㆍ안정
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-3.5 absolute top-[45px] left-[1214px]">
          <div className="relative w-[43.97px] h-[47.99px] rounded-2xl overflow-hidden">
            <div className="w-12 h-[49px] rounded-lg">
              <div className="relative h-12 top-px left-px rounded-2xl overflow-hidden border border-solid border-[#0000001a]">
                <div className="w-[47px] h-[47px] bg-[url(/static/img/acg8ocjr4vcldi94z6kvbgzo7dmiymnf4zn1yvzlvbnavmquail0cle-s96-c.png)] bg-cover bg-[50%_50%]" />
              </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-3.5 relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-end gap-2 px-6 py-[18px] relative flex-[0_0_auto] bg-[#6956e5] rounded-[30px]">
              <div className="relative w-fit mt-[-1.00px] font-text-single-100-bold font-[number:var(--text-single-100-bold-font-weight)] text-neutral-colorswhite text-[length:var(--text-single-100-bold-font-size)] text-center tracking-[var(--text-single-100-bold-letter-spacing)] leading-[var(--text-single-100-bold-line-height)] whitespace-nowrap [font-style:var(--text-single-100-bold-font-style)]">
                로그아웃
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[290px] h-[290px] top-[604px] left-[720px] bg-[#ffffff] rounded-[15px] overflow-hidden border border-solid border-[#e6e8ec]">
          <div className="relative w-[247px] h-[252px] top-4 left-[21px]">
            <div className="absolute w-[247px] h-[252px] top-0 left-0">
              <div className="absolute top-[99px] left-[38px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[43.8px] tracking-[0] leading-[normal]">
                positive
              </div>
              <div className="absolute top-[145px] left-[25px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[29.2px] tracking-[0] leading-[normal] whitespace-nowrap">
                optimistic
              </div>
              <div className="absolute top-[71px] left-[67px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[29.2px] tracking-[0] leading-[normal] whitespace-nowrap">
                hopeful
              </div>
              <div className="absolute top-8 left-[75px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[29.2px] tracking-[0] leading-[normal] whitespace-nowrap">
                confident
              </div>
              <div className="absolute top-[131px] left-[173px] -rotate-90 [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[27.7px] tracking-[0] leading-[normal]">
                cheerful
              </div>
              <div className="absolute top-[196px] left-[72px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[27.7px] tracking-[0] leading-[normal]">
                upbeat
              </div>
              <div className="absolute top-0 left-[107px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[27.7px] tracking-[0] leading-[normal]">
                productive
              </div>
              <div className="absolute top-[168px] left-[103px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[27.7px] tracking-[0] leading-[normal]">
                helpful
              </div>
              <div className="absolute top-[178px] left-[27px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[24.7px] tracking-[0] leading-[normal]">
                calm
              </div>
              <div className="absolute top-[222px] left-24 [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[24.7px] tracking-[0] leading-[normal]">
                honest
              </div>
              <div className="absolute top-px left-0 [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[20.1px] tracking-[0] leading-[normal] whitespace-nowrap">
                passionate
              </div>
              <div className="absolute top-[225px] left-[22px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[20.1px] tracking-[0] leading-[normal] whitespace-nowrap">
                strong
              </div>
              <div className="absolute top-[55px] left-[7px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[19.1px] tracking-[0] leading-[normal]">
                relaxed
              </div>
              <div className="absolute top-[19px] left-[26px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[16.1px] tracking-[0] leading-[normal] whitespace-nowrap">
                generous
              </div>
              <div className="absolute top-[150px] left-[177px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[16.1px] tracking-[0] leading-[normal] whitespace-nowrap">
                kind
              </div>
              <div className="absolute top-[99px] left-[159px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[14.1px] tracking-[0] leading-[normal]">
                clever
              </div>
              <div className="absolute top-[100px] left-0 -rotate-90 [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[14.1px] tracking-[0] leading-[normal]">
                smart
              </div>
              <div className="absolute top-[58px] left-[97px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[14.1px] tracking-[0] leading-[normal]">
                unique
              </div>
              <div className="absolute top-[62px] left-[145px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[14.1px] tracking-[0] leading-[normal]">
                creative
              </div>
            </div>
            <div className="absolute top-[229px] left-[183px] [font-family:'Inter',Helvetica] font-normal text-[#6956e5] text-[19.1px] tracking-[0] leading-[normal]">
              loving
            </div>
          </div>
        </div>
        <img
          className="absolute w-px h-[346px] top-[550px] left-[702px] object-cover"
          alt="Line"
          src="/img/line-15.svg"
        />
        <div className="absolute w-[308px] h-72 top-[606px] left-[355px] bg-[#ffffff] rounded-[15px] overflow-hidden border border-solid border-[#e6e8ec]">
          <div className="relative w-[586px] h-[322px] -top-4 bg-[#ffffff] rounded-[7.91px] shadow-[0px_3.16px_30.84px_7.12px_#51459f17]">
            <div className="flex w-[117px] h-3 items-start gap-[29.47px] absolute top-[41px] left-[19px]">
              <div className="inline-flex items-center gap-[3.93px] relative flex-[0_0_auto] mb-[-0.56px]">
                <div className="relative w-[6.55px] h-[6.55px] bg-[#fb896b] rounded-[3.27px]" />
                <div className="relative w-fit mt-[-0.65px] [font-family:'Manrope',Helvetica] font-normal text-[#787486] text-[9.2px] tracking-[0] leading-[normal]">
                  편안 지수
                </div>
              </div>
              <div className="inline-flex items-center gap-[3.93px] relative flex-[0_0_auto] mb-[-0.56px] mr-[-5.21px]">
                <div className="relative w-[6.55px] h-[6.55px] bg-[#6956e5] rounded-[3.27px]" />
                <div className="relative w-fit mt-[-0.65px] [font-family:'Manrope',Helvetica] font-normal text-[#787486] text-[9.2px] tracking-[0] leading-[normal]">
                  활기 지수
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[11px] h-[215px] items-end gap-[17.4px] absolute top-[70px] left-[19px]">
              <div className="relative w-fit mt-[-0.79px] [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                10
              </div>
              <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                8
              </div>
              <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                6
              </div>
              <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                4
              </div>
              <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                2
              </div>
              <div className="relative w-fit [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                0
              </div>
            </div>
            <div className="absolute w-[514px] h-[199px] top-[79px] left-[42px]">
              <div className="absolute w-[510px] h-[199px] top-0 left-1">
                <img
                  className="absolute w-[262px] h-px -top-px left-0"
                  alt="Line"
                  src="/img/line-5.svg"
                />
                <div className="absolute w-[262px] h-[45px] top-[11px] left-0">
                  <img
                    className="absolute w-[262px] h-px top-[22px] left-0"
                    alt="Line"
                    src="/img/line-6.svg"
                  />
                  <div className="absolute w-14 h-[45px] top-0 left-[186px]">
                    <div className="relative h-[45px]">
                      <img
                        className="absolute w-[85px] h-[74px] -top-2.5 left-[-15px]"
                        alt="Union"
                        src="/img/union.svg"
                      />
                    </div>
                  </div>
                </div>
                <img
                  className="absolute w-[262px] h-px top-[66px] left-0"
                  alt="Line"
                  src="/img/line-7.svg"
                />
                <div className="absolute w-[263px] h-[116px] top-[81px] -left-px">
                  <div className="absolute w-[262px] h-[116px] top-0 left-px">
                    <img
                      className="absolute w-[262px] h-px top-[18px] left-0"
                      alt="Line"
                      src="/img/line-3.svg"
                    />
                    <img
                      className="absolute w-[262px] h-px top-[51px] left-0"
                      alt="Line"
                      src="/img/line-8.svg"
                    />
                    <img
                      className="absolute w-[262px] h-px top-[85px] left-0"
                      alt="Line"
                      src="/img/line-9.svg"
                    />
                    <img
                      className="absolute w-px h-[116px] top-0 left-[212px]"
                      alt="Vector"
                      src="/img/vector-25.svg"
                    />
                  </div>
                  <div className="flex w-[210px] h-4 items-start justify-end gap-[31.74px] absolute top-[90px] left-0">
                    <div className="relative w-fit mt-[-0.79px] [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                      0
                    </div>
                    <div className="relative w-fit mt-[-0.79px] [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                      2
                    </div>
                    <div className="relative w-fit mt-[-0.79px] [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                      4
                    </div>
                    <div className="relative w-fit mt-[-0.79px] [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                      6
                    </div>
                    <div className="relative w-fit mt-[-0.79px] [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                      8
                    </div>
                    <div className="relative w-fit mt-[-0.79px] [font-family:'Inter',Helvetica] font-normal text-gray-500 text-[9.5px] text-right tracking-[0] leading-[15.8px] whitespace-nowrap">
                      10
                    </div>
                  </div>
                </div>
                <img
                  className="absolute w-[262px] h-px top-[198px] left-0"
                  alt="Line"
                  src="/img/line-4.svg"
                />
              </div>
              <img
                className="absolute w-[204px] h-16 top-[71px] left-[13px]"
                alt="Vector"
                src="/img/vector-18.svg"
              />
              <img
                className="absolute w-[206px] h-[84px] top-[47px] left-3"
                alt="Vector"
                src="/img/vector-20.svg"
              />
              <img
                className="absolute w-[227px] h-[105px] top-[39px] left-0"
                alt="Vector"
                src="/img/vector-21.svg"
              />
              <img
                className="absolute w-[229px] h-[90px] top-[62px] left-px"
                alt="Vector"
                src="/img/vector-19.svg"
              />
              <div className="absolute w-[11px] h-[11px] top-16 left-[210px] bg-[#fb896b] rounded-[5.54px] border-[1.58px] border-solid border-white shadow-[0px_1.58px_3.16px_#44444f26]" />
              <div className="absolute w-[11px] h-[11px] top-16 left-[210px] bg-[#fb896b] rounded-[5.54px] border-[1.58px] border-solid border-white shadow-[0px_1.58px_3.16px_#44444f26]" />
            </div>
          </div>
        </div>
        <div className="absolute w-10 h-6 top-[687px] left-[594px]">
          <div className="relative h-6">
            <div className="absolute w-10 h-2.5 top-0 left-0">
              <div className="inline-flex flex-col items-start gap-[3.67px] relative">
                <div className="inline-flex items-center gap-[3.67px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-0.46px] [font-family:'Inter',Helvetica] font-medium text-dmvblack text-[6.4px] tracking-[0] leading-[9.2px] whitespace-nowrap">
                    24.09.10
                  </div>
                  <img
                    className="relative w-[9.65px] h-[9.65px]"
                    alt="Typcn calendar"
                    src="/img/typcn-calendar.svg"
                  />
                </div>
              </div>
            </div>
            <div className="absolute w-[39px] h-2.5 top-3.5 left-0">
              <div className="inline-flex flex-col items-start gap-[3.67px] relative">
                <div className="inline-flex items-center gap-[3.67px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-0.46px] [font-family:'Inter',Helvetica] font-medium text-dmvblack text-[6.4px] tracking-[0] leading-[9.2px] whitespace-nowrap">
                    무드 컬러 :
                  </div>
                  <div className="relative w-[6.43px] h-[6.43px] bg-[#8ae261] rounded-[3.21px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <LineRoundedInfo1 className="!absolute !w-[15px] !h-[15px] !top-[175px] !left-[829px]" />
        <div className="absolute w-[304px] h-[241px] top-[215px] left-[739px]">
          <div className="relative w-[308px] h-[241px]">
            <div className="absolute w-[178px] h-[179px] top-[25px] left-[130px]">
              <div className="relative w-[175px] h-[181px] -top-px">
                <div className="absolute w-[169px] h-[169px] top-1.5 left-0 bg-[#f89c2f] rounded-[84.36px] opacity-90" />
                <div className="absolute w-[70px] top-[63px] left-[50px] [font-family:'Poppins',Helvetica] font-normal text-[#ffffff] text-[33.7px] tracking-[0.53px] leading-[33.7px] whitespace-nowrap">
                  19회
                </div>
                <div className="absolute w-[74px] top-[105px] left-[47px] [font-family:'Poppins',Helvetica] font-normal text-[#ffffff] text-[11.5px] tracking-[0.53px] leading-[12.7px] whitespace-nowrap">
                  일기 총 작성수
                </div>
                <img
                  className="absolute w-[155px] h-[181px] top-0 left-5"
                  alt="Ellipse"
                  src="/img/ellipse-17.svg"
                />
              </div>
            </div>
            <div className="absolute w-[111px] h-[107px] top-0 left-9">
              <div className="relative w-[108px] h-[107px] -top-px">
                <div className="w-[104px] h-[104px] top-1 bg-[#6463d6] rounded-[51.88px] opacity-80 absolute left-0" />
                <div className="absolute w-[38px] top-[37px] left-[33px] [font-family:'Poppins',Helvetica] font-normal text-[#ffffff] text-[20.8px] tracking-[0.32px] leading-[20.8px] whitespace-nowrap">
                  31%
                </div>
                <div className="absolute top-[65px] left-[23px] [font-family:'Poppins',Helvetica] font-normal text-[#ffffff] text-xs tracking-[0.32px] leading-[7.8px] whitespace-nowrap">
                  긍정 기록수
                </div>
                <img
                  className="w-14 h-14 left-[52px] absolute top-0"
                  alt="Ellipse"
                  src="/img/ellipse-17-1.svg"
                />
              </div>
            </div>
            <div className="absolute w-[130px] h-[130px] top-[111px] left-0">
              <div className="relative w-[127px] h-[132px] -top-px">
                <div className="w-[122px] h-[122px] top-[5px] bg-[#2fbede] rounded-[61.18px] opacity-90 absolute left-0" />
                <div className="absolute top-11 left-[37px] [font-family:'Poppins',Helvetica] font-normal text-[#ffffff] text-2xl tracking-[0.38px] leading-6 whitespace-nowrap">
                  12일
                </div>
                <div className="absolute top-[75px] left-[23px] [font-family:'Poppins',Helvetica] font-normal text-[#ffffff] text-xs tracking-[0.38px] leading-3 whitespace-nowrap">
                  연속 매글 지수
                </div>
                <img
                  className="w-[123px] h-[132px] left-1 absolute top-0"
                  alt="Ellipse"
                  src="/img/ellipse-17-2.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
