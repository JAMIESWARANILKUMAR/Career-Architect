import { useAuth } from '../lib/AuthContext';
import { LogIn, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const { signIn } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#020202] p-10 text-center text-slate-200 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-rose-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative z-10 w-24 h-24 glass-card !rounded-[32px] flex items-center justify-center mb-8 shadow-2xl border-white/10 group"
      >
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <Compass size={44} className="text-indigo-400 relative z-10 group-hover:rotate-12 transition-transform duration-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 space-y-3"
      >
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase premium-gradient-text">SEC 2 PROJECT</h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mb-12 max-w-sm mx-auto leading-relaxed opacity-80">
          Advanced Neural Career Architecture
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-xs relative z-10 mt-8"
      >
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={signIn} 
          className="w-full h-16 glass-card !rounded-[24px] !bg-white/5 hover:!bg-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-4 transition-all border-white/10 hover:border-indigo-500/30 shadow-2xl"
        >
          <LogIn size={20} className="text-indigo-400" />
          Authenticate Session
        </motion.button>
        
        <p className="mt-10 text-[9px] text-slate-700 font-black uppercase tracking-[0.3em] max-w-[240px] mx-auto leading-relaxed">
          By initializing, you concede to our <span className="text-slate-500 underline">Neural Protocols</span> & <span className="text-slate-500 underline">Privacy Siphons</span>.
        </p>
      </motion.div>
      
      <div className="absolute bottom-10 text-[8px] text-slate-900 font-black uppercase tracking-[0.5em] opacity-50">
        System v2.4.0 • Node: Pulse
      </div>
    </div>
  );
}
