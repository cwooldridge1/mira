import { Middleware } from 'redux';
import { io } from 'socket.io-client';
import { addContent } from '../slices/contentSlice';
import { addNotification } from '../slices/notificationSlice';
import { updateTasks } from '../slices/taskSlice';
//@ts-ignore
import notificationAudio from '../../../sounds/notificationAudio.mp3';

const LOCAL_URL: string = process.env.REACT_APP_LOCAL_URL;
const CLOUD_URL: string = process.env.REACT_APP_CLOUD_URL;

export const socketContentMiddleware: Middleware = (store) => {
  const socket = io(LOCAL_URL);
  socket.on('content', (data) => {
    store.dispatch(addContent(data));
  });
  socket.on('tasks', (data) => {
    store.dispatch(updateTasks(data));
  });

  return (next) => (action: any) => {
    next(action);
  };
};
export const socketNotificationMiddleware: Middleware = (store) => {
  const socket = io(CLOUD_URL);
  socket.on('notification', (data) => {
    const audio = new Audio(notificationAudio);
    audio.play();
    store.dispatch(addNotification(data));
  });

  return (next) => (action: any) => {
    next(action);
  };
};
