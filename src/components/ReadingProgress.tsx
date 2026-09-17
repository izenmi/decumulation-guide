import React, { useEffect, useState } from 'react';

export const ReadingProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    // CSS animation-timelineが非対応なブラウザへのフォールバック
    if (!CSS.supports('animation-timeline', 'scroll()')) {
      const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const currentScroll = window.scrollY;
        setScrollPercent(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      id="global-scroll-progress"
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 z-50 pointer-events-none"
      style={
        !CSS.supports('animation-timeline', 'scroll()')
          ? { transform: `scaleX(${scrollPercent / 100})`, transformOrigin: '0 50%' }
          : undefined
      }
    />
  );
};
