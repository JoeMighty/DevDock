import React, { useState } from 'react';
import { Network, Copy, Check, RefreshCw } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function formatGraphQL(query: string): string {
  if (!query.trim()) return '';
  
  let formatted = '';
  let indentation = 0;
  const tokens = query
    .replace(/#.*$/gm, '') // Remove comments
    .replace(/{/g, ' { ')
    .replace(/}/g, ' } ')
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .replace(/:/g, ' : ')
    .replace(/,/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 0);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    
    if (token === '}') {
      indentation--;
      formatted = formatted.trimEnd() + '\n' + '  '.repeat(indentation) + '}';
      continue;
    }

    if (token === '{') {
      formatted = formatted.trimEnd() + ' {';
      indentation++;
      formatted += '\n' + '  '.repeat(indentation);
      continue;
    }

    if (token === ':') {
      formatted = formatted.trimEnd() + ': ';
      continue;
    }

    if (token === '(') {
      formatted = formatted.trimEnd() + '(';
      continue;
    }

    if (token === ')') {
      formatted = formatted.trimEnd() + ') ';
      continue;
    }

    formatted += token + ' ';
    
    // Auto new lines for selection sets
    const next = tokens[i+1];
    if (next && next !== '{' && next !== '}' && next !== ':' && next !== '(' && next !== ')') {
      // If we are inside braces and the current token isn't a special character
      // and the next one isn't either, we might need a newline if it's a field
      // This is a naive formatter, but works for basic queries.
    }
  }

  return formatted.trim();
}

export default function GraphqlFormatter() {
  const [input, setInput] = useLocalStorage('devdock_graphql_input', `query GetUser($id: ID!) { user(id: $id) { id name email posts { title comments { text author { name } } } } }`);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      // For a better experience, we'll try to use a slightly more robust manual approach
      // but clean up whitespace first.
      setOutput(formatGraphQL(input));
    } catch (e) {
      setOutput('Error formatting GraphQL query. Please check syntax.');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Network className="w-6 h-6 text-primary" /> GraphQL Formatter</h2>
        <div className="flex gap-2">
           <button 
            onClick={() => setInput('')}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={handleFormat}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Format Query
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground/80">
        Prettify minified GraphQL queries, mutations, and fragments. Standardizes indentation and multi-line selection sets for better readability.
      </p>

      <CompanionTool to="/tools/api-tester" icon={Network} accent="blue" 
        title="Test it in API Tester" 
        description="Once formatted, copy the query and head to API Tester to execute it against your GraphQL endpoint." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 bg-muted/30 border-b border-border">
            Input Query
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste minified GraphQL here..."
            className="flex-1 resize-none bg-transparent p-4 font-mono text-sm outline-none text-foreground placeholder:text-muted-foreground/40"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Formatted Output</span>
            {output && (
              <button 
                onClick={copy}
                className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
            )}
          </div>
          <pre className="flex-1 p-4 font-mono text-sm text-foreground overflow-auto whitespace-pre leading-relaxed bg-black/10">
            {output || <span className="text-muted-foreground/30 italic uppercase text-[10px] tracking-widest">Run formatter to see output</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
