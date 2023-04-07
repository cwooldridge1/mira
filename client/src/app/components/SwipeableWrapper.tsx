import React, { useRef } from 'react';
import { InteractiveContainerProps } from '../types';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

const DRAG_OFFSET_TRIGGER = 100;
/**
 * Component that the use is able to swipe to the right/left/up/down and on these event trigger actions
 * Only horizontal swipes or vertical swipes are supports at a time, and which is used is determined by the props passed. Default
 * swipe direction will be horizontal
 *  */
const SwipeableWrapper = ({
  onLeftSwipe,
  onRightSwipe,
  onSwipeDown,
  onSwipeUp,
  onClick,
  children,
  ...rest
}: InteractiveContainerProps) => {
  const x = useMotionValue(0);
  const dragOffset = useRef({ x: 0, y: 0 });

  //the color of the x
  const color = 'rgb(248 113 113)';

  //animation points for when the first cross and second cross on the x start. These points are in pixels
  const crossPathHorizontalA = useTransform(x, [-25, -75], [0, 1]);
  const crossPathHorizontalB = useTransform(x, [-75, -100], [0, 1]);

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    dragOffset.current = info.offset;
  };

  const handleTapEnd = () => {
    //once the tap is ended we must determine what event to call
    const { x, y } = dragOffset.current;

    if (x === 0 && y === 0) {
      onClick && onClick();
    } else {
      if (onLeftSwipe && x < -DRAG_OFFSET_TRIGGER) {
        onLeftSwipe();
      } else if (onRightSwipe && x < DRAG_OFFSET_TRIGGER) {
        onRightSwipe();
      }
      if (onSwipeUp && y < -DRAG_OFFSET_TRIGGER) {
        onSwipeUp();
      } else if (onSwipeDown && y < DRAG_OFFSET_TRIGGER) {
        onSwipeDown();
      }
    }
    dragOffset.current = { x: 0, y: 0 };
  };

  return (
    <motion.div {...rest}>
      <motion.div
        drag={onSwipeDown || onSwipeUp ? 'y' : 'x'}
        dragConstraints={{ right: 0, left: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onTap={handleTapEnd}
        onDrag={handleDrag}
        style={{
          x: x,
          position: 'relative',
          cursor: 'grab',
        }}
        className="flex items-center h-full"
      >
        {children}
        <div
          className="absolute flex items-center justify-center space-x-4 right-0 w-12 h-12"
          style={{
            left: '105%',
          }}
        >
          <svg viewBox="0 0 50 50">
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              style={{
                translateX: 5,
                translateY: 5,
                pathLength: crossPathHorizontalA,
              }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathHorizontalA }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathHorizontalB }}
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwipeableWrapper;
