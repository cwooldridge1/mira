import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  children: any;
}

interface Props {
  children: React.ReactElement<ModalProps> | React.ReactElement<ModalProps>[];
  show: boolean;
}

const Modal = ({ children, show }: Props) => {
  return (
    <div className="absolute w-screen h-screen flex justify-center items-center z-50">
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-800 bg-opacity-50 transition-opacity"
            ></motion.div>
            <div className="fixed overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  {children}
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

Modal.Header = ({ children }: ModalProps) => {
  return <div className="flex items-center mx-3 mt-3">{children}</div>;
};

Modal.Body = ({ children }: ModalProps) => {
  return <div className="p-4 sm:p-10">{children}</div>;
};

Modal.Footer = ({ children }: ModalProps) => {
  return <div className="flex items-center mx-3 mb-3">{children}</div>;
};

export default Modal;
