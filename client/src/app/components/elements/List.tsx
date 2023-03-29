import React from 'react';

type ItemProps = {
  px?: string;
  py?: string;
  border?: string;
  children: React.ReactNode;
};

type ListProps = {
  children: React.ReactElement<ItemProps>[] | React.ReactElement<ListProps>;
};

export const List = ({ children }: ListProps) => {
  if (!children || (Array.isArray(children) && children.length === 0)) {
    return (
      <div className="w-full px-6 py-2 text-center text-muted">
        Nothing to show
      </div>
    );
  }
  let updatedChildren: React.ReactElement<ItemProps>[] = [];
  if (Array.isArray(children)) {
    if (children.length === 1) {
      const newProps = {
        ...children[0].props,
        border: 'rounded-t-lg rounded-b-lg',
      };
      updatedChildren.push(React.cloneElement(children[0], newProps));
    } else {
      for (let i = 0; i < children.length; i++) {
        const newProps = {
          ...children[i].props,
          border:
            i === 0
              ? 'rounded-t-lg border-b'
              : i === children.length - 1
              ? 'rounded-b-lg'
              : 'border-b',
        };
        updatedChildren.push(React.cloneElement(children[i], newProps));
      }
    }
  } else {
    const newProps = {
      ...children.props,
      border: 'rounded-t-lg rounded-b-lg',
    };
    updatedChildren.push(React.cloneElement(children, newProps));
  }

  return (
    <div className="flex justify-center max-w-full">
      <ul className="bg-white bg-opacity-75 rounded-lg border border-gray-200 text-gray-900 shadow-lg w-full">
        {updatedChildren}
      </ul>
    </div>
  );
};

List.Item = ({
  children,
  px = 'px-6',
  py = 'py-2',
  border = 'border-b',
}: ItemProps) => {
  return (
    <li className={`border-gray-200 ${px} ${py} ${border}`}>{children}</li>
  );
};