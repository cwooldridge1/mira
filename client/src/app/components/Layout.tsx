import Content from '../features/Content/Content';
import ControlPanel from './ControlPanel/ControlPanel';
import ToastManager from '../features/Notifications/ToastManager';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

/**
 * The application has differnt layout states depending on the availible content
 * this component manages the layout based on the availible content
 *  */
const Layout = () => {
  const content = useSelector((state: RootState) => state.content.content);
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <ToastManager />
      <ControlPanel />
      {!!content.length && <Content />}
    </div>
  );
};
export default Layout;
