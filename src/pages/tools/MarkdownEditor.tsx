import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileEdit, Bold, Italic, Heading, Strikethrough, Code, Link as LinkIcon, Image, List, ListOrdered, TableProperties } from 'lucide-react';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello DevDock\n\nWelcome to your live **Markdown** editor.\n\n- Write on the left.\n- Preview on the right.\n\n| Feature | Status |\n| ----------- | ----------- |\n| Rich Toolbar | Active |\n| Live Preview | Active |');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '', defaultText: string = '') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    
    // Fallback for modern browser selection APIs
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const selectedText = markdown.substring(start, end) || defaultText;
    const insertedText = before + selectedText + after;
    
    const newMarkdown = markdown.substring(0, start) + insertedText + markdown.substring(end);
    setMarkdown(newMarkdown);
    
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const ToolbarBtn = ({ icon: Icon, onClick, title }: { icon: any, onClick: () => void, title: string }) => (
      <button onClick={onClick} title={title} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Icon className="w-4 h-4" />
      </button>
  );

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><FileEdit className="w-6 h-6 text-primary" /> Markdown Editor</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        A fully-featured rich text markdown editor with realtime formatting and Github-Flavored Markdown (tables, checklists) support.
      </p>

      <div className="flex flex-col bg-card border border-border shadow-sm rounded-2xl overflow-hidden flex-1 min-h-[500px]">
         <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
            <ToolbarBtn icon={Heading} title="Heading" onClick={() => insertText('### ', '', 'Heading')} />
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarBtn icon={Bold} title="Bold" onClick={() => insertText('**', '**', 'bold text')} />
            <ToolbarBtn icon={Italic} title="Italic" onClick={() => insertText('_', '_', 'italic text')} />
            <ToolbarBtn icon={Strikethrough} title="Strikethrough" onClick={() => insertText('~~', '~~', 'strikethrough text')} />
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarBtn icon={Code} title="Code" onClick={() => insertText('`', '`', 'code')} />
            <ToolbarBtn icon={LinkIcon} title="Link" onClick={() => insertText('[', '](https://...)', 'link title')} />
            <ToolbarBtn icon={Image} title="Image" onClick={() => insertText('![', '](https://...)', 'alt text')} />
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarBtn icon={List} title="Bullet List" onClick={() => insertText('- ', '', 'List item')} />
            <ToolbarBtn icon={ListOrdered} title="Numbered List" onClick={() => insertText('1. ', '', 'List item')} />
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarBtn icon={TableProperties} title="Table" onClick={() => insertText('\n| Column 1 | Column 2 |\n| -------- | -------- |\n| Text     | Text     |\n', '', '')} />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border">
             <textarea 
               ref={textareaRef}
               value={markdown}
               onChange={(e) => setMarkdown(e.target.value)}
               className="w-full h-full p-6 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed"
               spellCheck="false"
               placeholder="Start typing markdown..."
             />
             <div className="w-full h-full p-6 overflow-auto bg-card/50 prose prose-invert max-w-none">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
                     {markdown}
                 </ReactMarkdown>
             </div>
         </div>
      </div>
    </div>
  );
}
