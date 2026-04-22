import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export default function CidrCalculator() {
  const [ipInput, setIpInput] = useState('192.168.1.0/24');
  
  const calculateCidr = (cidrStr: string) => {
      try {
          if (!cidrStr.includes('/')) return null;
          const [ip, maskStr] = cidrStr.split('/');
          const mask = parseInt(maskStr);
          if (mask < 0 || mask > 32) return null;

          const parts = ip.split('.').map(p => parseInt(p));
          if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;

          // Convert IP to 32 bit number
          const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
          
          // Calculate mask
          const maskNum = ~((1 << (32 - mask)) - 1);
          
          // Network & Broadcast
          const networkNum = ipNum & maskNum;
          const broadcastNum = networkNum | ~maskNum;
          
          const numToIp = (num: number) => [
              (num >>> 24) & 255,
              (num >>> 16) & 255,
              (num >>> 8) & 255,
              num & 255
          ].join('.');

          return {
              ip,
              network: numToIp(networkNum),
              broadcast: numToIp(broadcastNum),
              netmask: numToIp(maskNum),
              wildcard: numToIp(~maskNum),
              firstHost: mask < 31 ? numToIp(networkNum + 1) : 'N/A',
              lastHost: mask < 31 ? numToIp(broadcastNum - 1) : 'N/A',
              hosts: mask < 31 ? Math.pow(2, 32 - mask) - 2 : (mask === 31 ? 2 : 1)
          };
      } catch {
          return null;
      }
  };

  const results = calculateCidr(ipInput);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> CIDR Subnet Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Input an IPv4 address with subnet suffix (e.g. 10.0.0.1/24) to calculate host ranges, network blocks, and wildcard metrics.
      </p>

      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
          <input 
              value={ipInput}
              onChange={e => setIpInput(e.target.value)}
              className="w-full text-center text-4xl font-black bg-transparent border-b-2 border-border focus:border-primary pb-3 outline-none transition-colors text-primary"
              placeholder="0.0.0.0/0"
          />

          {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                      { label: 'Network Address', value: results.network },
                      { label: 'Broadcast Address', value: results.broadcast },
                      { label: 'Subnet Netmask', value: results.netmask },
                      { label: 'Wildcard Mask', value: results.wildcard },
                      { label: 'First Usable Host', value: results.firstHost, highlight: true },
                      { label: 'Last Usable Host', value: results.lastHost, highlight: true },
                      { label: 'Total Usable Hosts', value: results.hosts.toLocaleString(), highlight: true },
                      { label: 'CIDR Block', value: `/${ipInput.split('/')[1]}` }
                  ].map((stat, i) => (
                      <div key={i} className={`p-5 rounded-2xl border ${stat.highlight ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'} shadow-sm`}>
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">{stat.label}</div>
                          <div className={`text-lg font-mono ${stat.highlight ? 'text-primary' : ''}`}>{stat.value}</div>
                      </div>
                  ))}
              </div>
          ) : (
             <div className="p-10 text-center text-muted-foreground font-medium bg-card/50 border border-border/50 rounded-2xl border-dashed">
                 Invalid CIDR Format. Example: 192.168.0.1/24
             </div>
          )}
      </div>
    </div>
  );
}
