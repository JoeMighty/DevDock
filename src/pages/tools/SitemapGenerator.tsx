import React, { useState } from 'react';
import { Network, Download, Search, AlertCircle } from 'lucide-react';

export default function SitemapGenerator() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!url) return;
    try {
        new URL(url);
    } catch {
        setError('Please enter a valid URL (e.g. https://example.com)');
        return;
    }

    setIsScanning(true);
    setError('');
    setUrls([]);
    
    try {
      // Use cors proxy to fetch HTML
      const target = url.endsWith('/') ? url.slice(0, -1) : url;
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(target)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const foundUrls = new Set<string>();
      foundUrls.add(target + '/');

      const links = doc.querySelectorAll('a[href]');
      links.forEach(link => {
          const href = link.getAttribute('href');
          if (!href) return;
          if (href.startsWith('#')) return; // anchor on same page
          if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
          
          try {
             const absoluteUrl = new URL(href, target);
             // Only include internal links
             if (absoluteUrl.hostname === new URL(target).hostname) {
                 foundUrls.add(absoluteUrl.href);
             }
          } catch (e) {
             // skip invalid
          }
      });

      setUrls(Array.from(foundUrls).slice(0, 50)); // limit to 50 for MVP demo
    } catch (e: any) {
        setError(e.message || 'Failed to scan website. CORS proxy might be blocked or site unreachable.');
    } finally {
        setIsScanning(false);
    }
  };

  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n  </url>`).join('\n')}
</urlset>`;

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Network className="w-6 h-6 text-primary" /> Sitemap Generator</h2>
      </div>

      <div className="border border-border bg-card rounded-xl shadow-sm p-4 flex gap-4">
        <input 
          type="url" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 bg-muted/50 px-4 py-2 border border-border rounded-md text-sm outline-none focus:border-primary"
        />
        <button 
          onClick={handleScan}
          disabled={isScanning}
          className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
        >
          {isScanning ? <Search className="w-4 h-4 animate-[bounce_1s_infinite]" /> : <Search className="w-4 h-4" />}
          {isScanning ? 'Crawling...' : 'Scan'}
        </button>
      </div>

      {error && (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm px-4 py-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5"/> {error}
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden min-h-[400px]">
        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold flex justify-between items-center">
            FOUND URLS ({urls.length})
          </div>
          <div className="flex-1 p-0 overflow-y-auto">
             {urls.length === 0 ? (
                 <div className="text-muted-foreground text-sm flex items-center justify-center h-full pt-10">Waiting for scan start...</div>
             ) : (
                 <ul className="divide-y divide-border">
                     {urls.map((u, i) => (
                         <li key={i} className="px-4 py-2 text-sm text-foreground/80 hover:bg-muted font-mono truncate">{u}</li>
                     ))}
                 </ul>
             )}
          </div>
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[300px]">
          <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold flex items-center justify-between">
            SITEMAP.XML
            {urls.length > 0 && (
                <button onClick={() => {
                   const blob = new Blob([xmlOutput], {type: "text/xml"});
                   const downloadUrl = URL.createObjectURL(blob);
                   const a = document.createElement('a');
                   a.href = downloadUrl;
                   a.download = 'sitemap.xml';
                   a.click();
                }} className="text-xs flex items-center gap-1 hover:text-primary transition-colors text-muted-foreground"><Download className="w-3.5 h-3.5"/> Download XML</button>
            )}
          </div>
          <div className="flex-1 p-4 bg-[#1e1e1e] overflow-auto">
             {urls.length === 0 ? (
                 <div className="text-muted-foreground text-center mt-10 text-sm">XML will appear here...</div>
             ) : (
                <pre className="text-yellow-300 font-mono text-sm whitespace-pre-wrap">{xmlOutput}</pre>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
