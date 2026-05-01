import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/AuthContext';
import { ai, MODELS } from '../lib/gemini';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ArrowLeft, RotateCcw, Sparkles, FileCheck, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'ai' | 'user';
  text: string;
}

export function ResumeInterview() {
  const { user, profile, incrementPoints } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello! I'm your AI Career Architect. To build your professional resume, I need to understand your journey. Let's start with your background—what's your current situation (student, job seeker, or professional) and what's your primary career goal?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || isCompleted) return;

    const userText = input;
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const chatHistory = newMessages.map(m => `${m.role === 'ai' ? 'Coach' : 'Candidate'}: ${m.text}`).join('\n');
      
      const prompt = `You are an Expert AI Career Coach conducting a resume interview. 
      Current Chat History:
      ${chatHistory}

      Your task:
      1. Analyze if you have enough information to build a basic resume (Education, Skills, Experience/Projects).
      2. If you need more info, ask ONE focused follow-up question.
      3. If you have sufficient info (usually after 3-5 turns), respond with exactly "FINISH_INTERVIEW" followed by a detailed summary of what you've gathered.
      
      Keep your tone professional, encouraging, and sophisticated.`;

      const result = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      
      const aiResponse = result.text;

      if (aiResponse && aiResponse.includes("FINISH_INTERVIEW")) {
        setMessages(prev => [...prev, { role: 'ai', text: "Fantastic! I've gathered enough details to architect your new resume. Let me process this for you..." }]);
        await saveResume(chatHistory);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', text: "I encountered a slight glitch in my logic. Could you try rephrasing that last part?" }]);
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async (rawChat: string) => {
    if (!user) return;
    setLoading(true);
    try {
      // Use Gemini to structure the final resume object
      const structurePrompt = `Convert this interview transcript into a structured JSON resume format.
      Transcript: ${rawChat}
      
      Return ONLY a JSON object with:
      {
        "sections": [
          { "title": "Summary", "content": "..." },
          { "title": "Experience", "items": ["...", "..."] },
          { "title": "Skills", "items": ["...", "..."] }
        ]
      }`;

      const res = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: [{ role: 'user', parts: [{ text: structurePrompt }] }],
      });
      
      const structuredData = JSON.parse((res.text || '').replace(/```json|```/g, ''));

      const path = `users/${user.uid}/resumes`;
      try {
        await addDoc(collection(db, 'users', user.uid, 'resumes'), {
          userId: user.uid,
          ...structuredData,
          rawText: rawChat,
          updatedAt: serverTimestamp(),
          version: 1
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }

      setIsCompleted(true);
      await incrementPoints(250);
      setMessages(prev => [...prev, { role: 'ai', text: "Your professional resume structure has been generated and saved! You can now refine individual bullet points in the Creative Suite." }]);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#020202] text-slate-200 theme-dashboard">
      <header className="p-6 pt-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-[100]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/tools')} className="p-2.5 glass-card !rounded-xl transition-all hover:bg-white/10 active:scale-95 text-slate-400 hover:text-white border-white/5">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-black text-white tracking-tighter uppercase premium-gradient-text">Neural Interview</h1>
            <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.3em]">SEC 2 PROJECT ARCHITECT v1.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 glass-card !rounded-full border-indigo-500/30">
          <Sparkles size={12} className="text-indigo-400 animate-pulse" />
          <span className="text-[9px] font-black text-white uppercase tracking-widest">Coach Active</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 py-8 hide-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center border transition-all ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/30 text-white' 
                    : 'glass-card border-white/5 text-indigo-400'
                }`}>
                  {m.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
                </div>
                <div className={`p-4 rounded-2xl shadow-xl transition-all ${
                  m.role === 'user'
                    ? 'bg-indigo-600/90 text-white rounded-tr-none border border-indigo-500'
                    : 'glass-card border-white/10 text-slate-100 rounded-tl-none font-medium text-[13px] leading-relaxed italic opacity-95'
                }`}>
                  <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-start">
              <div className="flex gap-3 items-center ml-13">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                </div>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Processing Logic...</span>
              </div>
            </motion.div>
          )}

          {isCompleted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="p-10 glass-card border-emerald-500/30 !rounded-[48px] text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />
              <div className="w-20 h-20 bg-emerald-500/10 rounded-[32px] border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 shadow-lg relative z-10">
                <FileCheck size={40} />
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Synthesis Success</h3>
                <p className="text-xs text-slate-500 px-6 font-medium leading-relaxed">Neural Career Identity successfully built and persisted to the SEC 2 PROJECT vault.</p>
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/tools')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-[28px] uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] transition-all relative z-10"
              >
                Access Creative Suite
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} className="h-8" />
      </div>

      <div className="p-8 bg-black/40 backdrop-blur-2xl border-t border-white/5 sticky bottom-0">
        {!isCompleted ? (
          <div className="relative max-w-2xl mx-auto">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Stream response to Coach..."
              disabled={loading}
              className="w-full glass-card !bg-white/5 !border-white/10 text-white !rounded-[24px] !px-8 !py-5 pr-20 focus:outline-none focus:!border-indigo-500/50 transition-all placeholder:text-slate-700 text-sm font-medium"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="absolute right-2.5 top-2.5 w-11 h-11 bg-indigo-600 text-white rounded-[16px] flex items-center justify-center disabled:opacity-50 shadow-lg shadow-indigo-600/30 active:scale-90 transition-all border border-indigo-400/20"
            >
              <Send size={18} />
            </button>
          </div>
        ) : (
          <div className="flex gap-4 max-w-2xl mx-auto">
             <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMessages([{ role: 'ai', text: "Ready for another recalibration. What's the new career objective?" }]);
                setIsCompleted(false);
              }}
              className="flex-1 glass-card !rounded-2xl !py-4 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all border-white/5"
            >
              <RotateCcw size={16} /> Reset Context
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
