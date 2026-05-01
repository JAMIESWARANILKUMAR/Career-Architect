import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/AuthContext';
import { ai, MODELS } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles } from 'lucide-react';

export function Onboarding() {
  const { updateProfile } = useAuth();
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: `Hi there! I'm Gemini, your AI Career Coach. To get started, what's your current university or company, and what's your dream role? (e.g. 'CS Student at MIT, aspiring Software Engineer')` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || isFinishing) return;

    const userText = input;
    setInput('');
    const newMessages: { role: 'ai' | 'user'; text: string }[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const chatHistory = newMessages.map(m => `${m.role === 'ai' ? 'Gemini' : 'User'}: ${m.text}`).join('\n');
      
      const prompt = `You are a helpful AI Career Assistant. You are onboarding a new user to PathFinder AI.
      Current Conversation:
      ${chatHistory}

      Goal: We need to find out (1) Current Role/Education, (2) Target Role, and (3) Target Industry.
      
      If you have all 3, respond with "COMPLETE_ONBOARDING" followed by a structured JSON block containing ONLY those three fields.
      Example: COMPLETE_ONBOARDING {"currentRole": "...", "targetRole": "...", "targetIndustry": "..."}
      
      Otherwise, ask a friendly, sophisticated follow-up question to get the missing info. Be concise.`;

      const result = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      
      const aiResponse = result.text;

      if (aiResponse && aiResponse.includes("COMPLETE_ONBOARDING")) {
        setIsFinishing(true);
        const jsonMatch = aiResponse.match(/\{.*\}/s);
        if (jsonMatch) {
          try {
            const profileData = JSON.parse(jsonMatch[0]);
            setMessages(prev => [...prev, { role: 'ai' as const, text: "Perfect! I've architected your professional profile and awarded you 100 Welcome Career Points. Let's head to your dashboard!" }]);
            
            // Artificial delay for effect
            setTimeout(async () => {
              await updateProfile({
                ...profileData,
                onboardingComplete: true,
                careerPoints: 100
              });
            }, 1500);
          } catch (e) {
            console.error("JSON Parse Error", e);
            setMessages(prev => [...prev, { role: 'ai' as const, text: "I've gathered everything! Just setting up your base camp now..." }]);
            setTimeout(async () => {
              await updateProfile({ onboardingComplete: true, careerPoints: 100 });
            }, 1000);
          }
        }
      } else {
        setMessages(prev => [...prev, { role: 'ai' as const, text: aiResponse || '' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai' as const, text: "My neural circuits hit a temporary dead end. Could you say that again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#020202] text-slate-200 relative overflow-hidden theme-dashboard">
       {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <header className="p-8 pt-12 relative z-10">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-10 h-10 glass-card !rounded-2xl flex items-center justify-center text-indigo-400 border-white/5">
              <Sparkles size={20} className="animate-pulse" />
           </div>
           <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Protocol Initialization</h1>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase premium-gradient-text">Neural Onboarding</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-80">Syncing Career Metadata with SEC 2 PROJECT OS</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-24 hide-scrollbar relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] p-5 rounded-[24px] shadow-2xl transition-all ${
                  m.role === 'user'
                    ? 'bg-indigo-600/90 text-white rounded-tr-none border border-indigo-400 shadow-indigo-600/20'
                    : 'glass-card border-white/10 text-slate-100 rounded-tl-none italic font-medium leading-relaxed'
                }`}
              >
                <p className="text-sm font-medium leading-relaxed">{m.text}</p>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-start">
              <div className="glass-card !bg-white/5 !border-white/5 !p-4 !rounded-[20px] !rounded-tl-none animate-pulse text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-xl">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                Processing Vector...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} className="h-4" />
      </div>

      <div className="p-8 bg-black/40 backdrop-blur-2xl border-t border-white/5 relative z-10">
        <div className="relative max-w-2xl mx-auto">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Transmit identity data..."
            disabled={loading || isFinishing}
            className="w-full glass-card !bg-white/5 !border-white/10 text-white !rounded-[24px] !px-8 !py-5 pr-20 focus:outline-none focus:!border-indigo-500/50 transition-all placeholder:text-slate-700 text-sm font-medium shadow-2xl"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading || isFinishing}
            className="absolute right-2.5 top-2.5 w-11 h-11 bg-indigo-600 text-white rounded-[16px] flex items-center justify-center disabled:opacity-50 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all border border-indigo-400/20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
