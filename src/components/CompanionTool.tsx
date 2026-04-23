import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';

type AccentColor = 'purple' | 'blue' | 'green' | 'orange' | 'cyan' | 'yellow' | 'pink';

interface CompanionToolProps {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: AccentColor;
}

const ACCENTS: Record<AccentColor, { wrapper: string; icon: string; iconColor: string; arrow: string }> = {
  purple: { wrapper: 'bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/40', icon: 'bg-purple-500/10', iconColor: 'text-purple-400', arrow: 'group-hover:text-purple-400' },
  blue:   { wrapper: 'bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-500/40',     icon: 'bg-blue-500/10',   iconColor: 'text-blue-400',   arrow: 'group-hover:text-blue-400' },
  green:  { wrapper: 'bg-green-500/5 border-green-500/20 hover:bg-green-500/10 hover:border-green-500/40', icon: 'bg-green-500/10',  iconColor: 'text-green-400',  arrow: 'group-hover:text-green-400' },
  orange: { wrapper: 'bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10 hover:border-orange-500/40', icon: 'bg-orange-500/10', iconColor: 'text-orange-400', arrow: 'group-hover:text-orange-400' },
  cyan:   { wrapper: 'bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500/40',     icon: 'bg-cyan-500/10',   iconColor: 'text-cyan-400',   arrow: 'group-hover:text-cyan-400' },
  yellow: { wrapper: 'bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-500/10 hover:border-yellow-500/40', icon: 'bg-yellow-500/10', iconColor: 'text-yellow-400', arrow: 'group-hover:text-yellow-400' },
  pink:   { wrapper: 'bg-pink-500/5 border-pink-500/20 hover:bg-pink-500/10 hover:border-pink-500/40',     icon: 'bg-pink-500/10',   iconColor: 'text-pink-400',   arrow: 'group-hover:text-pink-400' },
};

export function CompanionTool({ to, title, description, icon: Icon, accent = 'blue' }: CompanionToolProps) {
  const a = ACCENTS[accent];
  return (
    <Link to={to}
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all group mb-2 ${a.wrapper}`}>
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-lg flex-shrink-0 ${a.icon}`}>
          <Icon className={`w-4 h-4 ${a.iconColor}`} />
        </div>
        <div>
          <div className="text-xs font-bold text-foreground">{title}</div>
          <div className="text-[11px] text-muted-foreground leading-relaxed">{description}</div>
        </div>
      </div>
      <ArrowRight className={`w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:translate-x-0.5 transition-all ${a.arrow}`} />
    </Link>
  );
}
