import React, { memo, useEffect, useState } from 'react';
import Tile from './ui/Tile';
import { NotificationTileProps } from '../types';
import { useDispatch } from 'react-redux';
import { deleteNotificationById } from '../redux/slices/notificationSlice';

const NotificationTile = ({
  title,
  desc,
  img,
  time,
  id,
  onLeftSwipe,
}: NotificationTileProps) => {
  const dispatch = useDispatch();

  const getUpdatedTime = () => {
    const now = new Date();
    const currentTime = now.getTime();
    const date = new Date(time);
    const timeDifference = currentTime - time;
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;
    const timeString = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const dayString = date.toLocaleDateString();

    if (timeDifference < oneHour) {
      const minutesAgo = Math.round(timeDifference / 60 / 1000);
      if (minutesAgo === 0) {
        return 'Just now';
      }
      return `${minutesAgo}m ago`;
    } else if (timeDifference < oneDay && now.getHours() > date.getHours()) {
      return timeString;
    } else if (timeDifference < 2 * oneDay) {
      return `Yesterday, ${timeString}`;
    } else if (timeDifference < oneWeek) {
      return `${dayString}, ${timeString}`;
    } else {
      return date.toLocaleDateString('default', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
      });
    }
  };

  const [formattedDate, setFormattedDate] = useState(getUpdatedTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedDate(getUpdatedTime());
    }, 1000);
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, []);

  const defaultOnLeftSwipe = () => {
    dispatch(deleteNotificationById(id));
  };

  return (
    <Tile onLeftSwipe={onLeftSwipe || defaultOnLeftSwipe}>
      <>
        {!!img && (
          <div className="shrink-0">
            <img
              className="h-100 w-12"
              src={img}
              alt={'icon for notification'}
            />
          </div>
        )}
      </>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="text-lg font-medium text-black">{title}</div>
          <div className="text-slate-500 text-sm">{formattedDate}</div>
        </div>
        <p className="text-slate-500">{desc}</p>
      </div>
    </Tile>
  );
};

export default memo(NotificationTile);
