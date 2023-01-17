import React, { useEffect } from 'react';
import { NotificationProps } from '../../types';
//@ts-ignore
import notificationAudio from '../../../sounds/notificationAudio.mp3';

const withNotification = (
  WrapperComponent: React.ComponentType<NotificationProps>
) => {
  return (props: NotificationProps) => {
    useEffect(() => {
      const audio = new Audio(notificationAudio);
      audio.play();
    }, []);
    return <WrapperComponent {...props} />;
  };
};

export default withNotification;
