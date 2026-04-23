import React, { useState } from 'react';
import { Regex } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function RegexTester() {
  const [pattern, setPattern] = useLocalStorage('devdock_regex_pattern', '');
  const [flags, setFlags] = useLocalStorage('devdock_regex_flags', 'g');
  const [text, setText] = useLocalStorage('devdock_regex_text', 'Type some text here to test your regular expression...');
  
  let regex: RegExp | null = null;
  let error = null;
  
  try {
      if (pattern) {
          regex = new RegExp(pattern, flags);
      }
  } catch (e: any) {
      error = e.message;
  }

  const highlightText = () => {
      if (!regex || !pattern) return text;
      
      const parts = [];
      let lastIndex = 0;
      let match;
      
      // Use clone to prevent infinite loops if global flag missing but while loop runs
      const safeRegex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');

      while ((match = safeRegex.exec(text)) !== null) {
          if (match.index === safeRegex.lastIndex) safeRegex.lastIndex++; // preventative loop break
          
          parts.push(text.substring(lastIndex, match.index));
          parts.push(<mark key={lastIndex} className="bg-primary/30 text-primary-foreground rx-match px-0.5 rounded-sm">{match[0]}</mark>);
          lastIndex = match.index + match[0].length;
      }
      parts.push(text.substring(lastIndex));
      if (parts.length === 1 && !error && pattern) return text; // no matches
      return parts;
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Regex className="w-6 h-6 text-primary" /> Regex Tester</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Test regular expressions instantly. Highlights successful capture matches in the designated text string.
      </p>

      <div className="border border-border bg-card rounded-xl shadow-sm p-4 flex gap-2 items-center">
          <span className="text-muted-foreground text-xl font-mono">/</span>
          <input 
            type="text" 
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            className={`flex-1 bg-muted/50 font-mono px-4 py-2 border rounded-md text-sm outline-none focus:border-primary ${error ? 'border-destructive' : 'border-border'}`}
            placeholder="[A-Z0-9]+"
          />
          <span className="text-muted-foreground text-xl font-mono">/</span>
          <input 
            type="text" 
            value={flags}
            onChange={e => setFlags(e.target.value)}
            className="w-16 bg-muted/50 font-mono px-2 py-2 border border-border rounded-md text-sm outline-none focus:border-primary text-center"
            placeholder="gmi"
          />
      </div>
      
      {error && <div className="text-destructive text-sm font-medium">{error}</div>}

      <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[300px]">
         <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold text-foreground/80">
            TEST STRING
         </div>
         <div className="relative flex-1">
             <textarea 
               value={text}
               onChange={(e) => setText(e.target.value)}
               className="absolute inset-0 w-full h-full bg-transparent p-4 resize-none outline-none font-mono text-sm text-transparent caret-foreground z-10"
               spellCheck="false"
             />
             <div className="absolute inset-0 w-full h-full overflow-hidden p-4 font-mono text-sm text-muted-foreground whitespace-pre-wrap word-break">
                 {highlightText()}
             </div>
         </div>
      </div>
    </div>
  );
}
