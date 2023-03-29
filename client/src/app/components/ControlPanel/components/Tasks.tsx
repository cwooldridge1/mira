import React from 'react';
import { RootState } from '../../../redux';
import { List } from '../../elements';
import { useSelector } from 'react-redux';

const Tasks = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  return (
    <List>
      {tasks.map((task, i) => (
        <List.Item key={i}>{task.title}</List.Item>
      ))}
    </List>
  );
};

export default Tasks;
