import React from 'react';
import { ContentProps } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import {
  deleteContent,
  setActiveContent,
} from '../../redux/slices/contentSlice';

const withContent = (WrappedComonent: React.ComponentType<ContentProps>) => {
  return (props: ContentProps) => {
    const dispatch = useDispatch();
    const { activeContent } = useSelector((state: RootState) => state.content);
    const onDelete = () => {
      console.log('onDelete');
      dispatch(deleteContent(props));
    };

    const onSelect = () => {
      dispatch(setActiveContent(props));
    };

    return activeContent === null ? (
      <div className="mx-auto bg-slate-200 rounded-md shadow-lg flex items-center backdrop-filter backdrop-blur-md bg-opacity-20 h-5/6 w-5/6 relative">
        <div className="absolute w-full h-full bg-transparent z-10 hover:bg-slate-100 hover:backdrop-blur-sm hover:bg-opacity-5 flex justify-center items-center opacity-0 hover:opacity-100  text-slate-400">
          <i
            onClick={onSelect}
            className="fa-solid fa-expand text-5xl p-20 cursor-pointer"
          ></i>
          <div className="absolute top-0 right-0">
            <i
              onClick={onDelete}
              className="fa-solid fa-xmark rounded-full p-2 text-white cursor-pointer"
            ></i>
          </div>
        </div>
        <div className="h-full w-full overflow-hidden">
          <WrappedComonent {...props} />
        </div>
      </div>
    ) : (
      <WrappedComonent {...props} />
    );
  };
};

export default withContent;
