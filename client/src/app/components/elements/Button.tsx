import React from 'react';
import Spinner from './Spinner';

type Props = {
  variants?: string;
  loading?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { variants, loading, children, ...rest } = props;
  return (
    <button disabled={loading} className={'btn ' + (variants || '')} {...rest}>
      {loading ? <Spinner size="small" /> : children}
    </button>
  );
};

export default Button;
