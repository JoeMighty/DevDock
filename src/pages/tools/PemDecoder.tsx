import React, { useState } from 'react';
import { ShieldHalf } from 'lucide-react';
import forge from 'node-forge';

export default function PemDecoder() {
  const [pem, setPem] = useState('-----BEGIN CERTIFICATE-----\nMIICVjCCAb8CAg37MA0GCSqGSIb3DQEBBAUAMIGbMQswCQYDVQQGEwJKUDEOMAwG\nA1UECBMFVG9reW8xEDAOBgNVBAcTB0NodW8ta3UxETAPBgNVBAoTCEZyYW5rNERE\nMRgwFgYDVQQLEw9XZWJDZXJ0IFN1cHBvcnQxGDAWBgNVBAMTD0ZyYW5rNEREIFdl\nYiBDQTEjMCEGCSqGSIb3DQEJARYUc3VwcG9ydEBmcmFuazRkZC5jb20wHhcNMTIw\nODIyMDUyNzA0WhcNMTcwODIxMDUyNzA0WjBKMQswCQYDVQQGEwJKUDEOMAwGA1UE\nCAwFVG9reW8xETAPBgNVBAoMCEZyYW5rNEREMRwwGgYDVQQDDBN3d3cuZXhhbXBs\nZS5jb20gLSgxMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVT/Q8b5M/rN8g\nJ5Xo063/x2pB8dydB6eX2xQDB/I8iK0vQ1H8v5jE+K+F6H8B3L2ZJbXXW5hL1rV6\n6mY+aC3yG1gN+h+iI/z0U/Z/w7K7M/uNn4C0n2qJm1q+oG7x/X0M7r0gC5zY0r7M\nn2XZK2y0A+n7M+0T6C/l+s5/w/q1bwIDAQABMA0GCSqGSIb3DQEBBAUAA4GBAFUZ\ngD8hE0+D5u0H+6zTbqH9iK0r7P+2w+p3qC3yG1gN+h+iI/z0U/Z/w7K7M/uNn4C0\nn2qJm1q+oG7x/X0M7r0gC5zY0r7Mn2XZK2y0A+n7M+0T6C/l+s5/w/q1bw=\n-----END CERTIFICATE-----');
  
  const [certData, setCertData] = useState<any>(null);
  const [error, setError] = useState('');

  React.useEffect(() => {
      try {
          if (!pem.trim() || !pem.includes('BEGIN CERTIFICATE')) {
              setCertData(null);
              setError('Awaiting valid PEM Block...');
              return;
          }
          const cert = forge.pki.certificateFromPem(pem);
          
          setCertData({
              subject: cert.subject.attributes.map(a => `${a.shortName || a.name}=${a.value}`).join(', '),
              issuer: cert.issuer.attributes.map(a => `${a.shortName || a.name}=${a.value}`).join(', '),
              validFrom: cert.validity.notBefore.toUTCString(),
              validTo: cert.validity.notAfter.toUTCString(),
              serial: cert.serialNumber,
              fingerprint: forge.md.sha256.create().update(forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes()).digest().toHex().match(/.{1,2}/g)?.join(':').toUpperCase()
          });
          setError('');
      } catch (err: any) {
          setCertData(null);
          setError('Failed to parse ASN.1 Certificate Frame. Ensure valid encoding.');
      }
  }, [pem]);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldHalf className="w-6 h-6 text-primary" /> PEM Decoder</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Input raw Base64 X.509 Certificate PEM blocks to decode securely and directly parse internal issuer details and fingerprints.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 flex-1 min-h-[400px]">
          <textarea 
               value={pem}
               onChange={e => setPem(e.target.value)}
               className="w-full h-full min-h-[300px] bg-card border border-border p-5 rounded-2xl shadow-sm resize-none outline-none font-mono text-xs leading-relaxed text-blue-300/80 focus:border-primary transition-colors"
               spellCheck="false"
               placeholder="-----BEGIN CERTIFICATE-----"
          />

          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 flex flex-col gap-4 overflow-y-auto">
             <h3 className="font-bold text-lg border-b border-border pb-2">Decoded X.509 Data</h3>
             
             {certData ? (
                 <div className="flex flex-col gap-4">
                     <div>
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Subject</label>
                         <p className="text-sm font-medium">{certData.subject}</p>
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Issuer</label>
                         <p className="text-sm font-medium">{certData.issuer}</p>
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Valid From</label>
                         <p className="text-sm font-mono text-green-400">{certData.validFrom}</p>
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Expiration</label>
                         <p className="text-sm font-mono text-destructive">{certData.validTo}</p>
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">SHA-256 Fingerprint</label>
                         <p className="text-xs font-mono break-all opacity-80">{certData.fingerprint}</p>
                     </div>
                 </div>
             ) : (
                 <div className="flex items-center justify-center h-full text-sm text-destructive">{error}</div>
             )}
          </div>
      </div>
    </div>
  );
}
