import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TurndownService from 'turndown';
import { FileEdit, Bold, Italic, Heading, Strikethrough, Code, Link as LinkIcon, Image, List, ListOrdered, TableProperties, ArrowRightLeft } from 'lucide-react';

export default function MarkdownEditor() {
  const [mode, setMode] = useState<'mdToRich' | 'richToMd'>('mdToRich');
  const [markdown, setMarkdown] = useState('# Hello DevDock\n\nWelcome to your live **Markdown** editor.\n\n- Write on the left.\n- Preview on the right.\n\n| Feature | Status |\n| ----------- | ----------- |\n| Rich Toolbar | Active |\n| Live Preview | Active |');
  const [richHtml, setRichHtml] = useState('<h1>Hello DevDock</h1><p>Welcome to your live <strong>Rich Text</strong> editor.</p><ul><li>Write visually on the left.</li><li>Get raw Markdown on the right.</li></ul>');
  const [convertedMd, setConvertedMd] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  // Initialize Turndown
  const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

  useEffect(() => {
     if (mode === 'richToMd') {
         setConvertedMd(turndownService.turndown(richHtml));
     }
  }, [richHtml, mode]);

  // Handle Toolbar actions
  const handleAction = (type: string) => {
      if (mode === 'mdToRich') {
          // Standard Markdown Injection
          if (!textareaRef.current) return;
          const textarea = textareaRef.current;
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const selectedText = markdown.substring(start, end) || 'text';
          
          let before = '', after = '';
          if (type === 'H') { before = '### '; after = ''; }
          if (type === 'B') { before = '**'; after = '**'; }
          if (type === 'I') { before = '_'; after = '_'; }
          if (type === 'S') { before = '~~'; after = '~~'; }
          if (type === 'C') { before = '`'; after = '`'; }
          if (type === 'L') { before = '['; after = '](https://...)'; }
          if (type === 'IMG') { before = '!['; after = '](https://...)'; }
          if (type === 'UL') { before = '- '; after = ''; }
          if (type === 'OL') { before = '1. '; after = ''; }
          if (type === 'TABLE') { before = '\n| Column 1 | Column 2 |\n| -------- | -------- |\n| Text     | Text     |\n'; after = ''; }

          const insertedText = before + (type !== 'TABLE' ? selectedText : '') + after;
          const newMarkdown = markdown.substring(0, start) + insertedText + markdown.substring(end);
          setMarkdown(newMarkdown);
          
          setTimeout(() => {
              textarea.focus();
              textarea.setSelectionRange(start + before.length, start + before.length + (type !== 'TABLE' ? selectedText.length : 0));
          }, 0);
      } else {
          // Rich Text execCommand
          if (type === 'H') document.execCommand('formatBlock', false, 'H3');
          if (type === 'B') document.execCommand('bold', false);
          if (type === 'I') document.execCommand('italic', false);
          if (type === 'S') document.execCommand('strikeThrough', false);
          if (type === 'C') {
             // simplified code block wrapper
             document.execCommand('insertHTML', false, `<code>${window.getSelection()?.toString() || 'code'}</code>`);
          }
          if (type === 'L') document.execCommand('createLink', false, prompt('Enter URL:', 'https://') || '');
          if (type === 'IMG') document.execCommand('insertImage', false, prompt('Enter Image URL:', 'https://') || '');
          if (type === 'UL') document.execCommand('insertUnorderedList', false);
          if (type === 'OL') document.execCommand('insertOrderedList', false);
          if (type === 'TABLE') {
             document.execCommand('insertHTML', false, `<table border="1"><tr><td>Col 1</td><td>Col 2</td></tr><tr><td>Data 1</td><td>Data 2</td></tr></table><br/>`);
          }
          if (editableRef.current) setRichHtml(editableRef.current.innerHTML);
      }
  };

  const ToolbarBtn = ({ icon: Icon, action, title }: { icon: any, action: string, title: string }) => (
      <button onClick={() => handleAction(action)} title={title} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Icon className="w-4 h-4" />
      </button>
  );

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><FileEdit className="w-6 h-6 text-primary" /> Markdown Editor</h2>
        <button 
           onClick={() => setMode(mode === 'mdToRich' ? 'richToMd' : 'mdToRich')}
           className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg font-semibold text-sm transition-colors border border-border"
        >
            <ArrowRightLeft className="w-4 h-4 text-primary" />
            Mode: {mode === 'mdToRich' ? 'Markdown ➔ Rich Text' : 'Rich Text ➔ Markdown'}
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        {mode === 'mdToRich' ? 'Type raw markdown syntax to see beautifully styled live formatting.' : 'Type visually in the rich text area to auto-generate markdown code.'}
      </p>

      <div className="flex flex-col bg-card border border-border shadow-sm rounded-2xl overflow-hidden flex-1 min-h-[500px]">
         <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
            <ToolbarBtn icon={Heading} title="Heading" action="H" />
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarBtn icon={Bold} title="Bold" action="B" />
            <ToolbarBtn icon={Italic} title="Italic" action="I" />
            <ToolbarBtn icon={Strikethrough} title="Strikethrough" action="S" />
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarBtn icon={Code} title="Code" action="C" />
            <ToolbarBtn icon={LinkIcon} title="Link" action="L" />
            <ToolbarBtn icon={Image} title="Image" action="IMG" />
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarBtn icon={List} title="Bullet List" action="UL" />
            <ToolbarBtn icon={ListOrdered} title="Numbered List" action="OL" />
            <div className="w-px h-4 bg-border mx-1" />
            <ToolbarBtn icon={TableProperties} title="Table" action="TABLE" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border">
             {/* Left Pane: Input Area */}
             <div className="w-full h-full relative">
                 {mode === 'mdToRich' ? (
                     <textarea 
                       ref={textareaRef}
                       value={markdown}
                       onChange={(e) => setMarkdown(e.target.value)}
                       className="absolute inset-0 w-full h-full p-6 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed"
                       spellCheck="false"
                       placeholder="Start typing markdown..."
                     />
                 ) : (
                     <div 
                         ref={editableRef}
                         contentEditable={true}
                         onInput={(e) => setRichHtml(e.currentTarget.innerHTML)}
                         className="absolute inset-0 w-full h-full p-6 bg-transparent outline-none overflow-auto prose prose-invert prose-p:leading-relaxed max-w-none empty:before:content-['Start_typing_rich_text...'] empty:before:text-muted-foreground/60 focus:before:content-none border-none ring-0!"
                         dangerouslySetInnerHTML={{ __html: richHtml }}
                     />
                 )}
             </div>

             {/* Right Pane: Output Area */}
             <div className="w-full h-full relative bg-card/50">
                 {mode === 'mdToRich' ? (
                     <div className="absolute inset-0 w-full h-full p-6 overflow-auto prose prose-invert max-w-none">
                         <ReactMarkdown remarkPlugins={[remarkGfm]}>
                             {markdown}
                         </ReactMarkdown>
                     </div>
                 ) : (
                     <textarea 
                       value={convertedMd}
                       readOnly
                       className="absolute inset-0 w-full h-full p-6 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed text-blue-300"
                       spellCheck="false"
                     />
                 )}
             </div>
         </div>
      </div>
    </div>
  );
}
