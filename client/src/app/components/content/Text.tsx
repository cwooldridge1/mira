import React from 'react';
import { ContentProps } from '../../types';

const Text = ({ data: { text } }: ContentProps) => {
  return (
    <div className="p-2">
      <div
        style={{ whiteSpace: 'pre-line' }}
        className="w-full overflow-auto bg-white p-5 rounded-md backdrop-blur backdrop-filter bg-opacity-50 font-semibold shadow-lg"
      >
        {text}
      </div>
    </div>
  );
};

export default Text;
