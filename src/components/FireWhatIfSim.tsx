import React, { useState, useMemo } from 'react';
import { Zap, Sparkles, RefreshCw, Settings2 } from 'lucide-react';

export const FireWhatIfSim: React.FC = () => {
  // 基本ステート（ユーザーの現在地）
  const [currentAssets, setCurrentAssets] = useState(3000); // 3,000万円
  const [monthlyInvest, setMonthlyInvest] = useState(15); // 月15万円積立
  const [annualExpense, setAnnualExpense] = useState(350); // 年間支出350万円
  const swrRate = 0.035; // 3.5%ルール (SWR)
  const [showBaseSettings, setShowBaseSettings] = useState(false);

  // もしもパラメータ (What-if)
  const [additionalInvest, setAdditionalInvest] = useState(5); // +月5万円追加積立
  const [dailySavings, setDailySavings] = useState(1000); // +日1,000円の節約 (月3万円相当)
  const [expenseCut, setExpenseCut] = useState(30); // 年間30万円の固定費削減
  const [expectedReturn, setExpectedReturn] = useState(5.0); // 想定年利5.0%

  // 複利到達計算関数
  const calculateMonthsToTarget = (
    startAssets: number,
    monthlyContribution: number,
    targetAssets: number,
    annualReturnRate: number
  ): number => {
    if (startAssets >= targetAssets) return 0;
    if (monthlyContribution <= 0 && annualReturnRate <= 0) return 1200;

    let months = 0;
    let assets = startAssets;
    const monthlyRate = Math.pow(1 + annualReturnRate / 100, 1 / 12) - 1;

    while (assets < targetAssets && months < 1200) {
      assets = assets * (1 + monthlyRate) + monthlyContribution;
      months++;
    }
    return months;
  };

  const simResult = useMemo(() => {
    // 基準プラン
    const origTarget = annualExpense / swrRate; // 目標資産額 (万円)
    const origMonths = calculateMonthsToTarget(
      currentAssets,
      monthlyInvest,
      origTarget,
      expectedReturn
    );

    // もしもプラン
    const savingsToMonthly = (dailySavings * 30) / 10000; // 万円/月
    const newMonthlyInvest = monthlyInvest + additionalInvest + savingsToMonthly;
    const newAnnualExpense = Math.max(150, annualExpense - expenseCut);
    const newTarget = newAnnualExpense / swrRate;

    const newMonths = calculateMonthsToTarget(
      currentAssets,
      newMonthlyInvest,
      newTarget,
      expectedReturn
    );

    const savedMonths = Math.max(0, origMonths - newMonths);
    const savedYears = Math.floor(savedMonths / 12);
    const remainingSavedMonths = savedMonths % 12;

    // 労働時間の自由買い戻し (月160労働時間換算)
    const freedomHours = savedMonths * 160;

    return {
      origTarget: Math.round(origTarget),
      origMonths,
      newTarget: Math.round(newTarget),
      newMonths,
      newMonthlyInvest,
      savedMonths,
      savedYears,
      remainingSavedMonths,
      freedomHours,
    };
  }, [
    currentAssets,
    monthlyInvest,
    annualExpense,
    swrRate,
    additionalInvest,
    dailySavings,
    expenseCut,
    expectedReturn,
  ]);

  const formatYearsMonths = (totalMonths: number) => {
    if (totalMonths >= 1200) return '100年以上（要改善）';
    if (totalMonths <= 0) return 'すでに達成！';
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    if (y === 0) return `${m}ヶ月`;
    if (m === 0) return `${y}年`;
    return `${y}年 ${m}ヶ月`;
  };

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#13151f] p-5 sm:p-7 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-100 dark:border-stone-800/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
              <Zap className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 m-0">
              FIRE加速 もしもシミュレーター (What-if Acceleration)
            </h3>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            「日常の節約」や「固定費削減」が、FIRE到達を何年早め、どれほどの自由時間を買い戻せるかをリアルタイム計算します。
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowBaseSettings(!showBaseSettings)}
            className="inline-flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 px-2.5 py-1 rounded-md border border-stone-200 dark:border-stone-800"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>{showBaseSettings ? '設定を閉じる' : '前提条件を変更'}</span>
          </button>
          <button
            onClick={() => {
              setCurrentAssets(3000);
              setMonthlyInvest(15);
              setAnnualExpense(350);
              setAdditionalInvest(5);
              setDailySavings(1000);
              setExpenseCut(30);
              setExpectedReturn(5.0);
            }}
            className="inline-flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 px-2 py-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>初期化</span>
          </button>
        </div>
      </div>

      {/* 前提条件変更パネル（展開時） */}
      {showBaseSettings && (
        <div className="mb-6 p-4 rounded-xl bg-stone-100/70 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
              <span>現在の純資産額</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{currentAssets}万円</span>
            </div>
            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={currentAssets}
              onChange={(e) => setCurrentAssets(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
              <span>現在の毎月積立額</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{monthlyInvest}万円</span>
            </div>
            <input
              type="range"
              min={3}
              max={50}
              step={1}
              value={monthlyInvest}
              onChange={(e) => setMonthlyInvest(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-stone-600 dark:text-stone-400 mb-1">
              <span>現在の年間生活費</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{annualExpense}万円</span>
            </div>
            <input
              type="range"
              min={180}
              max={800}
              step={10}
              value={annualExpense}
              onChange={(e) => setAnnualExpense(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* インパクトハイライトカード */}
      <div className="mb-6 rounded-xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-600/5 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-transparent border border-amber-300 dark:border-amber-800/60 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FIRE到達の加速インパクト</span>
            </div>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 font-mono">
                {simResult.savedMonths > 0
                  ? `${simResult.savedYears > 0 ? `${simResult.savedYears}年 ` : ''}${simResult.remainingSavedMonths}ヶ月`
                  : '0ヶ月'}
              </span>
              <span className="text-sm font-bold text-stone-700 dark:text-stone-300">
                {simResult.savedMonths > 0 ? '早まります！' : '短縮なし'}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              人生の自由労働時間 約{' '}
              <strong className="text-amber-700 dark:text-amber-300 font-mono">
                {simResult.freedomHours.toLocaleString()} 時間
              </strong>{' '}
              を自分の手元に買い戻します
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-amber-200 dark:border-amber-800/60 md:pl-6 text-xs font-mono">
            <div>
              <span className="text-[11px] text-stone-500 block">現在の計画</span>
              <span className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                あと {formatYearsMonths(simResult.origMonths)}
              </span>
              <span className="text-[10px] text-stone-400 block">
                目標: {simResult.origTarget.toLocaleString()} 万円
              </span>
            </div>
            <div>
              <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold block">
                もしもプラン
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                あと {formatYearsMonths(simResult.newMonths)}
              </span>
              <span className="text-[10px] text-stone-400 block">
                目標: {simResult.newTarget.toLocaleString()} 万円
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* スライダー群 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. 追加積立 */}
        <div className="space-y-1.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800">
          <div className="flex justify-between text-xs">
            <span className="text-stone-600 dark:text-stone-400 font-medium">月々の追加投資</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
              +{additionalInvest} 万円/月
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={additionalInvest}
            onChange={(e) => setAdditionalInvest(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>+0万</span>
            <span>+10万</span>
            <span>+20万</span>
          </div>
        </div>

        {/* 2. 日々の節約 */}
        <div className="space-y-1.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800">
          <div className="flex justify-between text-xs">
            <span className="text-stone-600 dark:text-stone-400 font-medium">日々の節約ブースト</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
              +{dailySavings.toLocaleString()} 円/日
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={3000}
            step={200}
            value={dailySavings}
            onChange={(e) => setDailySavings(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>0円</span>
            <span>月+{(dailySavings * 30 / 10000).toFixed(1)}万</span>
            <span>3,000円</span>
          </div>
        </div>

        {/* 3. 固定費削減 */}
        <div className="space-y-1.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800">
          <div className="flex justify-between text-xs">
            <span className="text-stone-600 dark:text-stone-400 font-medium">年間生活費の削減</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
              -{expenseCut} 万円/年
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={expenseCut}
            onChange={(e) => setExpenseCut(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>0万</span>
            <span>目標資産-{(expenseCut / swrRate).toFixed(0)}万</span>
            <span>100万</span>
          </div>
        </div>

        {/* 4. 想定年利 */}
        <div className="space-y-1.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/70 dark:border-stone-800">
          <div className="flex justify-between text-xs">
            <span className="text-stone-600 dark:text-stone-400 font-medium">想定利回り (実質)</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
              {expectedReturn.toFixed(1)} %/年
            </span>
          </div>
          <input
            type="range"
            min={3.0}
            max={7.0}
            step={0.5}
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>3.0%</span>
            <span>世界平均 5%</span>
            <span>7.0%</span>
          </div>
        </div>
      </div>

      {/* 現在のベース設定表示 */}
      <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-3">
        <div className="flex items-center space-x-4">
          <span>現在の純資産: <strong className="text-stone-700 dark:text-stone-300 font-mono">{currentAssets.toLocaleString()}万円</strong></span>
          <span>毎月積立: <strong className="text-stone-700 dark:text-stone-300 font-mono">{monthlyInvest}万円</strong></span>
          <span>生活費: <strong className="text-stone-700 dark:text-stone-300 font-mono">{annualExpense}万円/年</strong></span>
        </div>
        <div className="text-[11px] text-stone-400">
          ※ 3.5%ルール適用 (目標資産 ＝ 年間生活費 &times; 28.57)
        </div>
      </div>
    </div>
  );
};
