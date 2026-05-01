import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, PlayCircle, Trophy, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../lib/AuthContext';
import { dailyChallenges, Question } from '../data/challenges';

export function Learn() {
  const { profile, updateProfile, incrementPoints } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Question | null>(null);

  useEffect(() => {
    // Pick a random question based on current date to keep it 'daily'
    // or just random every time they enter the view
    const today = new Date().toDateString();
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % dailyChallenges.length;
    setCurrentQuiz(dailyChallenges[index]);
  }, []);

  const refreshQuiz = () => {
    const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
    setCurrentQuiz(dailyChallenges[randomIndex]);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const [sprints, setSprints] = useState([
    { id: 'dsa', title: 'Data Structures & Algos', level: 'Intermediate', progress: 40, color: 'bg-indigo-500' },
    { id: 'system', title: 'System Design Basics', level: 'Advanced', progress: 10, color: 'bg-emerald-500' },
    { id: 'frontend', title: 'Frontend Fundamentals', level: 'Beginner', progress: 100, color: 'bg-purple-500' }
  ]);

  const handleSprintClick = async (id: string) => {
    setSprints(prev => prev.map(s => {
      if (s.id === id && s.progress < 100) {
        const newProgress = Math.min(s.progress + 20, 100);
        if (newProgress === 100) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#10b981', '#a855f7']
          });
          incrementPoints(150);
        }
        return { ...s, progress: newProgress };
      }
      return s;
    }));
  };

  const handleQuizSubmit = async (index: number) => {
    if (!currentQuiz) return;
    setSelectedOption(index);
    const correct = index === currentQuiz.correct;
    setIsCorrect(correct);
    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981']
      });
      await incrementPoints(50);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="p-6 space-y-8 pb-32 theme-learn">
      <header className="pt-8 flex flex-col items-center sm:items-start">
        <div className="flex items-center gap-3 mb-2">
           <Trophy size={18} className="text-emerald-400" />
           <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Arena & Core Modules</h1>
        </div>
        <h2 className="text-3xl font-display font-bold text-white tracking-tight premium-gradient-text">Growth Engine</h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Staggered Competency Sprints</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {!showQuiz ? (
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card flex items-center justify-between !py-4 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 z-10">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Book size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Daily Intelligence</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sync +50 XP</p>
                </div>
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white !py-2.5 !px-6 !text-[10px] rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/20 z-10"
              >
                Execute
              </button>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
              <div className="flex items-center justify-between px-1 mb-4">
                <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase flex items-center gap-2">
                  Path Specialization
                </h3>
                <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/10 uppercase">Live</span>
              </div>
              
              {sprints.map((path) => (
                <motion.div 
                  key={path.id} 
                  variants={item}
                  onClick={() => handleSprintClick(path.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`glass-card relative overflow-hidden flex justify-between items-center !p-6 cursor-pointer transition-all hover:bg-white/[0.05] ${path.progress === 100 ? 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : ''}`}
                >
                  <div className="z-10 px-1">
                    <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{path.title}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase mt-1 tracking-widest">{path.level}</p>
                  </div>
                  <div className="flex items-center gap-3 z-10">
                    {path.progress === 100 ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                      >
                        <CheckCircle2 className="text-emerald-400" size={24} />
                      </motion.div>
                    ) : (
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all">
                        <PlayCircle size={20} />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 h-[3px] bg-white/5 w-full">
                    <motion.div 
                      className={`h-full ${path.id === 'system' ? 'bg-emerald-500' : path.id === 'dsa' ? 'bg-indigo-500' : 'bg-purple-500'} shadow-[0_0_15px_rgba(16,185,129,0.5)]`} 
                      initial={{ width: 0 }}
                      animate={{ width: `${path.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card !rounded-[40px] p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Book size={100} className="text-emerald-400" />
            </div>
            <div className="mb-8 relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Knowledge Gate</span>
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Protocol {currentQuiz?.id || '1'}/60</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight tracking-tight">{currentQuiz?.question}</h2>
            </div>

            <div className="space-y-4 relative z-10">
              {currentQuiz?.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={isCorrect !== null}
                  onClick={() => handleQuizSubmit(i)}
                  className={`w-full text-left p-5 rounded-[28px] border transition-all duration-500 group ${
                    selectedOption === i
                      ? isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        : 'bg-rose-500/10 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.1)]'
                      : 'bg-white/5 border-white/5 hover:bg-white/[0.08] text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-tight">{opt}</span>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                       selectedOption === i ? 'border-current scale-110' : 'border-white/10 group-hover:border-white/30'
                    }`} />
                  </div>
                </button>
              ))}
            </div>

            {isCorrect !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 text-center relative z-10">
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg ${
                  isCorrect ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {isCorrect ? 'Validation Success: +50 XP' : 'Logical Fragment Lost'}
                </div>
                
                {!isCorrect && (
                  <p className="text-slate-500 text-xs italic mb-8 px-6 leading-relaxed">
                    "{currentQuiz?.explanation}"
                  </p>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setShowQuiz(false);
                      setIsCorrect(null);
                      setSelectedOption(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-[28px] w-full uppercase tracking-[0.3em] transition-all shadow-xl shadow-emerald-900/30"
                  >
                    Return to Arena
                  </button>
                  
                  {isCorrect === false && (
                    <button
                      onClick={refreshQuiz}
                      className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-400 text-[9px] font-black uppercase tracking-widest transition-all p-2"
                    >
                      <RotateCcw size={12} /> Try New Signal
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
