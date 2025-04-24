"use client";
import { useEffect, useRef } from "react";

const TradingViewWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector("iframe")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        window.TradingView.widget({
          width: "100%",
          height: 580,
          symbol: "GBEBROKERS:XAUUSD",
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
  }, []);

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
