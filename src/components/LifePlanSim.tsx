import React, { useState, useMemo } from 'react';
import { LineChart, ShieldCheck, AlertTriangle, Settings2, RefreshCw } from 'lucide-react';

export const LifePlanSim: React.FC = () => {
  // パラメータ
  const [currentAge, setCurrentAge] = useState(33);
  const [retireAge, setRetireAge] = useState(45);
  const [endAge, setEndAge] = useState(90);

  const [currentAssets, setCurrentAssets] = useState(2500); // 2,500万円
  const [monthlyInvest, setMonthlyInvest] = useState(20); // 20万円/月
  const [returnRate, setReturnRate] = useState(4.5); // 年利4.5%

  const [retireSpend, setRetireSpend] = useState(360); // リタイア後生活費 360万円/年
  const [pensionAge, setPensionAge] = useState(70); // 年金70歳繰下げ
  const [pensionMonthly, setPensionMonthly] = useState(18); // 月18万円（70歳繰下げ+42%換算）

  const [showAdvanced, setShowAdvanced] = useState(false);

  // 生涯推移計算
  const trajectory = useMemo(() => {
    const data: { age: number; assets: number; phase: 'acc' | 'dec' }[] = [];
    let assets = currentAssets;
    const r = returnRate / 100;
    const pensionAnnual = pensionMonthly * 12;

    let peakAssets = currentAssets;
    let peakAge = currentAge;
    let runOutAge: number | null = null;
    let retireAssets = currentAssets;

    for (let age = currentAge; age <= endAge; age++) {
      const isAcc = age < retireAge;
      data.push({
        age,
        assets: Math.round(assets),
        phase: isAcc ? 'acc' : 'dec',
      });

      if (assets > peakAssets) {
        peakAssets = assets;
        peakAge = age;
      }

      if (age === retireAge) {
        retireAssets = assets;
      }

      if (assets <= 0 && runOutAge === null) {
        runOutAge = age;
      }

      // 次年の計算
      if (isAcc) {
        // 蓄積期: 積立 + 運用益
        assets = assets * (1 + r) + monthlyInvest * 12;
      } else {
        // 取り崩し期: 運用益 - 生活費 + (年金)
        const currentPension = age >= pensionAge ? pensionAnnual : 0;
        const netSpend = Math.max(0, retireSpend - currentPension);
        assets = (assets - netSpend) * (1 + r);
        if (assets < 0) assets = 0;
      }
    }

    const endAssets = data[data.length - 1].assets;

    return {
      data,
      peakAssets: Math.round(peakAssets),
      peakAge,
      retireAssets: Math.round(retireAssets),
      endAssets,
      runOutAge,
    };
  }, [
    currentAge,
    retireAge,
    endAge,
    currentAssets,
    monthlyInvest,
    returnRate,
    retireSpend,
    pensionAge,
    pensionMonthly,
  ]);

  // SVG グラフ描画
  const maxAssets = Math.max(
    ...trajectory.data.map((d) => d.assets),
    currentAssets * 1.5,
    5000
  );

  const svgWidth = 650;
  const svgHeight = 250;
  const padding = { top: 20, right: 30, bottom: 35, left: 55 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;
  const totalYears = endAge - currentAge;

  const points = trajectory.data
    .map((d) => {
      const x = padding.left + ((d.age - currentAge) / totalYears) * graphWidth;
      const y = padding.top + graphHeight - (d.assets / maxAssets) * graphHeight;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${padding.left},${padding.top + graphHeight} ${points} ${
    padding.left + graphWidth
  },${padding.top + graphHeight}`;

  // リタイア年齢と年金受給年齢のX座標
  const retireX =
    padding.left + ((retireAge - currentAge) / totalYears) * graphWidth;
  const pensionX =
    padding.left + ((pensionAge - currentAge) / totalYears) * graphWidth;

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#13151f] p-5 sm:p-7 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-100 dark:border-stone-800/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <LineChart className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 m-0">
              生涯資産＆FIREデキュムレーション・ライフプランシミュレーター
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            積立期（アキュムレーション）からリタイア後の取り崩し期、公的年金受給までの生涯資産残高の推移を可視化します。
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 px-2.5 py-1 rounded-md border border-stone-200 dark:border-stone-800"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>{showAdvanced ? '基本のみ表示' : '全パラメータ編集'}</span>
          </button>
          <button
            onClick={() => {
              setCurrentAge(33);
              setRetireAge(45);
              setEndAge(90);
              setCurrentAssets(2500);
              setMonthlyInvest(20);
              setReturnRate(4.5);
              setRetireSpend(360);
              setPensionAge(70);
              setPensionMonthly(18);
            }}
            className="inline-flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 px-2 py-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>初期化</span>
          </button>
        </div>
      </div>

      {/* 詳細パラメータパネル */}
      {showAdvanced && (
        <div className="mb-6 p-4 rounded-xl bg-stone-100/70 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
              <span>現年齢</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{currentAge}歳</span>
            </div>
            <input
              type="range"
              min={22}
              max={55}
              value={currentAge}
              onChange={(e) => {
                const a = Number(e.target.value);
                setCurrentAge(a);
                if (retireAge <= a) setRetireAge(a + 5);
              }}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
              <span>現在資産</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{currentAssets}万円</span>
            </div>
            <input
              type="range"
              min={500}
              max={8000}
              step={100}
              value={currentAssets}
              onChange={(e) => setCurrentAssets(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
              <span>毎月積立額</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{monthlyInvest}万円</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={monthlyInvest}
              onChange={(e) => setMonthlyInvest(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
              <span>想定運用利回り</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{returnRate}%</span>
            </div>
            <input
              type="range"
              min={2.0}
              max={7.0}
              step={0.5}
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* サマリーカード */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
          <span className="text-[11px] text-stone-500 block font-sans">FIRE/リタイア時資産</span>
          <span className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">
            {trajectory.retireAssets.toLocaleString()} 万円
          </span>
          <span className="text-[10px] text-stone-400 font-sans block">{retireAge}歳到達時</span>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
          <span className="text-[11px] text-stone-500 block font-sans">ピーク資産</span>
          <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5 block">
            {trajectory.peakAssets.toLocaleString()} 万円
          </span>
          <span className="text-[10px] text-stone-400 font-sans block">{trajectory.peakAge}歳時点</span>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
          <span className="text-[11px] text-stone-500 block font-sans">{endAge}歳時点の残高</span>
          <span
            className={`text-base sm:text-lg font-bold mt-0.5 block ${
              trajectory.endAssets > 0
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {trajectory.endAssets > 0
              ? `${trajectory.endAssets.toLocaleString()} 万円`
              : '0 万円 (枯渇)'}
          </span>
          <span className="text-[10px] text-stone-400 font-sans block">
            {trajectory.runOutAge ? `⚠️ ${trajectory.runOutAge}歳で資産枯渇` : '生涯黒字維持'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex flex-col justify-center">
          <span className="text-[11px] text-stone-500 block font-sans">ポートフォリオ判定</span>
          {trajectory.endAssets > 5000 ? (
            <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs mt-1 font-sans">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>💎 永久不滅・安泰</span>
            </div>
          ) : trajectory.endAssets > 0 ? (
            <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-bold text-xs mt-1 font-sans">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>🛡️ 健全（逃げ切り）</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-rose-600 dark:text-rose-400 font-bold text-xs mt-1 font-sans">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>⚠️ 枯渇リスクあり</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG グラフ */}
      <div className="relative w-full bg-stone-50 dark:bg-[#0c0d14] rounded-xl p-3 border border-stone-200/80 dark:border-stone-800/80 mb-6">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-56 sm:h-64 overflow-visible"
        >
          {/* グリッド線 */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + graphHeight * (1 - ratio);
            const val = Math.round(maxAssets * ratio);
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

          {/* X軸（年齢刻み） */}
          {trajectory.data
            .filter((d) => (d.age - currentAge) % 10 === 0 || d.age === endAge)
            .map((d) => {
              const x =
                padding.left +
                ((d.age - currentAge) / totalYears) * graphWidth;
              return (
                <g key={d.age}>
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
                    {d.age}歳
                  </text>
                </g>
              );
            })}

          {/* 領域グラデーション塗りつぶし */}
          <defs>
            <linearGradient id="lifeplanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <polygon fill="url(#lifeplanGradient)" points={areaPoints} />

          {/* リタイア年齢の垂直線 */}
          <line
            x1={retireX}
            y1={padding.top}
            x2={retireX}
            y2={svgHeight - padding.bottom}
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text
            x={retireX}
            y={padding.top - 5}
            textAnchor="middle"
            className="text-[9px] fill-amber-500 font-bold font-sans"
          >
            FIRE({retireAge}歳)
          </text>

          {/* 年金受給開始の垂直線 */}
          {pensionAge <= endAge && (
            <>
              <line
                x1={pensionX}
                y1={padding.top}
                x2={pensionX}
                y2={svgHeight - padding.bottom}
                stroke="#8b5cf6"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text
                x={pensionX}
                y={padding.top - 5}
                textAnchor="middle"
                className="text-[9px] fill-purple-500 font-bold font-sans"
              >
                年金開始({pensionAge}歳)
              </text>
            </>
          )}

          {/* 資産推移折れ線 */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>

        <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 px-2 font-mono">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              <span>総資産推移</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 border border-amber-500 border-dashed inline-block" />
              <span>FIRE移行点</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 border border-purple-500 border-dashed inline-block" />
              <span>年金開始</span>
            </span>
          </div>
        </div>
      </div>

      {/* スライダーコントロール */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800 space-y-1">
          <div className="flex justify-between">
            <span className="text-stone-500">リタイア希望年齢</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {retireAge} 歳
            </span>
          </div>
          <input
            type="range"
            min={currentAge + 1}
            max={65}
            value={retireAge}
            onChange={(e) => setRetireAge(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800 space-y-1">
          <div className="flex justify-between">
            <span className="text-stone-500">リタイア後年間生活費</span>
            <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
              {retireSpend} 万円/年
            </span>
          </div>
          <input
            type="range"
            min={200}
            max={600}
            step={20}
            value={retireSpend}
            onChange={(e) => setRetireSpend(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800 space-y-1">
          <div className="flex justify-between">
            <span className="text-stone-500">年金受給開始年齢</span>
            <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
              {pensionAge} 歳 (月額{pensionMonthly}万)
            </span>
          </div>
          <input
            type="range"
            min={60}
            max={75}
            value={pensionAge}
            onChange={(e) => {
              const age = Number(e.target.value);
              setPensionAge(age);
              // 65歳基準13万円。繰下げ(65歳以上)は月+0.7%、繰上げ(65歳未満)は月-0.4%
              const rate = age >= 65 ? 0.007 : 0.004;
              const bonus = (age - 65) * rate * 12;
              setPensionMonthly(Math.round(13 * (1 + bonus)));
            }}
            className="w-full accent-purple-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
