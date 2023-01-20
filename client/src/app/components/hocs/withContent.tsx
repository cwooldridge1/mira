import React from 'react';
import ContentWrapper from '../ui/ContentWrapper';
import { ContentProps } from '../../types';

const withContent = (WrappedComonent: React.ComponentType<ContentProps>) => {
  return (props: ContentProps) => {
    return (
      <ContentWrapper>
        <WrappedComonent {...props} />
      </ContentWrapper>
    );
  };
};

export default withContent;
