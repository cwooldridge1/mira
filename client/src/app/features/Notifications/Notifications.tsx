import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { renderNotification } from './utils/notifications';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// contains framer-motion variants to animate different parts of the UI
// when the notification center is visible or not
// https://www.framer.com/docs/examples/#variants
const variants = {
  container: {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: -10,
      opacity: 0,
    },
  },
  // used to stagger item animation when switching from closed to open and vice versa
  content: {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  },
  item: {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  },
};

const Container = styled(motion.aside)`
  width: 100%;
`;

const Content = styled(motion.section)``;
const Item = styled(motion.article)``;
const Notification = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  return (
    <div>
      <Container initial={false} variants={variants.container}>
        <AnimatePresence>
          <Content variants={variants.content}>
            {!notifications.length && (
              <motion.div
                className="w-full px-6 py-2 text-center text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No new notifications
              </motion.div>
            )}
            <AnimatePresence>
              {notifications.map((notification) => {
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ scale: 0.4, opacity: 0, y: 50 }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    style={{ padding: '0.8rem' }}
                  >
                    <Item variants={variants.item} key={notification.id}>
                      {renderNotification(notification)}
                    </Item>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Content>
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Notification;
