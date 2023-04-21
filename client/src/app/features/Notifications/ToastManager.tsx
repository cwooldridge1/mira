import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { deleteNotificationToastById } from '../../redux/slices/notificationSlice';
import { renderNotification } from './utils/notifications';
import { AnimatedWrapper } from 'app/components/AnimatedWrapper';

const ToastManager = () => {
  const dispatch = useDispatch();
  const { notificationToasts } = useSelector(
    (state: RootState) => state.notifications
  );
  const onLeftSwipe = (id: string) => {
    dispatch(deleteNotificationToastById(id));
  };

  return (
    <div className="absolute top-0 right-0 max-h-full overflow-auto no-scrollbar z-30 w-80 mr-2">
      <AnimatedWrapper showEmptyText={false}>
        {notificationToasts.map((obj, i) =>
          renderNotification({
            ...obj,
            onLeftSwipe: () => onLeftSwipe(obj.id),
          })
        )}
      </AnimatedWrapper>
    </div>
  );
};

export default ToastManager;
