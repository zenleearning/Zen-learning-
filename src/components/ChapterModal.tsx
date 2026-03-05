import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookMarked, CheckCircle2, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Chapter } from '../data/syllabus';

interface ChapterModalProps {
  chapter: Chapter | null;
  onClose: () => void;
  language: 'EN' | 'HI';
}

export const ChapterModal: React.FC<ChapterModalProps> = ({ chapter, onClose, language }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechInstance, setSpeechInstance] = useState<SpeechSynthesisUtterance | null>(null);
  const [note, setNote] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);

  useEffect(() => {
    if (chapter) {
      const savedNotes = localStorage.getItem(`note_${chapter.id}`);
      const completedStatus = localStorage.getItem(`completed_${chapter.id}`);
      setNote(savedNotes || '');
      setIsCompleted(completedStatus === 'true');
    }
  }, [chapter]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!chapter) return;

    const textToSpeak = `${chapter.name}. ${chapter.content}. Key topics include: ${chapter.topics.join(', ')}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Try to find a good natural voice based on language
    const voices = window.speechSynthesis.getVoices();
    const langCode = language === 'HI' ? 'hi-IN' : 'en-IN';
    const preferredVoice = voices.find(v => v.lang.startsWith(langCode)) || voices.find(v => v.lang.startsWith(language.toLowerCase())) || voices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.lang = langCode;

    window.speechSynthesis.speak(utterance);
    setSpeechInstance(utterance);
    setIsSpeaking(true);
  };

  const handleSaveNotes = () => {
    if (!chapter) return;
    localStorage.setItem(`note_${chapter.id}`, note);
    setShowSaveFeedback(true);
    setTimeout(() => setShowSaveFeedback(false), 2000);
  };

  const handleToggleCompleted = () => {
    if (!chapter) return;
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    localStorage.setItem(`completed_${chapter.id}`, String(newStatus));
  };

  const handleClose = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    onClose();
  };

  const t = {
    summary: language === 'EN' ? 'Detailed Summary' : 'विस्तृत सारांश',
    topics: language === 'EN' ? 'Topics Covered' : 'कवर किए गए विषय',
    notes: language === 'EN' ? 'Personal Notes' : 'व्यक्तिगत नोट्स',
    save: language === 'EN' ? 'Save Notes' : 'नोट्स सहेजें',
    saved: language === 'EN' ? 'Saved!' : 'सहेजा गया!',
    markDone: language === 'EN' ? 'Mark as Completed' : 'पूरा हुआ चिह्नित करें',
    completed: language === 'EN' ? 'Completed' : 'पूरा हुआ',
    placeholder: language === 'EN' ? 'Write your notes here...' : 'अपने नोट्स यहाँ लिखें...',
  };

  return (
    <AnimatePresence>
      {chapter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[40px] glass-card shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8 sm:p-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl transition-all",
                    isCompleted ? "bg-emerald-400 text-black" : "neon-bg text-black"
                  )}>
                    {isCompleted ? <CheckCircle2 size={24} /> : <BookMarked size={24} />}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl tracking-tight leading-none">{chapter.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">
                      {isCompleted ? t.completed : 'Chapter Content'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={toggleSpeech}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                      isSpeaking 
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-400 animate-pulse" 
                        : "glass-morphism text-white/40 hover:text-white"
                    )}
                    title={isSpeaking ? "Stop Listening" : "Listen to Chapter"}
                  >
                    {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button 
                    onClick={handleClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full glass-morphism transition-colors text-white/40 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">{t.summary}</h4>
                  {isSpeaking && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-cyan-400 animate-[bounce_1s_infinite_0ms]" />
                      <div className="w-1 h-5 bg-cyan-400 animate-[bounce_1s_infinite_200ms]" />
                      <div className="w-1 h-2 bg-cyan-400 animate-[bounce_1s_infinite_400ms]" />
                    </div>
                  )}
                </div>
                <p className="text-lg text-white/80 leading-relaxed font-light">
                  {chapter.content}
                </p>
              </div>

              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">{t.topics}</h4>
                <div className="flex flex-wrap gap-2">
                  {chapter.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl glass-morphism px-4 py-2 text-xs text-white/60">
                      <CheckCircle2 size={14} className="text-cyan-400" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">{t.notes}</h4>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full h-32 rounded-2xl glass-morphism p-4 text-sm text-white/80 outline-none focus:border-cyan-400/50 transition-all resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleToggleCompleted}
                  className={cn(
                    "flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all",
                    isCompleted 
                      ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/20" 
                      : "neon-bg text-black hover:scale-[1.02]"
                  )}
                >
                  {isCompleted ? t.completed : t.markDone}
                </button>
                <button 
                  onClick={handleSaveNotes}
                  className="flex-1 glass-morphism py-4 rounded-2xl text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors relative"
                >
                  {showSaveFeedback ? t.saved : t.save}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper for class names since it's not imported here
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
