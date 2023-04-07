import React from 'react';
import { ContentProps } from '../../../types';

const TextContent = ({ data: { text } }: ContentProps) => {
  return (
    <div
      style={{ whiteSpace: 'pre-line' }}
      className="w-full overflow-auto bg-white p-5 rounded-md backdrop-blur backdrop-filter bg-opacity-50 font-semibold shadow-lg"
    >
      {text}
    </div>
  );
};

export default TextContent;
