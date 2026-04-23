import React, { useState, useEffect } from 'react';
import { Server, Copy, Check, Download, Info } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function NginxBuilder() {
  const [domain, setDomain] = useLocalStorage('devdock_nginx_domain', 'example.com');
  const [port, setPort] = useLocalStorage('devdock_nginx_port', 80);
  const [proxyPort, setProxyPort] = useLocalStorage('devdock_nginx_proxy_port', 3000);
  const [ssl, setSsl] = useLocalStorage('devdock_nginx_ssl', true);
  const [spa, setSpa] = useLocalStorage('devdock_nginx_spa', true);
  const [config, setConfig] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let conf = `server {\n`;
    conf += `    listen ${port}${ssl ? ' ssl' : ''};\n`;
    conf += `    server_name ${domain} www.${domain};\n\n`;

    if (ssl) {
      conf += `    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;\n`;
      conf += `    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;\n\n`;
    }

    conf += `    location / {\n`;
    if (spa) {
      conf += `        root /var/www/${domain}/html;\n`;
      conf += `        index index.html index.htm;\n`;
      conf += `        try_files $uri $uri/ /index.html;\n`;
    } else {
      conf += `        proxy_pass http://localhost:${proxyPort};\n`;
      conf += `        proxy_http_version 1.1;\n`;
      conf += `        proxy_set_header Upgrade $http_upgrade;\n`;
      conf += `        proxy_set_header Connection 'upgrade';\n`;
      conf += `        proxy_set_header Host $host;\n`;
      conf += `        proxy_cache_bypass $http_upgrade;\n`;
    }
    conf += `    }\n`;
    conf += `}`;

    setConfig(conf);
  }, [domain, port, proxyPort, ssl, spa]);

  const copy = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Server className="w-6 h-6 text-primary" /> Nginx Config Builder</h2>
        <button 
          onClick={copy}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy Config
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl p-6 space-y-6 overflow-y-auto">
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Domain Name</label>
            <input 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full bg-background border border-border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Listen Port</label>
              <input 
                type="number"
                value={port}
                onChange={(e) => setPort(Number(e.target.value))}
                className="w-full bg-background border border-border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary transition-all"
              />
            </div>
            {!spa && (
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Proxy Port</label>
                <input 
                  type="number"
                  value={proxyPort}
                  onChange={(e) => setProxyPort(Number(e.target.value))}
                  className="w-full bg-background border border-border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary transition-all"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
             <label className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/30 cursor-pointer transition-colors">
                <input type="checkbox" checked={ssl} onChange={(e) => setSsl(e.target.checked)} className="w-4 h-4 accent-primary" />
                <div className="flex-1">
                  <div className="text-sm font-bold">Enable SSL</div>
                  <div className="text-[10px] text-muted-foreground">Adds Let's Encrypt path templates</div>
                </div>
             </label>
             <label className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/30 cursor-pointer transition-colors">
                <input type="checkbox" checked={spa} onChange={(e) => setSpa(e.target.checked)} className="w-4 h-4 accent-primary" />
                <div className="flex-1">
                  <div className="text-sm font-bold">SPA Mode</div>
                  <div className="text-[10px] text-muted-foreground">Static files + index.html fallback</div>
                </div>
             </label>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-3 italic">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <p className="text-[10px] text-blue-400/80 leading-relaxed">
              This generator provides a foundational template. Always verify your config with <code className="font-mono bg-blue-500/10 px-1 rounded">nginx -t</code> before reloading the service.
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">nginx.conf / sites-available</span>
          </div>
          <pre className="flex-1 p-6 font-mono text-sm text-foreground overflow-auto bg-black/20 leading-relaxed">
            {config}
          </pre>
        </div>
      </div>
    </div>
  );
}
