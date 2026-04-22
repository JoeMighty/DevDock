import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import zxcvbn from 'zxcvbn';
import { cn } from '@/lib/utils';

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-primary" /> Password Analyzer</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-4">
        Calculate standard mathematical password entropy via zxcvbn algorithm. Analyzes dictionary attacks, spatial patterns, and offline hashing crack times.
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
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                           <div className="bg-card border border-border/50 p-4 rounded-xl">
                               <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Guesses to crack</div>
                               <div className="text-xl tracking-tight font-mono">{Number(result.guesses).toLocaleString()}</div>
                           </div>
                           <div className="bg-card border border-border/50 p-4 rounded-xl">
                               <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Time to crack (Offline Fast)</div>
                               <div className="text-xl tracking-tight font-mono text-primary/80">{result.crack_times_display.offline_fast_hashing_1e10_per_second}</div>
                           </div>
                      </div>
                  </div>
              )}
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
