import React from 'react';
import ContentWrapper from '../ui/ContentWrapper';

const withContent = (WrappedComonent: React.FC) => {
  return (props: any) => {
    return (
      <ContentWrapper>
        <WrappedComonent {...props} />
      </ContentWrapper>
    );
  };
};

export default withContent;
