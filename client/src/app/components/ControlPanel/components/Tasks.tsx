import React from 'react';
import { RootState } from '../../../redux';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatedWrapper } from 'app/components/AnimatedWrapper';
import { deleteTaskById } from 'app/redux/slices/taskSlice';
import Tile from 'app/components/Tile';
import SwipeableWrapper from 'app/components/SwipeableWrapper';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  return (
    <AnimatedWrapper>
      {tasks.map((task) => (
        <SwipeableWrapper
          key={task.id}
          onLeftSwipe={() => dispatch(deleteTaskById(task.id))}
          className="overflow-x-hidden"
        >
          <Tile>{task.title}</Tile>
        </SwipeableWrapper>
      ))}
    </AnimatedWrapper>
  );
};

export default Tasks;
