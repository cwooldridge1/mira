import React, { useLayoutEffect, useState, useMemo } from 'react';
import Clock from './Clock';
import NotificationManager from './NotificationManager';
import Weather from './Weather';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import ContentViewToggle from './ContentViewToggle';
import List from './ui/List';
import NotificationButton from './ui/NotificationButton';
import CircleCheckMarkIcon from './ui/icons/CircleCheckMarkIcon';
import CircleXmarkIcon from './ui/icons/CircleXmarkIcon';

const Info = () => {
  const { content } = useSelector((state: RootState) => state.content);
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const bg =
    'p-5 bg-slate-200 hover:bg-white hover:backdrop-blur-md hover:bg-opacity-20 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-20 rounded-md';
  const classes = useMemo(
    () => ({
      content: {
        container: `${bg} basis-1/4 pt-10 flex-col justify-center h-screen`,
        info: 'h-full overflow-auto no-scrollbar',
      },
      idle: {
        container: `${bg} w-full sm:w-3/4 relative container`,
        info: 'flex flex-col justify-center items-center transition duration-500 ease-in-out translate-x-1 h-64',
      },
      idleNotifications: {
        container: `${bg} w-full sm:w-3/4 relative container`,
        info: 'flex justify-between -translate-x-1 duration-500 ease-in-out h-64',
      },
    }),
    []
  );
  const [currentClass, setCurrentClass] = useState(classes.content);

  useLayoutEffect(() => {
    if (content.length === 0) {
      if (notifications.length) {
        setCurrentClass(classes.idleNotifications);
      } else {
        setCurrentClass(classes.idle);
      }
    } else {
      setCurrentClass(classes.content);
    }
  }, [content, notifications, classes]);
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
      <div className={currentClass.container}>
        <div className={currentClass.info}>
          <div className="mt-5 mb-5">
            <Clock />
            <Weather />
          </div>
          <div className="w-100 flex justify-center">
            {content.length > 0 && <ContentViewToggle />}
            <NotificationButton
              icon="fa-solid fa-bell"
              showBell={notifications.length > 0}
            />
            <NotificationButton color={'bg-success'} icon="fa-solid fa-list" />
          </div>

          {notifications.length > 0 && (
            <>
              <div
                className={`h-full overflow-auto no-scrollbar ${
                  content.length ? 'w-full' : 'lg:w-1/3 w-full ml-4'
                }`}
              >
                {/* <div className="flex">
                <div
                  className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-full inline-flex backdrop-blur-md bg-opacity-20 "
                  role="alert"
                >
                  <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                    New
                  </span>
                  <span className="font-semibold mr-2 text-left flex-auto">
                    Notifications
                  </span>
                  <svg
                    className="fill-current opacity-75 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                  </svg>
                </div>
              </div> */}
                <NotificationManager />
              </div>
            </>
          )}

          <List>
            <List.Item>jeel</List.Item>
            <List.Item>jeel</List.Item>
            <List.Item>jeel</List.Item>
            <List.Item>
              <span className="flex w-full justify-between">
                <div>afhd</div>
                <div className="items-center justify-center text-center">
                  <CircleXmarkIcon classModifier="pr-1" />
                  <CircleCheckMarkIcon />
                </div>
              </span>
            </List.Item>
          </List>
        </div>
      </div>
    </Wrapper>
  );
};

export default Info;
