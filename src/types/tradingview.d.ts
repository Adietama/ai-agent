export {}; // biar dianggap modul

declare global {
  interface Window {
    TradingView: {
      widget: (options: any) => void;
    };
  }
}
