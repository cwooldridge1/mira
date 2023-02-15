import React from 'react';
import { TasksContentProps, ContentProps } from '../../types';
import withContent from '../hocs/withContent';

const Tasks = (props: ContentProps) => {
  const taskProps = props as TasksContentProps;
  const {
    data: { tasks },
  } = taskProps;
  return (
    <div>
      <ul>
        {tasks.map((obj) => (
          <li>{obj.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default withContent(Tasks);
