import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Briefcase, User, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

export function Navigation() {
  const tabs = [
    { icon: <Home size={18} />, label: 'Home', path: '/' },
    { icon: <BookOpen size={18} />, label: 'Arena', path: '/learn' },
    { icon: <Briefcase size={18} />, label: 'Pulse', path: '/jobs' },
    { icon: <Wrench size={18} />, label: 'Tools', path: '/tools' },
    { icon: <User size={18} />, label: 'Self', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-10 left-0 right-0 flex justify-center z-[200] px-6 sm:absolute pointer-events-none">
      <nav className="glass-card !bg-black/60 backdrop-blur-2xl border-white/5 flex justify-around items-center px-2 py-2 !rounded-[36px] w-full max-w-[380px] shadow-[0_45px_70px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/5 relative overflow-hidden pointer-events-auto">
        {/* Animated background glow that follows the active tab */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent blur-sm" />
        
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1.5 py-4 px-1 rounded-[28px] transition-all duration-700 flex-1 relative z-10 ${
                isActive ? 'text-white' : 'text-slate-600 hover:text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="nav-glow-indicator"
                    className="absolute inset-0 bg-white/[0.03] rounded-[28px] border border-white/10 shadow-inner"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
                  />
                )}
                <div className="relative">
                  <motion.div
                    animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {tab.icon}
                  </motion.div>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active-signal"
                      className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,1)]" 
                      transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
                    />
                  )}
                </div>
                <span className={`text-[7px] uppercase tracking-[0.25em] font-black transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
