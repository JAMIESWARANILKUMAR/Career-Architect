import { useState } from 'react';
import { Search, MapPin, Briefcase, Sparkles, Filter, ChevronRight, DollarSign, Globe, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { ai, MODELS } from '../lib/gemini';
import { useAuth } from '../lib/AuthContext';
import { MOCK_JOBS, Job } from '../constants/jobs';

export function Jobs() {
  const { profile, updateProfile, incrementPoints, incrementApplications } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [pitch, setPitch] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [liveFreq, setLiveFreq] = useState(98.42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFreq(prev => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredJobs = MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.score - a.score);

  const handleApplyAI = async (job: Job) => {
    setAnalyzingId(job.id);
    setSelectedJobId(job.id);
    setPitch(null);
    try {
      const response = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: `Act as a professional recruiter. Compare this candidate's profile with this job description.
        Candidate Role: ${profile.targetRole}
        Candidate Industry: ${profile.targetIndustry}
        Job: ${job.title} at ${job.company}
        
        Write a 3-sentence "Elevator Pitch" for this application. Keep it punchy and highlight why they are a perfect fit.`,
      });
      setPitch(response.text || "Match found! You have the right skills for this role.");
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleApplyNow = async (job: Job) => {
    await Promise.all([
      incrementApplications(),
      incrementPoints(50)
    ]);
    window.open(job.url, '_blank', 'noreferrer');
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring' as const, 
        stiffness: 100 
      } 
    }
  };

  return (
    <div className="p-6 space-y-10 pb-32 overflow-hidden relative">
      {/* Background Wireframe Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-10 space-y-6"
      >
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-1 h-3 bg-blue-500/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">Live Frequency</span>
            </div>
            <h1 className="text-4xl font-light text-white tracking-tight leading-none">Job Pulse</h1>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Signal Strength</p>
            <p className="text-white font-mono text-xl tracking-tighter">
              <AnimatePresence mode="wait">
                <motion.span
                  key={liveFreq}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                >
                  {liveFreq}
                </motion.span>
              </AnimatePresence>
              <span className="text-[10px] text-blue-400 font-bold ml-0.5">MHz</span>
            </p>
          </div>
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 flex items-start gap-4 group/card hover:bg-white/[0.04] transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-full bg-blue-500/5 -skew-x-12 translate-x-12" />
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 overflow-hidden relative">
              <TrendingUp size={18} className="relative z-10" />
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Market Sentiment</p>
              <p className="text-sm text-slate-200 font-medium leading-snug">"Candidate surplus in <span className="text-white font-bold">FE</span>, deficit in <span className="text-blue-400 font-bold">Cloud</span>."</p>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 flex items-start gap-4 group/card hover:bg-white/[0.04] transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-full bg-emerald-500/5 -skew-x-12 translate-x-12" />
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Zap size={18} />
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest leading-none mb-1">AI Recommendation</p>
              <p className="text-sm text-slate-200 font-medium leading-snug">"Focus on <span className="text-white font-bold">Vercel</span> for <span className="text-emerald-400 font-bold">95%+ matches</span>."</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={`Probe market for roles...`}
          className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-14 pr-14 py-5 focus:outline-none focus:border-blue-500/30 placeholder:text-slate-800 text-sm transition-all focus:bg-white/[0.05]"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="h-4 w-px bg-white/10 mx-2" />
          <Filter size={16} className="text-slate-700 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6"
      >
        {filteredJobs.map((job) => (
          <motion.div 
            key={job.id} 
            variants={item}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />
            <div className="relative bg-[#09090b] border border-white/5 rounded-[32px] overflow-hidden transition-all duration-500 group-hover:border-white/10 group-hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.15)] flex flex-col">
              <div className="p-7 flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="space-y-4 flex-1 w-full">
                  <div className="flex items-center justify-between sm:justify-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-all font-black text-lg">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white group-hover:text-blue-500 transition-colors tracking-tight">{job.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">{job.company}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-800" />
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Global Ops</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-slate-700" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.location.split(' / ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={12} className="text-slate-700" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={12} className="text-slate-700" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="text-right">
                    <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] mb-1">Compatibility</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-light tracking-tighter ${job.score > 85 ? 'text-emerald-400' : 'text-blue-400'}`}>{job.score}</span>
                      <span className="text-[10px] text-slate-500 font-bold">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 flex flex-col gap-4">
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApplyAI(job)}
                    disabled={analyzingId === job.id}
                    className="flex-[1.5] h-12 bg-white/[0.03] hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                  >
                    {analyzingId === job.id ? (
                       <div className="w-3 h-3 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                    ) : (
                      <>Generate AI Briefing <Sparkles size={12} /></>
                    )}
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApplyNow(job)}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/10"
                  >
                    Transmit
                  </motion.button>
                </div>

                <AnimatePresence>
                  {pitch && selectedJobId === job.id && analyzingId === null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mt-2 p-5 bg-blue-500/5 rounded-3xl border border-blue-500/10 relative overflow-hidden group/pitch"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/40" />
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                          <Zap size={14} />
                        </div>
                        <p className="text-xs text-blue-200 leading-relaxed italic font-serif">
                          "{pitch}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredJobs.length === 0 && (
          <div className="text-center py-32 space-y-4">
             <div className="w-16 h-16 bg-white/[0.02] border border-white/5 rounded-full mx-auto flex items-center justify-center text-slate-800">
               <Search size={24} />
             </div>
             <p className="text-slate-600 font-bold uppercase tracking-[0.4em] text-[10px]">Zero Signals Detected</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
