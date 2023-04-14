import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import { ContentProps } from '../../../types';

const CodeContent = ({ data: { text, language } }: ContentProps) => {
  return (
    <div className="w-full h-full flex items-center overflow-auto">
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
    </div>
  );
};

export default CodeContent;
