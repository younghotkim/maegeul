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

export const LineRoundedSearch5 = ({ color = "#5D5A88", className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.1667 14.563C11.8486 14.563 14.8334 11.5782 14.8334 7.89631C14.8334 4.21441 11.8486 1.22964 8.1667 1.22964C4.4848 1.22964 1.50003 4.21441 1.50003 7.89631C1.50003 11.5782 4.4848 14.563 8.1667 14.563Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M16.5003 16.2296L12.8753 12.6046"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

LineRoundedSearch5.propTypes = {
  color: PropTypes.string,
};
