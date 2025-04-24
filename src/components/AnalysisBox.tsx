'use client';

import { useState } from 'react';

interface AnalysisBoxProps {
  onGenerate: (input: {
    pair: string;
    timeframe: string;
    currentPrice: number;
    support: number;
    resistance: number;
    rbs: number;
    sbr: number;
    ocl: number;
    qm: number;
    strategies: string[];
  }) => void;
  isLoading: boolean;
  aiResult?: {
    trend: string;
    bias: string;
    entry: string;
    sl: string;
    tp: string;
    reason: string;
  };
  fundamental?: string; 
}

export default function AnalysisBox({
  onGenerate,
  isLoading,
  aiResult,
  fundamental
}: AnalysisBoxProps) {
  const [pair, setPair] = useState('XAUUSD');
  const [timeframe, setTimeframe] = useState('H1');
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [support, setSupport] = useState<number>(0);
  const [resistance, setResistance] = useState<number>(0);
  const [rbs, setRbs] = useState<number>(0);
  const [sbr, setSbr] = useState<number>(0);
  const [ocl, setOcl] = useState<number>(0);
  const [qm, setQm] = useState<number>(0);
  const [strategies, setStrategies] = useState<string[]>([]);

  // 🔥 Checkbox toggle logic
  const toggleStrategy = (strategy: string) => {
    if (strategies.includes(strategy)) {
      setStrategies(strategies.filter((s) => s !== strategy));
    } else {
      setStrategies([...strategies, strategy]);
    }
  };

  // 🔥 Submit ke page.tsx
  const handleSubmit = () => {
    onGenerate({
      pair,
      timeframe,
      currentPrice,
      support,
      resistance,
      rbs,
      sbr,
      ocl,
      qm,
      strategies
    });
  };

  return (
    <div className="bg-[#1f2937] p-4 rounded-xl shadow text-white flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">🖥️Market Analysis</h2>

        {/* Tombol Generate */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-4 bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-xs disabled:opacity-50"
        >
          {isLoading ? 'Think...' : '🔍 Analysis'}
        </button>
      </div>

      {/* Form Input Section */}
      <div className="flex flex-col gap-2">

        {/* Pair Dropdown */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Pair</label>
          <select
            className="w-full bg-slate-800 text-white text-xs rounded px-2 py-1"
            value={pair}
            onChange={(e) => setPair(e.target.value)}
          >
            <option value="XAUUSD">XAUUSD (Gold)</option>
            <option value="BTCUSD">BTCUSD (Bitcoin)</option>
          </select>
        </div>

        {/* Grid Timeframe & Current Price */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400">Timeframe</label>
            <select
              className="bg-slate-800 p-2 rounded text-xs w-full"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="M15">M15</option>
              <option value="H1">H1</option>
              <option value="H4">H4</option>
              <option value="D1">D1</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400">Current Price</label>
            <input
              type="number"
              className="bg-slate-800 p-2 rounded text-xs w-full"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Strategies Checkbox */}
        <div className="flex flex-wrap gap-2">
          {[ 'Support', 'Resistance', 'RBS', 'SBR', 'OCL', 'QM'].map((strategy) => (
            <label key={strategy} className="flex items-center gap-1 text-xs text-gray-400">
              <input
                type="checkbox"
                checked={strategies.includes(strategy)}
                onChange={() => toggleStrategy(strategy)}
              />
              <span>{strategy}</span>
            </label>
          ))}
        </div>

        {/* Levels Input */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400">Support</label>
            <input
              type="number"
              className="bg-slate-800 p-2 rounded text-xs w-full"
              value={support}
              onChange={(e) => setSupport(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">Resistance</label>
            <input
              type="number"
              className="bg-slate-800 p-2 rounded text-xs w-full"
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">RBS</label>
            <input
              type="number"
              className="bg-slate-800 p-2 rounded text-xs w-full"
              value={rbs}
              onChange={(e) => setRbs(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">SBR</label>
            <input
              type="number"
              className="bg-slate-800 p-2 rounded text-xs w-full"
              value={sbr}
              onChange={(e) => setSbr(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">OCL</label>
            <input
              type="number"
              className="bg-slate-800 p-2 rounded text-xs w-full"
              value={ocl}
              onChange={(e) => setOcl(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">QM</label>
            <input
              type="number"
              className="bg-slate-800 p-2 rounded text-xs w-full"
              value={qm}
              onChange={(e) => setQm(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* 🔥 Teknikal Result */}
      {aiResult && (
        <div className="mt-auto p-1 rounded bg-gradient-to-br from-slate-800 to-slate-900 shadow space-y-2 text-xs">
          <h3 className="text-sm font-semibold text-gray-300 border-b border-slate-700 pb-1">👁️ Teknikal Analysis</h3>
          <div className="grid grid-cols-2 gap-2">
            <p><span className="text-green-300 font-medium">Trend:</span> {aiResult.trend}</p>
            <p><span className="text-purple-300 font-medium">Bias:</span> {aiResult.bias}</p>
            <p><span className="text-blue-300 font-medium">Entry:</span> {aiResult.entry}</p>
            <p><span className="text-red-400 font-medium">Stop Loss:</span> {aiResult.sl}</p>
            <p><span className="text-yellow-300 font-medium">Take Profit:</span> {aiResult.tp}</p>
          </div>
          <p className="text-gray-400 italic text-xs pt-2 border-t border-slate-700">🧠 {aiResult.reason}</p>
        </div>
      )}

      {/* 🔥 Fundamental Result */}
      {fundamental && (
        <div className="mt-4 p-2 rounded bg-gradient-to-br from-slate-800 to-slate-900 shadow text-xs text-gray-200 leading-relaxed space-y-2">
          <h3 className="font-semibold text-gray-300 border-b border-slate-700 pb-1">📰Fundamental Analysis</h3>
          <div className="whitespace-pre-line">{fundamental}</div>
        </div>
      )}
    </div>
  );
}
