import { TocItem } from '../types';

export const TOC_ITEMS: TocItem[] = [
  {
    id: 'disclaimer',
    title: '免責事項 & 対象読者',
    level: 2,
  },
  {
    id: 'intro',
    title: 'はじめに',
    level: 2,
    subItems: [
      { id: 'intro-solved', title: '資産形成は「解かれた問題」だった', level: 3 },
      { id: 'intro-dynamic-problem', title: '「取り崩し」という動的最適化問題の出現', level: 3 },
    ],
  },
  {
    id: 'chapter-1',
    title: '第1章：なぜ「取り崩し」は積み立てより難しいのか',
    level: 2,
    subItems: [
      { id: 'sorr', title: '1. シーケンス・オブ・リターン・リスク（順序のリスク）', level: 3 },
      { id: 'psychological-bug', title: '2. 感情のバグ（取り崩す恐怖）', level: 3 },
    ],
  },
  {
    id: 'chapter-fire',
    title: '第2章：FIRE（経済的自立）の工学的モデルと状態遷移',
    level: 2,
    subItems: [
      { id: 'fire-definition', title: '1. FIREの本質：時間主権の奪還と不労所得メーター', level: 3 },
      { id: 'fire-architectures', title: '2. 5大FIREシステム・アーキテクチャと生活費カバーレベル', level: 3 },
      { id: 'fire-what-if', title: '3. What-if シミュレーター（行動による加速インパクト）', level: 3 },
      { id: 'fire-lifeplan', title: '4. 生涯資産＆デキュムレーション・ライフプラン', level: 3 },
    ],
  },
  {
    id: 'chapter-2',
    title: '第3章：取り崩しアーキテクチャの基本設計',
    level: 2,
    subItems: [
      { id: 'swr-limits', title: '1. トリニティ・スタディの限界と安全引き出し率', level: 3 },
      { id: 'variable-spending', title: '2. 動的取り崩し（Variable Spending Strategy）', level: 3 },
      { id: 'cash-buffer', title: '3. キャッシュ・バッファ（2層アーキテクチャ）', level: 3 },
    ],
  },
  {
    id: 'chapter-3',
    title: '第4章：日本の制度を活かした「口座別」取り崩しパイプライン',
    level: 2,
    subItems: [
      { id: 'phase-taxable', title: 'Phase 1: 特定口座（課税口座）の優先売却', level: 3 },
      { id: 'phase-nisa', title: 'Phase 2: 新NISA口座の活用と枠復活', level: 3 },
      { id: 'phase-ideco', title: 'Phase 3: 確定拠出年金（DC/iDeCo）と退職金', level: 3 },
    ],
  },
  {
    id: 'chapter-4',
    title: '第5章：公的年金という巨大な終身債券',
    level: 2,
    subItems: [
      { id: 'pension-call-option', title: '1. インフレ連動の終身コールオプション', level: 3 },
      { id: 'pension-deferral', title: '2. 繰り下げ受給の最適化とテイルリスク・ヘッジ', level: 3 },
    ],
  },
  {
    id: 'chapter-5',
    title: '第6章：人生の3ステージと「思い出の配当」',
    level: 2,
    subItems: [
      { id: 'hardware-degradation', title: '1. お金を使う能力の減衰カーブ', level: 3 },
      { id: 'three-stages', title: '2. 老後の3ステージ（Go-Go / Slow-Go / No-Go）', level: 3 },
      { id: 'memory-dividends', title: '3. 思い出の配当（Memory Dividends）の複利計算', level: 3 },
    ],
  },
  {
    id: 'summary',
    title: 'まとめ：人生のメインスレッドに戻るために',
    level: 2,
  },
  {
    id: 'references',
    title: '参考文献・推薦図書',
    level: 2,
  },
];

export const ALL_SECTION_IDS = [
  'disclaimer',
  'intro',
  'intro-solved',
  'intro-dynamic-problem',
  'chapter-1',
  'sorr',
  'psychological-bug',
  'chapter-fire',
  'fire-definition',
  'fire-architectures',
  'fire-what-if',
  'fire-lifeplan',
  'chapter-2',
  'swr-limits',
  'variable-spending',
  'cash-buffer',
  'chapter-3',
  'phase-taxable',
  'phase-nisa',
  'phase-ideco',
  'chapter-4',
  'pension-call-option',
  'pension-deferral',
  'chapter-5',
  'hardware-degradation',
  'three-stages',
  'memory-dividends',
  'summary',
  'references',
];
