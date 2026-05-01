import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Trophy, Star, ArrowRight, Zap, Target, BookOpen, Sparkles, TrendingUp, Activity, LayoutGrid, Briefcase, Medal } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { calculateSkillTier, formatRank, Tier } from '../lib/metrics';

export function Dashboard() {
  const { user, profile } = useAuth();
  const [helloIndex, setHelloIndex] = useState(0);
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  const indianHellos = [
    'Namaste',
    'Namaskar',
    'Vanakkam',
    'Sat Sri Akal',
    'Nomoshkar',
    'Asalaam-alaikum',
    'Khamma Ghani',
    'Pranam'
  ];

  const multilingualWelcomes = [
    'Welcome',
    'Swagat',
    'Swagatham',
    'Suswagatam',
    'Bienvenue',
    'Willkommen',
    'Bienvenido',
    'Benvenuto',
    'Marhaba',
    'Huan ying'
  ];

  useEffect(() => {
    const helloInterval = setInterval(() => {
      setHelloIndex((prev) => (prev + 1) % indianHellos.length);
    }, 30000); // 30 seconds

    const welcomeInterval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % multilingualWelcomes.length);
    }, 10000); // 10 seconds

    return () => {
      clearInterval(helloInterval);
      clearInterval(welcomeInterval);
    };
  }, [indianHellos.length, multilingualWelcomes.length]);

  const metrics = {
    careerPoints: profile?.careerPoints || 0,
    resumeWeightage: profile?.resumeWeightage || 0,
    applicationsCount: profile?.applicationsCount || 0,
    dailyStreak: profile?.dailyStreak || 0
  };

  const { tier, rank, color } = calculateSkillTier(metrics);
  const tierName = formatRank(tier, rank);

  const getTierIcon = (tier: Tier) => {
    switch (tier) {
      case 'Bronze': return <Medal size={14} className="text-[#CD7F32]" strokeWidth={2.5} />;
      case 'Silver': return <Medal size={14} className="text-[#C0C0C0]" strokeWidth={2.5} />;
      case 'Gold': return <Medal size={14} className="text-[#FFD700] drop-shadow-[0_0_5px_rgba(255,215,0,0.4)]" strokeWidth={2.5} />;
      case 'Platinum': return <Trophy size={14} className="text-[#E5E4E2] drop-shadow-[0_0_8px_rgba(229,228,226,0.5)]" strokeWidth={2.5} />;
      case 'Diamond': return <Trophy size={14} className="text-[#B9F2FF] animate-pulse drop-shadow-[0_0_12px_rgba(185,242,255,0.6)]" strokeWidth={2.5} />;
      default: return null;
    }
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 space-y-8 pb-32 theme-dashboard"
    >
      <header className="flex justify-between items-start pt-8">
        <motion.div variants={item} className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-indigo-600 p-1.5 rounded-xl shadow-[0_8px_20px_-5px_rgba(79,70,229,0.6)]">
               <Zap size={14} className="text-white fill-white" />
            </div>
            <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">SEC 2 PROJECT</h1>
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`hello-${helloIndex}`}
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block premium-gradient-text"
                >
                  {indianHellos[helloIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">{profile?.displayName?.split(' ')[0]}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={`welcome-${welcomeIndex}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-500 font-medium tracking-tight"
              >
                {multilingualWelcomes[welcomeIndex]}
              </motion.span>
            </AnimatePresence>
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">{profile?.handle || '@user'}</p>
            <span className="w-1 h-1 rounded-full bg-slate-800" />
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Status</span>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col items-end gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 rounded-[24px] blur opacity-20 group-hover:opacity-60 transition-all duration-500 animate-gradient-x" />
            <img 
              src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.uid}`} 
              className="relative w-14 h-14 rounded-[22px] border-2 border-white/10 shadow-2xl object-cover ring-1 ring-white/5"
              alt="Profile"
            />
          </motion.div>
          <div className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full glass-card flex items-center gap-2 ${color}`}>
            {getTierIcon(tier)}
            {tierName}
          </div>
        </motion.div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-6 grid-rows-2 gap-4 h-auto sm:h-[420px]">
        {/* Main Intelligence Card - Signal Pulse Theme */}
        <motion.section 
          variants={item} 
          className="col-span-6 row-span-1 bg-[#09090b] border border-white/5 rounded-[40px] p-8 relative overflow-hidden group shadow-2xl"
        >
          {/* Pulse/Radar Background Effect */}
          <div className="absolute top-0 right-0 p-8">
            <div className="relative w-32 h-32 flex items-center justify-center opacity-20">
              <div className="absolute inset-0 border border-blue-500/30 rounded-full animate-ping [animation-duration:3s]" />
              <div className="absolute inset-4 border border-blue-500/20 rounded-full animate-ping [animation-duration:4s]" />
              <Activity size={40} className="text-blue-500" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
             <div className="flex gap-0.5">
               {[1, 2, 3].map(i => (
                 <div key={i} className="w-1 h-3 bg-blue-500/40 rounded-full animate-pulse" />
               ))}
             </div>
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Signal Intelligence Unit</span>
          </div>

          <h3 className="text-2xl font-light text-white tracking-tight mb-4 leading-snug max-w-[80%]">
            Your profile matches <span className="text-blue-400 font-bold">94%</span> of current tier-1 software leads.
          </h3>
          
          <p className="text-sm text-slate-400 leading-relaxed font-medium max-w-[85%] relative z-10 italic border-l-2 border-blue-500/30 pl-4">
            "Gemini: Focus on <span className="text-white font-bold underline decoration-blue-500/50">Full-Stack Synthesis</span> to accelerate your career trajectory towards Diamond tier."
          </p>
          
          <div className="mt-8 flex items-center gap-8">
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Career Pulse</p>
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={profile?.careerPoints}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white font-mono text-2xl tracking-tighter"
                  >
                    {profile?.careerPoints || 0}
                    <span className="text-[10px] text-blue-400 font-black ml-1 uppercase">XP</span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="w-px h-10 bg-white/5" />
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Global Projection</p>
              <p className="text-white font-black text-sm tracking-widest uppercase">{tierName}</p>
            </div>
          </div>
        </motion.section>

        {/* Small Stats Bento */}
        <motion.div 
          variants={item} 
          whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
          className="col-span-3 row-span-1 glass-card !p-6 flex flex-col justify-between group transition-all shadow-xl relative overflow-hidden"
        >
           <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
           <div className="w-10 h-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
             <Briefcase size={20} />
           </div>
           <div>
             <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black block mb-1">Active Projects</span>
             <div className="flex items-baseline gap-2">
               <AnimatePresence mode="wait">
                 <motion.span
                   key={metrics.applicationsCount}
                   initial={{ opacity: 0, scale: 1.2 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-3xl font-black text-white tracking-tight"
                 >
                   {metrics.applicationsCount}
                 </motion.span>
               </AnimatePresence>
               <span className="text-[8px] text-emerald-400 font-black uppercase px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/10">Sync</span>
             </div>
           </div>
        </motion.div>

        <motion.div 
          variants={item} 
          whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
          className="col-span-3 row-span-1 glass-card !p-6 flex flex-col justify-between group transition-all shadow-xl relative overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />
          <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
             <Zap size={20} />
           </div>
           <div>
             <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black block mb-1">Daily Streak</span>
             <div className="flex items-baseline gap-2">
               <span className="text-3xl font-black text-white tracking-tight">{metrics.dailyStreak}</span>
               <span className="text-[8px] text-amber-400 font-black uppercase px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/10 tracking-widest">Cycle</span>
             </div>
           </div>
        </motion.div>
      </div>

      {/* Objectives Section with Enhanced UI */}
      <div className="space-y-6 pb-4">
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-3">
             <LayoutGrid size={16} className="text-indigo-400" />
             <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Strategic Roadmap</h3>
          </div>
          <motion.button 
            whileHover={{ x: 3 }}
            className="text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors glass-card !px-4 !py-2 !rounded-full"
          >
            Directory
          </motion.button>
        </div>
        
        <motion.div variants={container} className="space-y-4">
          {[
            { id: 1, title: 'Cloud Infrastructure', sub: '85% Sync • +120 XP', icon: <BookOpen size={20} />, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            { id: 2, title: 'Resume Optimization', sub: 'High Priority • +500 XP', icon: <Target size={20} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { id: 3, title: 'Market Logic Analysis', sub: 'New Data Added • +50 XP', icon: <TrendingUp size={20} />, color: 'text-purple-400', bg: 'bg-purple-500/10' }
          ].map((obj, idx) => (
            <motion.div 
              key={obj.id}
              variants={item}
              whileHover={{ scale: 1.02, x: 5, backgroundColor: 'rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.98 }}
              className="glass-card !p-5 flex items-center gap-5 group transition-all cursor-pointer shadow-lg"
            >
              <div className={`w-14 h-14 rounded-2xl ${obj.bg} flex items-center justify-center ${obj.color} group-hover:rotate-12 transition-transform font-bold border border-white/5`}>
                {obj.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{obj.title}</h4>
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">{obj.sub}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                <ArrowRight size={18} className="text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
