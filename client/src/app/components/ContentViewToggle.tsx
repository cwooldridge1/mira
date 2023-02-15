import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { setActiveContent } from '../redux/slices/contentSlice';
import NotificationButton from './ui/NotificationButton';

const ContentViewToggle = () => {
  const dispatch = useDispatch();
  const { content, activeContent } = useSelector(
    (state: RootState) => state.content
  );
  const toggleContent = () => {
    dispatch(setActiveContent(activeContent ? null : content[0]));
  };

  return (
    <NotificationButton
      icon="fa-solid fa-border-all"
      color="bg-grey"
      onClick={toggleContent}
    />
  );
};

export default ContentViewToggle;
