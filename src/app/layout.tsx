import "./globals.css";
import React from "react";

export const metadata = {
  title: "AI Agent Analysis",
  description: "Gold & BTC Analyzer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white">
        {children}

        {/* 🔥 Footer */}
        <footer className="mt-8 py-2 border-t border-slate-700 text-center text-[8px] text-gray-500 space-y-1">
          <p>
            © 2025{" "}
            <span className="text-white font-semibold">
              Designed by Adietama
            </span>{" "}
            🛠️
          </p>
          <p className="italic text-gray-400">"Trade & Code Like A Pro" 🚀 | “Building the bridge between strategy and technology”</p>
          <p className="text-gray-500">
            Version: <span className="text-gray-400">1.0.0</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
