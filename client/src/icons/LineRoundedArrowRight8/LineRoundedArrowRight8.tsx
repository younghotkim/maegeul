/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const LineRoundedArrowRight8 = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5391 3.53913L21 12L12.5391 20.4609"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M20.9999 12L3 12" stroke="#5D5A88" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
};
