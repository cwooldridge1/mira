import React from 'react';
import { useSelector } from 'react-redux';
import { Chart, Code } from './content';
import { RootState } from '../redux';
import { Content } from '../types/redux/contentReduxTypes';

const ContentManager = () => {
  const { content } = useSelector((state: RootState) => state.content);
  const components: { [key: string]: React.ComponentType } = {
    chart: Chart,
    code: Code,
  };
  const renderContent = (obj: Content, i: number) => {
    const Component = components[obj.type];
    return <Component key={i} {...obj.props} />;
  };

  return <>{content.map(renderContent)}</>;
};

export default ContentManager;
