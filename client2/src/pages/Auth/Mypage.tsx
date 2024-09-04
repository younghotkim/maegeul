// src/pages/AIWriting/Mypage.tsx
import React from 'react';
import Header from '../../components/Header';
const Mypage: React.FC = () => {
    return (
        <>
        <Header />
        <div className="FootersV5 w-96 h-96 relative bg-white">
    <div className="FooterDescription w-96 h-24 left-[109.85px] top-[194.40px] absolute text-slate-400 text-lg font-normal font-['DM Sans'] leading-loose">단단한 나를 만드는 5분 글쓰기 습관, 매글! 간편한 <br/>이메일 가입으로 지금 바로 시작해 볼까요? </div>
    <div className="NewsletterInput w-96 left-[111px] top-[311.74px] absolute">
        <div className="MasterInputText w-60 h-16 p-6 left-0 top-0 absolute bg-slate-50 rounded-3xl justify-start items-start gap-60 inline-flex">
            <div className="Container h-5 justify-start items-center gap-2.5 flex">
                <div className="TextIcons h-5 justify-start items-center gap-60 flex">
                    <div className="InputContent h-5 justify-start items-start gap-2 flex">
                        <div className="InputPlaceholder text-center text-slate-400 text-base font-normal font-['DM Sans'] leading-none">Enter your email</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="MasterPrimaryButton w-28 h-14 px-6 py-4 left-[257px] top-[6.54px] absolute bg-slate-500 rounded-3xl justify-start items-start gap-2 inline-flex">
            <div className="ButtonText text-center text-white text-base font-bold font-['DM Sans'] leading-none">Sign Up</div>
        </div>
    </div>
    <div className="FooterBottom w-96 h-16 left-[103px] top-[431.64px] absolute">
        <div className="SocialMediaContainer h-9 left-[1028px] top-[26.36px] absolute justify-start items-start gap-4 inline-flex">
            <div className="SocialMediaIconSquareFacebook w-9 h-9 relative" />
            <div className="SocialMediaIconSquareInstagram w-9 h-9 relative">
                <img className="Instagram w-0.5 h-0.5 left-[21.75px] top-[12.01px] absolute" src="https://via.placeholder.com/2x2" />
            </div>
            <div className="SocialMediaIconSquareTwitter w-9 h-9 relative" />
        </div>
        <div className="Divider w-96 h-px left-[1220px] top-0 absolute origin-top-left rotate-180 border border-gray-300"></div>
        <div className="Copyright w-96 h-5 left-[6px] top-[34.88px] absolute text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">Copyright © 2024 릿미 | All Rights Reserved</div>
    </div>
    <div className="FooterContent w-96 h-80 left-[625.28px] top-[130px] absolute">
        <div className="FooterSection w-32 h-80 left-0 top-[0.80px] absolute">
            <div className="FooterTitle w-20 h-5 left-0 top-0 absolute text-slate-500 text-xl font-bold font-['DM Sans'] leading-tight">안내 사항</div>
            <div className="LinksGroup w-32 h-64 left-0 top-[65.40px] absolute">
                <div className="Link h-4 left-0 top-0 absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">회사 소개  </div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[39.24px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">제휴 문의 </div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[78.48px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">회원 약관</div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[117.72px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">개인정보처리방침</div>
                    </div>
                </div>
                <div className="Link h-5 left-0 top-[196.20px] absolute" />
                <div className="Link h-5 left-0 top-[235.44px] absolute" />
            </div>
        </div>
        <div className="FooterSection w-28 h-52 left-[297.72px] top-[1px] absolute">
            <div className="FooterTitle w-20 h-5 left-0 top-0 absolute text-slate-500 text-xl font-bold font-['DM Sans'] leading-tight">이용 안내</div>
            <div className="LinksGroup w-28 h-32 left-0 top-[65.40px] absolute">
                <div className="Link h-4 left-0 top-0 absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">매글 소개</div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[39.24px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">콘텐츠 제휴</div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[78.48px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">매글 비즈니스</div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[117.72px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex" />
                </div>
            </div>
        </div>
        <div className="FooterSection w-20 h-52 left-[549.72px] top-0 absolute">
            <div className="FooterTitle w-20 h-5 left-0 top-0 absolute text-slate-500 text-xl font-bold font-['DM Sans'] leading-tight">고객 센터</div>
            <div className="LinksGroup w-20 h-32 left-0 top-[65.40px] absolute">
                <div className="Link h-4 left-0 top-0 absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">도움말</div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[39.24px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">공지사항</div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[78.48px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">이메일 문의 </div>
                    </div>
                </div>
                <div className="Link h-4 left-0 top-[117.72px] absolute justify-start items-start inline-flex">
                    <div className="MasterLink justify-start items-center gap-1.5 flex">
                        <div className=" text-center text-slate-400 text-lg font-normal font-['DM Sans'] leading-none">챗봇 문의</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="ImageGroup w-40 h-32 left-[496.87px] top-[89.95px] absolute">
            <div className="ImageIcon w-8 h-5 left-0 top-0 absolute" />
            <div className="ImageIcon w-8 h-5 left-[132px] top-[102.77px] absolute" />
            <div className="ImageIcon w-8 h-5 left-0 top-[102.77px] absolute" />
        </div>
    </div>
    <div className="Group51 w-48 left-[111px] top-[114px] absolute">
        <div className="Group5Copy w-9 h-7 left-0 top-0 absolute">
        </div>
        <div className="Typographystyle w-36 h-8 left-[48px] top-0 absolute text-slate-500 text-3xl font-bold font-['DM Sans'] leading-9">MAEGEUL</div>
    </div>
</div>
</>
    );
}
    export default Mypage;