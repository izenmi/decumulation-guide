# ソフトウェアエンジニアのための資産取り崩しの基本（デキュムレーション編）

> Hayato Ito 氏のエッセイ「[ソフトウェアエンジニアのための投資の基本](https://hayatoito.github.io/2020/investing/)」の思想とトーン＆マナーを完全に継承した、資産取り崩し（デキュムレーション期）に特化したWebサイト・エッセイです。

---

## 概要

資産形成（アキュムレーション期）は、低コスト全世界株式インデックスファンドへの積立・放置という「$\mathcal{O}(1)$ の解かれた問題」でした。
しかし、FIREや退職後の「資産取り崩し」は、未知の寿命と市場の変動に直面する**不確実性下の動的最適化問題**です。

本プロジェクトは、感情のバグを仕組みで排除し、破綻確率を極小化しながら人生の効用を最大化するデキュムレーション・アーキテクチャを、詳細な日本語テキストと対話型シミュレーターによって提供します。

## 主要機能 & 特徴

- **理性的・論理的な完全書き下ろしエッセイ**:
  - シーケンス・オブ・リターン・リスク（順序のリスク: SORR）の数学的証明
  - 感情のバグ（取り崩す恐怖 / DIE WITH ZEROの課題意識）の解剖
  - トリニティ・スタディの限界と安全引き出し率（3.0〜3.3%）
  - ガイトン・クリンガーの動的ガードレール戦略（サーキットブレーカー）
  - 2層キャッシュ・アーキテクチャ（生活費2〜3年分のL1現金バッファによる強制売却の物理遮断）
  - 日本の制度に特化した口座別パイプライン（特定口座 &rarr; 新NISA &rarr; iDeCo/退職金）
  - 公的年金（厚生年金・基礎年金）を「インフレ連動終身債券（生涯コールオプション）」として70〜75歳へ繰り下げるリスクヘッジ
  - 人生の3ステージ（Go-Go / Slow-Go / No-Go）と思い出の配当（Memory Dividends）の最大化
- **対話型シミュレーター**:
  - 初期資産・生活費スライダー連動
  - 同一平均リターン下での「序盤暴落」vs「終盤暴落」の破綻比較ビジュアライザ
  - 動的ガードレール（サーキットブレーカー）のON/OFF切り替え
- **インタラクティブなパイプライン図**:
  - 日本の税制（特定口座・新NISA・iDeCo・公的年金）の最適化手順をステップ別に解説
- **ミニマルで美しいタイポグラフィ & UX**:
  - Tailwind CSS Typography による快適な長文読書体験
  - ダークモード / ライトモード対応（OS設定追従 + 手動切り替え永続化）
  - スクロール追従 Sticky 目次（現在位置の自動ハイライト）
  - 読書プログレスバー（CSS Scroll-driven animations + JSフォールバック）
  - シンタックスハイライト付きコードブロック（コピー機能付き）
  - 正本Markdownファイルのダウンロード対応

---

## ディレクトリ構成

```
decumulation-guide/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── content/
│   └── decumulation-guide.md       # 本文の正本Markdown（GitHub等で直接閲覧可能）
├── public/
│   └── content/
│       └── decumulation-guide.md   # 配信用Raw Markdown
├── src/
│   ├── main.tsx
│   ├── App.tsx                     # 2カラムレイアウト（本文 + 目次）
│   ├── index.css                   # スタイル・スクロールアニメーション
│   ├── types.ts                    # 型定義
│   ├── data/
│   │   └── articleContent.ts       # 目次・セクションデータ
│   └── components/
│       ├── Header.tsx              # ナビゲーション・テーマ切替・読了時間
│       ├── TableOfContents.tsx     # スクロール追従Sticky目次
│       ├── ReadingProgress.tsx     # 読書進捗バー
│       ├── ArticleContent.tsx      # 本文レンダリング
│       ├── InteractiveSim.tsx      # 順序リスク（SORR）シミュレーター
│       ├── PipelineVisualizer.tsx  # 口座別取り崩しパイプライン図
│       ├── CodeBlock.tsx           # コードブロック（コピー機能付き）
│       ├── Callout.tsx             # 警告・引用・Tipsコールアウト
│       └── Footer.tsx              # クレジット・ライセンス・免責事項
└── dist/                           # 静的ビルド成果物（そのままデプロイ可能）
```

---

## 開発とビルド

### 開発サーバー起動
```bash
npm run dev
```

### プロダクションビルド
```bash
npm run build
```
ビルド成果物は `dist/` ディレクトリに出力されます。相対パス（`./`）で構成されているため、GitHub Pages、Cloudflare Pages、Vercel、S3、またはローカルのWebサーバーへそのまま配置して公開可能です。

### ビルド成果物のプレビュー
```bash
npm run preview
```

---

## ライセンス & クレジット

- 本プロジェクトは、Hayato Ito 氏のエッセイ「[ソフトウェアエンジニアのための投資の基本](https://hayatoito.github.io/2020/investing/)」に最大限のリスペクトを込めて制作されたオマージュ・続編エッセイです。
- 本コンテンツは教育・情報提供を目的としています。
