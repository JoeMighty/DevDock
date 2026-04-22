import React, { useState } from 'react';
import { TOOLS } from '@/components/layout/Sidebar';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(TOOLS.map(t => t.category)))];
  
  const filteredTools = activeCategory === 'All' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-full flex flex-col pt-4 sm:pt-8 pb-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
          Supercharge your workflow.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          DevDock is your centralized, lightning-fast toolkit. Stop opening twenty tabs to decode an API response. Everything runs instantly, right here.
        </p>
      </motion.div>

      {/* Category Filter Tabs */}
      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex flex-wrap items-center justify-center gap-2 mb-10 w-full"
      >
         {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all select-none relative",
                  activeCategory === cat ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
               )}
             >
                 {activeCategory === cat && (
                     <motion.div layoutId="home-tab" className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/30 -z-10" />
                 )}
                 {cat}
             </button>
         ))}
      </motion.div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        key={activeCategory} // Reset stagger animation on category change
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max max-w-7xl mx-auto w-full pb-12"
      >
        <AnimatePresence mode='popLayout'>
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.div key={tool.path} layout variants={itemVariants} className="h-full block">
                  <Link 
                    to={tool.path}
                    className="group relative flex flex-col h-full overflow-hidden p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                          <Icon className="w-5 h-5 text-primary drop-shadow-sm" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tool.category}</span>
                    </div>
                    
                    <h3 className="font-bold text-base mb-1.5 text-card-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-muted-foreground text-xs font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity whitespace-normal">
                       Launch the {tool.name.toLowerCase()} interface.
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center text-xs font-bold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Open Engine <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
