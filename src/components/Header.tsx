import React from 'react';
import { Sun, Moon, BookOpen, Clock, FileText, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  mobileTocOpen: boolean;
  setMobileTocOpen: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  mobileTocOpen,
  setMobileTocOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-[#0f1117]/90 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <a
              href="#"
              className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors tracking-tight line-clamp-1"
            >
              資産取り崩しの基本 <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 ml-1">デキュムレーション編</span>
            </a>
            <p className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block">
              ソフトウェアエンジニアのための金融工学とシステム設計
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-1.5 text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/60 px-2.5 py-1 rounded-md border border-stone-200/60 dark:border-stone-700/60">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>読了目安: 約18分</span>
          </div>

          <a
            href="./content/decumulation-guide.md"
            download="decumulation-guide.md"
            title="Markdownソースをダウンロード"
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700/60 transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Raw MD</span>
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            className="p-2 rounded-md text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="lg:hidden p-2 rounded-md text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle Table of Contents"
          >
            {mobileTocOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
