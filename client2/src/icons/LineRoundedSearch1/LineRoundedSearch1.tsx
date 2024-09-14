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

export const LineRoundedSearch1 = ({ color = "white", className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="14"
      viewBox="0 0 13 14"
      width="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_275)">
        <path
          d="M5.89818 11.3268C8.55733 11.3268 10.713 9.00528 10.713 6.14158C10.713 3.27788 8.55733 0.95639 5.89818 0.95639C3.23903 0.95639 1.08336 3.27788 1.08336 6.14158C1.08336 9.00528 3.23903 11.3268 5.89818 11.3268Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M11.9169 12.623L9.2988 9.80359"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_275">
          <rect fill="white" height="14" width="13" />
        </clipPath>
      </defs>
    </svg>
  );
};

LineRoundedSearch1.propTypes = {
  color: PropTypes.string,
};
