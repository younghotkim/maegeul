/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

interface Props {
  color: string;
  className: any;
}

export const LineRoundedSearch7 = ({ color = "#5D5A88", className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_291)">
        <path
          d="M9.07411 16.1811C13.1651 16.1811 16.4815 12.8647 16.4815 8.77368C16.4815 4.68268 13.1651 1.36627 9.07411 1.36627C4.98311 1.36627 1.6667 4.68268 1.6667 8.77368C1.6667 12.8647 4.98311 16.1811 9.07411 16.1811Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.66667"
        />
        <path
          d="M18.3336 18.0329L14.3059 14.0051"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.66667"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_291">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
};

LineRoundedSearch7.propTypes = {
  color: PropTypes.string,
};
