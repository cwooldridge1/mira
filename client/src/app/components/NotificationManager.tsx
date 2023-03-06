import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import renderNotification from '../utils/renderNotification';
const NotificationManager = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  return notifications.length ? (
    <>{notifications.map(renderNotification)}</>
  ) : (
    <div className="w-full px-6 py-2 text-center text-muted">
      Nothing to show
    </div>
  );
};

export default NotificationManager;
