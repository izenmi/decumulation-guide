import React from 'react';
import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { InteractiveSim } from './InteractiveSim';
import { PipelineVisualizer } from './PipelineVisualizer';
import { ExternalLink, Terminal } from 'lucide-react';

export const ArticleContent: React.FC = () => {
  return (
    <article className="prose prose-stone dark:prose-invert prose-lg max-w-none">
      {/* 論文風ヘッダー */}
      <div className="not-prose mb-12 pb-8 border-b border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/80 dark:border-blue-900/40 mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>Engineering Systems Design &middot; Decumulation Phase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight mb-4">
          ソフトウェアエンジニアのための<br className="hidden sm:inline" />
          資産取り崩しの基本
        </h1>
        <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
          感情のバグを排除し、破綻確率を極小化しながら人生の効用を最大化するデキュムレーション・アーキテクチャ
        </p>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 text-xs text-stone-500 dark:text-stone-400">
          <div>
            公開: <span className="font-mono text-stone-700 dark:text-stone-300">2026年9月</span>
          </div>
          <div>
            対象: <span className="text-stone-700 dark:text-stone-300">資産形成期を終えつつあるソフトウェアエンジニア</span>
          </div>
          <div>
            原案・着想: <a href="https://hayatoito.github.io/2020/investing/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Hayato Ito (2020)</a>
          </div>
        </div>
      </div>

      {/* 著者注コールアウト */}
      <Callout type="quote" title="著者注">
        本稿は、Hayato Ito 氏の名作エッセイ「
        <a
          href="https://hayatoito.github.io/2020/investing/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline font-medium"
        >
          ソフトウェアエンジニアのための投資の基本 (2020)
        </a>
        」の思想、トーン＆マナー、およびエンジニアリング的アプローチを継承し、資産形成（アキュムレーション）のその先にある「資産取り崩し（デキュムレーション期）」の工学的設計を論じるものです。
      </Callout>

      {/* 免責事項 & 対象読者 */}
      <section id="disclaimer" className="scroll-mt-20">
        <h2>免責事項</h2>
        <p>
          本稿は、投資助言や特定の金融商品・取引の勧誘を目的としたものではありません。筆者は金融の専門家ではなく、1人のソフトウェアエンジニアとして、金融工学や統計的知見、公開されている制度情報を自身のシステム思考に基づいて整理・記述しています。
        </p>
        <p>
          投資および取り崩しの最終判断は、ご自身の責任において行ってください。
        </p>

        <h2>対象読者</h2>
        <ul>
          <li>
            <strong>資産形成（アキュムレーション期）を一通り終えつつある、あるいは FIRE（Financial Independence, Retire Early）を視野に入れているソフトウェアエンジニア。</strong>
          </li>
          <li>
            低コスト全世界インデックスファンドへの長期・積立・分散投資という「解かれた問題」は理解・実践しているが、いざ「どう安全に、かつ後悔なく使い切るか」のアルゴリズムが未定義な人。
          </li>
          <li>
            精神論や相場予測を排し、認知リソースを消費しない堅牢なシステムアーキテクチャとして資産取り崩しを設計したい人。
          </li>
        </ul>
      </section>

      {/* はじめに */}
      <section id="intro" className="scroll-mt-20">
        <h2>はじめに</h2>

        <h3 id="intro-solved">資産形成は「解かれた問題」だった</h3>
        <p>
          前編にあたる「ソフトウェアエンジニアのための投資の基本」で述べられている通り、資産形成（アキュムレーション期）の最適解は、現代の金融工学において実質的に<strong>解かれた問題（Solved Problem）</strong>です。
        </p>
        <p>そのアルゴリズムは極めてシンプルでした：</p>
        <ol>
          <li>生活防衛資金（数ヶ月〜1年分）を現金で確保する。</li>
          <li>残りの余剰資金を、低コストな全世界株式インデックスファンド（例：eMAXIS Slim 全世界株式 / オール・カントリー等）に毎月機械的に投じる。</li>
          <li>何があっても売らず、市場から退場せず、気絶して放置する。</li>
          <li>本業のエンジニアリングに集中し、入金力を高める。</li>
        </ol>
        <p>
          このアルゴリズムの計算量は実質的に <code className="text-blue-600 dark:text-blue-400">$\mathcal&#123;O&#125;(1)$</code> であり、日々の株価チェックも、経済指標の分析も不要です。人間の認知リソースを一切浪費しない「バックグラウンド・デーモン」として完全に自動化できる、極めてエレガントな仕組みでした。
        </p>

        <h3 id="intro-dynamic-problem">「取り崩し」という動的最適化問題の出現</h3>
        <p>
          しかし、十分な資産を築き上げ、いざリタイアや労働の縮小（サイドFIRE / バリスタFIRE等を含む）を迎えようとするとき、私たちは突如としてまったく異なる性質の難問に直面します。
        </p>
        <p>
          それが<strong>資産取り崩し（デキュムレーション: Decumulation）</strong>です。
        </p>
        <p>
          積立期が「初期値ゼロから定率・定額で変数をインクリメントし続けるループ処理」だったとすれば、取り崩し期は「未知の終了条件（死亡時期）、確率的に変動する外部環境（市場リターン・ボラティリティ）、および予測困難な外乱（インフレ・税制改正・医療費）のもとで、変数を安全にデクリメントし続ける<strong>不確実性下の動的最適化問題（Dynamic Optimization Problem under Uncertainty）</strong>」です。
        </p>

        <Callout type="warning" title="取り崩し期における2大破綻モード">
          <p>
            取り崩し期においてエンジニアが直面するリスクは、常に対称な2つの破綻モードを持っています：
          </p>
          <ol className="list-decimal pl-4 space-y-1">
            <li>
              <strong>破綻リスク（Probability of Ruin）</strong>: 資産がゼロになり、生存に必要なキャッシュフローが枯渇する。
            </li>
            <li>
              <strong>過剰遺産リスク（Under-consumption / Dying with Too Much）</strong>: 資産の減少を恐れるあまり過度な倹約を続け、最も健康で効用（ユーティリティ）の高い時期にお金を使えず、巨額の残高を抱えたまま人生のプロセスが終了する。
            </li>
          </ol>
          <p className="mt-2 text-xs">
            前者は明らかなシステム障害ですが、後者もまた「人生の最適化」という観点からは重大なリソース浪費（メモリリーク）に他なりません。
          </p>
        </Callout>

        <p>
          本稿の目的は、感情の介入を徹底的に排除し、破綻確率を極小化しながら「人生の効用を最大化して資産を使い切る」ための、ソフトウェアアーキテクチャとしての取り崩しパイプラインを提示することです。
        </p>
      </section>

      {/* 第1章 */}
      <section id="chapter-1" className="scroll-mt-20">
        <h2>第1章：なぜ「取り崩し」は積み立てより難しいのか</h2>
        <p>
          多くのエンジニアが「取り崩しも積立の逆を実行するだけではないのか？」と考えます。毎月一定額、あるいは一定割合を淡々と売却していけばよいのではないか、と。
        </p>
        <p>
          しかし、そのナイーブな実装は致命的な脆弱性を孕んでいます。その原因は主に2つあります。
        </p>

        <h3 id="sorr">1. シーケンス・オブ・リターン・リスク（順序のリスク: SORR）</h3>
        <p>
          積立投資においては、「ドルコスト平均法」が味方をしてくれました。市場の暴落時（例：リーマンショックやコロナショック）には、同じ投資信託の口数をより安く、大量に仕込むことができるため、将来のリバウンド時のリターンを爆発的に高める「バーゲンセール」として機能しました。
        </p>
        <p>
          しかし、<strong>取り崩し期においては、この力学が完全に逆回転します。</strong>
        </p>
        <p>
          取り崩し期に発生する最も恐ろしい物理法則が、<strong>シーケンス・オブ・リターン・リスク（Sequence of Returns Risk: 順序のリスク）</strong>です。
        </p>

        <h4>数学的証明：積立と取崩の非可換性</h4>
        <p>
          積立期において、投資リターンの「順序」は最終資産額に影響を与えません。掛け算の可換性（<code className="text-stone-700 dark:text-stone-300 font-mono">a &times; b = b &times; a</code>）が保たれるためです。
        </p>
        <p>
          しかし、<strong>「定期的なキャッシュの外部流出（引き出し）」が加わった瞬間、計算順序の可換性は完全に失われます。</strong>
        </p>
        <p>簡単な数値例で示しましょう。</p>
        <ul>
          <li>初期資産: 1億円</li>
          <li>毎年の引き出し額: 400万円（初期資産の4%）</li>
          <li>期間: 3年間</li>
          <li>年間リターン: パターンA（-30% &rarr; 0% &rarr; +30%）、パターンB（+30% &rarr; 0% &rarr; -30%）</li>
        </ul>
        <p>どちらのパターンも、3年間の算術平均リターンはまったく同じ <strong>0%</strong> です。</p>

        <CodeBlock
          filename="sorr_simulation.ts"
          language="typescript"
          code={`// パターンA: 序盤に大暴落が直撃した場合
Year 1: (10,000万円 - 400万円) * (1 - 0.30) = 9,600万円 * 0.70 = 6,720万円
Year 2: (6,720万円 - 400万円) * (1 + 0.00) = 6,320万円 * 1.00 = 6,320万円
Year 3: (6,320万円 - 400万円) * (1 + 0.30) = 5,920万円 * 1.30 = 7,696万円
// 最終資産: 7,696万円

// パターンB: 終盤に大暴落が直撃した場合
Year 1: (10,000万円 - 400万円) * (1 + 0.30) = 9,600万円 * 1.30 = 12,480万円
Year 2: (12,480万円 - 400万円) * (1 + 0.00) = 12,080万円 * 1.00 = 12,080万円
Year 3: (12,080万円 - 400万円) * (1 - 0.30) = 11,680万円 * 0.70 = 8,176万円
// 最終資産: 8,176万円`}
        />

        <p>
          わずか3年間という極めて短いスパンですら、<strong>リターンの出現順序が逆転しただけで、資産残高に約480万円の恒久的な格差</strong>が生まれます。
        </p>
        <p>
          これが30年〜40年といった長期間になると、影響は破滅的になります。取り崩し開始直後の5〜10年間に深刻なベアマーケット（弱気相場）が直撃すると、元本が大きく毀損した状態で生活費のために口数を大量に売却せざるを得なくなります。その結果、その後の市場回復局面でリバウンドを享受するための「基礎体力（保有口数）」そのものが物理的に焼失してしまうのです。
        </p>

        {/* インタラクティブ・シミュレーター埋め込み */}
        <InteractiveSim />

        <h3 id="psychological-bug">2. 感情のバグ（取り崩す恐怖）</h3>
        <p>
          2つ目の問題は、アルゴリズムではなく<strong>人間の生体ファームウェアのバグ</strong>です。
        </p>
        <p>
          エンジニアとして資産形成に成功した人ほど、長年にわたって以下のような思考パターンを自己にインストールしてきました：
        </p>
        <ul>
          <li>支出を最適化し、無駄なサブスクリプションや浪費を極限まで削ぎ落とす。</li>
          <li>給与が振り込まれたら即座にインデックスファンドを自動購入する。</li>
          <li>毎月増えていく証券口座の残高やスプレッドシートのグラフを見てドーパミンを得る。</li>
        </ul>
        <p>
          この規律によって資産を形成した人間にとって、「資産残高が前月より減る」という現象は、脳内で<strong>致命的な例外エラー（System Exception）</strong>として認識されます。
        </p>
        <p>
          ビル・パーキンス氏の著書『DIE WITH ZERO』でも克明に指摘されている通り、現実の統計データにおいて、退職者の大半は資産を使い切るどころか、<strong>退職時よりも資産を増やした状態で死んでいきます。</strong>
        </p>
        <p>
          多くのリタイア者が、死の直前まで「暴落が来たらどうしよう」「長生きしすぎたらどうしよう」という漠然とした恐怖に囚われ、冷暖房をケチり、会いたい人に会いに行かず、行きたい場所へ旅立つ機会を永久に失っています。
        </p>
        <p>
          感情に頼って「今月は少し使おう」などと考えていては、この認知バイアスは打破できません。
          必要なのは、<strong>「あらかじめ定めたルールに従って、淡々と取り崩しを実行する外部プログラム」</strong>です。
        </p>
      </section>

      {/* 第2章 */}
      <section id="chapter-2" className="scroll-mt-20">
        <h2>第2章：取り崩しアーキテクチャの基本設計</h2>
        <p>
          では、どのように取り崩しシステムを設計すべきでしょうか。古典的な理論の限界を検証し、現代的なエンジニアリング・パターンへと昇華させていきます。
        </p>

        <h3 id="swr-limits">1. トリニティ・スタディの限界と安全引き出し率（SWR）</h3>
        <p>
          リタイアメント計画において最も有名なのが、1998年に米トリニティ大学の教授陣によって発表された「トリニティ・スタディ（Trinity Study）」およびそこから導かれた「4%ルール」です。
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-4 text-stone-700 dark:text-stone-300 italic">
          <strong>4%ルール</strong>: 初年度に総資産の4%を引き出し、2年目以降はその額をインフレ率に応じて調整して引き出し続ければ、30年後に資産が残っている確率は約95%である。
        </blockquote>
        <p>
          しかし、ソフトウェアエンジニア、とりわけ30代〜40代で早期リタイアを目指すFIRE志望者がこの4%ルールをそのまま適用することは、<strong>明白な設計ミス</strong>です。理由は以下の通りです：
        </p>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-stone-200 dark:border-stone-800">
            <thead className="bg-stone-100 dark:bg-stone-900/80 text-stone-900 dark:text-stone-100 font-bold">
              <tr>
                <th className="p-3 border border-stone-200 dark:border-stone-800">パラメータ</th>
                <th className="p-3 border border-stone-200 dark:border-stone-800">トリニティ・スタディの前提</th>
                <th className="p-3 border border-stone-200 dark:border-stone-800">早期リタイア（FIRE）の実態</th>
                <th className="p-3 border border-stone-200 dark:border-stone-800">影響と設計指針</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
              <tr>
                <td className="p-3 font-semibold border border-stone-200 dark:border-stone-800">運用期間</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">30年間（65歳リタイア想定）</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800 font-mono text-rose-600 dark:text-rose-400 font-bold">40年〜50年間</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">期間延長に伴い、後半の破綻確率が指数関数的に増大</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border border-stone-200 dark:border-stone-800">株式市場</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">20世紀米国市場（超高成長期）</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">全世界株式 / 今後の低成長見通し</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">期待リターンの過大評価リスクを保守的に補正要</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border border-stone-200 dark:border-stone-800">信託報酬・税金</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">考慮外（Grossリターン）</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800 font-mono">キャピタルゲイン課税 20.315%</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">特定口座売却時の税引き後キャッシュ減少</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border border-stone-200 dark:border-stone-800">支出の柔軟性</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">機械的な固定額＋インフレ調整</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800 font-mono text-emerald-600 dark:text-emerald-400 font-bold">可変（支出抑制が可能）</td>
                <td className="p-3 border border-stone-200 dark:border-stone-800">動的支出コントロールによる生存率改善</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          多くの現代的なモンテカルロ・シミュレーション（Karsten Jeske氏の『Early Retirement Now』等）によれば、<strong>50年におよぶ超長期リタイアメントにおける真の安全引き出し率（Safe Withdrawal Rate: SWR）は、4.0%ではなく「3.0% 〜 3.3%」</strong>です。
        </p>

        <Callout type="tip" title="SWRのエンジニアリング基準値">
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li><strong>伝統的リタイア（期間30年）</strong>: 3.5% 〜 4.0%</li>
            <li><strong>早期リタイア（期間40〜50年・完全FIRE）</strong>: <strong>3.0% 〜 3.3%</strong>（必要資産: 年間支出の30〜33倍）</li>
            <li><strong>準リタイア（サイドFIRE・副収入や公的年金受給あり）</strong>: 3.5% 〜 4.0%</li>
          </ul>
        </Callout>

        <h3 id="variable-spending">2. 動的取り崩し（Variable Spending Strategy）</h3>
        <p>
          しかし、SWRを3.0%まで下げるということは、必要とされる資産目標額（生活費の約33倍）が大幅に跳ね上がることを意味します。
        </p>
        <p>
          そこで導入すべきアーキテクチャが、<strong>動的取り崩し戦略（Variable Spending Strategy）</strong>、とりわけ金融計画で定評のある「ガイトン・クリンガーのガードレール戦略（Guyton-Klinger Guardrails）」をエンジニア向けに簡略化したアルゴリズムです。
        </p>
        <p>
          固定額を引き出し続ける「オープンループ制御」を捨て、ポートフォリオの現在価値をフィードバックする「クローズドループ制御」へと移行します。
        </p>

        <CodeBlock
          filename="guardrail_algorithm.ts"
          language="typescript"
          code={`interface PortfolioState {
  currentNetWorth: number;     // 現在のポートフォリオ総評価額
  baseAnnualBudget: number;     // 基準年間生活費（実質ベース）
  currentWithdrawalRate: number;// 現在の引き出し率 (baseBudget / currentNetWorth)
  initialSWR: number;           // 初期安全引き出し率（例: 0.033 = 3.3%）
}

function calculateAnnualWithdrawal(state: PortfolioState): number {
  const { currentNetWorth, baseAnnualBudget, initialSWR } = state;
  const currentRate = baseAnnualBudget / currentNetWorth;
  
  // アッパー・ガードレール（相場暴落時: 引き出し率が跳ね上がった場合）
  // 初期SWRの1.2倍（例: 3.3% * 1.2 = 3.96%）を超えたら支出を10%カット
  const UPPER_GUARDRAIL = initialSWR * 1.20;
  
  // ロワー・ガードレール（相場好調時: 引き出し率が低下した場合）
  // 初期SWRの0.8倍（例: 3.3% * 0.8 = 2.64%）を下回ったら支出を10%ブースト
  const LOWER_GUARDRAIL = initialSWR * 0.80;

  if (currentRate > UPPER_GUARDRAIL) {
    // サーキットブレーカー発動: 裁量的支出を削減し、元本毀損を物理的に防ぐ
    console.warn("Circuit Breaker Active: Spending reduced by 10% to protect principal.");
    return baseAnnualBudget * 0.90;
  } else if (currentRate < LOWER_GUARDRAIL) {
    // リソース解放: 相場好調に伴い、旅行や体験への支出枠を拡張
    console.info("Buffer Flush: Spending increased by 10% for optimal utility.");
    return baseAnnualBudget * 1.10;
  }

  // ガードレール内であれば基準支出を維持
  return baseAnnualBudget;
}`}
        />

        <p>
          この「相場が悪い時は支出をわずか10%絞り、相場が良い時は10%多く使う」という<strong>わずかな弾力性（Elasticity）</strong>を持たせるだけで、ポートフォリオの30〜50年生存確率は劇的に向上し、必要元本を大幅に削減することが数学的に証明されています。
        </p>

        <h3 id="cash-buffer">3. キャッシュ・バッファ（2層キャッシュ・アーキテクチャ）</h3>
        <p>
          アルゴリズムが優れていても、暴落の最中に株式投信を売却する行為は、精神的に多大な負荷を与えます。
        </p>
        <p>
          そこで、CPUのキャッシュメモリ階層になぞらえた<strong>2層キャッシュ・アーキテクチャ</strong>を構築します。
        </p>

        <div className="not-prose my-6 p-5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100/70 dark:bg-stone-900/60 font-mono text-xs sm:text-sm space-y-4">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
            <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>[ L1 キャッシュ: 即時引き出し口座 ]</span>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-stone-700 dark:text-stone-300">
              <li>構成: 普通預金 / 個人向け国債 変動10年</li>
              <li>規模: 生活費の <strong>2〜3 年分</strong>（例: 600万〜1,000万円）</li>
              <li>役割: 日常の生活費出金。ボラティリティゼロ。</li>
            </ul>
          </div>

          <div className="flex justify-center text-stone-400">
            &uarr; 年1回のリバランス・リフィル（市場好調時のみ補充）
          </div>

          <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900">
            <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>[ L2 メインストレージ: リスクアセット ]</span>
            </div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-stone-700 dark:text-stone-300">
              <li>構成: 全世界株式インデックスファンド（オルカン等）</li>
              <li>規模: ポートフォリオの残りの全額</li>
              <li>役割: インフレヘッジおよび長期キャピタルゲインの獲得。</li>
            </ul>
          </div>
        </div>

        <ul>
          <li>
            <strong>平常時</strong>: 毎年の生活費はL1キャッシュから引き出す。年1回、ポートフォリオのリバランス時に、好調な株式を売却してL1キャッシュを満杯にリフィル（補充）する。
          </li>
          <li>
            <strong>大暴落時（ベアマーケット）</strong>: <strong>L2からの売却を完全に停止する</strong>。L1キャッシュに蓄えられた2〜3年分の現金のみで生活を賄い、株式市場が自律回復するまでじっと待機する。
          </li>
        </ul>
        <p>
          歴史上、ほとんどの弱気相場（ドットコムバブル崩壊、リーマンショック等）は、谷底から2〜3年以内に底打ちして回復軌道に乗っています。
          生活費2〜3年分のキャッシュ・バッファは、<strong>「暴落期における強制的な売却」を物理的に遮断するエアギャップ（物理的隔離）</strong>として機能します。
        </p>
      </section>

      {/* 第3章 */}
      <section id="chapter-3" className="scroll-mt-20">
        <h2>第3章：日本の制度を活かした「口座別」取り崩しパイプライン</h2>
        <p>
          米国の文献（Trinity StudyやBogleheads）では「401(k)」「Roth IRA」「Traditional IRA」の取り崩し順序が論じられますが、日本居住者のエンジニアは<strong>日本の税制（特定口座・新NISA・iDeCo・退職金）に最適化されたパイプライン</strong>を実装しなければなりません。
        </p>
        <p>
          目標関数は明白です：<strong>「生涯支払税額の最小化」および「非課税複利効果の最大化」</strong>です。
        </p>

        {/* パイプライン・ビジュアライザ埋め込み */}
        <PipelineVisualizer />

        <h3 id="phase-taxable">1. 第1フェーズ：特定口座（課税口座）の優先売却</h3>
        <p>
          直感に反するかもしれませんが、<strong>課税口座（特定口座）にある資産を、非課税口座（新NISA）よりも先に売却する</strong>のが数学的に正しいアプローチです。
        </p>
        <p>理由は極めて単純です：</p>
        <ul>
          <li>非課税口座内の資産は、生み出される将来のリターン（キャピタルゲイン・配当）に対して<strong>永久に税率0%</strong>が適用されます。</li>
          <li>一方、特定口座内の資産は、将来得られる利益に対して常に約20.315%の課税が発生します。</li>
          <li>したがって、<strong>最も非課税メリットの大きい新NISA口座の複利運用期間を1年でも長く引き延ばし、特定口座の残高を先に圧縮して生活費に充当する</strong>ことが、ポートフォリオ全体の生涯税引後リターンを最大化します。</li>
        </ul>

        <h3 id="phase-nisa">2. 第2フェーズ：新NISA口座の活用と枠復活</h3>
        <p>
          特定口座の資産を使い切った後、いよいよ新NISA口座からの取り崩しを開始します。
        </p>
        <p>
          新NISAの画期的な仕様は、<strong>「商品を売却した場合、その簿価（取得価額）分の非課税投資枠が翌年に復活する」</strong>という点です（生涯投資枠1,800万円の上限内）。
        </p>
        <p>この仕様は、デキュムレーション期において強力なリバランス・ツールとなります：</p>
        <ul>
          <li>必要最小限の生活費分だけを毎月・毎年売却する。</li>
          <li>もし相場の急変等で資産クラスの配分を見直したい場合、売却しても翌年には枠が再利用可能となるため、「非課税枠を失うペナルティ」なしにポートフォリオの組み換えや安全資産へのシフトが可能になります。</li>
        </ul>

        <h3 id="phase-ideco">3. 第3フェーズ：確定拠出年金（DC/iDeCo）と退職金</h3>
        <p>
          確定拠出年金（iDeCo・企業型DC）は、原則60歳まで引き出しがロックされる<strong>強制HODL機構</strong>です。このロックが解除される60歳以降の受取設計は、日本の税法上、最もレバレッジの効く最適化ポイントです。
        </p>

        <h4>退職所得控除の二重取り・重複排除ルール</h4>
        <p>一時金として受け取る場合、「退職所得控除」が適用されます：</p>
        <ul>
          <li>勤続年数（iDeCo加入年数）20年以下: <strong>1年あたり40万円</strong></li>
          <li>勤続年数（iDeCo加入年数）20年超: <strong>1年あたり70万円 ＋ 800万円</strong></li>
        </ul>
        <p>
          さらに、控除後の残額に <strong>&times; 1/2</strong> を乗じた金額のみが課税対象となるという、日本の税制において最も手厚い優遇措置です。
        </p>
        <p>ここで注意すべきは、会社の退職金とiDeCo一時金の受給時期に関する税制上の「重複排除ルール」です：</p>
        <ul>
          <li>
            <strong>会社の退職金を先に受け取る場合</strong>: iDeCo一時金を後から受け取る際、前回の退職金受給から<strong>20年</strong>空いていないと、勤続年数の重複部分の控除が削られます。
          </li>
          <li>
            <strong>iDeCo一時金を先に受け取る場合</strong>: 会社の退職金を後から受け取る際、前回のiDeCo受給から<strong>5年</strong>空いていれば、退職所得控除の再利用が可能（※税制改正の動向に留意要）。
          </li>
        </ul>
        <p>
          アーリーリタイアしたエンジニアの場合、会社退職から60歳到達までに十分な年数が経過しているケースが多く、iDeCo受給時に満額の退職所得控除を適用して<strong>実質無税で数百万円〜数千万円のキャッシュを安全資産として回収</strong>することが可能です。
        </p>
      </section>

      {/* 第4章 */}
      <section id="chapter-4" className="scroll-mt-20">
        <h2>第4章：公的年金（厚生年金・基礎年金）という巨大な終身債券</h2>
        <p>
          FIREや早期リタイアを志向するエンジニアの間で、最も過小評価されているシステムコンポーネントが<strong>「日本の公的年金制度（国民年金・厚生年金）」</strong>です。
        </p>
        <p>
          ネット上の雑音では「年金崩壊論」が語られがちですが、年金の構造を工学的に分解すれば、これほど個人投資家に有利な金融商品は民間の保険会社では絶対に組成できないことが分かります。
        </p>

        <h3 id="pension-call-option">1. 公的年金の正体：インフレ連動の「終身コールオプション」</h3>
        <p>
          公的年金を「利回りの悪い投資」と捉えるのは根本的なカテゴリ・エラーです。年金は投資ではなく、<strong>長生きリスクに対する保険（インシュアランス）</strong>です。
        </p>
        <ul>
          <li><strong>終身性（Lifetime Payout）</strong>: 自分が何歳まで生きようが（90歳、100歳、110歳）、死亡するその月まで支給が途絶えない。</li>
          <li><strong>インフレ連動性</strong>: マクロ経済スライドによる微調整はあるものの、名目額が物価水準にスライドして改定される。</li>
          <li><strong>破綻耐性</strong>: 国家の徴税権と通貨発行権に裏打ちされた最高格付けのキャッシュフロー。</li>
        </ul>
        <p>
          ポートフォリオの観点から言えば、公的年金は<strong>「死ぬまで確実にクーポンを支払い続ける、インフレ耐性付きの巨大な終身国債」</strong>をあらかじめ保有している状態と等価です。
        </p>

        <h3 id="pension-deferral">2. 繰り下げ受給というノーリスク・ハイリターンの最適化</h3>
        <p>
          公的年金の受給開始時期は、標準の65歳から、60歳〜75歳までの間で1ヶ月単位で選択可能です。
        </p>
        <p>
          ここで適用される増額率は驚異的です：
        </p>
        <div className="not-prose my-4 p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center font-mono text-sm sm:text-base">
          増額率 ＝ (受給開始月 &minus; 65歳0ヶ月) &times; 0.7% / 月
        </div>
        <p>
          70歳まで5年間繰り下げると<strong>+42%</strong>、上限の75歳まで10年間繰り下げると<strong>+84%（1.84倍）</strong>の年金額が、<strong>死ぬまで生涯固定</strong>されます。
        </p>

        <div className="not-prose my-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center font-mono">
          <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="text-stone-500">60歳（繰り上げ）</div>
            <div className="text-sm font-bold text-rose-600 dark:text-rose-400 mt-1">76.0% (&minus;24%)</div>
          </div>
          <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="text-stone-500">65歳（基準）</div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-1">100.0% (&plusmn;0%)</div>
          </div>
          <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="text-stone-500">70歳（繰り下げ）</div>
            <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">142.0% (+42%)</div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
            <div className="text-blue-600 dark:text-blue-400 font-bold">75歳（最大繰下げ）</div>
            <div className="text-sm font-bold text-blue-700 dark:text-blue-300 mt-1">184.0% (+84%)</div>
          </div>
        </div>

        <p>
          年利8.4%（単利換算）で、日本政府が裏付けを持つ終身インフレ連動キャッシュフローを買い増せる金融商品は、地球上のどこを探しても存在しません。
        </p>

        <h4>損益分岐点思考を捨て、テイルリスク・ヘッジとして捉える</h4>
        <p>
          よくある反論に「75歳まで繰り下げて、76歳で死んだら損をするではないか（損益分岐点は86歳前後）」という損益分岐点論があります。
        </p>
        <p>
          しかし、これもまた確率論的思考の誤りです：
        </p>
        <ul>
          <li>
            <strong>早く死んだ場合</strong>: 損益分岐点を下回っても、そもそも本人はすでに死亡しており、残された資産を使う必要もありません。早期死亡時のキャッシュ不足はリスクになり得ないのです。
          </li>
          <li>
            <strong>100歳まで長生きした場合</strong>: 本来であれば資産が枯渇する最大のリスク（Longevity Risk: 長生きリスク）ですが、75歳繰り下げによって1.84倍にブーストされた年金が毎月ノーリスクで振り込まれ続けるため、<strong>市場の相場環境に一切依存せず、餓死することが数学的に不可能</strong>になります。
          </li>
        </ul>
        <p>
          エンジニアのポートフォリオ設計において、<strong>「年金は70〜75歳まで繰り下げ、60〜75歳の間は自前のポートフォリオを取り崩して生活を支える」</strong>というアーキテクチャが、最も破綻確率を低減させる最適解となります。
        </p>
      </section>

      {/* 第5章 */}
      <section id="chapter-5" className="scroll-mt-20">
        <h2>第5章：人生の3ステージと「思い出の配当（Memory Dividends）」</h2>
        <p>
          最後に、金融工学の数式を超えた<strong>「人間というハードウェアの制約」</strong>について論じます。
        </p>

        <h3 id="hardware-degradation">1. お金を使う能力の減衰カーブ</h3>
        <p>
          資産取り崩しアルゴリズムにおいて、最も見落とされがちな変数が<strong>「健康・身体能力・意欲の減衰（Degradation of Hardware）」</strong>です。
        </p>
        <p>
          20代・30代のエンジニアは、10万円の予算があればバックパック一つで世界中を旅し、徹夜でハッカソンに参加し、強烈な体験を得ることができます。
          しかし、70代・80代になったとき、同じ10万円で得られる体験の振幅や感動の解像度は、身体の衰えや消化機能の低下、認知機能の変化によって不可逆的に縮小します。
        </p>
        <p>
          お金の価値は一定でも、<strong>「お金を人生の幸福・体験に変換する変換効率（ユーティリティ交換レート）」は、加齢とともに単調減少</strong>していきます。
        </p>

        <h3 id="three-stages">2. 老後の3ステージ（Go-Go / Slow-Go / No-Go）</h3>
        <p>
          FP（ファイナンシャル・プランニング）の世界では、リタイア後の人生を3つのフェーズに分割してモデル化します：
        </p>

        <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#13151f] shadow-xs">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-sm mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>1. Go-Go Years</span>
            </div>
            <div className="text-xs text-stone-500 font-mono mb-2">60代〜70歳頃（活動期）</div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              身体は頑健で、活動意欲も旺盛。旅行、趣味、社交、住環境の整備など支出は高水準。体験への投資を最大化すべき黄金期。ここでお金を惜しむのは最大のバグ。
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#13151f] shadow-xs">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>2. Slow-Go Years</span>
            </div>
            <div className="text-xs text-stone-500 font-mono mb-2">70代〜80歳頃（減速期）</div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              体力の低下が自覚され、長時間の移動や刺激的なアクティビティが困難に。近場での食事、散歩、知的な読書や思索へとシフトし、生活費は自然と減少。
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#13151f] shadow-xs">
            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-bold text-sm mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>3. No-Go Years</span>
            </div>
            <div className="text-xs text-stone-500 font-mono mb-2">80代以降（維持期）</div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              行動範囲が自宅や医療施設に限定。娯楽費はほぼゼロ、医療・介護費が主支出に。繰り下げた公的年金＋キャッシュバッファで完全自律稼働。
            </p>
          </div>
        </div>

        <p>
          もしあなたが「30年間にわたって毎年均等に400万円を使う」というフラットな取り崩しモデルを設計しているなら、それは人間の生理的現実に適合していません。
        </p>
        <p>
          <strong>最も活動できるGo-Go期に手厚く配分し、Slow-Go / No-Go期には自然と支出が落ちていく「フロントローディング型」の支出曲線</strong>を設計することが、人生全体の効用を最大化します。
        </p>

        <h3 id="memory-dividends">3. 思い出の配当（Memory Dividends）の複利計算</h3>
        <p>
          ビル・パーキンス氏が提唱した重要な概念に「<strong>思い出の配当（Memory Dividends）</strong>」があります。
        </p>
        <p>
          若い時期、あるいは健康な活動期に素晴らしい体験（友人との旅行、未知の文化への接触、挑戦的な創作活動）に投じたお金は、その瞬間一度きりで消費されて終わるわけではありません。
        </p>
        <p>
          その後の人生において、友人とその思い出を語り合ったり、写真を振り返ったり、その体験によって培われた価値観で世界を眺めるたびに、<strong>生涯にわたって心理的な「配当」を支払い続けます。</strong>
        </p>
        <p>
          金融資産の複利効果と同じように、<strong>「体験の複利効果」もまた、人生の早い段階で投下するほど、配当を受け取れる年数が長くなります。</strong>
        </p>
        <p>
          80歳になってから1,000万円を使ってファーストクラスに乗っても、その思い出の配当を受け取れる期間は残りわずかです。しかし、40代・50代で投じた体験は、その後の数十年間にわたって人生を豊かに彩り続けます。
        </p>
        <p>
          ポートフォリオの一部（例：年間予算の10〜20%）を、「体験専用バケツ（Experience Sinking Fund）」として最初から隔離し、「この枠は使い切らなければペナルティ」として心理的強制力を持たせることが、感情のバグを克服する実践的アプローチです。
        </p>
      </section>

      {/* まとめ */}
      <section id="summary" className="scroll-mt-20">
        <h2>まとめ：人生のメインスレッドに戻るために</h2>
        <p>本稿で提示した取り崩しアーキテクチャの要点をまとめます：</p>

        <div className="not-prose my-6 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#13151f]">
          <ol className="space-y-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            <li className="flex items-start space-x-2">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">1.</span>
              <span><strong>前提の更新</strong>: 30〜50年の超長期リタイアにおける安全引き出し率（SWR）は <strong>3.0% 〜 3.3%</strong> を基準とする。</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">2.</span>
              <span><strong>動的制御の導入</strong>: 相場急落時には10%支出を絞り、好調時には10%拡大する<strong>ガードレール戦略</strong>で、生存率と効用のバランスを取る。</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">3.</span>
              <span><strong>2層キャッシュ</strong>: <strong>2〜3年分の生活費を普通預金・個人向け国債（L1）として隔離</strong>し、暴落時の強制売却を物理的に防ぐ。</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">4.</span>
              <span><strong>税制最適化パイプライン</strong>: <strong>特定口座（課税） &rarr; 新NISA（非課税） &rarr; iDeCo/退職金</strong> の順で取り崩し、非課税複利期間を極限まで引き延ばす。</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">5.</span>
              <span><strong>公的年金の活用</strong>: 年金を「インフレ連動の終身債券」と位置づけ、<strong>70〜75歳へ繰り下げて長生きリスクを完全に無効化</strong>する。</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">6.</span>
              <span><strong>思い出の配当の最大化</strong>: 人間のハードウェア減衰を前提に、<strong>Go-Go期に体験への投資をフロントローディング</strong>する。</span>
            </li>
          </ol>
        </div>

        <h3>資産はスコアではなく、リソースである</h3>
        <p>
          私たちソフトウェアエンジニアは、性能指標のグラフを右肩上がりに伸ばし続けること、カウンタの数値を増やすことに知的な快感を覚える生き物です。
        </p>
        <p>
          しかし、銀行口座や証券口座に表示される数字は、ゲームのハイスコアではありません。
          それは、あなたの有限な人生の時間、健康、知的好奇心を、現実世界の豊かな経験や大切な人との時間へとコンパイルするための<strong>「計算資源（Compute Resource）」</strong>に過ぎません。
        </p>
        <p>
          どれほど優れたアーキテクチャを組んでも、プログラムが終了（プロセスがKill）した後にメモリに残された資源は、すべて破棄されます。
        </p>
        <p>
          一度堅牢な取り崩しパイプラインを設計・実装したら、日々の株価チャートを監視するのはやめましょう。
          システムをバックグラウンドで静かに稼働させ、ブラウザのタブを閉じ、あなた自身の人生のメインスレッドに全力で復帰してください。
        </p>
      </section>

      {/* 参考文献 */}
      <section id="references" className="scroll-mt-20">
        <h2>参考文献・推薦図書</h2>
        <ul>
          <li>
            <strong>Hayato Ito</strong> -{' '}
            <a
              href="https://hayatoito.github.io/2020/investing/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
            >
              <span>ソフトウェアエンジニアのための投資の基本</span>
              <ExternalLink className="w-3 h-3 inline" />
            </a>{' '}
            (2020)
          </li>
          <li>
            <strong>Bill Perkins</strong> - 『DIE WITH ZERO 人生が豊かになりすぎる究極のルール』 (ダイヤモンド社, 2020)
          </li>
          <li>
            <strong>Karsten Jeske (Big ERN)</strong> -{' '}
            <a
              href="https://earlyretirementnow.com/safe-withdrawal-rate-series/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-1"
            >
              <span>The Ultimate Guide to Safe Withdrawal Rates</span>
              <ExternalLink className="w-3 h-3 inline" />
            </a>{' '}
            (Early Retirement Now)
          </li>
          <li>
            <strong>Jonathan Guyton and William J. Klinger</strong> - "Using Decision Rules to Create Retirement Strategies" (<em>Journal of Financial Planning</em>, 2006)
          </li>
          <li>
            <strong>Philip L. Cooley, Carl M. Hubbard and Daniel T. Walz</strong> - "Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable" (<em>Trinity Study</em>, 1998)
          </li>
          <li>
            <strong>山崎元</strong> - 『図解・最新 難しいことはわかりませんが、お金の増やし方を教えてください！』 (文響社)
          </li>
        </ul>
      </section>
    </article>
  );
};
