import React, { useState } from 'react';
import { Copy, Download, GitBranch } from 'lucide-react';

export default function ChangelogGenerator() {
  const [logs, setLogs] = useState([{ type: 'Added', description: '' }]);
  const [version, setVersion] = useState('1.0.0');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const addLog = (type: string) => {
    setLogs([...logs, { type, description: '' }]);
  };

  const updateLog = (index: number, description: string) => {
    const newLogs = [...logs];
    newLogs[index].description = description;
    setLogs(newLogs);
  };

  const removeLog = (index: number) => {
    setLogs(logs.filter((_, i) => i !== index));
  };

  const generateMarkdown = () => {
    let md = `## [${version}] - ${date}\n\n`;
    const categories = ['Added', 'Changed', 'Fixed', 'Removed'];
    
    categories.forEach(cat => {
        const catLogs = logs.filter(l => l.type === cat && l.description.trim());
        if (catLogs.length > 0) {
            md += `### ${cat}\n`;
            catLogs.forEach(l => {
                md += `- ${l.description}\n`;
            });
            md += `\n`;
        }
    });
    return md;
  };

  const markdown = generateMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    alert('Copied to clipboard!');
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2"><GitBranch className="w-6 h-6 text-primary" /> Changelog Generator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Generate formatted markdown changelogs with standard categorized release notes in seconds.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
        
        <div className="flex flex-col gap-4 bg-card border border-border rounded-xl shadow-sm p-4 overflow-y-auto">
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Version</label>
                    <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} className="w-full mt-1 bg-muted px-4 py-2 border border-border rounded-md font-mono text-sm outline-none" placeholder="v1.0.0" />
                </div>
                <div className="flex-1">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 bg-muted px-4 py-2 border border-border rounded-md font-mono text-sm outline-none" />
                </div>
            </div>

            <div className="h-px bg-border my-2"></div>
            
            <div className="flex gap-2 mb-2">
                <button onClick={() => addLog('Added')} className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-semibold rounded-md hover:bg-green-500/20 transition-colors">+ Added</button>
                <button onClick={() => addLog('Changed')} className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-semibold rounded-md hover:bg-blue-500/20 transition-colors">+ Changed</button>
                <button onClick={() => addLog('Fixed')} className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-semibold rounded-md hover:bg-red-500/20 transition-colors">+ Fixed</button>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2">
                {logs.map((log, index) => (
                    <div key={index} className="flex gap-3 items-start group">
                        <span className={`text-xs font-bold w-16 uppercase pt-2 ${log.type === 'Added' ? 'text-green-500' : log.type === 'Changed' ? 'text-blue-500' : 'text-red-500'}`}>
                            {log.type}
                        </span>
                        <textarea 
                            value={log.description}
                            onChange={(e) => updateLog(index, e.target.value)}
                            className="flex-1 bg-muted/50 p-2 border border-border rounded-md text-sm outline-none resize-none focus:border-primary"
                            placeholder="Describe the change..."
                            rows={2}
                        />
                        <button onClick={() => removeLog(index)} className="pt-2 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all">✕</button>
                    </div>
                ))}
                {logs.length === 0 && <div className="text-muted-foreground text-sm text-center py-10 border border-dashed rounded-lg">No changes added yet.</div>}
            </div>
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden h-[500px] md:h-auto">
            <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold flex justify-between items-center">
                OUTPUT MARKDOWN
                <div className="flex gap-2">
                    <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"><Copy className="w-3.5 h-3.5" /> Copy</button>
                    <button onClick={() => {
                        const blob = new Blob([markdown], {type: "text/markdown"});
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `CHANGELOG-${version}.md`;
                        a.click();
                    }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"><Download className="w-3.5 h-3.5" /> Download</button>
                </div>
            </div>
            <div className="flex-1 p-4 bg-[#1e1e1e] overflow-auto">
                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{markdown}</pre>
            </div>
        </div>

      </div>
    </div>
  );
}
