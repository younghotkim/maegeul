// src/components/Footer.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Maegeul from "../Icon/MaegeulLogo.png";

const Footer: React.FC = () => {
  return (
    <section className="w-full flex justify-center items-center py-16">
      <div className="Cta2 max-w-[1150px] mx-auto justify-center items-start flex">
        <div className="Frame1000005143 justify-start items-center gap-2 inline-flex">
          <button className="flex items-center bg-transparent  text-indigo-950 text-l font-extrabold font-['Ubuntu Sans'] dark:text-scampi-200 py-2 px-4 rounded-full dark:hover:bg-scampi-700 cursor-pointer transition-colors font-bold w-36 h-12 justify-center">
            <img src={Maegeul} />
          </button>
        </div>
        <div className="Frame2 flex-col justify-start items-center gap-6 flex">
          <div className="MenuCategories justify-center items-start gap-12 inline-flex">
            <div className="About text-center text-slate-500 text-sm font-medium font-['plus-jakarta-sans'] leading-normal">
              About
            </div>
            <div className="Features text-center text-slate-500 text-sm font-medium font-['plus-jakarta-sans'] leading-normal">
              Features
            </div>
          </div>
        </div>
        <div className=" text-center text-slate-500 text-sm font-medium font-['plus-jakarta-sans'] leading-normal">
          © 2024, Maegeul Team. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Footer;
