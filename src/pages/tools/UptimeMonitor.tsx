import React, { useState, useEffect } from 'react';
import { Clock, Plus, RefreshCw, Trash, Activity } from 'lucide-react';

interface Monitor {
  id: string;
  url: string;
  name: string;
  status: 'up' | 'down' | 'pending';
  lastChecked: number | null;
  responseTime: number | null;
  history: ('up'|'down')[];
}

export default function UptimeMonitor() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('devdock_uptime_monitors');
    if (saved) {
        try { setMonitors(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveMonitors = (newMonitors: Monitor[]) => {
      setMonitors(newMonitors);
      localStorage.setItem('devdock_uptime_monitors', JSON.stringify(newMonitors));
  };

  const addMonitor = () => {
      if (!newUrl) return;
      try { new URL(newUrl); } catch { alert('Invalid URL'); return; }

      const mon: Monitor = {
          id: Math.random().toString(36).substr(2, 9),
          url: newUrl,
          name: newName || new URL(newUrl).hostname,
          status: 'pending',
          lastChecked: null,
          responseTime: null,
          history: [],
      };
      saveMonitors([...monitors, mon]);
      setNewUrl('');
      setNewName('');
      checkMonitor(mon.id, [...monitors, mon]);
  };

  const checkMonitor = async (id: string, currentMonitors: Monitor[]) => {
      const ms = [...currentMonitors];
      const i = ms.findIndex(m => m.id === id);
      if (i < 0) return;

      ms[i].status = 'pending';
      setMonitors([...ms]); // trigger re-render to state pending

      const target = ms[i].url;
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(target)}`;
      const t0 = performance.now();
      let isUp = false;
      let rt = null;

      try {
          // Send no-cache to bypass proxy cache if possible, though browser handles this mostly
          const res = await fetch(proxyUrl, { cache: 'no-store' });
          if (res.ok) {
              isUp = true;
          }
      } catch (e) {
          isUp = false;
      }
      const t1 = performance.now();
      rt = Math.round(t1 - t0);

      const latestMs = [...ms]; // fresh copy just to be safe if concurrent
      latestMs[i].status = isUp ? 'up' : 'down';
      latestMs[i].lastChecked = Date.now();
      latestMs[i].responseTime = rt;
      latestMs[i].history = [...latestMs[i].history.slice(-19), isUp ? 'up' : 'down'];
      
      saveMonitors(latestMs);
  };

  const checkAll = () => {
      monitors.forEach(m => checkMonitor(m.id, monitors));
  };

  const removeMonitor = (id: string) => {
      saveMonitors(monitors.filter(m => m.id !== id));
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Clock className="w-6 h-6 text-primary" /> Uptime Monitor (Client-side Demo)</h2>
        <button onClick={checkAll} className="px-4 py-2 bg-muted text-foreground rounded-md shadow-sm hover:bg-muted/80 transition-colors font-medium text-sm flex items-center gap-2"><RefreshCw className="w-4 h-4"/> Check All</button>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Ping internal and external endpoints. A sleek dashboard visualizing response times and uptime persistence.
      </p>

      <div className="border border-border bg-card rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Name (e.g. My API)"
          className="w-full md:w-48 bg-muted/50 px-4 py-2 border border-border rounded-md text-sm outline-none focus:border-primary"
        />
        <input 
          type="url" 
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://api.example.com/health"
          className="flex-1 bg-muted/50 px-4 py-2 border border-border rounded-md text-sm outline-none focus:border-primary"
        />
        <button 
          onClick={addMonitor}
          className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md shadow-sm hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 content-start mt-4">
          {monitors.map((m) => (
              <div key={m.id} className="border border-border bg-card rounded-xl shadow-sm p-5 flex flex-col hover:border-primary/50 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <div className="font-semibold text-lg">{m.name}</div>
                          <div className="text-xs text-muted-foreground truncate w-[200px]" title={m.url}>{m.url}</div>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 ${
                          m.status === 'up' ? 'bg-green-500/10 text-green-500' : 
                          m.status === 'down' ? 'bg-red-500/10 text-red-500' : 
                          'bg-primary/10 text-primary'
                      }`}>
                          {m.status === 'pending' ? <RefreshCw className="w-3 h-3 animate-spin" /> : 
                           m.status === 'up' ? <div className="w-2 h-2 rounded-full bg-green-500"></div> :
                           <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                           {m.status}
                      </div>
                  </div>

                  <div className="flex justify-between items-end mt-auto pt-4">
                      <div>
                          <div className="text-xs text-muted-foreground mb-1">Response Time</div>
                          <div className="font-mono text-lg font-medium flex items-center gap-1">{m.responseTime ? `${m.responseTime}ms` : '--'}</div>
                      </div>
                      <div className="flex items-center gap-1">
                          {Array.from({ length: 20 }).map((_, i) => {
                             const hist = m.history[i + m.history.length - 20]; // grab last 20 effectively mapped
                             if (!hist) return <div key={i} className="w-1.5 h-6 bg-muted rounded-full"></div>;
                             return <div key={i} className={`w-1.5 h-6 rounded-full ${hist === 'up' ? 'bg-green-500/80 mt-2' : 'bg-red-500/80 mt-1 h-5'}`}></div>
                          })}
                      </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Checked: {m.lastChecked ? new Date(m.lastChecked).toLocaleTimeString() : 'Never'}</span>
                      <div className="flex gap-2">
                          <button onClick={() => checkMonitor(m.id, monitors)} className="p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded transition"><RefreshCw className="w-3.5 h-3.5" /></button>
                          <button onClick={() => removeMonitor(m.id)} className="p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded transition"><Trash className="w-3.5 h-3.5" /></button>
                      </div>
                  </div>
              </div>
          ))}

          {monitors.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-muted-foreground border border-dashed border-border rounded-xl">
                  <Activity className="w-12 h-12 mb-4 opacity-50" />
                  <p>Add a URL above to start monitoring.</p>
                  <p className="text-xs mt-2 text-center max-w-sm">Note: This is a client-side demo. Real continuous monitoring requires a server/cron job.</p>
              </div>
          )}
      </div>
    </div>
  );
}
