import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { renderNotification } from './utils/notifications';
import { AnimatedWrapper } from 'app/components/AnimatedWrapper';

const Notification = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  return (
    <AnimatedWrapper>{notifications.map(renderNotification)}</AnimatedWrapper>
  );
};

export default Notification;
