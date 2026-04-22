import React from 'react';
import { TOOLS } from '@/components/layout/Sidebar';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function HomePage() {
  return (
    <div className="h-full flex flex-col pt-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
          Supercharge your workflow.
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          DevDock is your centralized, lightning-fast toolkit. Stop opening twenty tabs to decode an API response. Everything runs instantly, right here.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr max-w-7xl mx-auto w-full"
      >
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <motion.div key={tool.path} variants={itemVariants} className="h-full">
              <Link 
                to={tool.path}
                className="group relative flex flex-col h-full overflow-hidden p-5 bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                  <Icon className="w-5 h-5 text-white group-hover:text-primary drop-shadow-md" />
                </div>
                
                <h3 className="font-bold text-base mb-1.5 text-white/90 group-hover:text-white transition-colors">{tool.name}</h3>
                <p className="text-muted-foreground text-xs font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                   Launch the {tool.name.toLowerCase()} interface.
                </p>
                
                <div className="mt-auto pt-4 flex items-center text-xs font-bold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Open Engine <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
