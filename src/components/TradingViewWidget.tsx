"use client";

import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  pair: string; // ⬅️ Pair dari Box Analysis (XAUUSD / BTCUSD)
}

const TradingViewWidget = ({ pair }: TradingViewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Bersihkan widget lama
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          console.log("📊 TradingView script loaded!");
          window.TradingView.onready(() => {
            console.log("📈 TradingView ready!");
            window.TradingView.widget({
              width: "100%",
              height: 570,
              symbol: pair === "BTCUSD" ? "COINBASE:BTCUSD" : "GBEBROKERS:XAUUSD",
              interval: "240",
              timezone: "Asia/Jakarta",
              theme: "dark",
              style: "1",
              locale: "en",
              gridColor: "rgba(182, 182, 182, 0.06)",
              withdateranges: true,
              hide_side_toolbar: false,
              watchlist: ["GBEBROKERS:XAUUSD", "COINBASE:BTCUSD"],
              studies: ["STD;EMA@34"],
              container_id: "tradingview-widget-container",
            });
          });
        } else {
          console.error("❌ TradingView script not loaded properly.");
        }
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
