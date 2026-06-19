import React from 'react';
import { Sparkles, Battery, Wifi, Award, Volume2, Home } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  xp: number;
  stars: number;
  streak: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appName: string;
}

export default function MobileFrame({
  children,
  xp,
  stars,
  streak,
  activeTab,
  setActiveTab,
  appName
}: MobileFrameProps) {
  // Simple time state
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="device-wrapper" className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 flex flex-col justify-center items-center p-2 sm:p-4 font-sans select-none">
      {/* Outer physical tablet border with friendly wood/orange playful curves */}
      <div id="physical-tablet" className="w-full max-w-[440px] bg-gradient-to-b from-amber-500 to-orange-600 rounded-[48px] p-4 shadow-2xl border-b-8 border-orange-800 relative flex flex-col transition-all duration-300">
        
        {/* Playful Ear-like top anchors for kids design */}
        <div className="absolute -top-3 left-12 w-8 h-4 bg-amber-400 rounded-t-full shadow-inner"></div>
        <div className="absolute -top-3 right-12 w-8 h-4 bg-amber-400 rounded-t-full shadow-inner"></div>

        {/* Dynamic status bar/screen boundary */}
        <div id="internal-screen" className="w-full bg-slate-900 rounded-[38px] p-2 flex flex-col overflow-hidden relative border-4 border-amber-300 min-h-[720px]">
          
          {/* Kids Game Status Bar */}
          <div className="flex justify-between items-center px-4 py-1 text-slate-300 text-[11px] font-mono select-none">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-amber-400">KidsOS 🦁</span>
              <span className="text-slate-500">|</span>
              <span>{time}</span>
            </div>
            
            {/* Top speaker mic mockup */}
            <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto"></div>

            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <div className="flex items-center gap-0.5 bg-slate-800 px-1 rounded text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                <span className="font-bold text-[9px]">{xp} XP</span>
              </div>
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Kids App Header with XP, Stars, Streak */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-2 sm:p-3 rounded-2xl mx-1 my-1.5 flex justify-between items-center shadow-md border-b-4 border-orange-500 select-none">
            <button 
              id="logo-btn"
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-1.5 focus:outline-none hover:scale-105 active:scale-95 transition-transform"
            >
              <div className="bg-white p-1 rounded-xl shadow-inner text-lg">🦁</div>
              <div className="text-left">
                <h1 className="text-slate-900 font-black text-xs leading-none drop-shadow-sm uppercase">Adventure Kids</h1>
                <p className="text-slate-800 text-[9px] font-bold leading-none">مغامرة الإنجليزية</p>
              </div>
            </button>

            <div className="flex items-center gap-1.5">
              {/* Daily Streak Indicator */}
              <div className="bg-white/90 px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300 shadow-sm" title="Streak / الأيام المتتالية">
                <span className="text-xs">🔥</span>
                <span className="text-slate-800 font-extrabold text-[11px]">{streak}</span>
              </div>

              {/* Star Rewards Badge */}
              <div className="bg-amber-100/90 px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-yellow-300 shadow-sm" title="Stars / نجوم">
                <span className="text-xs text-yellow-500">⭐</span>
                <span className="text-amber-900 font-extrabold text-[11px]">{stars}</span>
              </div>
            </div>
          </div>

          {/* Main Display Screen Container */}
          <div id="app-view-container" className="flex-1 bg-green-50 rounded-2xl overflow-y-auto flex flex-col relative p-1">
            {children}
          </div>

          {/* Bottom Children Game Controller Navigation Bar */}
          <div id="game-controller-nav" className="mt-1.5 pt-1.5 pb-1 border-t border-slate-800 flex justify-around items-center bg-slate-900/90 select-none">
            
            <button
              id="back-home-nav-btn"
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-amber-400 text-slate-950 scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[9px] font-black leading-none">Home</span>
              <span className="text-[7px] leading-tight opacity-85 font-semibold">العالم</span>
            </button>

            <button
              id="vocab-tab-btn"
              onClick={() => setActiveTab('vocab')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
                activeTab === 'vocab'
                  ? 'bg-amber-400 text-slate-950 scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-base leading-none">🍎</span>
              <span className="text-[9px] font-black leading-none">Words</span>
              <span className="text-[7px] leading-tight opacity-85 font-semibold">الكلمات</span>
            </button>

            <button
              id="songs-tab-btn"
              onClick={() => setActiveTab('songs')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
                activeTab === 'songs'
                  ? 'bg-amber-400 text-slate-950 scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-base leading-none">🎤</span>
              <span className="text-[9px] font-black leading-none">Songs</span>
              <span className="text-[7px] leading-tight opacity-85 font-semibold">الأغاني</span>
            </button>

            <button
              id="stories-tab-btn"
              onClick={() => setActiveTab('stories')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
                activeTab === 'stories'
                  ? 'bg-amber-400 text-slate-950 scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-base leading-none">📚</span>
              <span className="text-[9px] font-black leading-none">Stories</span>
              <span className="text-[7px] leading-tight opacity-85 font-semibold">القصص</span>
            </button>

            <button
              id="chat-tab-btn"
              onClick={() => setActiveTab('chat')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
                activeTab === 'chat'
                  ? 'bg-amber-400 text-slate-950 scale-105 animate-pulse'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-base leading-none">💬</span>
              <span className="text-[9px] font-black leading-none">AI Leo</span>
              <span className="text-[7px] leading-tight opacity-85 font-semibold">الدردشة</span>
            </button>

          </div>
        </div>

        {/* Physical tactile circular home button for kids tablet */}
        <button
          id="hardware-home-btn"
          onClick={() => setActiveTab('profile')}
          className={`mx-auto mt-2.5 w-11 h-11 bg-slate-800 rounded-full border-4 border-amber-400 shadow-lg active:scale-90 hover:bg-slate-700 transition-all flex items-center justify-center focus:outline-none`}
          title="My Stars & Profile / ملفي الشخصي"
        >
          <Award className="w-5 h-5 text-amber-300 animate-bounce" />
        </button>

        {/* Soft wood texture decorative corner nodes */}
        <div className="absolute bottom-2 left-6 w-3 h-3 bg-orange-850 rounded-full opacity-30"></div>
        <div className="absolute bottom-2 right-6 w-3 h-3 bg-orange-850 rounded-full opacity-30"></div>
      </div>
    </div>
  );
}
