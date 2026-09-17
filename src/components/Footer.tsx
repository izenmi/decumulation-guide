import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-[#0c0d14] text-xs text-stone-500 dark:text-stone-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-stone-800 dark:text-stone-200">
              ソフトウェアエンジニアのための資産取り崩しの基本（デキュムレーション編）
            </p>
            <p className="mt-1">
              Inspired by Hayato Ito's "Investing for Software Engineers" (2020)
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://hayatoito.github.io/2020/investing/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>前編: 投資の基本</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="./content/decumulation-guide.md"
              download="decumulation-guide.md"
              className="inline-flex items-center space-x-1 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
            >
              <span>Markdown 正本</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800 text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
          <p>
            本Webサイトおよび本文は、一般的なシステム思考および金融理論の整理を目的としたものであり、特定の金融商品・取引の勧誘や投資助言を提供するものではありません。資産の運用および取り崩しに関する最終決定は、読者ご自身の状況とリスク許容度に応じて自己責任で行ってください。
          </p>
          <p className="mt-2">
            © 2026 Decumulation Guide for Software Engineers. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};
