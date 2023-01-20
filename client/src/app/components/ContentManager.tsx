import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { ContentProps } from '../types';
import * as components from './content';

interface ContentComponents {
  [key: string]: React.ComponentType<ContentProps>;
}
const contentComponentsIndex: ContentComponents = components;

const ContentManager = () => {
  const { content } = useSelector((state: RootState) => state.content);
  const renderContent = (obj: ContentProps, i: number) => {
    const Component = contentComponentsIndex[obj.type];
    return <Component key={i} {...obj} />;
  };

  return <>{content.map(renderContent)}</>;
};

export default ContentManager;
