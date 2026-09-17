import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language?: string;
  filename?: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = 'typescript',
  filename,
  code,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-6 rounded-xl border border-stone-700/60 bg-[#161821] text-stone-200 overflow-hidden shadow-lg font-mono text-[13px] leading-relaxed">
      <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800 bg-[#12131a] text-xs text-stone-400">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          {filename && <span className="ml-2 font-sans font-medium text-stone-300">{filename}</span>}
        </div>
        <div className="flex items-center space-x-3">
          <span className="uppercase text-[10px] tracking-wider text-stone-400">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-stone-400 hover:text-stone-200 transition-colors py-0.5 px-1.5 rounded hover:bg-stone-800"
            title="コードをコピー"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="!bg-transparent !p-0 !m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
