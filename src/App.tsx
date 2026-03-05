import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Search, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Layout, 
  Info,
  ArrowLeft,
  BookMarked,
  X,
  Youtube,
  Settings
} from 'lucide-react';
import { SYLLABUS_DATA, Subject, Chapter } from './data/syllabus';
import { ChapterModal } from './components/ChapterModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SettingsModal } from './components/SettingsModal';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Languages, Volume2, Download, User as UserIcon, LogOut } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useAuth } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { SpeedInsights } from '@vercel/speed-insights/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check if user has already seen the welcome screen in this session
    return !sessionStorage.getItem('welcome_seen');
  });
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
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
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('high_contrast') === 'true';
  });
  const { user, logout } = useAuth();

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

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem('welcome_seen', 'true');
  };

  const t = {
    title: language === 'EN' ? 'FULL SYLLABUS' : 'पूरा पाठ्यक्रम',
    subtitle: language === 'EN' ? 'Explore the complete CBSE Class 10 curriculum for the academic year 2025-26. No distractions, just pure learning.' : 'शैक्षणिक वर्ष 2025-26 के लिए पूर्ण सीबीएसई कक्षा 10 पाठ्यक्रम का अन्वेषण करें। कोई ध्यान भटकाना नहीं, बस शुद्ध सीखना।',
    searchPlaceholder: language === 'EN' ? 'Search subjects...' : 'विषय खोजें...',
    backBtn: language === 'EN' ? 'Back to Subjects' : 'विषयों पर वापस जाएं',
    curriculum: language === 'EN' ? 'Curriculum 2025-26' : 'पाठ्यक्रम 2025-26',
    chaptersCount: language === 'EN' ? 'Chapters Included' : 'अध्याय शामिल हैं',
    readyTitle: language === 'EN' ? 'Ready for Exams?' : 'परीक्षा के लिए तैयार?',
    readyDesc: language === 'EN' ? 'This syllabus is strictly based on the latest CBSE guidelines for Class 10. Focus on these topics to score 100%.' : 'यह पाठ्यक्रम सख्ती से कक्षा 10 के लिए नवीनतम सीबीएसई दिशानिर्देशों पर आधारित है। 100% स्कोर करने के लिए इन विषयों पर ध्यान दें।',
    downloadBtn: language === 'EN' ? 'Download PDF Guide' : 'पीडीएफ गाइड डाउनलोड करें',
    portal: language === 'EN' ? 'CBSE Class 10 Portal' : 'सीबीएसई कक्षा 10 पोर्टल',
    footer: language === 'EN' ? 'Zen Learning All rights reserved' : 'ज़ेन लर्निंग सर्वाधिकार सुरक्षित',
  };

  const filteredSubjects = SYLLABUS_DATA.filter(sub => 
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
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setSelectedSubject(null); setSelectedChapter(null); }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl neon-bg text-black group-hover:shadow-[0_0_30px_var(--theme-color)] transition-all">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="font-display text-2xl uppercase tracking-tighter leading-none group-hover:text-theme transition-colors">Zen Learning</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t.portal}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-64 rounded-full glass-morphism pl-10 pr-4 text-sm outline-none focus:border-theme/50 transition-all"
              />
            </div>

            <button 
              onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass-morphism hover:bg-white/10 transition-all group"
            >
              <Languages size={18} className="text-theme group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">{language === 'EN' ? 'English' : 'हिंदी'}</span>
            </button>

            <button 
              onClick={() => setIsSettingsModalOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl glass-morphism hover:bg-white/10 transition-all group"
              title="Settings"
            >
              <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Welcome</p>
                  <p className="text-xs font-bold truncate max-w-[100px]">{user.displayName || user.email?.split('@')[0]}</p>
                </div>
                <button 
                  onClick={() => logout()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl glass-morphism hover:bg-red-500/20 hover:text-red-400 transition-all group"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-theme transition-all group"
              >
                <UserIcon size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Sign In</span>
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
              <div className="mb-12">
                <h2 className="font-display text-6xl tracking-tighter md:text-8xl mb-4">{t.title}</h2>
                <p className="text-xl text-white/40 max-w-2xl">{t.subtitle}</p>
              </div>

              {/* Featured Video Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-24 relative group"
              >
                {/* Dynamic Glow Background */}
                <div className="absolute -inset-4 bg-theme/20 rounded-[48px] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative rounded-[40px] overflow-hidden glass-card aspect-video shadow-2xl border border-white/10 group-hover:border-theme/30 transition-colors duration-500">
                  {visualEffects && <div className="absolute inset-0 crt-overlay z-20 opacity-30" />}
                  <video 
                    autoPlay={autoPlayVideo}
                    muted 
                    loop 
                    playsInline
                    key={autoPlayVideo ? 'playing' : 'paused'}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all duration-1000 scale-105 group-hover:scale-100"
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-children-in-a-classroom-studying-4416-large.mp4" type="video/mp4" />
                  </video>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 md:p-20">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span className="h-px w-12 bg-theme" />
                        <span className="text-theme text-[10px] font-bold uppercase tracking-[0.3em]">Future of Education</span>
                      </div>
                      <h3 className="font-display text-5xl md:text-8xl mb-6 leading-[0.85] uppercase">
                        Empowering <br />
                        <span className="text-theme">Young Minds</span>
                      </h3>
                      <p className="text-white/40 text-sm md:text-lg max-w-xl leading-relaxed font-light">
                        Experience a revolutionary way of learning with our AI-enhanced curriculum and immersive study materials.
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Techy HUD Elements */}
                  <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">System Active</span>
                    </div>
                    <div className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
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
                    <div className="absolute top-10 left-10 border-l-2 border-t-2 border-theme/40 w-12 h-12 rounded-tl-xl" />
                    <div className="absolute top-10 right-10 border-r-2 border-t-2 border-theme/40 w-12 h-12 rounded-tr-xl" />
                    <div className="absolute bottom-10 left-10 border-l-2 border-b-2 border-theme/40 w-12 h-12 rounded-bl-xl" />
                    <div className="absolute bottom-10 right-10 border-r-2 border-b-2 border-theme/40 w-12 h-12 rounded-br-xl" />
                  </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] glass-morphism rounded-2xl p-4 flex items-center justify-around border border-white/10 shadow-xl">
                  <div className="text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Students</p>
                    <p className="font-display text-xl">10K+</p>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Success Rate</p>
                    <p className="font-display text-xl text-theme">99%</p>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Resources</p>
                    <p className="font-display text-xl">500+</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {filteredSubjects.map((subject) => (
                  <motion.div
                    key={subject.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedSubject(subject)}
                    className={cn(
                      "group relative cursor-pointer overflow-hidden rounded-[32px] glass-card p-8 transition-all",
                      visualEffects && "glitch-hover"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div 
                      className="absolute top-0 right-0 h-32 w-32 opacity-10 blur-3xl transition-opacity group-hover:opacity-20"
                      style={{ backgroundColor: subject.color }}
                    />
                    <div className="relative z-10">
                      <div 
                        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                      >
                        <BookOpen size={28} />
                      </div>
                      <h3 className="mb-2 font-display text-4xl tracking-tight">{subject.name}</h3>
                      <p className="mb-8 text-white/40 leading-relaxed">{subject.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-white/20 uppercase tracking-widest">
                          {subject.chapters.length} {t.chaptersCount}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full glass-morphism group-hover:bg-white group-hover:text-black transition-all">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setSelectedSubject(null)}
                className="mb-12 flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-widest">{t.backBtn}</span>
              </button>

              <div className="mb-16">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedSubject.color}20`, color: selectedSubject.color }}
                  >
                    <BookMarked size={24} />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">{t.curriculum}</span>
                </div>
                <h2 className="font-display text-7xl tracking-tighter mb-6">{selectedSubject.name}</h2>
                <p className="text-xl text-white/40 leading-relaxed">{selectedSubject.description}</p>
              </div>

              <div className="space-y-4">
                {selectedSubject.chapters.map((chapter, idx) => {
                  const isCompleted = localStorage.getItem(`completed_${chapter.id}`) === 'true';
                  return (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedChapter(chapter)}
                      className={cn(
                        "group cursor-pointer rounded-[24px] glass-card p-6 transition-all hover:bg-white/[0.06]",
                        isCompleted ? "border-emerald-400/20 bg-emerald-400/5" : ""
                      )}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-white/20">{(idx + 1).toString().padStart(2, '0')}</span>
                          <h4 className={cn(
                            "text-xl font-bold tracking-tight transition-colors",
                            isCompleted ? "text-emerald-400" : "group-hover:text-theme"
                          )}>
                            {chapter.name}
                            {isCompleted && <span className="ml-2 text-[10px] uppercase tracking-widest opacity-60">(Done)</span>}
                          </h4>
                        </div>
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                          isCompleted ? "bg-emerald-400 text-black" : "glass-morphism group-hover:bg-theme group-hover:text-black"
                        )}>
                          {isCompleted ? <CheckCircle2 size={18} /> : <BookMarked size={18} />}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pl-10">
                        {chapter.topics.map((topic, tIdx) => (
                          <span 
                            key={tIdx}
                            className="rounded-full glass-morphism px-3 py-1 text-[10px] uppercase tracking-widest text-white/40"
                          >
                            {topic}
                          </span>
                        ))}
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

      <ChapterModal 
        chapter={selectedChapter} 
        onClose={() => setSelectedChapter(null)} 
        language={language}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
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
      />


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
      <SpeedInsights />
    </div>
  );
}
