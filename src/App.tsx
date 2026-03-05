import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu as MenuIcon, 
  X, 
  GraduationCap, 
  BookOpen, 
  ChevronRight, 
  Settings, 
  CheckCircle2, 
  Info, 
  Youtube, 
  History, 
  Trash2, 
  LayoutGrid, 
  Languages, 
  Volume2, 
  Download, 
  User as UserIcon, 
  LogOut,
  ArrowUp,
  ArrowLeft,
  BookMarked,
  Layout,
  Share2,
  Copy,
  ExternalLink,
  FileText,
  School
} from 'lucide-react';
import { SYLLABUS_DATA, UP_BOARD_DATA, Subject, Chapter } from './data/syllabus';
import { ChapterModal } from './components/ChapterModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SettingsModal } from './components/SettingsModal';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsPDF } from 'jspdf';
import { useAuth } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { AdBanner } from './components/AdBanner';
import { PremiumModal } from './components/PremiumModal';
import { ShieldCheck, Sparkles, Zap } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sound utility
const playSound = (type: 'click' | 'success' | 'tab' | 'hover') => {
  if (localStorage.getItem('sound_enabled') === 'false') return;
  
  const sounds = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
    tab: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    hover: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'
  };
  const audio = new Audio(sounds[type]);
  audio.volume = 0.1;
  audio.play().catch(() => {});
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check if user has already seen the welcome screen in this session
    return !sessionStorage.getItem('welcome_seen');
  });
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('sound_enabled');
    return saved === null ? true : saved === 'true';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeBoard, setActiveBoard] = useState<'CBSE' | 'UP_BOARD'>('CBSE');
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem('theme_color') || '#22d3ee');
  const [visualEffects, setVisualEffects] = useState(() => {
    const saved = localStorage.getItem('visual_effects');
    return saved === null ? true : saved === 'true';
  });
  const [autoPlayVideo, setAutoPlayVideo] = useState(() => {
    const saved = localStorage.getItem('autoplay_video');
    return saved === null ? true : saved === 'true';
  });
  const [animationIntensity, setAnimationIntensity] = useState<'low' | 'medium' | 'high'>(() => {
    return (localStorage.getItem('animation_intensity') as any) || 'medium';
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('search_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('high_contrast') === 'true';
  });
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem('is_premium') === 'true';
  });
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { user, logout } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '34, 211, 238';
    };

    document.documentElement.style.setProperty('--theme-color', themeColor);
    document.documentElement.style.setProperty('--theme-color-rgb', hexToRgb(themeColor));
    localStorage.setItem('theme_color', themeColor);
  }, [themeColor]);

  React.useEffect(() => {
    localStorage.setItem('visual_effects', visualEffects.toString());
  }, [visualEffects]);

  React.useEffect(() => {
    localStorage.setItem('autoplay_video', autoPlayVideo.toString());
  }, [autoPlayVideo]);

  React.useEffect(() => {
    localStorage.setItem('animation_intensity', animationIntensity);
    
    // Apply animation intensity to CSS
    const durations = {
      low: '0.1s',
      medium: '0.3s',
      high: '0.6s'
    };
    document.documentElement.style.setProperty('--animation-duration', durations[animationIntensity]);
  }, [animationIntensity]);

  React.useEffect(() => {
    localStorage.setItem('high_contrast', highContrast.toString());
  }, [highContrast]);

  React.useEffect(() => {
    localStorage.setItem('sound_enabled', soundEnabled.toString());
  }, [soundEnabled]);

  React.useEffect(() => {
    localStorage.setItem('search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5);
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search_history');
    showToastMessage(language === 'EN' ? 'Search history cleared' : 'खोज इतिहास साफ किया गया', 'info');
  };

  const showToastMessage = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem('welcome_seen', 'true');
  };

  const handlePremiumSuccess = () => {
    setIsPremium(true);
    localStorage.setItem('is_premium', 'true');
    showToastMessage(language === 'EN' ? 'Premium activated! Ads removed.' : 'प्रीमियम सक्रिय! विज्ञापन हटा दिए गए।', 'success');
    playSound('success');
  };

  const handleCancelPremium = () => {
    setIsPremium(false);
    localStorage.removeItem('is_premium');
    showToastMessage(language === 'EN' ? 'Premium membership cancelled.' : 'प्रीमियम सदस्यता रद्द कर दी गई।', 'info');
    playSound('click');
  };

  // Check for URL params on mount
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      handlePremiumSuccess();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get('payment') === 'cancel') {
      showToastMessage(language === 'EN' ? 'Payment cancelled.' : 'भुगतान रद्द कर दिया गया।', 'info');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [language]);

  const t = {
    title: language === 'EN' ? (activeBoard === 'CBSE' ? 'CBSE SYLLABUS' : 'UP BOARD SYLLABUS') : (activeBoard === 'CBSE' ? 'सीबीएसई पाठ्यक्रम' : 'यूपी बोर्ड पाठ्यक्रम'),
    subtitle: language === 'EN' 
      ? `Explore the complete ${activeBoard} Class 10 curriculum for the academic year 2025-26. No distractions, just pure learning.` 
      : `शैक्षणिक वर्ष 2025-26 के लिए पूर्ण ${activeBoard === 'CBSE' ? 'सीबीएसई' : 'यूपी बोर्ड'} कक्षा 10 पाठ्यक्रम का अन्वेषण करें। कोई ध्यान भटकाना नहीं, बस शुद्ध सीखना।`,
    searchPlaceholder: language === 'EN' ? 'Search subjects...' : 'विषय खोजें...',
    backBtn: language === 'EN' ? 'Back to Subjects' : 'विषयों पर वापस जाएं',
    curriculum: language === 'EN' ? 'Curriculum 2025-26' : 'पाठ्यक्रम 2025-26',
    chaptersCount: language === 'EN' ? 'Chapters Included' : 'अध्याय शामिल हैं',
    readyTitle: language === 'EN' ? 'Ready for Exams?' : 'परीक्षा के लिए तैयार?',
    readyDesc: language === 'EN' 
      ? `This syllabus is strictly based on the latest ${activeBoard} guidelines for Class 10. Focus on these topics to score 100%.` 
      : `यह पाठ्यक्रम सख्ती से कक्षा 10 के लिए नवीनतम ${activeBoard === 'CBSE' ? 'सीबीएसई' : 'यूपी बोर्ड'} दिशानिर्देशों पर आधारित है। 100% स्कोर करने के लिए इन विषयों पर ध्यान दें।`,
    downloadBtn: language === 'EN' ? 'Download PDF Guide' : 'पीडीएफ गाइड डाउनलोड करें',
    portal: language === 'EN' ? `${activeBoard} Class 10 Portal` : `${activeBoard === 'CBSE' ? 'सीबीएसई' : 'यूपी बोर्ड'} कक्षा 10 पोर्टल`,
    footer: language === 'EN' ? 'Zen Learning All rights reserved' : 'ज़ेन लर्निंग सर्वाधिकार सुरक्षित',
    menu: language === 'EN' ? 'Menu' : 'मेनू',
    boards: language === 'EN' ? 'Select Board' : 'बोर्ड चुनें',
    searchMain: language === 'EN' ? 'Search for subjects, chapters, or topics...' : 'विषय, अध्याय या टॉपिक खोजें...',
    noResults: language === 'EN' ? 'No results found' : 'कोई परिणाम नहीं मिला',
    searchHistory: language === 'EN' ? 'Search History' : 'खोज इतिहास',
    clearHistory: language === 'EN' ? 'Clear History' : 'इतिहास साफ करें',
  };

  const currentSyllabus = activeBoard === 'CBSE' ? SYLLABUS_DATA : UP_BOARD_DATA;

  const filteredSubjects = currentSyllabus.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.chapters.some(ch => ch.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDownloadPDF = () => {
    if (!selectedSubject) return;
    
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`${selectedSubject.name} - Syllabus 2025-26`, 20, 20);
    doc.setFontSize(12);
    doc.text(`CBSE Class 10 | Zen Learning`, 20, 30);
    
    let y = 50;
    selectedSubject.chapters.forEach((chapter, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${chapter.name}`, 20, y);
      y += 10;
      doc.setFontSize(10);
      const topics = chapter.topics.join(', ');
      const splitTopics = doc.splitTextToSize(`Topics: ${topics}`, 170);
      doc.text(splitTopics, 25, y);
      y += (splitTopics.length * 5) + 10;
    });
    
    doc.save(`${selectedSubject.name}_Syllabus_ZenLearning.pdf`);
  };

  return (
    <div className={cn(
      "min-h-screen bg-[#050505] text-white selection:bg-theme selection:text-black font-sans relative overflow-hidden",
      highContrast && "high-contrast"
    )}>
      <div className="atmosphere" />
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => { playSound('click'); setIsSidebarOpen(true); }}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl glass-morphism hover:bg-white/10 transition-all group focus:ring-2 focus:ring-theme/50 outline-none"
              title="Menu"
              aria-label="Open Menu"
            >
              <MenuIcon size={18} className="group-hover:scale-110 transition-transform" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => { playSound('click'); setSelectedSubject(null); setSelectedChapter(null); }}>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl neon-bg text-black group-hover:shadow-[0_0_30px_var(--theme-color)] transition-all">
                <GraduationCap size={18} className="sm:hidden" />
                <GraduationCap size={24} className="hidden sm:block" />
              </div>
              <div className="hidden xs:block">
                <h1 className="font-display text-base sm:text-2xl uppercase tracking-tighter leading-none group-hover:text-theme transition-colors">Zen Learning</h1>
                <p className="text-[7px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40">{t.portal}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-6">
            <div className="relative hidden lg:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-theme transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search subjects"
                className="h-10 w-48 xl:w-64 rounded-full glass-morphism pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-theme/30 border border-white/5 focus:border-theme/50 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button 
              onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl glass-morphism hover:bg-white/10 transition-all group focus:ring-2 focus:ring-theme/50 outline-none"
              title={language === 'EN' ? 'Switch to Hindi' : 'Switch to English'}
              aria-label={language === 'EN' ? 'Switch to Hindi' : 'Switch to English'}
            >
              <Languages size={16} className="text-theme group-hover:rotate-12 transition-transform sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">{language === 'EN' ? 'English' : 'हिंदी'}</span>
              <span className="sm:hidden text-[9px] font-bold uppercase tracking-widest">{language === 'EN' ? 'EN' : 'HI'}</span>
            </button>

            <button 
              onClick={() => { playSound('click'); setIsSettingsModalOpen(true); }}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl glass-morphism hover:bg-white/10 transition-all group focus:ring-2 focus:ring-theme/50 outline-none"
              title="Settings"
              aria-label="Open Settings"
            >
              <Settings size={16} className="group-hover:rotate-90 transition-transform duration-500 sm:w-[18px] sm:h-[18px]" />
            </button>

            {!isPremium && (
              <button 
                onClick={() => { playSound('click'); setIsPremiumModalOpen(true); }}
                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-theme to-purple-500 text-black hover:shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] transition-all group focus:ring-2 focus:ring-theme/50 outline-none"
                title="Remove Ads"
                aria-label="Remove Ads"
              >
                <Zap size={16} className="group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]" />
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-4">
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Welcome</p>
                  <p className="text-xs font-bold truncate max-w-[100px]">{user.displayName || user.email?.split('@')[0]}</p>
                </div>
                <button 
                  onClick={() => { logout(); showToastMessage(language === 'EN' ? 'Signed out successfully' : 'सफलतापूर्वक साइन आउट किया गया', 'info'); }}
                  className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl glass-morphism hover:bg-red-500/20 hover:text-red-400 transition-all group"
                  title="Sign Out"
                >
                  <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white text-black hover:bg-theme transition-all group"
              >
                <UserIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">Sign In</span>
                <span className="sm:hidden text-[9px] font-bold uppercase tracking-widest">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          {!selectedSubject ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-8 sm:mb-12 flex flex-col items-center text-center">
                {/* Large Animated Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.2
                  }}
                  className="mb-12 relative inline-block group"
                >
                  <div className="absolute -inset-4 bg-theme/20 rounded-full blur-2xl group-hover:bg-theme/40 transition-all duration-500 animate-pulse" />
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-20 w-20 sm:h-28 sm:w-28 rounded-3xl neon-bg flex items-center justify-center text-black shadow-[0_0_50px_rgba(var(--theme-color-rgb),0.5)] cursor-pointer"
                    aria-label="Zen Learning Logo"
                  >
                    <GraduationCap size={48} className="sm:hidden" />
                    <GraduationCap size={64} className="hidden sm:block" />
                    
                    {/* Decorative Rings */}
                    <motion.div 
                      animate={{ rotate: 360, opacity: [0.2, 0.5, 0.2] }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute -inset-3 border border-theme/30 rounded-[2rem] border-dashed"
                    />
                    <motion.div 
                      animate={{ rotate: -360, opacity: [0.1, 0.3, 0.1] }}
                      transition={{ 
                        rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute -inset-6 border border-theme/10 rounded-[2.5rem]"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.8 }}
                  className="mb-6"
                >
                  <h1 className="font-display text-3xl sm:text-5xl md:text-7xl uppercase tracking-[0.2em] text-white relative inline-block drop-shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.3)]">
                    Zen <span className="text-theme">Learning</span>
                    <motion.div 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: '100%', opacity: 1 }}
                      transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                      className="absolute -bottom-3 left-0 h-[2px] bg-gradient-to-r from-theme via-theme/50 to-transparent"
                    />
                  </h1>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-display text-xl sm:text-2xl md:text-3xl tracking-[0.4em] uppercase mb-12 text-white/40"
                >
                  {t.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-base sm:text-xl text-white/40 max-w-2xl mb-8 sm:mb-12"
                >
                  {t.subtitle}
                </motion.p>

                {/* Main Search Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative w-full max-w-3xl group mb-16 sm:mb-24 mx-auto"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-theme to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-focus-within:opacity-60" />
                  <div className="relative flex items-center glass-card rounded-2xl p-2 sm:p-3 border border-white/10 group-focus-within:border-theme/50 transition-all">
                    <Search className="ml-3 sm:ml-4 text-white/30 group-focus-within:text-theme transition-colors" size={24} />
                    <input 
                      type="text" 
                      placeholder={t.searchMain}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          addToHistory(searchQuery);
                        }
                      }}
                      aria-label="Main search subjects, chapters, or topics"
                      className="flex-1 bg-transparent border-none outline-none px-4 py-2 sm:py-3 text-base sm:text-xl font-medium placeholder:text-white/20"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <X size={20} className="text-white/40" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Featured Video Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 sm:mb-24 relative group"
              >
                {/* Dynamic Glow Background */}
                <div className="absolute -inset-4 bg-theme/20 rounded-[48px] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative rounded-[24px] sm:rounded-[40px] overflow-hidden glass-card aspect-video shadow-2xl border border-white/10 group-hover:border-theme/30 transition-colors duration-500">
                  {visualEffects && <div className="absolute inset-0 crt-overlay z-20 opacity-30" />}
                  <video 
                    autoPlay={autoPlayVideo}
                    muted 
                    loop 
                    playsInline
                    key={autoPlayVideo ? 'playing' : 'paused'}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all duration-1000 scale-105 group-hover:scale-100"
                    aria-hidden="true"
                    title="Background educational video"
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-children-in-a-classroom-studying-4416-large.mp4" type="video/mp4" />
                  </video>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-20">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <span className="h-px w-8 sm:w-12 bg-theme" />
                        <span className="text-theme text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.3em]">Future of Education</span>
                      </div>
                      <h3 className="font-display text-3xl sm:text-5xl md:text-8xl mb-4 sm:mb-6 leading-[0.85] uppercase">
                        Empowering <br />
                        <span className="text-theme">Young Minds</span>
                      </h3>
                      <p className="text-white/40 text-xs sm:text-sm md:text-lg max-w-xl leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                        Experience a revolutionary way of learning with our AI-enhanced curriculum and immersive study materials.
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Techy HUD Elements */}
                  <div className="absolute top-6 sm:top-10 right-6 sm:right-10 flex flex-col items-end gap-1 sm:gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                      <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-widest text-red-400">System Active</span>
                    </div>
                    <div className="font-mono text-[7px] sm:text-[9px] text-white/20 uppercase tracking-widest">
                      Signal: 100% Stable
                    </div>
                  </div>

                  {/* Floating Data Points */}
                  <div className="absolute top-1/4 left-10 hidden lg:block">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <motion.div 
                          key={i}
                          animate={{ x: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                          className="h-1 w-12 bg-theme/30 rounded-full"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Scanning Line & Tech Overlays */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-theme/50 to-transparent animate-scan" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
                    
                    {/* Corner Brackets */}
                    <div className="absolute top-6 sm:top-10 left-6 sm:left-10 border-l-2 border-t-2 border-theme/40 w-8 sm:w-12 h-8 sm:h-12 rounded-tl-lg sm:rounded-tl-xl" />
                    <div className="absolute top-6 sm:top-10 right-6 sm:right-10 border-r-2 border-t-2 border-theme/40 w-8 sm:w-12 h-8 sm:h-12 rounded-tr-lg sm:rounded-tr-xl" />
                    <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 border-l-2 border-b-2 border-theme/40 w-8 sm:w-12 h-8 sm:h-12 rounded-bl-lg sm:rounded-bl-xl" />
                    <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 border-r-2 border-b-2 border-theme/40 w-8 sm:w-12 h-8 sm:h-12 rounded-br-lg sm:rounded-br-xl" />
                  </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] glass-morphism rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-around border border-white/10 shadow-xl">
                  <div className="text-center">
                    <p className="text-[8px] sm:text-[10px] text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1">Students</p>
                    <p className="font-display text-base sm:text-xl">10K+</p>
                  </div>
                  <div className="h-6 sm:h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <p className="text-[8px] sm:text-[10px] text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1">Success Rate</p>
                    <p className="font-display text-base sm:text-xl text-theme">99%</p>
                  </div>
                  <div className="h-6 sm:h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <p className="text-[8px] sm:text-[10px] text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1">Resources</p>
                    <p className="font-display text-base sm:text-xl">500+</p>
                  </div>
                </div>
              </motion.div>

              {/* Subjects Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-2"
              >
                {filteredSubjects.map((subject, index) => (
                  <React.Fragment key={subject.id}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onMouseEnter={() => playSound('hover')}
                      onClick={() => { playSound('click'); setSelectedSubject(subject); }}
                      className={cn(
                        "group relative cursor-pointer overflow-hidden rounded-[24px] sm:rounded-[32px] glass-card p-6 sm:p-8 transition-all focus:ring-2 focus:ring-theme/50 outline-none",
                        visualEffects && "glitch-hover"
                      )}
                      role="button"
                      aria-label={`View ${subject.name} syllabus`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          playSound('click');
                          setSelectedSubject(subject);
                        }
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div 
                        className="absolute top-0 right-0 h-24 w-24 sm:h-32 sm:w-32 opacity-10 blur-3xl transition-opacity group-hover:opacity-20"
                        style={{ backgroundColor: subject.color }}
                      />
                      <div className="relative z-10">
                        <div 
                          className="mb-4 sm:mb-6 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl"
                          style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                        >
                          <BookOpen size={20} className="sm:hidden" />
                          <BookOpen size={28} className="hidden sm:block" />
                        </div>
                        <h3 className="mb-1 sm:mb-2 font-display text-2xl sm:text-4xl tracking-tight">{subject.name}</h3>
                        <p className="mb-6 sm:mb-8 text-xs sm:text-base text-white/40 leading-relaxed line-clamp-2 sm:line-clamp-none">{subject.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs font-mono text-white/20 uppercase tracking-widest">
                            {subject.chapters.length} {t.chaptersCount}
                          </span>
                          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full glass-morphism group-hover:bg-white group-hover:text-black transition-all">
                            <ChevronRight size={16} sm:size={20} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    {/* Inject Ad after every 2 subjects if not premium */}
                    {!isPremium && (index + 1) % 2 === 0 && (
                      <AdBanner className="md:col-span-2" />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>

              {filteredSubjects.length === 0 && (
                <div className="mt-20 text-center p-12 glass-card rounded-[32px] border border-white/5">
                  <Search size={48} className="mx-auto text-white/10 mb-4" />
                  <p className="text-xl text-white/40 font-medium">{t.noResults}</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <button 
                  onClick={() => { playSound('click'); setSelectedSubject(null); }}
                  className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group focus:ring-2 focus:ring-theme/50 outline-none rounded-lg px-2 py-1"
                  aria-label="Back to subjects"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-bold uppercase tracking-widest">{t.backBtn}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showToastMessage(language === 'EN' ? 'Link copied to clipboard' : 'लिंक क्लिपबोर्ड पर कॉपी किया गया');
                      playSound('success');
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl glass-morphism hover:bg-white/10 transition-all text-white/40 hover:text-white"
                    title="Share Syllabus"
                    aria-label="Share Syllabus"
                  >
                    <Share2 size={18} />
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-theme text-black text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.3)]"
                    aria-label="Download PDF Guide"
                  >
                    <Download size={16} />
                    <span className="hidden sm:inline">{t.downloadBtn}</span>
                  </button>
                </div>
              </div>

              <div className="mb-10 sm:mb-16">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div 
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedSubject.color}20`, color: selectedSubject.color }}
                  >
                    <BookMarked size={20} className="sm:hidden" />
                    <BookMarked size={24} className="hidden sm:block" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/40">{t.curriculum}</span>
                </div>
                <h2 className="font-display text-4xl sm:text-7xl tracking-tighter mb-4 sm:mb-6">{selectedSubject.name}</h2>
                <p className="text-base sm:text-xl text-white/40 leading-relaxed line-clamp-3 sm:line-clamp-none">{selectedSubject.description}</p>
                {!isPremium && <AdBanner className="mt-8" />}
              </div>

              <div className="space-y-3 sm:space-y-4">
                {selectedSubject.chapters.map((chapter, idx) => {
                  const isCompleted = localStorage.getItem(`completed_${chapter.id}`) === 'true';
                  return (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onMouseEnter={() => playSound('hover')}
                      onClick={() => { playSound('click'); setSelectedChapter(chapter); }}
                      className={cn(
                        "group cursor-pointer rounded-[20px] sm:rounded-[24px] glass-card p-4 sm:p-6 transition-all hover:bg-white/[0.06] focus:ring-2 focus:ring-theme/50 outline-none",
                        isCompleted ? "border-emerald-400/20 bg-emerald-400/5" : ""
                      )}
                      role="button"
                      aria-label={`Read chapter: ${chapter.name}`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          playSound('click');
                          setSelectedChapter(chapter);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="font-mono text-[10px] sm:text-xs text-white/20">{(idx + 1).toString().padStart(2, '0')}</span>
                          <h4 className={cn(
                            "text-lg sm:text-xl font-bold tracking-tight transition-colors",
                            isCompleted ? "text-emerald-400" : "group-hover:text-theme"
                          )}>
                            {chapter.name}
                            {isCompleted && <span className="ml-2 text-[8px] sm:text-[10px] uppercase tracking-widest opacity-60">(Done)</span>}
                          </h4>
                        </div>
                        <div className={cn(
                          "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl transition-all",
                          isCompleted ? "bg-emerald-400 text-black" : "glass-morphism group-hover:bg-theme group-hover:text-black"
                        )}>
                          {isCompleted ? <CheckCircle2 size={16} className="sm:hidden" /> : <BookMarked size={16} className="sm:hidden" />}
                          {isCompleted ? <CheckCircle2 size={18} className="hidden sm:block" /> : <BookMarked size={18} className="hidden sm:block" />}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 sm:mt-6">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {chapter.topics.slice(0, 2).map((topic, tIdx) => (
                            <span 
                              key={tIdx}
                              className="rounded-full glass-morphism px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40"
                            >
                              {topic}
                            </span>
                          ))}
                          {chapter.topics.length > 2 && (
                            <span className="rounded-full glass-morphism px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40">
                              +{chapter.topics.length - 2}
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            playSound('click');
                            setSelectedChapter(chapter);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg sm:rounded-xl bg-theme/10 text-theme text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hover:bg-theme hover:text-black transition-all"
                        >
                          Read Chapter
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-20 rounded-[40px] border border-theme/20 bg-theme/5 p-12 text-center">
                <Layout className="mx-auto mb-6 text-theme" size={48} />
                <h3 className="font-display text-4xl mb-4">{t.readyTitle}</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">{t.readyDesc}</p>
                <button 
                  onClick={handleDownloadPDF}
                  className="glass-morphism px-8 py-4 rounded-2xl text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-2 mx-auto"
                >
                  <Download size={16} />
                  {t.downloadBtn}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-[70] h-full w-72 sm:w-80 bg-[#0a0a0a] border-r border-white/10 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg neon-bg flex items-center justify-center text-black">
                    <GraduationCap size={18} />
                  </div>
                  <span className="font-display text-xl uppercase tracking-tighter">Zen Menu</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-lg glass-morphism hover:bg-white/10 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">{t.boards}</p>
                  <div className="space-y-2">
                    <button 
                      onClick={() => { playSound('click'); setActiveBoard('CBSE'); setIsSidebarOpen(false); setSelectedSubject(null); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border",
                        activeBoard === 'CBSE' 
                          ? "bg-theme/10 border-theme/30 text-theme" 
                          : "bg-white/5 border-transparent hover:bg-white/10 text-white/60"
                      )}
                    >
                      <School size={18} />
                      <span className="text-sm font-bold uppercase tracking-widest">CBSE Board</span>
                      {activeBoard === 'CBSE' && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-theme shadow-[0_0_10px_var(--theme-color)]" />}
                    </button>
                    <button 
                      onClick={() => { playSound('click'); setActiveBoard('UP_BOARD'); setIsSidebarOpen(false); setSelectedSubject(null); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border",
                        activeBoard === 'UP_BOARD' 
                          ? "bg-theme/10 border-theme/30 text-theme" 
                          : "bg-white/5 border-transparent hover:bg-white/10 text-white/60"
                      )}
                    >
                      <School size={18} />
                      <span className="text-sm font-bold uppercase tracking-widest">UP Board</span>
                      {activeBoard === 'UP_BOARD' && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-theme shadow-[0_0_10px_var(--theme-color)]" />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Quick Links</p>
                  <div className="space-y-2">
                    <button 
                      onClick={() => { setIsSidebarOpen(false); setSelectedSubject(null); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 transition-all"
                    >
                      <LayoutGrid size={18} />
                      <span className="text-sm font-bold uppercase tracking-widest">All Subjects</span>
                    </button>
                    <button 
                      onClick={() => { setIsSidebarOpen(false); setIsSettingsModalOpen(true); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 transition-all"
                    >
                      <Settings size={18} />
                      <span className="text-sm font-bold uppercase tracking-widest">Settings</span>
                    </button>
                  </div>
                </div>

                {searchHistory.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{t.searchHistory}</p>
                      <button 
                        onClick={clearHistory}
                        className="text-[8px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={10} />
                        {t.clearHistory}
                      </button>
                    </div>
                    <div className="space-y-1">
                      {searchHistory.map((query, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setSearchQuery(query);
                            setIsSidebarOpen(false);
                            playSound('click');
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all group"
                        >
                          <History size={14} className="group-hover:text-theme transition-colors" />
                          <span className="text-xs truncate">{query}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                {!isPremium ? (
                  <button 
                    onClick={() => { setIsSidebarOpen(false); setIsPremiumModalOpen(true); }}
                    className="w-full p-4 rounded-2xl bg-gradient-to-br from-theme/20 to-purple-500/20 border border-theme/30 text-left group hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={14} className="text-theme animate-pulse" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-theme">Go Premium</p>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed mb-3">
                      Remove all ads and unlock exclusive study materials.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">₹499 Only</span>
                      <div className="h-6 w-6 rounded-full bg-theme text-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Premium Active</p>
                      <p className="text-[8px] text-white/40 uppercase tracking-widest">Lifetime Access</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] h-12 w-12 rounded-full glass-morphism border border-theme/30 flex items-center justify-center text-theme shadow-2xl hover:bg-theme hover:text-black transition-all group"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <ChapterModal 
        chapter={selectedChapter} 
        onClose={() => setSelectedChapter(null)} 
        language={language}
        isPremium={isPremium}
        onComplete={(chapterName) => {
          showToastMessage(language === 'EN' ? `Chapter "${chapterName}" completed!` : `अध्याय "${chapterName}" पूरा हुआ!`);
        }}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(msg) => showToastMessage(msg)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        visualEffects={visualEffects}
        setVisualEffects={setVisualEffects}
        autoPlayVideo={autoPlayVideo}
        setAutoPlayVideo={setAutoPlayVideo}
        animationIntensity={animationIntensity}
        setAnimationIntensity={setAnimationIntensity}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        language={language}
        setLanguage={setLanguage}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        isPremium={isPremium}
        onUpgrade={() => {
          setIsSettingsModalOpen(false);
          setIsPremiumModalOpen(true);
        }}
        onCancelPremium={handleCancelPremium}
      />

      <PremiumModal 
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onSuccess={handlePremiumSuccess}
      />


      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-2xl glass-morphism border border-theme/30 shadow-2xl flex items-center gap-3"
          >
            <div className="h-6 w-6 rounded-full bg-theme/20 flex items-center justify-center text-theme">
              <CheckCircle2 size={14} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/40 backdrop-blur-3xl">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-white/20">
            <Info size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{t.footer}</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <a href="https://youtube.com/@therexylion?si=gSBns7IskP4r0SNg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <Youtube size={14} />
              The Rexy Lion
            </a>
            <a href="https://youtube.com/@obito_hashira?si=HrUYhCIV-6GCXvS0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <Youtube size={14} />
              Obito Hashira
            </a>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <button onClick={() => alert('Coming Soon!')} className="hover:text-white transition-colors">Sample Papers</button>
            <button onClick={() => alert('Coming Soon!')} className="hover:text-white transition-colors">Previous Year</button>
            <button onClick={() => alert('Coming Soon!')} className="hover:text-white transition-colors">NCERT Solutions</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
