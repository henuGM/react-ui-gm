import React, { Component } from "react";
import "uno.css";

export type IColor = 'black' | 'gray' | 'red' | 'yellow' | 'green'|'blue'|'indigo'|'purple'|'pink'


const SButton = (props: any) => {
    console.log(props)
  return (
    <button
      className={`
      py-2 
      px-4 
      font-semibold 
      rounded-lg 
      shadow-md 
      text-white 
      bg-${props.color}-500 
      hover:bg-${props.color}-700 
      border-none 
      cursor-pointer 
      m-1
    `}
    >
      {props.children&&typeof props.children =='string' ? <text>{props.children}</text> : ""}
      { props.icon !== "" ? <i className={`i-ic-baseline-${props.icon} p-3`}></i> : ""}
    </button>
  );
};

export default SButton;
