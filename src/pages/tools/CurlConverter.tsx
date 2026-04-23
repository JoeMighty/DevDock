import React, { useState } from 'react';
import { Terminal, Copy, Play } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

type OutputMode = 'fetch' | 'axios';

function parseCurl(cmd: string): { url: string; method: string; headers: Record<string, string>; body: string | null } {
  const result = { url: '', method: 'GET', headers: {} as Record<string, string>, body: null as string | null };

  // URL — unquoted or quoted, first non-option argument
  const urlMatch = cmd.match(/curl\s+(?:[^\s-][^\s]*|'[^']*'|"[^"]*")\s*(.*)/s) ||
    cmd.match(/curl\s+(?:.*?\s)(['"]?)(https?:\/\/[^\s'"]+)\1/s);
  const rawUrl = cmd.match(/(?:^|\s)(https?:\/\/[^\s'"]+|'https?:\/\/[^']+?'|"https?:\/\/[^"]+?")/m);
  if (rawUrl) result.url = rawUrl[1].replace(/^['"]|['"]$/g, '');

  // Method
  const methodMatch = cmd.match(/-X\s+(['"]?)(\w+)\1|--request\s+(['"]?)(\w+)\3/);
  if (methodMatch) result.method = (methodMatch[2] || methodMatch[4]).toUpperCase();

  // Headers
  const headerRegex = /-H\s+(['"])(.*?)\1|--header\s+(['"])(.*?)\3/g;
  let hm;
  while ((hm = headerRegex.exec(cmd)) !== null) {
    const hStr = (hm[2] || hm[4]);
    const colon = hStr.indexOf(':');
    if (colon > -1) {
      const key = hStr.slice(0, colon).trim();
      const val = hStr.slice(colon + 1).trim();
      result.headers[key] = val;
    }
  }

  // Body
  const bodyMatch = cmd.match(/(?:--data-raw|--data|-d)\s+(['"])(.*?)\1/s) ||
    cmd.match(/(?:--data-raw|--data|-d)\s+(\$?'(?:[^'\\]|\\.)*')/s);
  if (bodyMatch) {
    result.body = (bodyMatch[2] || bodyMatch[1]).replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
    if (!methodMatch) result.method = 'POST';
  }

  return result;
}

function toFetch({ url, method, headers, body }: ReturnType<typeof parseCurl>): string {
  const headersStr = Object.keys(headers).length
    ? `,\n  headers: {\n${Object.entries(headers).map(([k, v]) => `    '${k}': '${v}'`).join(',\n')}\n  }`
    : '';
  const bodyStr = body ? `,\n  body: ${JSON.stringify(body)}` : '';
  const methodStr = method !== 'GET' ? `,\n  method: '${method}'` : '';
  return `const response = await fetch('${url}', {${methodStr}${headersStr}${bodyStr}\n});\nconst data = await response.json();\nconsole.log(data);`;
}

function toAxios({ url, method, headers, body }: ReturnType<typeof parseCurl>): string {
  const headersStr = Object.keys(headers).length
    ? `,\n  headers: {\n${Object.entries(headers).map(([k, v]) => `    '${k}': '${v}'`).join(',\n')}\n  }` : '';
  const bodyStr = body ? `,\n  data: ${JSON.stringify(body)}` : '';
  return `const { data } = await axios({\n  method: '${method.toLowerCase()}',\n  url: '${url}'${headersStr}${bodyStr}\n});\nconsole.log(data);`;
}

export default function CurlConverter() {
  const [curlInput, setCurlInput] = useState(`curl -X POST 'https://api.example.com/v2/users' \\\n  -H 'Authorization: Bearer token123' \\\n  -H 'Content-Type: application/json' \\\n  -d '{"name": "Alice", "role": "admin"}'`);
  const [mode, setMode] = useState<OutputMode>('fetch');

  const parsed = parseCurl(curlInput);
  const output = mode === 'fetch' ? toFetch(parsed) : toAxios(parsed);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Terminal className="w-6 h-6 text-primary" /> curl → Fetch / Axios
        </h2>
        <button onClick={() => navigator.clipboard.writeText(output)}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors">
          <Copy className="w-4 h-4" /> Copy
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Paste a curl command copied from Postman, an API doc, or your terminal. Instantly converts it to clean <code className="font-mono text-primary bg-primary/10 px-1 rounded">fetch()</code> or <code className="font-mono text-primary bg-primary/10 px-1 rounded">axios</code> JavaScript code.
      </p>
      <CompanionTool to="/tools/api-tester" icon={Play} accent="blue"
        title="Pair with API Tester"
        description="Fire the converted request directly and inspect live JSON responses." />

      <div className="flex gap-2 p-1 bg-muted/30 rounded-lg w-fit border border-border/50">
        {(['fetch', 'axios'] as OutputMode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${mode === m ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[380px]">
        <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm focus-within:border-primary/50 transition-colors">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">curl Command</div>
          <textarea value={curlInput} onChange={e => setCurlInput(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed" spellCheck="false" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-[#1e1e1e] border border-border rounded-xl overflow-hidden shadow-sm flex flex-col flex-1">
            <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-black/20 border-b border-border/50">
              {mode === 'fetch' ? 'fetch() Output' : 'axios Output'}
            </div>
            <textarea readOnly value={output}
              className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed text-blue-300" spellCheck="false" />
          </div>

          {/* Parsed summary */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Parsed Summary</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="text-muted-foreground">Method</div>
              <div className="font-bold text-primary">{parsed.method || '—'}</div>
              <div className="text-muted-foreground">URL</div>
              <div className="truncate font-bold">{parsed.url || '—'}</div>
              <div className="text-muted-foreground">Headers</div>
              <div className="font-bold">{Object.keys(parsed.headers).length} found</div>
              <div className="text-muted-foreground">Body</div>
              <div className="font-bold">{parsed.body ? 'Present' : 'None'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
