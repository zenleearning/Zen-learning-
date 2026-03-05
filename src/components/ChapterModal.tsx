import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookMarked, CheckCircle2, Volume2, VolumeX, Loader2, ChevronRight, HelpCircle, Lightbulb, FileText, Trophy } from 'lucide-react';
import { Chapter } from '../data/syllabus';

// Sound utility
const playSound = (type: 'click' | 'success' | 'tab') => {
  const sounds = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
    tab: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
  };
  const audio = new Audio(sounds[type]);
  audio.volume = 0.2;
  audio.play().catch(() => {}); // Ignore errors if audio blocked
};

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
  const [activeTab, setActiveTab] = useState<'read' | 'quiz'>('read');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (chapter) {
      const savedNotes = localStorage.getItem(`note_${chapter.id}`);
      const completedStatus = localStorage.getItem(`completed_${chapter.id}`);
      setNote(savedNotes || '');
      setIsCompleted(completedStatus === 'true');
      
      // Reset state for new chapter
      setActiveTab('read');
      setQuizAnswers({});
      setQuizSubmitted(false);
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
    playSound('click');
    localStorage.setItem(`note_${chapter.id}`, note);
    setShowSaveFeedback(true);
    setTimeout(() => setShowSaveFeedback(false), 2000);
  };

  const handleToggleCompleted = () => {
    if (!chapter) return;
    playSound('success');
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    localStorage.setItem(`completed_${chapter.id}`, String(newStatus));
  };

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    playSound('click');
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    playSound('success');
    setQuizSubmitted(true);
  };

  const handleClose = () => {
    playSound('click');
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
    readTab: language === 'EN' ? 'Read' : 'पढ़ें',
    quizTab: language === 'EN' ? 'Quiz' : 'क्विज़',
    submitQuiz: language === 'EN' ? 'Submit Quiz' : 'क्विज़ सबमिट करें',
    score: language === 'EN' ? 'Your Score' : 'आपका स्कोर',
    examples: language === 'EN' ? 'Examples' : 'उदाहरण',
  };

  return (
    <AnimatePresence>
      {chapter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-2xl overflow-hidden rounded-[32px] sm:rounded-[40px] glass-card shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 sm:p-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl transition-all",
                    isCompleted ? "bg-emerald-400 text-black" : "neon-bg text-black"
                  )}>
                    {isCompleted ? <CheckCircle2 size={20} className="sm:hidden" /> : <BookMarked size={20} className="sm:hidden" />}
                    {isCompleted ? <CheckCircle2 size={24} className="hidden sm:block" /> : <BookMarked size={24} className="hidden sm:block" />}
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-3xl tracking-tight leading-none">{chapter.name}</h3>
                    <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">
                      {isCompleted ? t.completed : 'Chapter Content'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { playSound('tab'); setActiveTab('read'); }}
                      className={cn(
                        "px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all",
                        activeTab === 'read' ? "bg-theme text-black" : "glass-morphism text-white/40 hover:text-white"
                      )}
                    >
                      {t.readTab}
                    </button>
                    {chapter.quiz && (
                      <button 
                        onClick={() => { playSound('tab'); setActiveTab('quiz'); }}
                        className={cn(
                          "px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all",
                          activeTab === 'quiz' ? "bg-theme text-black" : "glass-morphism text-white/40 hover:text-white"
                        )}
                      >
                        {t.quizTab}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 sm:h-8 w-px bg-white/10 mx-1 sm:mx-2" />
                    <button 
                      onClick={toggleSpeech}
                      className={cn(
                        "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all",
                        isSpeaking 
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-400 animate-pulse" 
                          : "glass-morphism text-white/40 hover:text-white"
                      )}
                      title={isSpeaking ? "Stop Listening" : "Listen to Chapter"}
                    >
                      {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button 
                      onClick={handleClose}
                      className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full glass-morphism text-white/40 hover:text-white transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {activeTab === 'read' ? (
                  <motion.div
                    key="read"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-12"
                  >
                    {/* Introduction */}
                    <div className="prose prose-invert max-w-none">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText size={16} className="text-theme" />
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-theme">Introduction</h4>
                      </div>
                      <p className="text-lg text-white/80 leading-relaxed font-light italic mb-8">
                        {chapter.content}
                      </p>
                      {chapter.sections && chapter.sections.length > 0 && (
                        <button 
                          onClick={() => {
                            playSound('click');
                            const firstSection = document.getElementById('section-0');
                            if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-theme text-black text-xs font-bold uppercase tracking-widest hover:scale-[1.02] transition-all"
                        >
                          Start Reading
                          <ChevronRight size={16} />
                        </button>
                      )}
                    </div>

                    {/* Sections */}
                    {chapter.sections?.map((section, idx) => (
                      <div key={idx} id={`section-${idx}`} className="space-y-4 pt-8">
                        <h4 className="text-xl font-display tracking-tight text-white/90">{section.title}</h4>
                        <p className="text-white/60 leading-relaxed">{section.content}</p>
                      </div>
                    ))}

                    {/* Examples */}
                    {chapter.examples && chapter.examples.length > 0 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Lightbulb size={16} className="text-amber-400" />
                          <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">{t.examples}</h4>
                        </div>
                        <div className="space-y-4">
                          {chapter.examples.map((ex, idx) => (
                            <div key={idx} className="rounded-3xl bg-white/5 p-6 border border-white/5">
                              <p className="text-sm font-bold text-white/40 mb-2 uppercase tracking-widest">Question {idx + 1}</p>
                              <p className="text-white/90 mb-4 font-medium">{ex.question}</p>
                              <div className="h-px w-full bg-white/5 mb-4" />
                              <p className="text-sm text-theme/80 font-mono">{ex.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    {chapter.summary && (
                      <div className="rounded-[32px] bg-theme/5 p-8 border border-theme/10">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-theme mb-4">{t.summary}</h4>
                        <p className="text-white/70 leading-relaxed">{chapter.summary}</p>
                      </div>
                    )}

                    {/* Topics Chips */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">{t.topics}</h4>
                      <div className="flex flex-wrap gap-2">
                        {chapter.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 rounded-xl glass-morphism px-4 py-2 text-xs text-white/60">
                            <CheckCircle2 size={14} className="text-theme" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <HelpCircle size={20} className="text-theme" />
                      <h4 className="text-xl font-display tracking-tight text-white/90">Knowledge Check</h4>
                    </div>

                    {chapter.quiz?.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-4">
                        <p className="text-white/90 font-medium">{qIdx + 1}. {q.question}</p>
                        <div className="grid grid-cols-1 gap-3">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = quizAnswers[qIdx] === oIdx;
                            const isCorrect = q.correctAnswer === oIdx;
                            const showResult = quizSubmitted;

                            return (
                              <button
                                key={oIdx}
                                disabled={quizSubmitted}
                                onClick={() => handleQuizAnswer(qIdx, oIdx)}
                                className={cn(
                                  "w-full p-4 rounded-2xl text-left text-sm transition-all border",
                                  isSelected && !showResult && "bg-theme/20 border-theme text-white",
                                  !isSelected && !showResult && "bg-white/5 border-white/5 text-white/60 hover:bg-white/10",
                                  showResult && isCorrect && "bg-emerald-500/20 border-emerald-500 text-emerald-400",
                                  showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500 text-red-400",
                                  showResult && !isSelected && !isCorrect && "opacity-40 bg-white/5 border-white/5"
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{opt}</span>
                                  {showResult && isCorrect && <CheckCircle2 size={16} />}
                                  {showResult && isSelected && !isCorrect && <X size={16} />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {!quizSubmitted ? (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(quizAnswers).length < (chapter.quiz?.length || 0)}
                        className="w-full py-4 rounded-2xl bg-theme text-black font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {t.submitQuiz}
                      </button>
                    ) : (
                      <div className="rounded-3xl bg-theme/10 p-8 text-center border border-theme/20">
                        <Trophy size={40} className="mx-auto text-theme mb-4" />
                        <h5 className="text-2xl font-display mb-2">{t.score}</h5>
                        <p className="text-4xl font-display text-theme">
                          {Object.entries(quizAnswers).filter(([idx, ans]) => chapter.quiz?.[Number(idx)].correctAnswer === ans).length} / {chapter.quiz?.length}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="h-px w-full bg-white/5 my-12" />

              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">{t.notes}</h4>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full h-32 rounded-2xl glass-morphism p-4 text-sm text-white/80 outline-none focus:border-theme/50 transition-all resize-none"
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
