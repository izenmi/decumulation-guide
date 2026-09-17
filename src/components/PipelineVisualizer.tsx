import React, { useState } from 'react';
import { Layers } from 'lucide-react';

export const PipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      name: 'Phase 1: 特定口座（課税口座）',
      target: '課税対象の株式・投信',
      timing: 'リタイア直後 〜 枯渇するまで',
      color: 'blue',
      badge: '最優先売却',
      desc: '将来の運用益に約20.315%が課税され続ける特定口座を真っ先に生活費に充当します。これにより、非課税口座（新NISA）内の資金の非課税複利運用期間を1年でも長く延長し、ポートフォリオ全体の生涯税負担を最小化します。',
      techNote: 'アーキテクチャの原則: 課税リーク（Tax Drag）の発生源を先にパージし、完全非課税環境（NISA/DC）の実行時間を最大化する。',
    },
    {
      step: 2,
      name: 'Phase 2: 新NISA口座',
      target: 'つみたて投資枠・成長投資枠',
      timing: '特定口座の枯渇後',
      color: 'indigo',
      badge: '非課税＆枠復活',
      desc: '生涯非課税枠（1,800万円）内の資産を、必要な分だけ売却します。新NISAの「売却した翌年に簿価ベースで非課税枠が再利用可能になる」という仕様を活かし、必要に応じた現金化や安全資産への再配置をペナルティなしで行います。',
      techNote: 'アーキテクチャの原則: 売却後も枠がガベージコレクションされず翌年再割り当て（Re-allocation）可能な動的メモリプール。',
    },
    {
      step: 3,
      name: 'Phase 3: 確定拠出年金 (DC/iDeCo) & 退職金',
      target: 'iDeCo / 企業型DC / 退職一時金',
      timing: '60歳ロック解除時',
      color: 'emerald',
      badge: '退職所得控除の最大化',
      desc: '60歳で引き出し制限が解除されます。「退職所得控除（20年以下: 40万/年、20年超: 70万/年+800万）」と「1/2課税」という日本最強の税制優遇を活用し、一時金として無税または極めて低い実効税率で安全資産（キャッシュ）として回収します。',
      techNote: '重複排除ルール対策: 会社の退職金とiDeCoの受給順序（前年以前5年・20年ルール）を計算し、控除枠の重複削りを回避。',
    },
    {
      step: 4,
      name: 'Phase 4: 公的年金（繰り下げ受給）',
      target: '国民年金（基礎）＋ 厚生年金',
      timing: '70歳 〜 75歳到達時',
      color: 'purple',
      badge: '終身インフレ連動コールオプション',
      desc: '受給を最大75歳まで繰り下げることで、受給額を生涯+84%（1.84倍）に増額固定。60〜75歳までは自前の資産で生活を賄い、超高齢期は公的年金だけで生活費を100%カバーできる体制を確立。相場暴落や100歳超の長生きリスクを完全に無効化します。',
      techNote: 'リスクヘッジの極致: 民間保険では組成不可能な「国家保証・物価スライド・終身年金」による終末テイルリスクの完全キル。',
    },
  ];

  return (
    <div className="my-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#13151f] p-5 sm:p-7 shadow-sm transition-colors">
      <div className="flex items-center space-x-2 pb-3 mb-5 border-b border-stone-100 dark:border-stone-800/80">
        <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
          <Layers className="w-4 h-4" />
        </span>
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 m-0">
          日本の税制に特化した口座別取り崩しパイプライン
        </h3>
      </div>

      {/* ステップ切り替えナビ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {steps.map((s) => {
          const isSelected = activeStep === s.step;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3 rounded-xl text-left border transition-all duration-200 relative ${
                isSelected
                  ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500/80 dark:border-blue-500/60 shadow-xs'
                  : 'bg-stone-50/70 dark:bg-stone-900/40 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Step {s.step}
                </span>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {s.badge}
                </span>
              </div>
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                {s.name.replace(/^Phase \d+: /, '')}
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択中ステップの詳細 */}
      {(() => {
        const cur = steps[activeStep - 1];
        return (
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-[#0c0d14] p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-stone-200 dark:border-stone-800/80 gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                  Phase {cur.step}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 m-0">
                  {cur.name}
                </h4>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                実行タイミング: <span className="font-semibold text-stone-800 dark:text-stone-200">{cur.timing}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
              {cur.desc}
            </p>

            <div className="rounded-lg bg-stone-100 dark:bg-stone-900/90 p-3 border border-stone-200/70 dark:border-stone-800 text-xs font-mono text-stone-600 dark:text-stone-400">
              <span className="text-blue-600 dark:text-blue-400 font-bold block mb-1">
                // システム設計上のインサイト
              </span>
              {cur.techNote}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
