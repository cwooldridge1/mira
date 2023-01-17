import React from 'react';
import ContentManager from './ContentManager';
import { useSelector } from 'react-redux';
import { Content } from '../types/redux/contentReduxTypes';
import { RootState } from '../redux';
import Info from './Info';

interface Context {
  content: Content[];
}
export const LayoutContext = React.createContext<Context>({ content: [] });
/**
 * The application has differnt layout states depending on the availible content
 * this component manages the layout based on the availible content
 *  */
const Layout = () => {
  const content = useSelector((state: RootState) => state.content.content);
  return (
    <LayoutContext.Provider value={{ content: content }}>
      <div className="flex flex-row h-screen">
        <Info />
        {!!content.length && (
          <div className="basis-3/4 flex flex-col items-center justify-center">
            <ContentManager />
          </div>
        )}
      </div>
    </LayoutContext.Provider>
  );
};
export default Layout;
