import React, { useState } from 'react';
import { AlignLeft, Copy, RefreshCw } from 'lucide-react';

const WORDS = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'labore', 'dolore', 'magna', 'aliqua', 'enim', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim'];

const rand = () => WORDS[Math.floor(Math.random() * WORDS.length)];
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const genSentence = () => {
  const len = Math.floor(Math.random() * 10) + 5;
  const words = Array.from({ length: len }, rand);
  return `${capitalize(words[0])} ${words.slice(1).join(' ')}.`;
};

const genParagraph = () => {
  const count = Math.floor(Math.random() * 4) + 3;
  return Array.from({ length: count }, genSentence).join(' ');
};

export default function LoremIpsum() {
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');

  const generate = () => {
    let result = '';
    if (type === 'words') result = Array.from({ length: count }, rand).join(' ');
    else if (type === 'sentences') result = Array.from({ length: count }, genSentence).join(' ');
    else result = Array.from({ length: count }, genParagraph).join('\n\n');
    setOutput(result);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><AlignLeft className="w-6 h-6 text-primary" /> Lorem Ipsum Generator</h2>
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40">
          <Copy className="w-4 h-4" /> Copy
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Generate classic Lorem Ipsum placeholder content for UI prototyping. Choose words, sentences, or full paragraphs.
      </p>

      <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Type</label>
          <div className="flex gap-2 p-1 bg-muted/30 rounded-lg border border-border/50 w-fit">
            {(['words', 'sentences', 'paragraphs'] as const).map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${type === t ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Count</label>
          <div className="flex items-center gap-3">
            <input type="range" min={1} max={type === 'words' ? 200 : type === 'sentences' ? 20 : 10} value={count} onChange={e => setCount(Number(e.target.value))} className="flex-1 accent-primary" />
            <span className="text-sm font-bold font-mono text-primary w-8 text-center">{count}</span>
          </div>
        </div>
        <button onClick={generate} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all whitespace-nowrap">
          <RefreshCw className="w-4 h-4" /> Generate
        </button>
      </div>

      <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="text-xs font-bold text-muted-foreground uppercase px-5 py-3 bg-muted/30 border-b border-border">Generated Output</div>
        {output ? (
          <textarea readOnly value={output} className="flex-1 w-full bg-transparent p-5 resize-none outline-none text-sm leading-relaxed text-foreground/90" />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select options and click Generate.</div>
        )}
      </div>
    </div>
  );
}
