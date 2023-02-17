import React, { useLayoutEffect, useState, useMemo } from 'react';
import Clock from './Clock';
import NotificationManager from './NotificationManager';
import Weather from './Weather';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import List from './ui/List';
import NotificationButton from './ui/NotificationButton';
import CircleCheckMarkIcon from './ui/icons/CircleCheckMarkIcon';
import CircleXmarkIcon from './ui/icons/CircleXmarkIcon';
import { setActiveContent } from '../redux/slices/contentSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Tasks from './Tasks';

const Info = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    content: { content, activeContent },
    tasks: { tasks },
  } = useSelector((state: RootState) => state);
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const [showTasks, setShowTasks] = useState(false);
  const bg =
    'p-5 bg-slate-200 hover:bg-white hover:backdrop-blur-md hover:bg-opacity-20 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-20 rounded-md';
  // const classes = useMemo(
  //   () => ({
  //     content: {
  //       container: `${bg} basis-1/4 pt-10 flex-col justify-center h-screen`,
  //       info: 'h-full overflow-auto no-scrollbar',
  //     },
  //     idle: {
  //       container: `${bg} w-full sm:w-3/4 relative container`,
  //       info: 'flex flex-col justify-center items-center transition duration-500 ease-in-out translate-x-1 h-64',
  //     },
  //     idleNotifications: {
  //       container: `${bg} w-full sm:w-3/4 relative container`,
  //       info: 'flex justify-between -translate-x-1 duration-500 ease-in-out h-64',
  //     },
  //   }),
  //   []
  // );

  const layout = {
    horizontal: {
      container: bg + 'w-full sm:w-3/4 relative container',
      info: showTasks
        ? 'flex justify-between w-full'
        : 'flex flex-col justify-center items-center transition duration-500 ease-in-out translate-x-1 h-64',
    },
    vertical: {
      container: bg + ' basis-1/4 pt-10 flex-col justify-center h-screen',
      info: 'h-full relative',
    },
  };
  const [currentLayout, setCurrentLayout] = useState(layout.horizontal);

  useLayoutEffect(() => {
    if (content.length === 0) {
      setCurrentLayout(layout.horizontal);
    } else {
      setCurrentLayout(layout.vertical);
    }
  }, [content, notifications, showTasks]);

  const toggleContent = () => {
    dispatch(setActiveContent(activeContent ? null : content[0]));
  };
  const toggleTasks = () => {
    setShowTasks(!showTasks);
  };

  const Wrapper = ({ children }: any) => {
    return content.length ? (
      <>{children}</>
    ) : (
      <div className="flex flex-col w-full items-center justify-center">
        {children}
      </div>
    );
  };

  return (
    <Wrapper>
      <div className={currentLayout.container}>
        <div className={currentLayout.info}>
          <div className="mt-5 mb-5">
            <Clock />
            <Weather />
          </div>

          <div className={content.length ? 'w-full' : 'lg:w-1/3 w-full ml-4'}>
            <div className="w-100 flex justify-center">
              <NotificationButton
                icon="fa-solid fa-border-all"
                color="bg-grey"
                onClick={toggleContent}
              />
              <NotificationButton
                icon="fa-solid fa-bell"
                showBell={notifications.length > 0}
              />
              <NotificationButton
                color={'bg-success'}
                icon="fa-solid fa-list"
                onClick={toggleTasks}
                showBell={tasks.length > 0}
                active={showTasks}
              />
            </div>
            {showTasks && (
              <div className="overflow-auto no-scrollbar justify-center">
                <Tasks />
              </div>
            )}

            {/* <NotificationManager /> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Info;
