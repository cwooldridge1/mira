import React from 'react';
import withContent from '../hocs/withContent';
// @ts-ignore
import TradingViewWidget from 'react-tradingview-widget';

type Props = {
  ticker: string;
};

const Chart = ({ ticker }: Props) => {
  return (
    <TradingViewWidget
      theme={'Dark'}
      symbol={ticker}
      autosize={true}
      details={true}
    />
  );
};

export default withContent(Chart);
