import React, { useLayoutEffect, useState, useRef } from 'react';
import Clock from './components/Clock';
import NotificationManager from '../../features/Notifications/Notifications';
import Weather from './components/Weather';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { IconButton } from '../elements';
import { setActiveContent } from '../../redux/slices/contentSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Tasks from './components/Tasks';

const ControlPanel = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    content: { content, activeContent },
    tasks: { tasks },
  } = useSelector((state: RootState) => state);

  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [activeInfo, setActiceInfo] = useState<
    'tasks' | 'notifications' | null
  >(null);

  useLayoutEffect(() => {
    const bg =
      'p-5 bg-slate-200 hover:bg-white hover:backdrop-blur-md hover:bg-opacity-20 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-20';
    const layout = {
      horizontal: {
        container: 'flex flex-col w-full items-center justify-center',
        info: activeInfo
          ? bg +
            ' h-72 w-full sm:w-11/12 relative flex justify-between rounded-md'
          : bg +
            ' flex flex-col justify-center items-center transition duration-500 ease-in-out translate-x-1 h-72 rounded-md w-full sm:w-11/12',
      },
      vertical: {
        container: bg + ' basis-1/4 pt-10 flex-col justify-center h-screen',
        info: 'h-full relative',
      },
    };
    if (content.length === 0) {
      if (containerRef.current) {
        containerRef.current.className = layout.horizontal.container;
      }
      if (infoRef.current) {
        infoRef.current.className = layout.horizontal.info;
      }
    } else {
      if (containerRef.current) {
        containerRef.current.className = layout.vertical.container;
      }
      if (infoRef.current) {
        infoRef.current.className = layout.vertical.info;
      }
    }
  }, [content, notifications, activeInfo]);

  const toggleContent = () => {
    dispatch(setActiveContent(activeContent ? null : content[0]));
  };
  const toggleTasks = () => {
    setActiceInfo(activeInfo === 'tasks' ? null : 'tasks');
  };
  const toggleNotifications = () => {
    setActiceInfo(activeInfo === 'notifications' ? null : 'notifications');
  };

  return (
    <div ref={containerRef}>
      <div ref={infoRef}>
        <div className="pt-5">
          <Clock />
          <Weather />
        </div>

        <div
          className={
            content.length
              ? 'w-full relative flex flex-col'
              : 'lg:w-1/3 w-full flex flex-col'
          }
        >
          <div className="w-100 flex justify-center">
            <IconButton
              icon="fa-solid fa-border-all"
              color="bg-grey"
              onClick={toggleContent}
            />
            <IconButton
              icon="fa-solid fa-bell"
              showBell={notifications.length > 0}
              onClick={toggleNotifications}
              active={activeInfo === 'notifications'}
            />
            <IconButton
              color={'bg-success'}
              icon="fa-solid fa-list"
              onClick={toggleTasks}
              showBell={tasks.length > 0}
              active={activeInfo === 'tasks'}
            />
          </div>

          {activeInfo && (
            <div className="overflow-auto no-scrollbar flex-grow">
              {activeInfo === 'tasks' ? <Tasks /> : <NotificationManager />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
