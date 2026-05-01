import { useAuth } from '../lib/AuthContext';
import { LogOut, Settings, Award, Shield, ChevronRight, Zap, Target, Briefcase, X, Save, Edit2, User, Mail, Globe, Medal, Trophy } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { calculateSkillTier, formatRank, Tier } from '../lib/metrics';
import { useState } from 'react';

export function Profile() {
  const { user, profile, logOut, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: profile?.displayName || '',
    handle: profile?.handle || '',
    currentRole: profile?.currentRole || '',
    targetRole: profile?.targetRole || '',
    targetIndustry: profile?.targetIndustry || '',
  });
  const [saving, setSaving] = useState(false);

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

  const stats = [
    { label: 'Applications', value: metrics.applicationsCount, icon: <Briefcase className="text-indigo-400" size={18} /> },
    { label: 'Skill Weight', value: `${metrics.resumeWeightage}%`, icon: <Target className="text-emerald-400" size={18} /> },
    { label: 'Experience', value: metrics.careerPoints, icon: <Award className="text-amber-400" size={18} /> },
    { label: 'Day Streak', value: metrics.dailyStreak, icon: <Zap className="text-orange-400" size={18} /> },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(editData);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
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
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="p-6 space-y-8 pb-32 theme-profile">
      <motion.header 
        variants={container}
        initial="hidden"
        animate="show"
        className="pt-8 text-center space-y-4"
      >
        <motion.div variants={item} className="relative inline-block group">
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-500 via-indigo-500 to-rose-500 rounded-[50px] blur-2xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity" />
          <img 
            src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.uid}`} 
            className="relative w-28 h-28 rounded-[36px] border-2 border-white/10 shadow-2xl mx-auto object-cover ring-1 ring-white/5 transition-transform group-hover:scale-105 duration-500"
            alt="Profile"
          />
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="absolute -bottom-2 -right-2 bg-rose-600 p-3 rounded-2xl border-4 border-[#030303] shadow-xl cursor-pointer"
          >
            <Shield size={18} className="text-white" />
          </motion.div>
        </motion.div>
        
        <motion.div variants={item} className="space-y-1 pt-2">
          <h1 className="text-3xl font-black text-white tracking-tighter premium-gradient-text uppercase">
            {profile?.displayName}
          </h1>
          <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.3em]">{profile?.handle}</p>
          <div className={`mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-rose-500/20 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${color}`}>
            {getTierIcon(tier)}
            {tierName}
          </div>
        </motion.div>
      </motion.header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card !p-5 text-center space-y-1 group relative overflow-hidden border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all relative z-10 border border-white/5">
              {stat.icon}
            </div>
            <p className="text-2xl font-black text-white relative z-10 tracking-tighter">{stat.value}</p>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none relative z-10 mt-1 opacity-70">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        <motion.button 
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditData({
              displayName: profile?.displayName || '',
              handle: profile?.handle || '',
              currentRole: profile?.currentRole || '',
              targetRole: profile?.targetRole || '',
              targetIndustry: profile?.targetIndustry || '',
            });
            setIsEditing(true);
          }}
          className="w-full glass-card !p-6 flex items-center justify-between group hover:border-rose-500/20 transition-all shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400 border border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner">
              <Edit2 size={20} />
            </div>
            <div className="text-left">
              <span className="text-sm font-black text-white block uppercase tracking-tight">Identity Matrix</span>
              <span className="text-[9px] text-rose-500 font-black uppercase tracking-widest mt-0.5 block">Recalibrate Metadata</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-700 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
        </motion.button>

        <motion.button 
          variants={item}
          whileTap={{ scale: 0.98 }}
          className="w-full glass-card !p-6 flex items-center justify-between group hover:border-emerald-500/20 transition-all shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
              <Settings size={20} />
            </div>
             <div className="text-left">
              <span className="text-sm font-black text-white block uppercase tracking-tight">System Core</span>
              <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mt-0.5 block">Logic & Encryption</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </motion.button>

        <motion.button 
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={logOut}
          className="w-full glass-card !bg-rose-500/[0.03] !border-rose-500/10 !p-6 flex items-center justify-between group hover:!bg-rose-500/10 transition-all"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner">
              <LogOut size={20} />
            </div>
            <div className="text-left">
              <span className="text-sm font-black text-rose-400 block uppercase tracking-tight">Eject Session</span>
              <span className="text-[9px] text-rose-500/50 font-black uppercase tracking-widest mt-0.5 block">Purge Local Cache</span>
            </div>
          </div>
        </motion.button>
      </motion.div>

      <motion.div variants={item} className="text-center pt-10">
        <p className="text-[10px] text-slate-800 font-black uppercase tracking-[0.5em] italic mb-2">SEC 2 PROJECT OS</p>
        <p className="text-[9px] text-slate-900 font-black uppercase tracking-[0.3em]">Build v2.4.0 • Node 0.3.1-Pulse</p>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="glass-card !bg-[#050505] w-full max-w-md !rounded-[48px] border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
            >
              <div className="p-10 space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase premium-gradient-text">Matrix Shift</h2>
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mt-1.5 pl-0.5">Recalibrate Identity Kernal</p>
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(false)}
                    className="w-12 h-12 glass-card !rounded-2xl flex items-center justify-center text-slate-500 hover:text-white transition-all border-white/10 hover:border-rose-500/30"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-3">Identity Alpha</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                      <input 
                        type="text"
                        value={editData.displayName}
                        onChange={e => setEditData({ ...editData, displayName: e.target.value })}
                        className="w-full glass-card !rounded-[24px] !py-5 !pl-14 !pr-6 text-sm text-white focus:outline-none focus:border-rose-500/40 transition-all border-white/5"
                        placeholder="Neural Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-3">Nexus Handle</label>
                    <div className="relative">
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                      <input 
                        type="text"
                        value={editData.handle}
                        onChange={e => setEditData({ ...editData, handle: e.target.value })}
                        className="w-full glass-card !rounded-[24px] !py-5 !pl-14 !pr-6 text-sm text-white focus:outline-none focus:border-rose-500/40 transition-all border-white/5"
                        placeholder="@nexus_id"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-3">Current</label>
                      <input 
                        type="text"
                        value={editData.currentRole}
                        onChange={e => setEditData({ ...editData, currentRole: e.target.value })}
                        className="w-full glass-card !rounded-[24px] !py-5 !px-6 text-sm text-white focus:outline-none focus:border-rose-500/40 transition-all border-white/5"
                        placeholder="Node Status"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-3">Objective</label>
                      <input 
                        type="text"
                        value={editData.targetRole}
                        onChange={e => setEditData({ ...editData, targetRole: e.target.value })}
                        className="w-full glass-card !rounded-[24px] !py-5 !px-6 text-sm text-white focus:outline-none focus:border-rose-500/40 transition-all border-white/5"
                        placeholder="Target State"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    disabled={saving}
                    onClick={handleSave}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-5 rounded-[32px] uppercase tracking-[0.3em] shadow-[0_20px_50px_-10px_rgba(225,29,72,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
                  >
                    {saving ? (
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save size={18} />
                        Sync Identity
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
