import { InteractiveContainerProps } from '../types';

const Tile = (props: InteractiveContainerProps) => {
  return (
    <div className="p-3 w-full bg-slate-200 hover:bg-white hover:backdrop-blur-md hover:bg-opacity-20 rounded-md shadow-md flex items-center space-x-4 backdrop-filter backdrop-blur-md bg-opacity-20 mt-2">
      {props.children}
    </div>
  );
};

export default Tile;
