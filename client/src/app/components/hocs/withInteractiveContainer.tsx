import React, { useState } from 'react';
import { InteractiveContainerProps } from '../../types';

const withInteractiveContainer = (
  WrappedComponent: React.FC<InteractiveContainerProps>
) => {
  return (props: InteractiveContainerProps) => {
    const [initialX, setInitialX] = useState<number | null>(null);
    const [translateX, setTranslateX] = useState<number>(0);

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
      setInitialX(event.clientX);
    }

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
      event.preventDefault();
      if (initialX) {
        const diff = event.clientX - initialX;
        setTranslateX(diff);
      }
    }

    function handleMouseUp(event: React.MouseEvent<HTMLDivElement>) {
      const currentX = event.clientX;

      if (initialX) {
        let dif = currentX - initialX;
        if (props.onLeftSwipe && initialX && dif < -70) {
          props.onLeftSwipe();
        }
        if (props.onRightSwipe && initialX && dif > 70) {
          props.onRightSwipe();
        }
      }
      setInitialX(null);
      setTranslateX(0);
    }

    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          left: translateX,
          cursor: 'grab',
        }}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withInteractiveContainer;
