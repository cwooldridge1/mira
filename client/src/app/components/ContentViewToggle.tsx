import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { setActiveContent } from '../redux/slices/contentSlice';
import IconButton from './ui/IconButton';

const ContentViewToggle = () => {
  const dispatch = useDispatch();
  const { content, activeContent } = useSelector(
    (state: RootState) => state.content
  );
  const toggleContent = () => {
    dispatch(setActiveContent(activeContent ? null : content[0]));
  };

  return (
    <IconButton onClick={toggleContent}>
      <i className="fa-solid fa-border-all"></i>
    </IconButton>
  );
};

export default ContentViewToggle;
