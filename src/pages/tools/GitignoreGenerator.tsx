import React, { useState } from 'react';
import { GitBranch, Copy, Download } from 'lucide-react';

interface Stack {
  id: string;
  label: string;
  emoji: string;
  category: string;
  content: string;
}

const STACKS: Stack[] = [
  { id: 'node', label: 'Node.js', emoji: '🟢', category: 'Languages',
    content: `# Node\nnode_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnpm-debug.log*\n.npm\n.node_repl_history\n*.tgz\n.yarn-integrity\n.env\n.env.local\n.env.*.local\ndist/\nbuild/\ncoverage/\n` },
  { id: 'python', label: 'Python', emoji: '🐍', category: 'Languages',
    content: `# Python\n__pycache__/\n*.py[cod]\n*$py.class\n*.so\n.Python\nbuild/\ndist/\n*.egg-info/\n.eggs/\n.env\nvenv/\nenv/\n.venv/\n*.pyc\n.pytest_cache/\n.coverage\nhtmlcov/\n` },
  { id: 'go', label: 'Go', emoji: '🐹', category: 'Languages',
    content: `# Go\n*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n*.test\n*.out\nbin/\nvendor/\n` },
  { id: 'rust', label: 'Rust', emoji: '🦀', category: 'Languages',
    content: `# Rust\n/target/\n**/*.rs.bk\nCargo.lock\n` },
  { id: 'java', label: 'Java', emoji: '☕', category: 'Languages',
    content: `# Java\n*.class\n*.log\n*.jar\n*.war\n*.nar\n*.ear\n*.zip\ntarget/\n.gradle/\nbuild/\n!gradle/wrapper/gradle-wrapper.jar\n.classpath\n.project\n.settings/\n` },
  { id: 'csharp', label: 'C#', emoji: '#️⃣', category: 'Languages',
    content: `# C#\nbin/\nobj/\n*.user\n*.suo\n*.userosscache\n*.sln.docstates\n.vs/\n*.pidb\n*.booproj\n*.svd\n*.userprefs\n` },
  { id: 'php', label: 'PHP', emoji: '🐘', category: 'Languages',
    content: `# PHP\nvendor/\n.env\ncomposer.phar\n.phpunit.result.cache\n` },
  { id: 'ruby', label: 'Ruby', emoji: '💎', category: 'Languages',
    content: `# Ruby\n*.gem\n*.rbc\n.bundle/\nbuild/\nvandor/bundle\n.rvmrc\nGemfile.lock\n` },
  // Frameworks
  { id: 'react', label: 'React', emoji: '⚛️', category: 'Frameworks',
    content: `# React\nnode_modules/\nbuild/\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n.DS_Store\n` },
  { id: 'nextjs', label: 'Next.js', emoji: '▲', category: 'Frameworks',
    content: `# Next.js\nnode_modules/\n.next/\nout/\nbuild/\n.env\n.env.local\n.env.*.local\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n` },
  { id: 'vue', label: 'Vue', emoji: '💚', category: 'Frameworks',
    content: `# Vue\nnode_modules/\ndist/\n.env\n.env.local\n.env.*.local\n` },
  { id: 'laravel', label: 'Laravel', emoji: '🔴', category: 'Frameworks',
    content: `# Laravel\nvendor/\n.env\n.env.backup\nstorage/\nbootstrap/cache/\npublic/storage\n*.key\n` },
  { id: 'django', label: 'Django', emoji: '🟩', category: 'Frameworks',
    content: `# Django\n*.pyc\n__pycache__/\n.env\ndb.sqlite3\n/static/\n/media/\n.DS_Store\n` },
  // DevOps
  { id: 'docker', label: 'Docker', emoji: '🐳', category: 'DevOps',
    content: `# Docker\n.docker/\ndocker-compose.override.yml\n*.env\n` },
  { id: 'terraform', label: 'Terraform', emoji: '🏗️', category: 'DevOps',
    content: `# Terraform\n.terraform/\n*.tfstate\n*.tfstate.backup\n.terraform.lock.hcl\ncrash.log\noverride.tf\noverride.tf.json\n` },
  // OS
  { id: 'macos', label: 'macOS', emoji: '🍎', category: 'Operating Systems',
    content: `# macOS\n.DS_Store\n.AppleDouble\n.LSOverride\nIcon\n._*\n.DocumentRevisions-V100\n.fseventsd\n.Spotlight-V100\n.TemporaryItems\n.Trashes\n.VolumeIcon.icns\n.com.apple.timemachine.donotpresent\n` },
  { id: 'windows', label: 'Windows', emoji: '🪟', category: 'Operating Systems',
    content: `# Windows\nThumbs.db\nThumbs.db:encryptable\nehthumbs.db\nehthumbs_vista.db\n*.stackdump\n[Dd]esktop.ini\n$RECYCLE.BIN/\n*.cab\n*.msi\n*.msix\n*.msm\n*.msp\n*.lnk\n` },
  { id: 'linux', label: 'Linux', emoji: '🐧', category: 'Operating Systems',
    content: `# Linux\n*~\n.fuse_hidden*\n.directory\n.Trash-*\n.nfs*\n` },
  // IDEs
  { id: 'vscode', label: 'VS Code', emoji: '🔵', category: 'IDEs',
    content: `# VS Code\n.vscode/*\n!.vscode/settings.json\n!.vscode/tasks.json\n!.vscode/launch.json\n!.vscode/extensions.json\n!.vscode/*.code-snippets\n.history/\n*.vsix\n` },
  { id: 'jetbrains', label: 'JetBrains', emoji: '🧠', category: 'IDEs',
    content: `# JetBrains\n.idea/\n*.iml\n*.iws\n*.ipr\n.idea_modules/\natlas.json\n` },
  { id: 'xcode', label: 'Xcode', emoji: '🔨', category: 'IDEs',
    content: `# Xcode\nbuild/\n*.pbxuser\n!default.pbxuser\n*.mode1v3\n!default.mode1v3\n*.mode2v3\n!default.mode2v3\n*.perspectivev3\n!default.perspectivev3\nxcuserdata/\n*.xccheckout\n*.moved-aside\nDerivedData/\n*.xcuserstate\n` },
];

