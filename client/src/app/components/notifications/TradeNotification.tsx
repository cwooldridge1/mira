import React from 'react';
import { NotificationProps } from '../../types';
import NotificationTile from '../NotificationTile';
import alpacaImage from '../../../assets/notification-icons/alpaca.png';

const TradeNotification = ({ data, time, id, ...props }: NotificationProps) => {
  const { side, symbol, filled_avg_price, qty, status } = data;
  let title: string =
    status === 'accepted' || status === 'pending_new'
      ? 'Order Created!'
      : status === 'canceled'
      ? 'Order Canceled'
      : 'Order Executed';
  let desc: string =
    status === 'accepted' || status === 'pending_new'
      ? `${side === 'buy' ? 'Buy' : 'Sell'} order for ${qty}x of ${symbol}`
      : status === 'canceled'
      ? `Canceled ${side} order for ${qty}x of ${symbol}`
      : `${
          side === 'buy' ? 'Bought' : 'Sold'
        } ${qty}x ${qty} of ${symbol} @ $${filled_avg_price}`;
  return (
    <NotificationTile
      {...props}
      title={title}
      desc={desc}
      img={alpacaImage}
      time={time}
      id={id}
    />
  );
};

export default TradeNotification;
