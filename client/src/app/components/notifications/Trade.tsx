import React from 'react';
import { NotificationProps } from '../../types';
import Notification from '../ui/NotificationTile';

const Trade = ({ data, time, id, ...props }: NotificationProps) => {
  const { side, symbol, filled_avg_price, qty, status } = data;
  let title: string =
    status === 'accepted'
      ? 'Order Created!'
      : status === 'canceled'
      ? 'Order Canceled'
      : 'Order Executed';
  let desc: string =
    status === 'accepted'
      ? `${side === 'buy' ? 'Buy' : 'Sell'} order for ${qty}x of ${symbol}`
      : status === 'canceled'
      ? `Canceled ${side} order for ${qty}x of ${symbol}`
      : `${
          side === 'buy' ? 'Bought' : 'Sold'
        } ${qty}x ${qty} of ${symbol} @ $${filled_avg_price}`;
  return (
    <Notification
      {...props}
      title={title}
      desc={desc}
      img={'alpaca.png'}
      time={time}
      id={id}
    />
  );
};

export default Trade;
