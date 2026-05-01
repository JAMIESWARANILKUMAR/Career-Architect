import { useState } from 'react';
import { FileText, Mail, Image as ImageIcon, Send, Sparkles, Wand2, Download, ArrowLeft, Terminal, Cpu, Share2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { ai, MODELS } from '../lib/gemini';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Tools() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [tool, setTool] = useState<'resume' | 'email' | 'poster' | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  // Email state
  const [emailCompany, setEmailCompany] = useState('');
  const [emailType, setEmailType] = useState('Internship');
  const [selectedTemplate, setSelectedTemplate] = useState<'followup' | 'networking' | 'confirmation' | null>(null);

  const templates = [
    { id: 'followup', label: 'Follow-up Protocol', scenario: 'following up on a previous application or interview to express continued interest' },
    { id: 'networking', label: 'Nexus Build', scenario: 'requesting an informational interview or a brief networking coffee chat' },
    { id: 'confirmation', label: 'Signal Confirm', scenario: 'confirming my recent application and briefly highlighting why I am the perfect fit' }
  ] as const;

  const handleEmailCraft = async () => {
    setLoading(true);
    setResult(null);
    try {
      const scenario = selectedTemplate 
        ? templates.find(t => t.id === selectedTemplate)?.scenario 
        : 'applying for a position';

      const response = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: `Act as a professional recruiter. Write a highly personalized email for ${scenario}. 
        The target is a ${emailType} role at ${emailCompany}. 
        The candidate is ${profile.displayName}, proficient in ${profile.targetRole} and ${profile.targetIndustry}. 
        Keep it under 150 words, sophisticated tone, and include a strong call to action. Use placeholders for personal links.`,
      });
      setResult(response.text || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeRefine = async () => {
     navigate('/tools/interview');
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
    <div className="p-6 space-y-8 pb-32 theme-tools">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 space-y-2 flex flex-col items-center sm:items-start"
      >
        <div className="flex items-center gap-3 mb-2">
           <Cpu size={18} className="text-amber-400" />
           <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">SEC 2 PROJECT Nexus</h1>
        </div>
        <h2 className="text-3xl font-display font-bold text-white tracking-tight premium-gradient-text">Synthesis Suite</h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">High-Yield Career Tooling</p>
      </motion.header>

      {!tool ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5"
        >
          <motion.button 
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => setTool('resume')} 
            className="glass-card !p-6 flex items-center gap-6 text-left group transition-all shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Terminal size={80} className="text-indigo-400" />
            </div>
            <div className="w-16 h-16 bg-indigo-500/10 rounded-[24px] flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-lg">
              <FileText size={32} />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">Logic Refiner</h3>
              <p className="text-[9px] text-slate-500 font-black uppercase mt-1.5 tracking-[0.2em] opacity-80">ATS Synchronizer • XYZ Protocol</p>
            </div>
          </motion.button>

          <motion.button 
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => setTool('email')} 
            className="glass-card !p-6 flex items-center gap-6 text-left group transition-all shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Send size={80} className="text-emerald-400" />
            </div>
            <div className="w-16 h-16 bg-emerald-500/10 rounded-[24px] flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
              <Mail size={32} />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">Signal Craft</h3>
              <p className="text-[9px] text-slate-500 font-black uppercase mt-1.5 tracking-[0.2em] opacity-80">Cold Engine • Nexus Invitation</p>
            </div>
          </motion.button>

          <motion.button 
            variants={item}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => setTool('poster')} 
            className="glass-card !p-6 flex items-center gap-6 text-left group transition-all shadow-2xl relative overflow-hidden opacity-80 grayscale hover:grayscale-0 transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ImageIcon size={80} className="text-rose-400" />
            </div>
            <div className="w-16 h-16 bg-rose-500/10 rounded-[24px] flex items-center justify-center text-rose-400 border border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-lg">
              <ImageIcon size={32} />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">Identity Grid</h3>
              <p className="text-[9px] text-slate-500 font-black uppercase mt-1.5 tracking-[0.2em] opacity-80">Visual Brand • Banner Synth</p>
            </div>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8 pb-12"
        >
          <div 
            className="flex items-center gap-3 text-slate-500 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors glass-card !bg-white/5 !w-fit !px-5 !py-2.5 !rounded-full" 
            onClick={() => { setTool(null); setResult(null); }}
          >
             <ArrowLeft size={14} /> Exit Protocol
          </div>

          {tool === 'email' && (
            <div className="glass-card !rounded-[40px] p-8 space-y-8 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 block">Objective Protocol</label>
                  <div className="flex flex-wrap gap-2.5">
                    {templates.map((t) => (
                      <motion.button
                        key={t.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`px-5 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all border ${
                          selectedTemplate === t.id
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.3)]'
                            : 'bg-white/[0.03] border-white/5 text-slate-500 hover:border-white/20'
                        }`}
                      >
                        {t.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 block">Target Entity</label>
                    <input
                      value={emailCompany}
                      onChange={e => setEmailCompany(e.target.value)}
                      placeholder="e.g. Stripe Hub"
                      className="w-full glass-card !rounded-[24px] !px-6 !py-5 text-white text-sm focus:outline-none focus:border-amber-500/50 placeholder:text-slate-800 transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 block">Signal Class</label>
                    <div className="relative">
                      <select 
                        value={emailType}
                        onChange={e => setEmailType(e.target.value)}
                        className="w-full glass-card !rounded-[24px] !px-6 !py-5 text-white text-sm focus:outline-none focus:border-amber-500/50 appearance-none transition-colors"
                      >
                        <option className="bg-[#030303]">Staff / Full-time</option>
                        <option className="bg-[#030303]">Associate / Internship</option>
                        <option className="bg-[#030303]">Contract / Special Ops</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleEmailCraft}
                disabled={!emailCompany || loading}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-5 rounded-[30px] uppercase tracking-[0.3em] text-[11px] shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 transition-all mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Initialize Synthesis <Sparkles size={18} />
                  </>
                )}
              </motion.button>
            </div>
          )}

          {tool === 'resume' && (
            <div className="glass-card !rounded-[40px] p-10 text-center space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
              <div className="w-24 h-24 bg-amber-500/10 rounded-[32px] border border-white/5 flex items-center justify-center mx-auto group shadow-lg">
                <FileText size={40} className="text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white tracking-tight uppercase premium-gradient-text">Impact Synth</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[280px] mx-auto font-medium">
                  Applying the <span className="text-amber-400 font-black uppercase tracking-[0.2em] text-[10px]">XYZ Paradigm</span> to optimize your narrative metadata.
                </p>
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeRefine} 
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-5 rounded-[30px] uppercase tracking-[0.3em] text-[11px] shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] flex items-center justify-center gap-3 transition-all"
              >
                Calibrate Metadata <Wand2 size={18} />
              </motion.button>
            </div>
          )}

          {tool === 'poster' && (
            <div className="glass-card border-dashed !border-white/10 !rounded-[40px] p-16 text-center space-y-8 shadow-2xl">
               <div className="aspect-video w-full bg-gradient-to-br from-amber-500/5 to-rose-500/5 rounded-[32px] flex items-center justify-center border border-white/5 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent" />
                 <ImageIcon size={48} className="text-slate-800 relative z-10" />
               </div>
               <div className="space-y-3">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.5em]">Identity Grid v0.1</h3>
                 <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Restricted Access • Calibration Pending</p>
               </div>
               <button className="w-full bg-white/5 text-slate-800 py-4 font-black uppercase tracking-[0.3em] rounded-[24px] cursor-not-allowed text-[9px]" disabled>Upgrade to Enterprise Sync</button>
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glass-card !rounded-[40px] overflow-hidden shadow-2xl border-amber-500/30"
              >
                <div className="p-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                      <span className="text-[11px] font-black text-amber-400 uppercase tracking-[0.5em]">Neural Export Ready</span>
                    </div>
                    <div className="flex gap-3">
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="p-3.5 glass-card !p-3.5 !rounded-2xl transition-all text-slate-500 hover:text-amber-400" 
                        onClick={() => navigator.clipboard.writeText(result)}
                      >
                        <Share2 size={20} />
                      </motion.button>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="p-3.5 glass-card !p-3.5 !rounded-2xl transition-all text-slate-500 hover:text-amber-400" 
                        onClick={() => navigator.clipboard.writeText(result)}
                      >
                        <Download size={20} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-10 relative">
                    <div className="text-[14px] leading-relaxed whitespace-pre-wrap font-medium text-slate-300 italic tracking-tight opacity-95">
                      "{result}"
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
