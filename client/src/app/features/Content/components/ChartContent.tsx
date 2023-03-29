import React from 'react';
import { ContentProps } from 'app/types';
// @ts-ignore
import TradingViewWidget from 'react-tradingview-widget';

const ChartContent = ({ data: { ticker } }: ContentProps) => {
  return (
    <TradingViewWidget
      theme={'Dark'}
      symbol={ticker}
      autosize={true}
      details={true}
    />
  );
};

export default ChartContent;
