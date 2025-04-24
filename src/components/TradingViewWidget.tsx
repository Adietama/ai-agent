'use client';
import { useState } from 'react';

const TradingViewWidget = () => {
  const [pair, setPair] = useState('OANDA:XAUUSD'); // Default pair XAUUSD

  const handlePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPair(e.target.value);
  };

  return (
    <div className="w-full space-y-2 mb-6">
      {/* Dropdown Pair */}
      <div className="flex justify-end">
        <select
          value={pair}
          onChange={handlePairChange}
          className="bg-slate-800 text-white text-xs rounded p-1"
        >
          <option value="OANDA:XAUUSD">XAUUSD (Gold)</option>
          <option value="COINBASE:BTCUSD">BTCUSD (Bitcoin)</option>
        </select>
      </div>

      {/* TradingView Iframe */}
      <div className="w-full h-[580px] rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={`https://s.tradingview.com/widgetembed/?symbol=${pair}&interval=240&theme=dark&style=1&timezone=Asia/Jakarta&withdateranges=1&hide_side_toolbar=false`}
          width="100%"
          height="580"
          allowTransparency
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TradingViewWidget;
