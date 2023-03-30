import React, { useRef } from 'react';
import { InteractiveContainerProps } from '../types';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';

/**
 * Component that the use is able to swipe to the right/left and on these event trigger actions
 *  */
const withHorizontalSwipe = (
  WrappedComponent: React.FC<InteractiveContainerProps>
) => {
  return (props: InteractiveContainerProps) => {
    const x = useMotionValue(0);
    //because of how swipe is triggered the callback function can get called many times and the use case for this is the element gets deleted on swipe
    //so this ref ensures the callback is only called once
    const hasSwiped = useRef(false);

    //the color of the x
    const color = 'rgb(248 113 113)';

    //animation points for when the first cross and second cross on the x start. These points are in pixels
    const crossPathA = useTransform(x, [-25, -75], [0, 1]);
    const crossPathB = useTransform(x, [-75, -100], [0, 1]);

    useMotionValueEvent(x, 'change', (diff) => {
      //only trigger callback if diff is greater than 100 px
      if (!hasSwiped.current && props.onLeftSwipe && diff < -100) {
        props.onLeftSwipe();
        hasSwiped.current = true;
      }
      if (!hasSwiped.current && props.onRightSwipe && diff < 100) {
        props.onRightSwipe();
        hasSwiped.current = true;
      }
    });

    return (
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{
          x: x,
          position: 'relative',
          cursor: 'grab',
        }}
        className="flex items-center"
      >
        <WrappedComponent {...props} />
        <div
          className="absolute flex items-center justify-center space-x-4 w-20 right-0 h-full"
          style={{
            left: '105%',
          }}
        >
          <svg className="h-full w-full" viewBox="0 0 50 50">
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              style={{ translateX: 5, translateY: 5 }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathA }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathB }}
            />
          </svg>
        </div>
      </motion.div>
    );
  };
};

export default withHorizontalSwipe;
