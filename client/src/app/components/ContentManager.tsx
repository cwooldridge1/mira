import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { ContentProps } from '../types';
import withContent from './hocs/withContent';
import * as components from './content';

interface ContentComponents {
  [key: string]: React.ComponentType<ContentProps>;
}
const contentComponentsIndex: ContentComponents = components;

const ContentManager = () => {
  const { content, activeContent } = useSelector(
    (state: RootState) => state.content
  );
  const renderContent = (obj: ContentProps, i: number) => {
    const Component = withContent(contentComponentsIndex[obj.type]);
    // <div className="h-1/2 w-1/2">
    return activeContent ? (
      <Component key={i} {...obj} />
    ) : (
      <div className="h-1/2 w-1/2">
        <Component key={i} {...obj} />
      </div>
    );
  };

  return activeContent ? (
    <> {renderContent(activeContent, 0)}</>
  ) : (
    <div className="flex flex-wrap overflow-auto h-full w-full pt-11 no-scrollbar">
      {content.map(renderContent)}
    </div>
  );
};

export default ContentManager;
