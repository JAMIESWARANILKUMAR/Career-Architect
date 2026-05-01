import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Navigation } from './components/Navigation';
import { Dashboard } from './views/Dashboard';
import { Learn } from './views/Learn';
import { Jobs } from './views/Jobs';
import { Tools } from './views/Tools';
import { Login } from './views/Login';
import { Onboarding } from './views/Onboarding';
import { ResumeInterview } from './views/ResumeInterview';
import { Profile } from './views/Profile';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#09090b]">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="bg-[#020202] min-h-screen flex items-center justify-center p-0 sm:p-10 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden relative">
      {/* Background Lighting Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[430px] h-full sm:h-[880px] min-h-screen sm:min-h-0 sm:rounded-[60px] sm:border-[10px] border-[#161618] relative bg-[#09090b] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] flex flex-col ring-1 ring-white/10 group">
        
        {/* Mobile Status Bar / Dynamic Island Concept */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-[#161618] rounded-b-[20px] z-50 items-center justify-center px-4 gap-2 border-x border-b border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-10 h-1.5 rounded-full bg-slate-800" />
        </div>

        <div className="flex-1 overflow-y-auto pb-24 scroll-smooth hide-scrollbar bg-gradient-to-b from-[#09090b] via-[#09090b] to-[#0c0c0e] relative">
          {/* Internal Lighting */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/interview" element={<ResumeInterview />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
