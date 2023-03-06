import React from 'react';
import ContentManager from './ContentManager';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import Info from './Info';
import ToastManager from './ToastManager';

/**
 * The application has differnt layout states depending on the availible content
 * this component manages the layout based on the availible content
 *  */
const Layout = () => {
  const content = useSelector((state: RootState) => state.content.content);
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <ToastManager />
      <Info />
      {!!content.length && (
        <div className="basis-3/4 flex flex-col items-center justify-center">
          <ContentManager />
        </div>
      )}
    </div>
  );
};
export default Layout;
