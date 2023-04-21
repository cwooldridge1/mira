import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { PopupProps } from '../../types';
import { deletePopup } from 'app/redux/slices/popupSlice';
import * as components from './components';

interface PopupComponents {
  [key: string]: React.ComponentType<PopupProps>;
}
const popupComponentsIndex: PopupComponents = components;

const Content = () => {
  const dispatch = useDispatch();
  const { popups } = useSelector((state: RootState) => state.popups);

  const renderContent = (props: PopupProps) => {
    const Component = popupComponentsIndex[props.type];
    return (
      <Component {...props} onClose={() => dispatch(deletePopup(props))} />
    );
  };
  const length = popups.length;
  return length ? renderContent(popups[length - 1]) : <></>;
};

export default Content;
