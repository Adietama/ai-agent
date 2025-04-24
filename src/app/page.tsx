"use client";

import { useState } from "react";
import TradingViewWidget from "../components/TradingViewWidget";
import AnalysisBox from "../components/AnalysisBox";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 State untuk hasil Teknikal
  const [technicalResult, setTechnicalResult] = useState<{
    trend: string;
    bias: string;
    entry: string;
    sl: string;
    tp: string;
    reason: string;
  }>();

  // 🔥 State untuk hasil Fundamental
  const [fundamentalResult, setFundamentalResult] = useState<string>("");

  const handleGenerate = async (input: {
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
  }) => {
    setIsLoading(true);

    // Generate POI aktif
    const activePOIs = {
      ...(input.strategies.includes("Support") && { Support: input.support }),
      ...(input.strategies.includes("Resistance") && {
        Resistance: input.resistance,
      }),
      ...(input.strategies.includes("RBS") && { RBS: input.rbs }),
      ...(input.strategies.includes("SBR") && { SBR: input.sbr }),
      ...(input.strategies.includes("OCL") && { OCL: input.ocl }),
      ...(input.strategies.includes("QM") && { Quasimodo: input.qm }),
    };

    const poiString = Object.entries(activePOIs)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join("\n");

    // 🔥 1. Prompt Teknikal
    const technicalPrompt = `
    Saya ingin menganalisa pair ${input.pair} dengan pendekatan multi-timeframe.

    1. **Trend HTF (H1//H4/D1)**:
      - Current Price: ${input.currentPrice}
      - Timeframe HTF: ${input.timeframe}

    2. **Level POI di M15**:
    ${poiString}

    Strategi:
    - Validasi apakah **POI M15** ini **dekat dengan garis horizontal HTF**.
    - Tentukan apakah **POI ini valid untuk entry** berdasarkan **trend HTF** dan struktur.
    - Jika valid, berikan **entry level, SL, TP** yang logis.
    - Berikan reasoning seperti **break of structure**, **liquidity sweep**, atau **retest order block**.
    
    Format output JSON (tanpa tambahan apapun):
    {
      "trend": "...",
      "bias": "...",
      "entry": "...",
      "sl": "...",
      "tp": "...",
      "reason": "..."
    }
    Pastikan output **tanpa tambahan apapun** (langsung JSON).
    `;

    // 🔥 2. Prompt Fundamental
    const fundamentalPrompt = `
    Berikan analisis fundamental terbaru untuk ${input.pair}. Fokus ke faktor-faktor seperti:
    - Inflasi (CPI)
    - Tenaga kerja (NFP)
    - FOMC Meeting
    - DXY Index
    - Geopolitik (jika ada)
    
    Buat penjelasan dampaknya ke ${input.pair} secara singkat dan jelas, dalam bahasa Indonesia. Gunakan format markdown seperti **bold**, *italic* jika perlu.
    `;

    try {
      // 🔥 3. Fetch Teknikal dari DeepSeek V3
      const technicalFetch = fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Agent App",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3-0324:free",
            messages: [
              { role: "user", content: technicalPrompt }, // 🔥 Pakai variabel prompt
            ],
          }),
        }
      );

      // 🔥 4. Fetch Fundamental dari Qwen 32B
      const fundamentalFetch = fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AI Agent App",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-distill-qwen-32b",
            messages: [
              { role: "user", content: fundamentalPrompt }, // 🔥 Pakai variabel prompt
            ],
          }),
        }
      );

      // 🔄 Tunggu keduanya selesai paralel
      const [technicalRes, fundamentalRes] = await Promise.all([
        technicalFetch,
        fundamentalFetch,
      ]);

      // 🔍 Proses hasil Teknikal
      const technicalData = await technicalRes.json();
      const techContent = technicalData.choices[0].message.content;
      const techMatch = techContent.match(/```json\s*([\s\S]*?)\s*```/i);
      const techJsonString = techMatch
        ? techMatch[1].trim()
        : techContent.trim();
      const techParsed = JSON.parse(techJsonString);

      setTechnicalResult({
        trend: techParsed.trend,
        bias: techParsed.bias,
        entry: techParsed.entry,
        sl: techParsed.sl,
        tp: techParsed.tp,
        reason: techParsed.reason,
      });

      // 🔍 Proses hasil Fundamental
      const fundamentalData = await fundamentalRes.json();
      const fundamentalSummary = fundamentalData.choices[0].message.content;
      setFundamentalResult(fundamentalSummary);
    } catch (err) {
      console.error("❌ Error AI Response:", err);
      alert("Gagal mendapatkan analisa AI!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="text-white p-4 lg:p-2 min-h-screen pb-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <TradingViewWidget />
          </div>

          {/* Analysis Box Section */}
          <div className="h-[580px] overflow-y-auto">
            <AnalysisBox
              onGenerate={handleGenerate}
              isLoading={isLoading}
              aiResult={technicalResult}
            />
          </div>

          {/* Fundamental Panel (Full width) */}
          {fundamentalResult && (
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[#1f2937] to-[#0f172a] rounded-xl shadow p-5 text-xs text-gray-200 shadow">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  📊 Fundamental Analysis
                </h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: fundamentalResult.replace(/\n/g, "<br/>"),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
