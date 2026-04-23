import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, RefreshCw, Settings2 } from 'lucide-react';
import zxcvbn from 'zxcvbn';
import { cn } from '@/lib/utils';

const WORDLIST = ["apple", "river", "cloud", "stone", "tiger", "ocean", "mountain", "eagle", "forest", "shadow", "winter", "summer", "copper", "silver", "golden", "rocket", "planet", "galaxy", "comet", "nebula", "crystal", "diamond", "emerald", "sapphire", "ruby", "phoenix", "dragon", "wizard", "knight", "castle", "sword", "shield", "helmet", "armor", "arrow", "bow", "magic", "spell", "potion", "scroll", "book", "library", "tower", "bridge", "gate", "wall", "city", "village", "town", "road", "path", "trail", "journey", "quest", "adventure", "story", "legend", "myth", "tale", "song", "music", "dance", "rhythm", "beat", "melody", "harmony", "chord", "note", "scale", "quantum", "matrix", "vector", "orbit", "pulse", "echo", "vertex", "nexus", "cipher", "logic", "binary", "system", "network", "node", "proxy", "pixel", "frame", "render", "engine", "core", "spark", "flame", "frost", "storm"];

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Generator State
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, syms: true, memorable: false });

  const result = zxcvbn(password);
  
  const getStrengthColor = (score: number) => {
    switch(score) {
        case 0: return 'bg-destructive/50';
        case 1: return 'bg-orange-500/50';
        case 2: return 'bg-yellow-500/50';
        case 3: return 'bg-green-400';
        case 4: return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]';
        default: return 'bg-muted';
    }
  };

  const getStrengthLabel = (score: number) => {
    switch(score) {
        case 0: return 'Critically Weak';
        case 1: return 'Weak';
        case 2: return 'Moderate';
        case 3: return 'Strong';
        case 4: return 'Unbreakable';
        default: return 'Empty';
    }
  };

  const generatePassword = () => {
      if (opts.memorable) {
          const words = [];
          const count = Math.max(3, Math.floor(len / 6)); // approximate length spacing
          for(let i=0; i<count; i++) {
              let w = WORDLIST[Math.floor(Math.random() * WORDLIST.length)];
              if (opts.nums && i === count - 1) w += Math.floor(Math.random() * 100);
              words.push(w);
          }
          setPassword(words.join('-'));
          return;
      }

      let charset = '';
      if (opts.lower) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (opts.upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (opts.nums) charset += '0123456789';
      if (opts.syms) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

      if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

      let res = '';
      for(let i=0; i<len; i++) {
          res += charset[Math.floor(Math.random() * charset.length)];
      }
      setPassword(res);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-primary" /> Password Analyzer & Generator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-4">
        Calculate standard mathematical password entropy via zxcvbn algorithms or generate cryptographically secure passwords and memorable XKCD passphrases.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 flex-1 min-h-[400px]">
          <div className="flex flex-col gap-6">
              <div className="relative">
                  <input 
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter a password to analyze..."
                      className="w-full bg-card border border-border p-5 rounded-2xl shadow-sm text-2xl font-bold font-mono outline-none focus:border-primary/50 transition-all pr-14"
                  />
                  <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-white transition"
                  >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
              </div>

              {password && (
                  <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-end pb-1">
                          <span className="text-xl font-bold">{getStrengthLabel(result.score)}</span>
                          <span className="text-xs text-muted-foreground">{password.length} characters</span>
                      </div>
                      <div className="flex gap-2 w-full h-2">
                           {[0,1,2,3].map(i => (
                               <div key={i} className={cn("flex-1 rounded-full bg-muted transition-all duration-500", result.score > i ? getStrengthColor(result.score) : '')} />
                           ))}
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="bg-card border border-border/50 p-4 rounded-xl overflow-hidden">
                               <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 opacity-60">Guesses to crack</div>
                               <div className="text-lg sm:text-xl tracking-tight font-mono break-all leading-tight">
                                   {Number(result.guesses).toLocaleString()}
                               </div>
                           </div>
                           <div className="bg-card border border-border/50 p-4 rounded-xl overflow-hidden">
                               <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 opacity-60">Time to crack (Offline Fast)</div>
                               <div className="text-lg sm:text-xl tracking-tight font-mono text-primary/80 break-words leading-tight">
                                   {result.crack_times_display.offline_fast_hashing_1e10_per_second}
                               </div>
                           </div>
                      </div>
                  </div>
              )}

              {/* Generator Panel */}
              <div className="bg-card border border-border/50 rounded-2xl p-6 mt-2 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                     <Settings2 className="w-32 h-32" />
                 </div>
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10"><RefreshCw className="w-4 h-4 text-primary" />Secure Generator Options</h3>
                 
                 <div className="flex flex-col gap-4 relative z-10">
                     <div>
                         <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                             <span>Password Length</span>
                             <span className="text-primary">{len}</span>
                         </div>
                         <input 
                             type="range" min="8" max="64" value={len} onChange={e => setLen(Number(e.target.value))}
                             className="w-full accent-primary cursor-pointer"
                         />
                     </div>

                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                         <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                             <input type="checkbox" checked={opts.upper} disabled={opts.memorable} onChange={e => setOpts({...opts, upper: e.target.checked})} className="accent-primary" /> Uppercase
                         </label>
                         <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                             <input type="checkbox" checked={opts.lower} disabled={opts.memorable} onChange={e => setOpts({...opts, lower: e.target.checked})} className="accent-primary" /> Lowercase
                         </label>
                         <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                             <input type="checkbox" checked={opts.nums} onChange={e => setOpts({...opts, nums: e.target.checked})} className="accent-primary" /> Numbers
                         </label>
                         <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                             <input type="checkbox" checked={opts.syms} disabled={opts.memorable} onChange={e => setOpts({...opts, syms: e.target.checked})} className="accent-primary" /> Symbols
                         </label>
                     </div>

                     <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 pt-4 border-t border-border/40">
                         <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer w-full sm:w-auto">
                             <input type="checkbox" checked={opts.memorable} onChange={e => setOpts({...opts, memorable: e.target.checked})} className="accent-primary w-4 h-4" /> 
                             Memorable Phrase (XKCD)
                         </label>
                         <button onClick={generatePassword} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-all w-full sm:w-auto ml-auto">
                             <RefreshCw className="w-4 h-4" /> Generate
                         </button>
                     </div>
                 </div>
              </div>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 overflow-y-auto">
             <h3 className="font-bold text-lg mb-4">Vulnerability Report</h3>
             
             {password ? (
                <div className="flex flex-col gap-4">
                    {result.feedback.warning && (
                        <div className="px-3 py-2 bg-destructive/10 border border-destructive/20 text-red-400 text-sm rounded-lg font-medium">
                            ⚠️ {result.feedback.warning}
                        </div>
                    )}
                    
                    {result.feedback.suggestions.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Suggestions</h4>
                            <ul className="text-sm space-y-1.5 list-disc pl-4 text-white/80">
                                {result.feedback.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                    )}

                    <div className="pt-4 border-t border-border mt-2">
                        <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">Match Sequence</h4>
                        <div className="space-y-2">
                            {result.sequence.map((seq: any, i: number) => (
                                <div key={i} className="flex justify-between items-center bg-muted/30 px-3 py-1.5 rounded text-xs font-mono">
                                    <span className="text-primary">{seq.token}</span>
                                    <span className="opacity-50">{seq.pattern} pattern</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
             ) : (
                <div className="text-sm text-muted-foreground text-center mt-10">Waiting for input...</div>
             )}
          </div>
      </div>
    </div>
  );
}
