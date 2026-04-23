import React, { useState, useRef } from 'react';
import { Import, UploadCloud, Copy } from 'lucide-react';

export default function Base64Encoder() {
  const [b64Data, setB64Data] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => setB64Data(event.target?.result as string);
      reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'drop' && e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          setFileName(file.name);
          const reader = new FileReader();
          reader.onload = (event) => setB64Data(event.target?.result as string);
          reader.readAsDataURL(file);
      }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Import className="w-6 h-6 text-primary" /> Base64 File Encoder</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-4">
        Drag and drop images, SVGs, or files to directly encode them into Base64 Data URI strings for hard-embedding into HTML/CSS files without assets.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[400px]">
         <div 
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrag}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all rounded-2xl flex flex-col items-center justify-center p-12 cursor-pointer group bg-card min-h-[300px]"
         >
             <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
             <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                 <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
             </div>
             <h3 className="text-lg font-bold mb-1">Click or drop a file</h3>
             <p className="text-sm text-muted-foreground text-center">Produces instant application/base64 DOM strings.</p>
             
             {fileName && (
                 <div className="mt-8 px-4 py-2 bg-background border border-border rounded-md text-xs font-mono text-primary font-bold">
                    File loaded: {fileName}
                 </div>
             )}
         </div>

         <div className="flex flex-col h-full bg-card border border-border shadow-sm rounded-2xl overflow-hidden p-5">
             <div className="flex justify-between items-center mb-4 border-b border-border pb-3">
                 <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Encoded URI String</h3>
                 <button 
                     onClick={() => navigator.clipboard.writeText(b64Data)} 
                     disabled={!b64Data}
                     className="flex items-center gap-2 p-1.5 px-3 bg-muted hover:bg-muted/80 rounded transition-colors text-xs font-semibold disabled:opacity-50"
                 >
                     <Copy className="w-3 h-3" /> Copy String
                 </button>
             </div>
             
             {b64Data ? (
                 <textarea 
                    readOnly 
                    value={b64Data} 
                    className="w-full h-full flex-1 bg-background border border-border p-4 rounded-xl resize-none font-mono text-xs focus:outline-none text-blue-300 break-all leading-relaxed"
                 />
             ) : (
                 <div className="w-full h-full flex-1 flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl bg-background/50 text-muted-foreground text-sm">
                     Awaiting payload injection.
                 </div>
             )}
         </div>
      </div>
    </div>
  );
}
