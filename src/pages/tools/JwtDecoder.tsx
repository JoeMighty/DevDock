import React, { useState } from 'react';
import { Key, Import, ShieldHalf } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

export default function JwtDecoder() {
  const [jwt, setJwt] = useState('');
  
  const parseJwt = (token: string, index: number) => {
    try {
      if (!token) return null;
      const base64Url = token.split('.')[index];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.stringify(JSON.parse(jsonPayload), null, 2);
    } catch (e) {
      return null;
    }
  };

  const header = parseJwt(jwt, 0);
  const payload = parseJwt(jwt, 1);
  const signature = jwt.split('.')[2];
  
  const isInvalid = jwt.length > 0 && (!header || !payload || !signature);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Key className="w-6 h-6 text-primary" /> JWT Decoder</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Paste a JSON Web Token to instantly decode the header and payload. Safe, secure, entirely offline.
      </p>
      <CompanionTool to="/tools/base64" icon={Import} accent="yellow"
        title="Pair with Base64 Encoder"
        description="JWTs use Base64URL encoding — encode or decode raw file payloads here." />
      <CompanionTool to="/tools/pem" icon={ShieldHalf} accent="blue"
        title="Inspect the signing certificate"
        description="Decode the X.509 PEM certificate used to sign this JWT and view its issuer and expiry." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[400px]">
        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold flex justify-between items-center">
            ENCODED TOKEN
          </div>
          <textarea 
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
            className={`flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm transition-colors focus:ring-1 focus:ring-primary focus:bg-accent/5 ${isInvalid ? 'text-destructive' : 'text-primary'}`}
            placeholder="eyJhbG..."
          />
          {isInvalid && (
              <div className="p-3 bg-destructive/10 text-destructive text-xs font-medium border-t border-destructive/20 border-border">
                  Invalid JWT signature or formatting.
              </div>
          )}
        </div>

        <div className="flex flex-col gap-4 overflow-hidden min-h-[300px]">
          <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
             <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold text-red-400">
                HEADER
             </div>
             <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-red-300 bg-[#1e1e1e]">
                 {header || '{}'}
             </pre>
          </div>
          <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
             <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold text-purple-400">
                PAYLOAD
             </div>
             <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-purple-300 bg-[#1e1e1e]">
                 {payload || '{}'}
             </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
