import React from 'react';
import Tile from './Tile';
import { Order } from 'app/types';

const TradeTile = ({ symbol, qty, type, limit_price }: Order) => {
  return (
    <Tile>
      <div className="flex w-full justify-between font-semibold text-muted">
        <div>{symbol}</div>
        <div className="flex justify-end">
          {type === 'market' ? (
            <span className="mr-4">Market</span>
          ) : (
            <span className="mr-4">Limit @ {limit_price}</span>
          )}
          <span>x {qty}</span>
        </div>
      </div>
    </Tile>
  );
};

export default TradeTile;
