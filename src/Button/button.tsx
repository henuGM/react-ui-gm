import React, { Component } from "react";
import PropTypes from "prop-types";
import "uno.css";
const ISize = ["small", "medium", "large"];
const IColor = [
  "black",
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

interface ButtonProps {
  color?: string;
  icon?: string;
  size?: string;
  round?: Boolean;
  plain?: Boolean;
  children?: string;
}

const SButton = ({
  color = "blue",
  icon = "",
  size = "medium",
  round = false,
  plain = false,
  children,
}: ButtonProps) => {
  console.log(color,icon,size,round,plain,children);
  const sizeOptions = {
    small: {
      x: "px-2",
      y: "py-1",
      text: "sm",
    },
    medium: {
      x: "px-3",
      y: "py-1.5",
      text: "base",
    },
    large: {
      x: "px-4",
      y: "py-2",
      text: "lg",
    },
  };

  return (
    <button
      className={`
      ${sizeOptions[size].y}
      ${sizeOptions[size].x}
      ${round ? "rounded-full" : "rounded-lg"}
      bg-${color}-${plain ? "100" : "500"}
      hover:bg-${color}-400
      border-${color}-${plain ? "100" : "500"}
      cursor-pointer
      border-none
      ${plain ? "text-blue-400" : "text-white"}
      text-${sizeOptions[size].text}
      hover:text-white
      transition duration-300 ease-in-out transform hover:scale-105
      mx-1
    `}
    >
      {children ? children : ""}
      {icon !== "" ? <i className={`i-ic-baseline-${icon} p-3`}></i> : ""}
    </button>
  );
};
SButton.prototype = {
  color: PropTypes.oneOf(IColor), // default: "blue", // 默认颜色
  size: PropTypes.oneOf(ISize),
};
export default SButton;