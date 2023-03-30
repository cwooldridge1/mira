import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ListProps = {
  children: React.ReactElement[] | React.ReactElement;
};

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

export const AnimatedWrapper = ({ children }: ListProps) => {
  children = Array.isArray(children) ? children : children ? [children] : [];

  return (
    <div>
      <motion.div variants={variants.container}>
        <AnimatePresence>
          <motion.div variants={variants.content}>
            {!children.length && (
              <motion.div
                className="w-full px-6 py-2 text-center text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Nothing to show!
              </motion.div>
            )}
            <AnimatePresence>
              {children.map((element) => {
                return (
                  <motion.div
                    key={element.key}
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
                    <motion.div variants={variants.item} key={element.key}>
                      {element}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
