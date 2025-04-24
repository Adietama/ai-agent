"use client";
declare global {
  interface Window {
    TradingView: {
      widget: (options: Record<string, unknown>) => void;
    };
  }
}


import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  pair: string; // ⬅️ Pair dari Box Analysis (XAUUSD / BTCUSD)
}

const TradingViewWidget = ({ pair }: TradingViewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mapping symbol TradingView sesuai pair
  const getSymbol = (pair: string) => {
    if (pair === "XAUUSD") return "OANDA:XAUUSD";
    if (pair === "BTCUSD") return "COINBASE:BTCUSD";
    return "OANDA:XAUUSD"; // Default
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Bersihkan widget lama
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        window.TradingView.widget({
          width: "100%",
          height: 580,
          symbol: getSymbol(pair),
          interval: "240",
          timezone: "Asia/Jakarta",
          theme: "dark",
          style: "1",
          locale: "en",
          gridColor: "rgba(182, 182, 182, 0.06)",
          withdateranges: true,
          hide_side_toolbar: false,
          watchlist: ["GBEBROKERS:XAUUSD", "COINBASE:BTCUSD"],
          studies: ["STD;EMA"],
          container_id: "tradingview-widget-container",
        });
      };
      containerRef.current.appendChild(script);
    }
  }, [pair]); // ⬅️ Depend on pair, jadi update kalau pair berubah

  return (
    <div
      className="tradingview-widget-container w-full mb-6"
      id="tradingview-widget-container"
      ref={containerRef}
    >
      <div className="tradingview-widget-container__widget" />
    </div>
  );
};

export default TradingViewWidget;
