import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-3xl overflow-hidden"
    >
      <div className="atmosphere" />
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-theme/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[32px] neon-bg text-black shadow-[0_0_50px_rgba(34,211,238,0.3)]"
        >
          <GraduationCap size={48} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl tracking-tighter uppercase mb-4 drop-shadow-[0_0_30px_rgba(var(--theme-color-rgb),0.5)]">
            Zen <span className="text-theme">Learning</span>
          </h1>
          <p className="text-white/40 text-base sm:text-lg md:text-xl max-w-md mx-auto mb-12 font-light tracking-wide">
            Master the CBSE Class 10 curriculum with precision and clarity.
          </p>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="group flex items-center gap-3 mx-auto px-8 py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-xs transition-all hover:bg-theme"
        >
          Start Learning
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 hidden md:block">
        <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20">Academic Year 2025-26</p>
      </div>
      <div className="absolute bottom-12 right-12 hidden md:block">
        <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20">CBSE Class 10 Portal</p>
      </div>
    </motion.div>
  );
};
