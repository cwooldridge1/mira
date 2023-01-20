import React from 'react';
import { ContentProps } from '../../types';
// @ts-ignore
import TradingViewWidget from 'react-tradingview-widget';

const Chart = ({ data: { ticker } }: ContentProps) => {
  return (
    <TradingViewWidget
      theme={'Dark'}
      symbol={ticker}
      autosize={true}
      details={true}
    />
  );
};

export default Chart;
