import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { ContentProps } from '../../types';
import { setActiveContent, deleteContent } from 'app/redux/slices/contentSlice';
import { motion, AnimatePresence } from 'framer-motion';
import * as components from './components';
import SwipeableWrapper from 'app/components/SwipeableWrapper';

interface ContentComponents {
  [key: string]: React.ComponentType<ContentProps>;
}
const contentComponentsIndex: ContentComponents = components;

const Content = () => {
  const dispatch = useDispatch();
  const { content, activeContent } = useSelector(
    (state: RootState) => state.content
  );

  const renderContent = (props: ContentProps) => {
    const Component = contentComponentsIndex[props.type];
    return (
      <SwipeableWrapper
        onClick={() => dispatch(setActiveContent(props))}
        onSwipeUp={() => dispatch(deleteContent(props))}
        className="h-3/4 w-96"
        layoutId={props.id}
      >
        <div className="absolute w-full h-full bg-transparent z-10 shadow-lg"></div>
        <Component {...props} />
      </SwipeableWrapper>
    );
  };

  const renderActiveContent = (props: ContentProps) => {
    const Component = contentComponentsIndex[props.type];
    return (
      <div className="flex h-full items-center">
        <Component {...props} />
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {activeContent && (
          <motion.div
            layoutId={activeContent.id}
            className="absolute h-full w-3/4 z-20 bg-inherit"
            style={{ left: '25vw' }}
          >
            {renderActiveContent(activeContent)}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-auto items-center p-5 no-scrollbar">
        {!activeContent && (
          <AnimatePresence>{content.map(renderContent)}</AnimatePresence>
        )}
      </div>
    </>
  );
};

export default Content;
