import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Clock, Trash } from 'lucide-react';

interface HistoryItem {
  id: string;
  method: string;
  url: string;
  status: number | null;
  timestamp: number;
}

export default function ApiTester() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}');
  const [body, setBody] = useState('');
  
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('devdock_api_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveHistory = (item: HistoryItem) => {
    const newHistory = [item, ...history].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem('devdock_api_history', JSON.stringify(newHistory));
  };

  const handleSend = async () => {
    if (!url) return;
    setIsLoading(true);
    setResponse(null);
    let status = null;
    let data = null;

    try {
      const parsedHeaders = headers ? JSON.parse(headers) : undefined;
      const t0 = performance.now();
      const res = await fetch(url, {
        method,
        headers: parsedHeaders,
        body: ['GET', 'HEAD'].includes(method) ? undefined : (body || undefined),
      });
      const t1 = performance.now();
      
      status = res.status;
      try {
        data = await res.json();
      } catch (e) {
        data = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        time: Math.round(t1 - t0),
        data
      });
    } catch (error: any) {
      setResponse({
        error: error.message || 'Request failed'
      });
    } finally {
      setIsLoading(false);
      saveHistory({
        id: Math.random().toString(36).substr(2, 9),
        method,
        url,
        status,
        timestamp: Date.now()
      });
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Tester</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Test API endpoints directly from your browser. Set custom headers, bodies, methods, and view your history.
      </p>

      <div className="border border-border bg-card rounded-xl shadow-sm p-4 flex gap-4">
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="bg-muted px-4 py-2 border border-border rounded-md font-semibold text-sm outline-none focus:ring-1 focus:ring-primary"
        >
          {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/v1/users"
          className="flex-1 bg-muted/50 px-4 py-2 border border-border rounded-md font-mono text-sm outline-none focus:ring-1 focus:ring-primary"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
          Send
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[400px] overflow-hidden">
        <div className="flex flex-col gap-4 lg:col-span-1 border-r border-border pr-2 overflow-y-auto">
          {/* History Panel */}
          <div className="text-sm font-semibold uppercase text-muted-foreground flex items-center justify-between">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> History</span>
            <button onClick={() => { setHistory([]); localStorage.removeItem('devdock_api_history'); }} className="hover:text-destructive transition-colors"><Trash className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-col gap-2">
            {history.map(item => (
              <div 
                key={item.id} 
                className="text-xs p-3 border border-border bg-card hover:bg-accent/50 rounded-lg cursor-pointer transition-colors"
                onClick={() => { setMethod(item.method); setUrl(item.url); }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold ${item.method === 'GET' ? 'text-blue-500' : item.method === 'POST' ? 'text-green-500' : item.method === 'DELETE' ? 'text-red-500' : 'text-orange-500'}`}>{item.method}</span>
                  <span className={item.status && item.status < 400 ? 'text-green-500' : 'text-red-500'}>{item.status || 'ERR'}</span>
                </div>
                <div className="truncate text-muted-foreground">{item.url}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:col-span-2 gap-4 h-full">
          <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[200px]">
            <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold">HEADERS (JSON) & BODY</div>
            <div className="flex-1 flex gap-4 p-4">
              <textarea 
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                className="flex-1 w-full bg-transparent resize-none outline-none font-mono text-sm text-muted-foreground placeholder:text-muted-foreground/50 border border-border/50 rounded-md p-2 focus:border-primary"
                placeholder="Headers JSON..."
              />
              {!['GET', 'HEAD'].includes(method) && (
                <textarea 
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="flex-1 w-full bg-transparent resize-none outline-none font-mono text-sm text-muted-foreground placeholder:text-muted-foreground/50 border border-border/50 rounded-md p-2 focus:border-primary"
                  placeholder="Request body..."
                />
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[300px]">
             <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold flex justify-between items-center">
              RESPONSE
              {response && !response.error && (
                <span className="text-xs text-muted-foreground font-mono flex gap-3">
                  <span className={response.status < 400 ? 'text-green-500' : 'text-red-500'}>{response.status} {response.statusText}</span>
                  <span>{response.time}ms</span>
                </span>
              )}
            </div>
            <div className="flex-1 p-4 overflow-auto bg-[#1e1e1e] text-blue-300 font-mono text-sm">
              {response ? (
                response.error ? (
                  <div className="text-red-400">{response.error}</div>
                ) : (
                  <pre>{typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2)}</pre>
                )
              ) : (
                <div className="text-muted-foreground text-center mt-10">Send a request to see the response.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
