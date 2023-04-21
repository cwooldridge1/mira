import React from 'react';

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
const Tile = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <div
      className="p-3 w-full bg-slate-200 hover:bg-white hover:backdrop-blur-md hover:bg-opacity-20 rounded-md shadow-md flex items-center space-x-4 backdrop-filter backdrop-blur-md bg-opacity-20 mt-2 border border-slate-400 border-opacity-20"
      {...rest}
    >
      {props.children}
    </div>
  );
};

export default Tile;
