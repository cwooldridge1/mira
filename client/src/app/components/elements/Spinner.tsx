import React from 'react';

type Props = { size: 'small' | 'medium' | 'large' };

const Spinner = ({ size }: Props) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${
        size === 'small'
          ? 'h-5 w-5'
          : size === 'medium'
          ? 'h-10 w-10'
          : 'h-20 w-20'
      }`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
