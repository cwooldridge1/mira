import React from 'react';
import { JsxElement } from 'typescript';

type Props = {
  [key: string]: any;
  children: React.ReactNode;
};

const IconButton = ({ children, ...props }: Props) => {
  return (
    <button
      className="bg-indigo-800 flex items-center justify-center text-indigo-100 rounded-full backdrop-blur-md bg-opacity-20 hover:bg-indigo-400 cursor-pointer p-2"
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
