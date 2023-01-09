import React from 'react';
import { CodeBlock, CopyBlock, dracula } from 'react-code-blocks';
import withContent from '../hocs/withContent';
type Props = {
  text: string;
  language: string;
};

const Code = ({ text, language }: any) => {
  return (
    <div className="w-full">
      <CopyBlock
        language={language}
        text={text}
        showLineNumbers={true}
        theme={dracula}
        wrapLines={true}
        codeBlock
      />
    </div>
  );
};

export default withContent(Code);
