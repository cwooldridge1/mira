import React from 'react';
import { RootState } from '../../../redux';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatedWrapper } from 'app/components/AnimatedWrapper';
import { deleteTaskById } from 'app/redux/slices/taskSlice';
import Tile from 'app/components/Tile';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  return (
    <AnimatedWrapper>
      {tasks.map((task) => (
        <Tile
          key={task.id}
          onLeftSwipe={() => dispatch(deleteTaskById(task.id))}
        >
          {task.title}
        </Tile>
      ))}
    </AnimatedWrapper>
  );
};

export default Tasks;
