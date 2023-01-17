import React from 'react';
import ContentWrapper from '../ui/ContentWrapper';

const withContent = (WrappedComonent: React.FC<any>) => {
  return (props: object) => {
    return (
      <ContentWrapper>
        <WrappedComonent {...props} />
      </ContentWrapper>
    );
  };
};

export default withContent;
