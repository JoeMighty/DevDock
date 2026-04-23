import React, { useState } from 'react';
import { Bot, Copy, Plus, Trash2, Download, GitCommit } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Rule { id: number; type: 'Allow' | 'Disallow'; path: string }
interface Agent { id: number; name: string; crawlDelay: string; rules: Rule[] }

let _id = 100;

const DEFAULT_AGENTS: Agent[] = [
  { id: 1, name: '*', crawlDelay: '', rules: [{ id: 2, type: 'Disallow', path: '/admin' }, { id: 3, type: 'Disallow', path: '/private' }] },
];

const PRESETS = {
  'Allow All':       [{ id: 1, name: '*', crawlDelay: '', rules: [] }],
  'Block All':       [{ id: 1, name: '*', crawlDelay: '', rules: [{ id: 2, type: 'Disallow' as const, path: '/' }] }],
  'SEO Friendly':    [{ id: 1, name: '*', crawlDelay: '', rules: [{ id: 2, type: 'Disallow' as const, path: '/admin' }, { id: 3, type: 'Disallow' as const, path: '/api' }, { id: 4, type: 'Allow' as const, path: '/' }] }],
  'Block GPTBot':    [{ id: 1, name: '*', crawlDelay: '', rules: [] }, { id: 5, name: 'GPTBot', crawlDelay: '', rules: [{ id: 6, type: 'Disallow' as const, path: '/' }] }],
};

function buildOutput(agents: Agent[], sitemap: string): string {
  const lines: string[] = [];
  agents.forEach(a => {
    lines.push(`User-agent: ${a.name}`);
    if (a.crawlDelay) lines.push(`Crawl-delay: ${a.crawlDelay}`);
    if (a.rules.length === 0) { lines.push('Allow: /'); }
    a.rules.forEach(r => lines.push(`${r.type}: ${r.path}`));
    lines.push('');
  });
  if (sitemap.trim()) lines.push(`Sitemap: ${sitemap.trim()}`);
  return lines.join('\n').trim();
}

export default function RobotsTxtGenerator() {
  const [agents, setAgents]   = useLocalStorage<Agent[]>('devdock_robots_agents', DEFAULT_AGENTS);
  const [sitemap, setSitemap] = useLocalStorage<string>('devdock_robots_sitemap', '');
  const [copied, setCopied]   = useState(false);

  const output = buildOutput(agents, sitemap);

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const download = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'robots.txt'; a.click();
  };

  const addAgent = () => setAgents(prev => [...prev, { id: _id++, name: 'Googlebot', crawlDelay: '', rules: [] }]);
  const removeAgent = (id: number) => setAgents(prev => prev.filter(a => a.id !== id));
  const updateAgent = (id: number, key: keyof Agent, val: any) => setAgents(prev => prev.map(a => a.id === id ? { ...a, [key]: val } : a));

  const addRule = (agentId: number) => setAgents(prev => prev.map(a => a.id === agentId ? { ...a, rules: [...a.rules, { id: _id++, type: 'Disallow', path: '/' }] } : a));
  const removeRule = (agentId: number, ruleId: number) => setAgents(prev => prev.map(a => a.id === agentId ? { ...a, rules: a.rules.filter(r => r.id !== ruleId) } : a));
  const updateRule = (agentId: number, ruleId: number, key: keyof Rule, val: any) =>
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, rules: a.rules.map(r => r.id === ruleId ? { ...r, [key]: val } : r) } : a));

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Bot className="w-6 h-6 text-primary" /> robots.txt Generator</h2>
        <div className="flex gap-2">
          <button onClick={copy} className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted border border-border text-sm font-semibold rounded-lg transition-colors">
            <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={download} className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg transition-colors hover:bg-primary/90">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Build a <code className="font-mono text-primary bg-primary/10 px-1 rounded">robots.txt</code> file with user-agent rules, allow/disallow paths, crawl-delay, and sitemap declarations. Use presets or configure per-bot rules manually.
      </p>
      <CompanionTool to="/tools/sitemap" icon={GitCommit} accent="blue"
        title="Pair with Sitemap Generator"
        description="Generate your sitemap.xml first, then paste the URL into the Sitemap field below." />

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest self-center">Presets:</span>
        {Object.entries(PRESETS).map(([name, preset]) => (
          <button key={name} onClick={() => setAgents(preset as Agent[])}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-border hover:border-primary/50 hover:text-primary transition-all">
            {name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0 overflow-hidden">
        {/* Builder */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {agents.map(agent => (
            <div key={agent.id} className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">User-agent</label>
                  <input value={agent.name} onChange={e => updateAgent(agent.id, 'name', e.target.value)}
                    className="w-full bg-background border border-border px-3 py-1.5 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
                </div>
                <div className="w-24">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Crawl-delay</label>
                  <input value={agent.crawlDelay} onChange={e => updateAgent(agent.id, 'crawlDelay', e.target.value)}
                    placeholder="e.g. 10" className="w-full bg-background border border-border px-3 py-1.5 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
                </div>
                {agents.length > 1 && (
                  <button onClick={() => removeAgent(agent.id)} className="mt-4 p-2 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {agent.rules.map(rule => (
                  <div key={rule.id} className="flex items-center gap-2">
                    <select value={rule.type} onChange={e => updateRule(agent.id, rule.id, 'type', e.target.value as 'Allow' | 'Disallow')}
                      className="bg-background border border-border px-2 py-1.5 rounded-lg text-xs font-bold outline-none focus:border-primary transition-all w-24">
                      <option>Allow</option><option>Disallow</option>
                    </select>
                    <input value={rule.path} onChange={e => updateRule(agent.id, rule.id, 'path', e.target.value)}
                      placeholder="/path" className="flex-1 bg-background border border-border px-3 py-1.5 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
                    <button onClick={() => removeRule(agent.id, rule.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button onClick={() => addRule(agent.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors mt-1">
                  <Plus className="w-3.5 h-3.5" /> Add Rule
                </button>
              </div>
            </div>
          ))}
          <button onClick={addAgent}
            className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
            <Plus className="w-4 h-4" /> Add User-agent Block
          </button>
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Sitemap URL (Optional)</label>
            <input value={sitemap} onChange={e => setSitemap(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className="w-full bg-background border border-border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary transition-all" />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 bg-muted/30 border-b border-border">
            robots.txt Preview
          </div>
          <pre className="flex-1 p-4 font-mono text-sm text-foreground overflow-auto whitespace-pre leading-relaxed">{output}</pre>
        </div>
      </div>
    </div>
  );
}
