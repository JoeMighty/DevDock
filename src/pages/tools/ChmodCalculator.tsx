import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export default function ChmodCalculator() {
  const [perms, setPerms] = useState({
      owner: { read: true, write: true, exec: true },
      group: { read: true, write: false, exec: true },
      public: { read: true, write: false, exec: true }
  });

  const getOctal = (group: {read: boolean, write: boolean, exec: boolean}) => {
      let val = 0;
      if (group.read) val += 4;
      if (group.write) val += 2;
      if (group.exec) val += 1;
      return val;
  };

  const octalStr = `${getOctal(perms.owner)}${getOctal(perms.group)}${getOctal(perms.public)}`;

  const getSymbolic = (group: {read: boolean, write: boolean, exec: boolean}) => {
      return `${group.read ? 'r' : '-'}${group.write ? 'w' : '-'}${group.exec ? 'x' : '-'}`;
  };

  const symbolicStr = `-${getSymbolic(perms.owner)}${getSymbolic(perms.group)}${getSymbolic(perms.public)}`;

  const toggle = (target: 'owner'|'group'|'public', perm: 'read'|'write'|'exec') => {
      setPerms(prev => ({
          ...prev,
          [target]: { ...prev[target], [perm]: !prev[target][perm] }
      }));
  };

  return (
    <div className="h-full flex flex-col space-y-4 items-center">
      <div className="flex justify-between items-center mb-2 w-full max-w-3xl">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Lock className="w-6 h-6 text-primary" /> Chmod Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-6 w-full max-w-3xl">
        Visually configure Linux file system permissions. Generates exact numeric and symbolic flags.
      </p>

      <div className="bg-card w-full max-w-3xl border border-border shadow-sm rounded-2xl p-8 flex flex-col gap-10">
          
          <div className="flex items-center justify-center gap-8 md:gap-16">
              <div className="text-center group">
                  <div className="text-6xl font-black mb-3 text-primary tracking-tighter">{octalStr}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Octal Format</div>
              </div>
              <div className="w-px h-20 bg-border" />
              <div className="text-center group">
                  <div className="text-4xl font-mono mb-4 text-foreground mt-2">{symbolicStr}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Symbolic Format</div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['owner', 'group', 'public'] as const).map(group => (
                  <div key={group} className="bg-background border border-border p-5 rounded-xl">
                      <h3 className="font-bold text-sm uppercase tracking-widest mb-4 border-b border-border pb-2 capitalize">{group}</h3>
                      <div className="flex flex-col gap-3">
                          <label className="flex items-center gap-3 cursor-pointer group/label">
                              <input type="checkbox" checked={perms[group].read} onChange={() => toggle(group, 'read')} className="w-5 h-5 accent-primary cursor-pointer" />
                              <span className="font-semibold text-sm group-hover/label:text-primary transition-colors">Read (4)</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group/label">
                              <input type="checkbox" checked={perms[group].write} onChange={() => toggle(group, 'write')} className="w-5 h-5 accent-primary cursor-pointer" />
                              <span className="font-semibold text-sm group-hover/label:text-primary transition-colors">Write (2)</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group/label">
                              <input type="checkbox" checked={perms[group].exec} onChange={() => toggle(group, 'exec')} className="w-5 h-5 accent-primary cursor-pointer" />
                              <span className="font-semibold text-sm group-hover/label:text-primary transition-colors">Execute (1)</span>
                          </label>
                      </div>
                  </div>
              ))}
          </div>

          <div className="bg-muted px-4 py-3 rounded-lg flex items-center justify-between font-mono text-sm border border-border/50">
              <span className="text-muted-foreground">chmod <span className="text-primary font-bold">{octalStr}</span> file.txt</span>
              <button 
                  onClick={() => navigator.clipboard.writeText(`chmod ${octalStr}`)} 
                  className="text-xs bg-background border border-border px-3 py-1 rounded hover:bg-card transition-colors font-sans font-bold"
              >
                  Copy Command
              </button>
          </div>
      </div>
    </div>
  );
}
