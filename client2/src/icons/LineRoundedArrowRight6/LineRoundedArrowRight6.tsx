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

export const LineRoundedArrowRight6 = ({ color = "white", className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4493 2.94928L17.5 10L10.4493 17.0507"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
      <path d="M17.4999 10L2.5 10" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </svg>
  );
};

LineRoundedArrowRight6.propTypes = {
  color: PropTypes.string,
};
