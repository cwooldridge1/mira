import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import { ContentProps } from '../../types';

const Code = ({ data: { text, language } }: ContentProps) => {
  return (
    <div className="w-full overflow-auto">
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

export default Code;
