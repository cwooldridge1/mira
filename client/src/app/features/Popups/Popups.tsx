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
      <Component
        key={props.id}
        {...props}
        onClose={() => dispatch(deletePopup(props))}
      />
    );
  };

  return <>{popups.map(renderContent)} </>;
};

export default Content;
