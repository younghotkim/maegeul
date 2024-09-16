/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const LineRoundedInfo = ({ className }: Props): JSX.Element => {
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
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12 17V12"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12.0003 7.33013C11.889 7.33013 11.7802 7.36313 11.6877 7.42495C11.5952 7.48677 11.5231 7.57463 11.4805 7.67743C11.4379 7.78023 11.4268 7.89335 11.4485 8.00248C11.4702 8.11161 11.5238 8.21186 11.6024 8.29054C11.6811 8.36922 11.7814 8.4228 11.8905 8.44451C11.9996 8.46622 12.1128 8.45507 12.2156 8.41249C12.3184 8.36991 12.4062 8.2978 12.468 8.20529C12.5299 8.11277 12.5628 8.004 12.5628 7.89273C12.563 7.81879 12.5486 7.74554 12.5204 7.6772C12.4922 7.60885 12.4508 7.54675 12.3985 7.49447C12.3462 7.44219 12.2841 7.40076 12.2158 7.37256C12.1474 7.34435 12.0742 7.32994 12.0003 7.33013Z"
        fill="#5D5A88"
        stroke="#5D5A88"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
