import React, { useEffect, useState } from 'react';
import { TocItem } from '../types';
import { ListTree, Compass } from 'lucide-react';

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string;
  onItemClick?: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeId,
  onItemClick,
}) => {
  const [readingPercent, setReadingPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100)));
      setReadingPercent(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (onItemClick) onItemClick(id);
    }
  };

  return (
    <nav className="w-full text-sm font-sans" aria-label="Table of Contents">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-semibold tracking-tight text-xs uppercase">
          <ListTree className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>目次 (Table of Contents)</span>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-stone-500 dark:text-stone-400 font-mono">
          <Compass className="w-3.5 h-3.5 text-blue-500" />
          <span>{readingPercent}%</span>
        </div>
      </div>

      <div className="w-full bg-stone-200/70 dark:bg-stone-800/60 h-1.5 rounded-full overflow-hidden mb-5">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-150"
          style={{ width: `${readingPercent}%` }}
        />
      </div>

      <ul className="space-y-1.5 max-h-[calc(100vh-14rem)] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isH3 = item.level === 3;

          return (
            <li
              key={item.id}
              className={`${isH3 ? 'ml-4 text-xs' : 'font-medium text-xs sm:text-sm'} transition-colors`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-1.5 px-2.5 rounded-md transition-all duration-200 leading-snug ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-semibold border-l-2 border-blue-600 dark:border-blue-400 pl-2'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/40'
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
