import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ReadingProgress } from './components/ReadingProgress';
import { TableOfContents } from './components/TableOfContents';
import { ArticleContent } from './components/ArticleContent';
import { Footer } from './components/Footer';
import { TOC_ITEMS, ALL_SECTION_IDS } from './data/articleContent';
import { ArrowUp, BookOpen, X } from 'lucide-react';

export const App: React.FC = () => {
  // ダークモード初期化（localStorage優先、無ければOS設定）
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeId, setActiveId] = useState<string>('intro');
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // IntersectionObserver によるスクロール追従アクティブ見出し判定
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // 画面上部付近にある要素を探す
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // 最も上部にあるエントリーを選択
        const topEntry = visibleEntries.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
        );
        setActiveId(topEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: [0, 0.2, 0.5, 1],
    });

    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0f1117] text-stone-800 dark:text-stone-200 transition-colors duration-200 flex flex-col font-sans">
      {/* 読書プログレスバー */}
      <ReadingProgress />

      {/* ヘッダー */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileTocOpen={mobileTocOpen}
        setMobileTocOpen={setMobileTocOpen}
      />

      {/* メインコンテナ（本文 + Sticky目次） */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* 本文エリア (lg: 8〜9 カラム) */}
          <div className="lg:col-span-8 xl:col-span-9 max-w-3xl">
            <ArticleContent />
          </div>

          {/* デスクトップ Sticky サイドバー目次 (lg: 4〜3 カラム) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24">
            <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-[#13151f]/70 backdrop-blur-md shadow-xs">
              <TableOfContents items={TOC_ITEMS} activeId={activeId} />
            </div>
          </aside>
        </div>
      </main>

      {/* モバイル 目次 ドロワー */}
      {mobileTocOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileTocOpen(false)}
          />
          <div className="relative ml-auto w-4/5 max-w-sm bg-white dark:bg-[#13151f] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center space-x-2 font-bold text-sm text-stone-900 dark:text-stone-100">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>目次ナビゲーション</span>
                </div>
                <button
                  onClick={() => setMobileTocOpen(false)}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <TableOfContents
                items={TOC_ITEMS}
                activeId={activeId}
                onItemClick={() => setMobileTocOpen(false)}
              />
            </div>

            <div className="pt-6 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500">
              タップで見出しへジャンプします
            </div>
          </div>
        </div>
      )}

      {/* トップへ戻るボタン */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* フッター */}
      <Footer />
    </div>
  );
};
