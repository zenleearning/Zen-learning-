import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Palette, Bell, Trash2, Sliders, ShieldCheck, Zap } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
  visualEffects: boolean;
  setVisualEffects: (val: boolean) => void;
  autoPlayVideo: boolean;
  setAutoPlayVideo: (val: boolean) => void;
  animationIntensity: 'low' | 'medium' | 'high';
  setAnimationIntensity: (val: 'low' | 'medium' | 'high') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  language: 'EN' | 'HI';
  setLanguage: (val: 'EN' | 'HI') => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  isPremium?: boolean;
  onUpgrade?: () => void;
  onCancelPremium?: () => void;
}

const THEMES = [
  { name: 'Cyan', value: '#22d3ee' },
  { name: 'Emerald', value: '#34d399' },
  { name: 'Rose', value: '#fb7185' },
  { name: 'Amber', value: '#fbbf24' },
  { name: 'Violet', value: '#a78bfa' },
];

export function SettingsModal({ 
  isOpen, 
  onClose, 
  themeColor, 
  setThemeColor,
  visualEffects,
  setVisualEffects,
  autoPlayVideo,
  setAutoPlayVideo,
  animationIntensity,
  setAnimationIntensity,
  highContrast,
  setHighContrast,
  language,
  setLanguage,
  soundEnabled,
  setSoundEnabled,
  isPremium,
  onUpgrade,
  onCancelPremium
}: SettingsModalProps) {
  const [showCancelConfirm, setShowCancelConfirm] = React.useState(false);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This will clear your completed chapters.')) {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('completed_')) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="mb-6 sm:mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/5 text-white">
                  <Sliders size={18} className="sm:hidden" />
                  <Sliders size={20} className="hidden sm:block" />
                </div>
                <h2 className="font-display text-xl sm:text-2xl tracking-tight uppercase">Settings</h2>
              </div>
              <button 
                onClick={onClose}
                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Premium Status */}
              <div className="rounded-2xl bg-gradient-to-br from-theme/10 to-purple-500/10 border border-theme/20 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {isPremium ? (
                      <ShieldCheck size={18} className="text-emerald-400" />
                    ) : (
                      <Zap size={18} className="text-theme" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {isPremium ? 'Premium Active' : 'Free Version'}
                    </span>
                  </div>
                  {isPremium && (
                    <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Lifetime</span>
                  )}
                </div>
                
                {!isPremium ? (
                  <button 
                    onClick={onUpgrade}
                    className="w-full py-3 rounded-xl bg-theme text-black text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={14} />
                    Upgrade to Premium
                  </button>
                ) : (
                  <div className="space-y-4">
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      Thank you for supporting Zen Learning! You have full access to all features and zero ads.
                    </p>
                    
                    {!showCancelConfirm ? (
                      <button 
                        onClick={() => setShowCancelConfirm(true)}
                        className="w-full py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all"
                      >
                        Cancel Membership
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 space-y-3">
                        <p className="text-[9px] text-red-400 font-bold uppercase tracking-widest text-center">Are you sure?</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              onCancelPremium?.();
                              setShowCancelConfirm(false);
                            }}
                            className="flex-1 py-2 rounded-lg bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest"
                          >
                            Yes, Cancel
                          </button>
                          <button 
                            onClick={() => setShowCancelConfirm(false)}
                            className="flex-1 py-2 rounded-lg bg-white/5 text-white/60 text-[9px] font-bold uppercase tracking-widest"
                          >
                            No, Keep
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Theme Selection */}
              <div>
                <div className="mb-4 flex items-center gap-2 text-white/40">
                  <Palette size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Theme Color</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => setThemeColor(theme.value)}
                      className={`group relative h-12 w-12 rounded-2xl transition-all ${
                        themeColor === theme.value ? 'ring-2 ring-white ring-offset-4 ring-offset-black' : 'opacity-40 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: theme.value }}
                    >
                      {themeColor === theme.value && (
                        <motion.div 
                          layoutId="activeTheme"
                          className="absolute inset-0 rounded-2xl border-2 border-white"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div>
                <div className="mb-4 flex items-center gap-2 text-white/40">
                  <Bell size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Preferences</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Sound Effects</span>
                      <span className="text-[10px] text-white/40">UI interactions</span>
                    </div>
                    <button 
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`h-6 w-12 rounded-full p-1 transition-colors ${soundEnabled ? 'bg-theme' : 'bg-white/10'}`}
                    >
                      <motion.div 
                        animate={{ x: soundEnabled ? 24 : 0 }}
                        className="h-4 w-4 rounded-full bg-white shadow-sm"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Visual Effects</span>
                      <span className="text-[10px] text-white/40">CRT, Glitch & Scanlines</span>
                    </div>
                    <button 
                      onClick={() => setVisualEffects(!visualEffects)}
                      className={`h-6 w-12 rounded-full p-1 transition-colors ${visualEffects ? 'bg-theme' : 'bg-white/10'}`}
                    >
                      <motion.div 
                        animate={{ x: visualEffects ? 24 : 0 }}
                        className="h-4 w-4 rounded-full bg-white shadow-sm"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Auto-play Video</span>
                      <span className="text-[10px] text-white/40">Featured video loop</span>
                    </div>
                    <button 
                      onClick={() => setAutoPlayVideo(!autoPlayVideo)}
                      className={`h-6 w-12 rounded-full p-1 transition-colors ${autoPlayVideo ? 'bg-theme' : 'bg-white/10'}`}
                    >
                      <motion.div 
                        animate={{ x: autoPlayVideo ? 24 : 0 }}
                        className="h-4 w-4 rounded-full bg-white shadow-sm"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">High Contrast</span>
                      <span className="text-[10px] text-white/40">Better visibility</span>
                    </div>
                    <button 
                      onClick={() => setHighContrast(!highContrast)}
                      className={`h-6 w-12 rounded-full p-1 transition-colors ${highContrast ? 'bg-theme' : 'bg-white/10'}`}
                    >
                      <motion.div 
                        animate={{ x: highContrast ? 24 : 0 }}
                        className="h-4 w-4 rounded-full bg-white shadow-sm"
                      />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 rounded-2xl bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Language</span>
                      <span className="text-[10px] font-bold uppercase text-theme">{language === 'EN' ? 'English' : 'Hindi'}</span>
                    </div>
                    <div className="flex gap-2">
                      {(['EN', 'HI'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`flex-1 rounded-xl py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                            language === lang ? 'bg-theme text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'
                          }`}
                        >
                          {lang === 'EN' ? 'English' : 'Hindi'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 rounded-2xl bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Animation Intensity</span>
                      <span className="text-[10px] font-bold uppercase text-theme">{animationIntensity}</span>
                    </div>
                    <div className="flex gap-2">
                      {(['low', 'medium', 'high'] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setAnimationIntensity(level)}
                          className={`flex-1 rounded-xl py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                            animationIntensity === level ? 'bg-theme text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="pt-4">
                <div className="mb-4 flex items-center gap-2 text-red-500/60">
                  <Trash2 size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Danger Zone</span>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all uppercase tracking-widest"
                >
                  Reset All Progress
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Version 1.0.0 • Zen Learning</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
