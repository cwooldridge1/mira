import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import Clock from './Clock';
import Notification from './Notification';
import Weather from './Weather';
import { LayoutContext } from './Layout';
type Props = {};

const Info = (props: Props) => {
  const { content } = useContext(LayoutContext);
  const notifications = [1];
  const bg =
    'p-5 bg-slate-200 hover:bg-white hover:backdrop-blur-md hover:bg-opacity-20 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-20';
  const classes = {
    content: {
      container: `${bg} basis-1/4 pt-10 flex-col justify-center h-screen`,
      info: '',
    },
    idle: {
      container: `${bg} w-full sm:w-3/4 relative container`,
      info: 'flex flex-col justify-center items-center transition duration-500 ease-in-out translate-x-1 h-64',
    },
    idleNotifications: {
      container: `${bg} w-full sm:w-3/4 relative container`,
      info: 'flex justify-between -translate-x-1 duration-500 ease-in-out h-64',
    },
  };
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
  }, [content]);
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
          {notifications.length > 0 && (
            <div>
              <div className="flex">
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
              </div>
              <div className="container overflow-auto no-scrollbar">
                <Notification
                  title="Doctor Appointment"
                  desc="Coming up at 11PM"
                  img="google-calendar.png"
                />
                <Notification
                  title="Trade Executed!"
                  desc="Bought 100x shares of SPXL @ $100.21"
                  img="alpaca.png"
                />
                <Notification
                  title="Trade Executed!"
                  desc="Bought 100x shares of SPXL @ $100.21"
                  img="alpaca.png"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Info;
