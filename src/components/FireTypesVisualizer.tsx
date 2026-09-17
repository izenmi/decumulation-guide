import React, { useState } from 'react';
import { Target, Shield, Flame, Coffee, Compass, Landmark } from 'lucide-react';

export const FireTypesVisualizer: React.FC = () => {
  const [monthlyExpense, setMonthlyExpense] = useState(25); // 月25万円 (年300万円)
  const [activeTab, setActiveTab] = useState<'types' | 'levels'>('types');

  const annualExpense = monthlyExpense * 12; // 万円/年
  const swr = 0.035; // 3.5%ルール

  // FIRE諸類型
  const fireTypes = [
    {
      id: 'full',
      name: 'Full FIRE (完全経済的自立)',
      icon: <Flame className="w-5 h-5 text-amber-500" />,
      multiplier: 1.0,
      target: Math.round(annualExpense / swr),
      sideIncome: 0,
      desc: '生活費の100%を資産からの不労所得（SWR 3.5%）で賄う。完全な時間主権を握り、労働の必要性を完全にゼロにする正統派アーキテクチャ。',
      techAnalogy: '完全自律稼働サーバ（SLA 99.99%）。外部依存ゼロ。',
    },
    {
      id: 'side',
      name: 'Side FIRE (副業・複業ハイブリッド)',
      icon: <Compass className="w-5 h-5 text-blue-500" />,
      multiplier: 0.5,
      target: Math.round((annualExpense * 0.5) / swr),
      sideIncome: Math.round(monthlyExpense * 0.5),
      desc: '生活費の半分（50%）を資産収入、残り50%を好きな受託開発や個人開発で賄う。必要資産が半減するため、到達年数を劇的に短縮可能。',
      techAnalogy: 'ハイブリッド・クラウド。ベースロードは資産で賄い、ピークを軽負荷労働で処理。',
    },
    {
      id: 'barista',
      name: 'Barista FIRE (社会保険維持型)',
      icon: <Coffee className="w-5 h-5 text-emerald-500" />,
      multiplier: 0.6,
      target: Math.round((annualExpense * 0.6) / swr),
      sideIncome: Math.round(monthlyExpense * 0.4),
      desc: '週2〜3日の緩やかなパート・派遣労働（社会保険・厚生年金加入）＋資産収入。健康保険料を抑え、年金受給権を育てながら自由時間を最大化。',
      techAnalogy: 'マネージド・サービス併用。インフラ運用（社保・年金）を外部にオフロード。',
    },
    {
      id: 'lean',
      name: 'Lean FIRE (ミニマリスト型)',
      icon: <Shield className="w-5 h-5 text-stone-500" />,
      multiplier: 0.7,
      target: Math.round((annualExpense * 0.7) / swr),
      sideIncome: 0,
      desc: '生活費を徹底的に最適化（ミニマリズム、地方移住、固定費削減）し、生活費を通常より30%抑えて最速で労働市場からエグジットする。',
      techAnalogy: 'マイクロVM・リソース極小化コンテナ。低スペックでも軽快に自律稼働。',
    },
    {
      id: 'coast',
      name: 'Coast FIRE (複利放置型)',
      icon: <Landmark className="w-5 h-5 text-purple-500" />,
      multiplier: 0.35,
      target: Math.round((annualExpense / swr) * 0.35),
      sideIncome: monthlyExpense,
      desc: '20代〜30代で「老後資産のための元本」を投資し終え、以後は投資積立をゼロにして、今を生きるための日々の生活費だけを気楽に稼ぐ生き方。',
      techAnalogy: 'バックグラウンド非同期バッチ。一度Queueに入れたら放置で将来完了する。',
    },
  ];

  // 生活費カバーレベル (Lv1〜Lv5)
  const coverLevels = [
    {
      level: 'Lv 1',
      title: '通信費・サブスクが一生無料',
      amount: 4000,
      reqAssets: Math.round((4000 * 12) / swr / 10000), // 万円
      desc: 'スマホ代（格安SIM）や通信費が不労所得で永年無料。初期の自立感覚をインストール。',
    },
    {
      level: 'Lv 2',
      title: '水道光熱費が完全自律化',
      amount: 18000,
      reqAssets: Math.round((18000 * 12) / swr / 10000),
      desc: '電気・ガス・水道のインフラコストが不労所得で自動決済。ライフラインの自給自足。',
    },
    {
      level: 'Lv 3',
      title: '食費・日用品が永久パス',
      amount: 50000,
      reqAssets: Math.round((50000 * 12) / swr / 10000),
      desc: '自炊の食料品や日用品が資産の運用益だけで賄える状態。空腹の恐怖から恒久的に解放。',
    },
    {
      level: 'Lv 4',
      title: '家賃・住居費がタダ',
      amount: 90000,
      reqAssets: Math.round((90000 * 12) / swr / 10000),
      desc: '人生最大の固定費である家賃が不労所得でカバー。住処を失うリスクが実質ゼロに。',
    },
    {
      level: 'Lv 5',
      title: '完全自立FIRE達成',
      amount: monthlyExpense * 10000,
      reqAssets: Math.round(annualExpense / swr),
      desc: '全生活費が資産収入で100%カバー。時間主権を完全に手中に収め、自由世界へ到達。',
    },
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#13151f] p-5 sm:p-7 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-stone-100 dark:border-stone-800/80 gap-3">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
            <Target className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 m-0">
              FIREの工学的諸類型 ＆ 生活費カバーレベル
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              あなたの生活費に応じた各FIREスタイルの必要資産と、段階的自立ステップ。
            </p>
          </div>
        </div>

        {/* タブ切り替え */}
        <div className="flex items-center bg-stone-100 dark:bg-stone-900 p-1 rounded-lg border border-stone-200 dark:border-stone-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('types')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'types'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            5大FIREスタイル
          </button>
          <button
            onClick={() => setActiveTab('levels')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'levels'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            生活費カバーLv1〜5
          </button>
        </div>
      </div>

      {/* 基準生活費スライダー */}
      <div className="mb-6 p-4 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800">
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span className="font-semibold text-stone-700 dark:text-stone-300">
            あなたの想定月間生活費
          </span>
          <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-sm">
            {monthlyExpense} 万円/月（年間 {annualExpense} 万円）
          </span>
        </div>
        <input
          type="range"
          min={15}
          max={60}
          step={1}
          value={monthlyExpense}
          onChange={(e) => setMonthlyExpense(Number(e.target.value))}
          className="w-full accent-rose-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
          <span>月15万 (ミニマム)</span>
          <span>月25万 (標準独身)</span>
          <span>月40万 (ファミリー)</span>
          <span>月60万 (ゆとり)</span>
        </div>
      </div>

      {activeTab === 'types' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fireTypes.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-[#0c0d14] hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {t.icon}
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {t.name}
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-stone-500 block">目標資産額</span>
                  <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                    {t.target.toLocaleString()} 万円
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                {t.desc}
              </p>

              {t.sideIncome > 0 && (
                <div className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded border border-amber-200 dark:border-amber-900/60 mb-2 font-mono">
                  必要労働収入: 月 約{t.sideIncome}万円（週1〜2日程度）
                </div>
              )}

              <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900/80 p-2 rounded">
                <span className="text-blue-600 dark:text-blue-400 font-semibold block">
                  // システム的比喩
                </span>
                {t.techAnalogy}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {coverLevels.map((l) => (
            <div
              key={l.level}
              className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-[#0c0d14] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 shrink-0">
                  {l.level}
                </span>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                    {l.title}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {l.desc}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 font-mono">
                <span className="text-[10px] text-stone-400 block">必要運用資産 (SWR 3.5%)</span>
                <span className="text-sm sm:text-base font-bold text-rose-600 dark:text-rose-400">
                  約 {l.reqAssets.toLocaleString()} 万円
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
