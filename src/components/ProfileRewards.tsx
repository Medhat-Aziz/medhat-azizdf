import React, { useState } from 'react';
import { Award, Star, Trophy, Users, BadgeAlert, Sparkles, Check, CheckCircle2, UserCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { KNOWN_BADGES, UserProgress } from '../types';

interface ProfileRewardsProps {
  progress: UserProgress;
  updateProfile: (name: string, age: number, avatar: string) => void;
}

const AVATAR_POOL = ['🦁', '🐰', '🐱', '🐘', '🐼', '🐨', '🦊', '🦉'];

export default function ProfileRewards({
  progress,
  updateProfile
}: ProfileRewardsProps) {
  const [nameInput, setNameInput] = useState(progress.name);
  const [ageInput, setAgeInput] = useState(progress.age);
  const [selectedAvatar, setSelectedAvatar] = useState(progress.avatar);
  const [editMode, setEditMode] = useState(progress.name === 'Adventure Kid');
  const [certOpened, setCertOpened] = useState(false);

  // Generate 7 days of historical activity data based on user streak
  const generateWeeklyData = () => {
    const daysOfWeek = ['Sun/أحد', 'Mon/اثنين', 'Tue/ثلاثاء', 'Wed/أربعاء', 'Thu/خميس', 'Fri/جمعة', 'Sat/سبت'];
    const data = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dayIndex = d.getDay();
      const [dayEn, dayAr] = daysOfWeek[dayIndex].split('/');
      
      // A day is active if it's today (i === 0) OR if the day falls within the active streak (i < progress.streak)
      const isActive = i === 0 || i < progress.streak;
      let xpValue = 0;
      if (isActive) {
        if (i === 0) {
          // Today's active XP
          xpValue = Math.max(15, progress.xp % 45 + 15);
        } else {
          // Previous streak days - seeded deterministic values
          const seed = (d.getDate() * 11) % 25;
          xpValue = 18 + seed; 
        }
      } else {
        xpValue = 0;
      }
      
      data.push({
        day: dayEn,
        dayAr: dayAr,
        xp: xpValue,
        active: isActive
      });
    }
    return data;
  };

  const weeklyData = generateWeeklyData();

  const handleSaveProfile = () => {
    if (!nameInput.trim()) return;
    updateProfile(nameInput.trim(), ageInput, selectedAvatar);
    setEditMode(false);
  };

  // Requirements for Printable Certificate:
  // Completed at least 2 categories or accumulated over 120 XP points
  const isEligibleForCertificate = progress.xp >= 120 || progress.unlockedBadges.length >= 2;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="flex-grow flex flex-col p-2 select-none overflow-y-auto">
      
      {/* Kids custom Profile card banner */}
      <div className="bg-white rounded-3xl p-4 shadow-md border-b-4 border-slate-200 relative overflow-hidden mb-3">
        {/* Colorful backdrop ring */}
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-amber-200 opacity-40"></div>

        {!editMode ? (
          <div className="flex items-center gap-3 relative z-10">
            {/* Big interactive avatar holder */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center border-4 border-amber-200 text-3xl shadow-sm">
              {progress.avatar}
            </div>

            <div className="flex-1">
              <h3 className="text-slate-900 font-extrabold text-sm sm:text-base tracking-tight uppercase select-all">
                {progress.name}
              </h3>
              <p className="text-slate-500 text-[10px] font-bold leading-none mt-0.5">
                Age: {progress.age} Years Old / {progress.age} سنوات
              </p>
              
              <button
                id="edit-profile-btn"
                onClick={() => setEditMode(true)}
                className="mt-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-[9px] font-extrabold px-2.5 py-1 rounded-lg transition-transform active:scale-95 cursor-pointer focus:outline-none"
              >
                ✏️ Edit Profile / تعديل الاسم
              </button>
            </div>
          </div>
        ) : (
          // Kids interactive Edit Profile View
          <div className="space-y-2.5 relative z-10">
            <h4 className="text-slate-800 font-extrabold text-[11px] uppercase tracking-wider leading-none">
              Modify Your Profile / تعديل الملف الشخصي
            </h4>

            {/* Avatar Select Row */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase block">Choose Mascot Avatar:</span>
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {AVATAR_POOL.map(av => (
                  <button
                    key={av}
                    id={`avatar-choice-${av}`}
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-9 h-9 rounded-full text-lg flex items-center justify-center border-2 transition-all ${
                      selectedAvatar === av
                        ? 'bg-amber-400 border-amber-600 scale-110 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Form */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-slate-500 uppercase block">Your Name / اسمك:</label>
                <input
                  type="text"
                  placeholder="Superkid Name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-400 p-1.5 rounded-xl text-xs font-black select-all focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-slate-500 uppercase block">Your Age / عمرك:</label>
                <select
                  value={ageInput}
                  onChange={(e) => setAgeInput(Number(e.target.value))}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-400 p-1.5 rounded-xl text-xs font-black focus:outline-none"
                >
                  {[5, 6, 7, 8, 9, 10].map(yr => (
                    <option key={yr} value={yr}>{yr} Years</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                id="cancel-edit-profile-btn"
                onClick={() => setEditMode(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] py-1.5 px-3 rounded-lg flex-1 cursor-pointer"
              >
                Cancel / إلغاء
              </button>

              <button
                id="save-profile-btn"
                onClick={handleSaveProfile}
                disabled={!nameInput.trim()}
                className="bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-slate-900 font-black text-[10px] py-1.5 px-3 rounded-lg flex-1 cursor-pointer border-b-2 border-amber-600 shadow-sm"
              >
                Save! / حفظ ✨
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Board Grid */}
      <div className="grid grid-cols-3 gap-2 mb-3 select-none">
        <div className="bg-sky-500 text-white rounded-2xl p-2 text-center shadow-inner border-b-4 border-sky-700">
          <span className="text-xl">🏆</span>
          <h5 className="font-extrabold text-[10px] uppercase tracking-wide leading-none select-all">SCORE XP</h5>
          <p className="font-black text-sm select-all mt-0.5">{progress.xp}</p>
        </div>

        <div className="bg-amber-500 text-white rounded-2xl p-2 text-center shadow-inner border-b-4 border-amber-700">
          <span className="text-xl">⭐</span>
          <h5 className="font-extrabold text-[10px] uppercase tracking-wide leading-none select-all font-sans">STARS</h5>
          <p className="font-black text-sm select-all mt-0.5">{progress.stars}</p>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-2 text-center shadow-inner border-b-4 border-teal-700">
          <span className="text-xl">🔥</span>
          <h5 className="font-extrabold text-[10px] uppercase tracking-wide leading-none select-all">STREAK</h5>
          <p className="font-black text-sm select-all mt-0.5">{progress.streak} d</p>
        </div>
      </div>

      {/* 7-Day Activity Streak Bar Chart */}
      <div id="streak-chart-container" className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 mb-3 select-none">
        <div className="flex justify-between items-center mb-1.5">
          <h4 className="text-slate-800 font-extrabold text-[11px] flex items-center gap-1 uppercase tracking-tight">
            <span className="text-sm">📊</span>
            7-Day Spark History / نشاط 7 أيام
          </h4>
          <span className="text-[8px] bg-slate-100 text-slate-500 font-black px-1.5 py-0.5 rounded-md uppercase tracking-wide font-mono">
            Daily XP
          </span>
        </div>

        <div className="h-28 w-full mt-1.5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#64748b', fontSize: 8, fontWeight: '800' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#cbd5e1', fontSize: 7, fontWeight: '600' }}
                axisLine={false}
                tickLine={false}
                width={20}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 border border-slate-850 p-2 rounded-2xl shadow-xl leading-none">
                        <p className="text-[9px] font-extrabold text-slate-300 uppercase block">{data.day} • {data.dayAr}</p>
                        <p className="text-[11px] font-black text-amber-400 mt-1">{payload[0].value} XP ✨</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="xp" radius={[6, 6, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.active ? (index === 6 ? '#f59e0b' : '#14b8a6') : '#e2e8f0'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[8px] text-slate-400 font-bold leading-tight mt-1.5 text-center">
          Active learning streak: <strong className="text-teal-600">{progress.streak} days</strong>! Keep up the amazing work! 🌟
        </p>
      </div>

      {/* Badges and Achievements Shelf */}
      <div className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 mb-3 select-none">
        <h4 className="text-slate-800 font-extrabold text-xs flex items-center gap-1 uppercase tracking-tight mb-2">
          <Trophy className="w-4 h-4 text-amber-500 animate-spin-slow" />
          My Unlocked Badges / وسامات المغامرة
        </h4>

        <div className="grid grid-cols-5 gap-1">
          {KNOWN_BADGES.map(badge => {
            const hasUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                id={`badge-cell-${badge.id}`}
                className={`flex flex-col items-center text-center p-1.5 rounded-xl border relative group ${
                  hasUnlocked
                    ? 'bg-amber-50 border-amber-200 text-slate-800 scale-102'
                    : 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60'
                }`}
                title={`${badge.title}: ${badge.desc}`}
              >
                <span className="text-2xl mb-1">{badge.icon}</span>
                <span className="text-[8.5px] font-black leading-none uppercase truncate w-full">{badge.title}</span>
                <span className="text-[7px] text-slate-500 font-bold leading-tight mt-0.5 truncate w-full">{badge.titleAr}</span>
                
                {/* Micro Locked Symbol */}
                {!hasUnlocked && (
                  <span className="absolute top-0.5 right-0.5 text-[8px]" title="Locked / مقفل">🔒</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Gold-Trimmed Kids Adventure Certificate */}
      <div className="bg-white rounded-3xl p-3.5 shadow-md border-b-4 border-slate-200 relative overflow-hidden select-none">
        {/* Certificate eligibility helper */}
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 p-2 rounded-2xl shadow-inner text-2xl">🎓</div>
          <div>
            <h4 className="text-slate-800 font-extrabold text-xs uppercase tracking-tight">Adventure Certificate</h4>
            <p className="text-slate-500 text-[9.5px] font-bold leading-none mt-0.5">
              شهادة الإنجاز ومغامر الإنجليزية المعتمد
            </p>
          </div>
        </div>

        {isEligibleForCertificate ? (
          <div className="mt-3.5">
            <p className="text-slate-600 text-[11px] leading-tight mb-2">
              🎉 Wow! You have reached over 120 XP! You are officially ready to wear the adventurer hat and print your medal:
            </p>
            <button
              id="open-cert-btn"
              onClick={() => setCertOpened(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs py-2 px-3 rounded-xl border-b-4 border-orange-700 shadow-md transform hover:-translate-y-0.5 transition-all text-center animate-pulse"
            >
              🏅 VIEW MY ADVENTURER CERTIFICATE!
            </button>
          </div>
        ) : (
          <div className="mt-3.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <p className="text-slate-500 text-[10px] leading-tight">
              🔐 <strong>Locked!</strong> Complete vocab spellings, interactive quizzes, or chat with Leo the Lion to reach <strong>120 XP points</strong> to unlock your custom diploma!
            </p>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-amber-500 h-1.5 rounded-full" 
                style={{ width: `${Math.min((progress.xp / 120) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-[9px] text-amber-700 font-mono block text-right mt-1 font-bold">
              Current progress: {progress.xp} / 120 XP
            </span>
          </div>
        )}
      </div>

      {/* Modal Backdrop printable golden diploma overlay */}
      {certOpened && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-fade-in print:bg-white print:p-0">
          
          {/* Main Gold Diploma structure */}
          <div className="bg-amber-50 border-[16px] border-double border-amber-600 rounded-3xl p-5 sm:p-8 shadow-2xl relative w-full max-w-[500px] text-center text-slate-800 print:border-amber-600 print:shadow-none print:w-full">
            
            {/* Corner traditional stamp rings */}
            <div className="absolute top-2 left-2 text-xl select-none">🦁</div>
            <div className="absolute top-2 right-2 text-xl select-none">👑</div>
            <div className="text-amber-600 font-semibold text-[10px] uppercase tracking-wide print:block font-serif">Kids Learning Academy</div>

            <div className="mt-2 text-3xl">🎓</div>
            
            <h1 className="text-slate-900 font-serif text-xl sm:text-2xl font-extrabold tracking-tight mt-1 leading-none">
              DIPLOMA OF ACHIVEMENT
            </h1>
            <p className="text-amber-800 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1">
              شهادة النجم البطل ومغامر الإنجليزية
            </p>

            <div className="my-3 text-xs text-slate-600 leading-tight">
              Henceforth it is certified that the awesome adventurer
            </div>

            <div className="font-serif font-black text-lg sm:text-2xl text-slate-950 underline decoration-amber-500 underline-offset-4 tracking-wide uppercase select-all my-2">
              {progress.name}
            </div>

            <p className="text-slate-700 text-[11px] leading-relaxed mx-auto max-w-[340px]">
              has successfully overcome spelling tasks, learned vocab card, completed karaoke sing alongs, solved storybook quizzes, and conversationalized with Leo the smart AI Lion in <strong>English Adventure Kids</strong>!
            </p>

            {/* Achievement seal medal badge logic */}
            <div className="flex justify-around items-center my-4">
              <div className="text-left font-sans">
                <span className="text-[10px] text-slate-400 block font-bold">Points Scored:</span>
                <span className="text-xs text-slate-900 font-black font-mono">{progress.xp} XP Points</span>
              </div>

              {/* Wax Seal Ribbon representation */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border-4 border-yellow-200 flex items-center justify-center text-white text-3xl shadow-md rotate-12 relative animate-spin-slow">
                🏅
                <div className="absolute -bottom-2 -left-1 w-3 h-5 bg-amber-600 transform -rotate-12 rounded-b"></div>
                <div className="absolute -bottom-2 right-1 w-3 h-5 bg-amber-600 transform rotate-12 rounded-b"></div>
              </div>

              <div className="text-right font-sans">
                <span className="text-[10px] text-slate-400 block font-bold">Teacher’s Sign:</span>
                <span className="text-xs font-black font-serif italic text-amber-700 select-all">Leo the Lion 🦁</span>
              </div>
            </div>

            {/* Action Buttons for Diploma */}
            <div className="flex gap-2 justify-center mt-3 print:hidden">
              <button
                id="print-cert-btn"
                onClick={handlePrintCertificate}
                className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs py-1.5 px-4 rounded-xl cursor-pointer"
              >
                🖨️ Print Certificate
              </button>

              <button
                id="close-cert-overlay-btn"
                onClick={() => setCertOpened(false)}
                className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-black text-xs py-1.5 px-4 rounded-xl cursor-pointer"
              >
                Close / إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
