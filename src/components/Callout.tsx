import React from 'react';
import { AlertTriangle, Info, Lightbulb, Quote, ShieldCheck } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'quote' | 'success';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => {
  const styles = {
    info: {
      border: 'border-blue-300 dark:border-blue-900/60',
      bg: 'bg-blue-50/70 dark:bg-blue-950/20',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />,
      titleColor: 'text-blue-900 dark:text-blue-300',
    },
    warning: {
      border: 'border-amber-300 dark:border-amber-900/60',
      bg: 'bg-amber-50/70 dark:bg-amber-950/20',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
      titleColor: 'text-amber-900 dark:text-amber-300',
    },
    tip: {
      border: 'border-emerald-300 dark:border-emerald-900/60',
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      titleColor: 'text-emerald-900 dark:text-emerald-300',
    },
    success: {
      border: 'border-indigo-300 dark:border-indigo-900/60',
      bg: 'bg-indigo-50/70 dark:bg-indigo-950/20',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />,
      titleColor: 'text-indigo-900 dark:text-indigo-300',
    },
    quote: {
      border: 'border-stone-300 dark:border-stone-700',
      bg: 'bg-stone-100/60 dark:bg-stone-900/40',
      icon: <Quote className="w-5 h-5 text-stone-500 shrink-0" />,
      titleColor: 'text-stone-900 dark:text-stone-200',
    },
  }[type];

  return (
    <div className={`my-6 rounded-xl border ${styles.border} ${styles.bg} p-4 sm:p-5 text-sm leading-relaxed transition-colors`}>
      <div className="flex items-start space-x-3">
        {styles.icon}
        <div className="flex-1 min-w-0">
          {title && (
            <div className={`font-bold mb-1 ${styles.titleColor}`}>
              {title}
            </div>
          )}
          <div className="text-stone-700 dark:text-stone-300 space-y-2 prose-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
