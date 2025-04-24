export {}; // Supaya dianggap module oleh TypeScript

declare global {
  interface Window {
    TradingView: {
      onready: (callback: () => void) => void;
      widget: (options: Record<string, unknown>) => void;
    };
  }
}
