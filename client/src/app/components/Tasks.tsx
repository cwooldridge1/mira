import React from 'react';
import { RootState } from '../redux';
import List from './ui/List';
import { useSelector } from 'react-redux';

const Tasks = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  return (
    <List>
      {tasks.map((task) => (
        <List.Item>{task.title}</List.Item>
      ))}
    </List>
  );
};

export default Tasks;
