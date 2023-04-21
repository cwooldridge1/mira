import React, { useState } from 'react';
import Modal from 'app/components/Modal';
import TradeTile from 'app/components/TradeTile';
import { PopupProps, Order } from 'app/types';
import axios from 'axios';
import { Button, Alert } from 'app/components/elements';

const URL = process.env.REACT_APP_SERVER_URL;

const TradeConfirmationPopup = ({ data, onClose }: PopupProps) => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const order = data as Order;

  const handleConfirm = () => {
    setLoading(true);
    axios
      .post(`${URL}/trade/execute`, order)
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleCancel = () => {
    onClose && onClose();
  };
  return (
    <Modal show={true}>
      <Modal.Header>
        {showError && <Alert>Trade execution failed</Alert>}
      </Modal.Header>
      <Modal.Body>
        {isSuccess ? (
          <div className="flex flex-col h-full items-center justify-center sm:w-96">
            <div className="pt-5 pb-5">
              <svg
                className="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark-check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>

            <span className="text-muted text-center mb-5 font-semibold">
              Successfully placed order to {order.side} x {order.qty} of{' '}
              {order.symbol} {order.limit_price ? '@ ' + order.limit_price : ''}
            </span>
            <Button variants="btn-outline-info" onClick={handleCancel}>
              Finish
            </Button>
          </div>
        ) : (
          <div className="text-center overflow-y-auto sm:w-96 w-full">
            <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
              </svg>
            </span>

            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              Confirm Trade
            </h3>
            <p className="text-gray">
              Are you sure you want to place this trade?
            </p>
            <TradeTile {...order} />

            <div className="mt-6 flex justify-center gap-x-4 mb-2">
              <Button
                variants="btn-success"
                loading={loading}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button variants="btn-outline-danger" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TradeConfirmationPopup;
