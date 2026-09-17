import React, { useState, useMemo } from 'react';
import { Sliders, TrendingDown, RefreshCw } from 'lucide-react';

export const InteractiveSim: React.FC = () => {
  const [initialAssets, setInitialAssets] = useState(10000); // 1億円 (単位: 万円)
  const [annualSpend, setAnnualSpend] = useState(350); // 350万円 (3.5%)
  const [useGuardrails, setUseGuardrails] = useState(false);

  // 30年間のリターンプロファイル（30年間の累積・平均リターンはAとBで数学的に完全に同等）
  // 基準年間リターン: 幾何平均 5%
  const simulationYears = 30;

  const results = useMemo(() => {

    // シナリオA: 最初の3年間に-28%, -20%, -12%の歴史的大暴落を配置
    const earlyCrashReturns = [
      -0.28, -0.20, -0.12, 0.18, 0.15, 0.10, 0.09, 0.08, 0.14, 0.06,
      0.08, 0.07, 0.11, 0.06, 0.05, 0.08, 0.06, 0.07, 0.09, 0.05,
      0.06, 0.07, 0.08, 0.06, 0.05, 0.07, 0.06, 0.08, 0.07, 0.08
    ];

    // シナリオB: 序盤好調で、最後の3年間に同一の暴落を配置（平均リターンはAと完全同一）
    const lateCrashReturns = [
      0.18, 0.15, 0.10, 0.09, 0.08, 0.14, 0.06, 0.08, 0.07, 0.11,
      0.06, 0.05, 0.08, 0.06, 0.07, 0.09, 0.05, 0.06, 0.07, 0.08,
      0.06, 0.05, 0.07, 0.06, 0.08, 0.07, 0.08, -0.12, -0.20, -0.28
    ];

    let earlyAssets = initialAssets;
    let lateAssets = initialAssets;

    const data = [
      {
        year: 0,
        early: Math.round(earlyAssets),
        late: Math.round(lateAssets),
        earlySpend: annualSpend,
      }
    ];

    const initialRate = annualSpend / initialAssets;

    for (let y = 1; y <= simulationYears; y++) {
      const rEarly = earlyCrashReturns[y - 1];
      const rLate = lateCrashReturns[y - 1];

      // ガードレール適用判定（本文の10%ルールに準拠）
      let actualSpendEarly = annualSpend;
      if (useGuardrails && earlyAssets > 0) {
        const currentRate = annualSpend / earlyAssets;
        if (currentRate > initialRate * 1.2) {
          actualSpendEarly = annualSpend * 0.90; // 10%カット
        } else if (currentRate < initialRate * 0.8) {
          actualSpendEarly = annualSpend * 1.10; // 10%ブースト
        }
      }

      let actualSpendLate = annualSpend;
      if (useGuardrails && lateAssets > 0) {
        const currentRate = annualSpend / lateAssets;
        if (currentRate > initialRate * 1.2) {
          actualSpendLate = annualSpend * 0.90; // 10%カット
        } else if (currentRate < initialRate * 0.8) {
          actualSpendLate = annualSpend * 1.10; // 10%ブースト
        }
      }

      if (earlyAssets > 0) {
        earlyAssets = (earlyAssets - actualSpendEarly) * (1 + rEarly);
        if (earlyAssets < 0) earlyAssets = 0;
      }

      if (lateAssets > 0) {
        lateAssets = (lateAssets - actualSpendLate) * (1 + rLate);
        if (lateAssets < 0) lateAssets = 0;
      }

      data.push({
        year: y,
        early: Math.round(earlyAssets),
        late: Math.round(lateAssets),
        earlySpend: Math.round(actualSpendEarly),
      });
    }

    return data;
  }, [initialAssets, annualSpend, useGuardrails]);

  const initialRatePercent = ((annualSpend / initialAssets) * 100).toFixed(2);
  const finalEarly = results[results.length - 1].early;
  const finalLate = results[results.length - 1].late;

  // グラフ描画用スケール
  const maxVal = Math.max(
    ...results.map((d) => Math.max(d.early, d.late)),
    initialAssets * 1.5
  );

  const svgWidth = 600;
  const svgHeight = 240;
  const padding = { top: 20, right: 30, bottom: 30, left: 55 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const pointsEarly = results
    .map((d, i) => {
      const x = padding.left + (i / simulationYears) * graphWidth;
      const y = padding.top + graphHeight - (d.early / maxVal) * graphHeight;
      return `${x},${y}`;
    })
    .join(' ');

  const pointsLate = results
    .map((d, i) => {
      const x = padding.left + (i / simulationYears) * graphWidth;
      const y = padding.top + graphHeight - (d.late / maxVal) * graphHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#13151f] p-5 sm:p-7 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-100 dark:border-stone-800/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
              <Sliders className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 m-0">
              順序リスク（SORR）＆動的ガードレール インタラクティブ・シミュレーター
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            平均リターンが完全に同一でも、「暴落のタイミング」によって資産寿命がどう変化するかを実験できます。
          </p>
        </div>

        <button
          onClick={() => {
            setInitialAssets(10000);
            setAnnualSpend(350);
            setUseGuardrails(false);
          }}
          className="inline-flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
        >
          <RefreshCw className="w-3 h-3" />
          <span>初期値にリセット</span>
        </button>
      </div>

      {/* コントロールパネル */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-stone-600 dark:text-stone-400 font-medium">初期資産</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
              {(initialAssets / 10000).toFixed(2)} 億円 ({initialAssets.toLocaleString()} 万円)
            </span>
          </div>
          <input
            type="range"
            min={4000}
            max={20000}
            step={500}
            value={initialAssets}
            onChange={(e) => setInitialAssets(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>4,000万</span>
            <span>1億円</span>
            <span>2億円</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-stone-600 dark:text-stone-400 font-medium">年間生活費（引き出し額）</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
              {annualSpend} 万円 / 年
            </span>
          </div>
          <input
            type="range"
            min={200}
            max={700}
            step={25}
            value={annualSpend}
            onChange={(e) => setAnnualSpend(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>200万</span>
            <span>初期引き出し率: <strong className="text-blue-600 dark:text-blue-400">{initialRatePercent}%</strong></span>
            <span>700万</span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-stone-50 dark:bg-stone-900/60 p-3 rounded-xl border border-stone-200/80 dark:border-stone-800">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useGuardrails}
                onChange={(e) => setUseGuardrails(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                  動的ガードレール（サーキットブレーカー）
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                  暴落時に支出を自動で10%抑制
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* SVG グラフ */}
      <div className="relative w-full bg-stone-50 dark:bg-[#0c0d14] rounded-xl p-3 border border-stone-200/80 dark:border-stone-800/80">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-56 sm:h-64 overflow-visible"
        >
          {/* グリッド線 */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + graphHeight * (1 - ratio);
            const val = Math.round(maxVal * ratio);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="currentColor"
                  className="text-stone-200 dark:text-stone-800/60"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-stone-400 font-mono"
                >
                  {val >= 10000 ? `${(val / 10000).toFixed(1)}億` : `${val}万`}
                </text>
              </g>
            );
          })}

          {/* X軸（年数） */}
          {[0, 5, 10, 15, 20, 25, 30].map((yr) => {
            const x = padding.left + (yr / simulationYears) * graphWidth;
            return (
              <g key={yr}>
                <line
                  x1={x}
                  y1={svgHeight - padding.bottom}
                  x2={x}
                  y2={svgHeight - padding.bottom + 4}
                  stroke="currentColor"
                  className="text-stone-400"
                />
                <text
                  x={x}
                  y={svgHeight - padding.bottom + 14}
                  textAnchor="middle"
                  className="text-[10px] fill-stone-400 font-mono"
                >
                  {yr === 0 ? '開始' : `${yr}年`}
                </text>
              </g>
            );
          })}

          {/* シナリオB（終盤暴落）: エメラルド線 */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsLate}
          />

          {/* シナリオA（序盤暴落）: ローズ線 */}
          <polyline
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsEarly}
          />
        </svg>

        {/* 凡例 & 結果カード */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-200 dark:border-stone-800/80 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
              <div>
                <span className="font-bold text-rose-900 dark:text-rose-300">シナリオA: 序盤に大暴落直撃</span>
                <span className="text-[10px] text-rose-700/80 dark:text-rose-400 block">リタイア直後3年間で累積-50%</span>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-[10px] text-stone-500 block">30年後残高</span>
              <span className={`font-bold ${finalEarly === 0 ? 'text-rose-600 dark:text-rose-400' : 'text-stone-800 dark:text-stone-200'}`}>
                {finalEarly === 0 ? '⚠️ 資産枯渇（破綻）' : `${finalEarly.toLocaleString()} 万円`}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-300">シナリオB: 終盤に大暴落直撃</span>
                <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400 block">30年間の平均リターンはAと完全同一</span>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-[10px] text-stone-500 block">30年後残高</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {finalLate.toLocaleString()} 万円
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* インサイト解説 */}
      <div className="mt-4 p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/30 text-xs text-blue-900 dark:text-blue-300 flex items-start space-x-2">
        <TrendingDown className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">シミュレーションから得られる教訓: </span>
          両シナリオの「30年間の年平均リターン」は全く同一です。しかし、序盤に暴落が来ると元本毀損により
          {finalEarly === 0 ? ' 途中で資産が枯渇します。' : ' 資産残高に天文学的な格差が生じます。'}
          「動的ガードレール」にチェックを入れると、暴落時に支出を10%抑制することで元本が保護され、生存率が劇的に回復することが確認できます。
        </div>
      </div>
    </div>
  );
};