const CATEGORIES = Array.from(new Set(STACKS.map(s => s.category)));

export default function GitignoreGenerator() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['node', 'macos', 'vscode']));

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const output = STACKS
    .filter(s => selected.has(s.id))
    .map(s => s.content)
    .join('\n');

  const download = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '.gitignore';
    a.click();
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-primary" /> .gitignore Generator
        </h2>
        <div className="flex gap-2">
          <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40">
            <Copy className="w-4 h-4" /> Copy
          </button>
          <button onClick={download} disabled={!output}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-40">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Select your tech stack to generate a perfectly combined <code className="font-mono text-primary bg-primary/10 px-1 rounded">.gitignore</code>. Combines templates without duplicates.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 flex-1 min-h-[400px]">
        <div className="flex flex-col gap-5 overflow-y-auto pr-1">
          {CATEGORIES.map(cat => (
            <div key={cat}>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">{cat}</div>
              <div className="flex flex-wrap gap-2">
                {STACKS.filter(s => s.category === cat).map(stack => (
                  <button key={stack.id} onClick={() => toggle(stack.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border transition-all ${selected.has(stack.id)
                      ? 'bg-primary/10 border-primary text-primary shadow-sm'
                      : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40'}`}>
                    <span>{stack.emoji}</span>
                    <span>{stack.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1e1e1e] border border-border rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-black/20 border-b border-border/50 flex justify-between">
            <span>.gitignore</span>
            <span className="text-primary">{selected.size} stacks selected</span>
          </div>
          <textarea readOnly value={output}
            className="flex-1 bg-transparent p-4 resize-none outline-none font-mono text-xs text-green-300 leading-relaxed" spellCheck="false"
            placeholder="Select stacks on the left..." />
        </div>
      </div>
    </div>
  );
}
