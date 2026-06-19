import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, BookOpen, Volume2, ArrowRight, Compass, Gamepad2 } from 'lucide-react';
import MobileFrame from './components/MobileFrame';
import VocabularyQuest from './components/VocabularyQuest';
import SongArena from './components/SongArena';
import StoryWorld from './components/StoryWorld';
import ProfileRewards from './components/ProfileRewards';
import AiBuddy from './components/AiBuddy';
import ProgressionMap from './components/ProgressionMap';
import { UserProgress, ChatMessage, KNOWN_BADGES, VOCABULARY_DATA } from './types';

// Default initial state for learner progress
const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  stars: 0,
  streak: 1,
  lastActive: new Date().toISOString(),
  avatar: '🦁',
  name: 'Adventure Kid',
  age: 6,
  completedVocabIds: [],
  completedSongIds: [],
  completedStoryIds: [],
  chatExchangesCount: 0,
  unlockedBadges: [],
  completedLevelIds: [],
  lastDailyChallengeDate: null
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('english_adventure_kids_progress');
      if (saved) {
        // Upgrade legacy saves transparently
        const parsed = JSON.parse(saved);
        if (!parsed.completedLevelIds) parsed.completedLevelIds = [];
        if (parsed.lastDailyChallengeDate === undefined) parsed.lastDailyChallengeDate = null;
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load saved progress:", e);
    }
    return DEFAULT_PROGRESS;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [dashboardMode, setDashboardMode] = useState<'map' | 'arcade'>('map');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Persistent storage synchronizer
  useEffect(() => {
    try {
      localStorage.setItem('english_adventure_kids_progress', JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save progress to localStorage:", e);
    }
  }, [progress]);

  // Streak update check upon login
  useEffect(() => {
    const lastActiveDateStr = progress.lastActive;
    if (lastActiveDateStr) {
      const lastDate = new Date(lastActiveDateStr);
      const today = new Date();
      // Calculate day difference
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Logged in exactly tomorrow! Increase streak
        setProgress(prev => ({
          ...prev,
          streak: prev.streak + 1,
          lastActive: today.toISOString()
        }));
      } else if (diffDays > 1) {
        // Missed a day, reset streak to 1
        setProgress(prev => ({
          ...prev,
          streak: 1,
          lastActive: today.toISOString()
        }));
      }
    }
  }, []);

  // Reward functions helpers
  const addXp = (amount: number) => {
    setProgress(prev => {
      const newXp = prev.xp + amount;
      const updatedBadges = [...prev.unlockedBadges];
      
      // Check XP champion badge requirement
      if (newXp >= 200 && !updatedBadges.includes('xp_champion')) {
        updatedBadges.push('xp_champion');
      }

      return {
        ...prev,
        xp: newXp,
        unlockedBadges: updatedBadges
      };
    });
  };

  const addStar = (amount: number = 1) => {
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + amount
    }));
  };

  const markVocabComplete = (vocabId: string) => {
    setProgress(prev => {
      if (prev.completedVocabIds.includes(vocabId)) return prev;
      const updatedList = [...prev.completedVocabIds, vocabId];
      const updatedBadges = [...prev.unlockedBadges];

      // If user unlocks 5 vocab items, reward them with the Alphabet Master badge
      if (updatedList.length >= 5 && !updatedBadges.includes('alphabet_master')) {
        updatedBadges.push('alphabet_master');
      }

      return {
        ...prev,
        completedVocabIds: updatedList,
        unlockedBadges: updatedBadges
      };
    });
  };

  const markSongComplete = (songId: string) => {
    setProgress(prev => {
      if (prev.completedSongIds.includes(songId)) return prev;
      const updatedList = [...prev.completedSongIds, songId];
      const updatedBadges = [...prev.unlockedBadges];

      if (updatedList.length >= 1 && !updatedBadges.includes('sing_star')) {
        updatedBadges.push('sing_star');
      }

      return {
        ...prev,
        completedSongIds: updatedList,
        unlockedBadges: updatedBadges
      };
    });
  };

  const markStoryComplete = (storyId: string) => {
    setProgress(prev => {
      if (prev.completedStoryIds.includes(storyId)) return prev;
      const updatedList = [...prev.completedStoryIds, storyId];
      const updatedBadges = [...prev.unlockedBadges];

      if (updatedList.length >= 1 && !updatedBadges.includes('story_king')) {
        updatedBadges.push('story_king');
      }

      return {
        ...prev,
        completedStoryIds: updatedList,
        unlockedBadges: updatedBadges
      };
    });
  };

  const incrementChatExchanges = () => {
    setProgress(prev => {
      const newCount = prev.chatExchangesCount + 1;
      const updatedBadges = [...prev.unlockedBadges];

      if (newCount >= 3 && !updatedBadges.includes('chat_buddy')) {
        updatedBadges.push('chat_buddy');
      }

      return {
        ...prev,
        chatExchangesCount: newCount,
        unlockedBadges: updatedBadges
      };
    });
  };

  const completeLevel = (levelNum: number, starsEarned: number) => {
    setProgress(prev => {
      if (prev.completedLevelIds.includes(levelNum)) return prev;
      const updatedLevelIds = [...prev.completedLevelIds, levelNum];
      const updatedBadges = [...prev.unlockedBadges];
      let xpBonus = 0;

      // Check World Completion Badges & Custom XP Multipliers!
      if (levelNum === 10 && !updatedBadges.includes('alphabet_master')) {
        updatedBadges.push('alphabet_master');
        xpBonus += 100;
      }
      if (levelNum === 20 && !updatedBadges.includes('numbers_master')) {
        updatedBadges.push('numbers_master');
        xpBonus += 200;
      }
      if (levelNum === 30 && !updatedBadges.includes('artist_badge')) {
        updatedBadges.push('artist_badge');
        xpBonus += 300;
      }
      if (levelNum === 40 && !updatedBadges.includes('friendship_badge')) {
        updatedBadges.push('friendship_badge');
        xpBonus += 400;
      }
      if (levelNum === 50 && !updatedBadges.includes('explorer_badge')) {
        updatedBadges.push('explorer_badge');
        xpBonus += 500;
      }
      if (levelNum === 60 && !updatedBadges.includes('student_hero_badge')) {
        updatedBadges.push('student_hero_badge');
        xpBonus += 600;
      }
      if (levelNum === 70 && !updatedBadges.includes('city_hero_badge')) {
        updatedBadges.push('city_hero_badge');
        xpBonus += 700;
      }
      if (levelNum === 80 && !updatedBadges.includes('story_master_badge')) {
        updatedBadges.push('story_master_badge');
        xpBonus += 800;
      }
      if (levelNum === 90 && !updatedBadges.includes('speaker_badge')) {
        updatedBadges.push('speaker_badge');
        xpBonus += 900;
      }
      if (levelNum === 100 && !updatedBadges.includes('english_champion_trophy')) {
        updatedBadges.push('english_champion_trophy');
        xpBonus += 1000;
      }

      return {
        ...prev,
        completedLevelIds: updatedLevelIds,
        unlockedBadges: updatedBadges,
        stars: prev.stars + starsEarned,
        xp: prev.xp + xpBonus
      };
    });
  };

  const playDailyChallenge = () => {
    setProgress(prev => ({
      ...prev,
      lastDailyChallengeDate: new Date().toDateString()
    }));
  };

  const updateProfile = (name: string, age: number, avatar: string) => {
    setProgress(prev => ({
      ...prev,
      name,
      age,
      avatar
    }));
  };

  const todayStr = new Date().toDateString();
  const canPlayDailyChallenge = progress.lastDailyChallengeDate !== todayStr;

  return (
    <MobileFrame
      xp={progress.xp}
      stars={progress.stars}
      streak={progress.streak}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      appName="English Adventure Kids"
    >
      {activeTab === 'dashboard' && (
        <div className="flex-1 flex flex-col p-2 select-none space-y-3">
          
          {/* Heartwarming bilingually paired learning banner */}
          <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-md border-b-4 border-slate-200 relative overflow-hidden shrink-0">
            <div className="absolute top-1 right-2 text-xl opacity-20">🦁⭐</div>
            <div className="absolute bottom-2 left-2 text-xl opacity-20">🍎🎈</div>

            <div className="flex items-center gap-3 relative z-10">
              <span className="text-3xl animate-bounce">👋🦁</span>
              <div className="text-left">
                <h3 className="text-slate-900 font-extrabold text-xs sm:text-sm tracking-tight leading-none uppercase">
                  Welcome, {progress.name}!
                </h3>
                <p className="text-slate-500 text-[10px] sm:text-[10.5px] font-black leading-none mt-1">
                  أهلاً بك يا بطل! جاهز لرحلة التعلم السعيدة؟
                </p>
              </div>
            </div>
          </div>

          {/* Kids-Friendly Game Mode Switcher tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-900/5 p-1 rounded-2xl border border-slate-200 shrink-0">
            <button
              id="switch-map-mode-btn"
              onClick={() => setDashboardMode('map')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                dashboardMode === 'map'
                  ? 'bg-amber-400 text-slate-990 shadow-sm border-b-2 border-amber-600 scale-102'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>100 Levels Map</span>
            </button>

            <button
              id="switch-arcade-mode-btn"
              onClick={() => setDashboardMode('arcade')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                dashboardMode === 'arcade'
                  ? 'bg-amber-400 text-slate-990 shadow-sm border-b-2 border-amber-600 scale-102'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Full Games Arcade</span>
            </button>
          </div>

          {/* Conditionally render selected screen mode */}
          {dashboardMode === 'map' ? (
            <ProgressionMap
              progress={progress}
              addXp={addXp}
              addStar={addStar}
              completeLevel={completeLevel}
              playDailyChallenge={playDailyChallenge}
              canPlayDailyChallenge={canPlayDailyChallenge}
            />
          ) : (
            <div className="flex-1 flex flex-col space-y-3 justify-around overflow-y-auto pb-1">
              {/* Core Categories Hub */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* Words segment link */}
                <button
                  id="dash-vocab-card"
                  onClick={() => setActiveTab('vocab')}
                  className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 hover:border-amber-400 active:scale-95 transition-all text-center flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl mb-1.5 shadow-xs">
                    🍎
                  </div>
                  <h4 className="text-slate-900 font-extrabold text-xs tracking-tight uppercase leading-none">Vocabulary Quest</h4>
                  <p className="text-slate-400 text-[9px] font-black leading-none mt-1">مهمة الكلمات الكبيرة</p>
                  <span className="bg-amber-100 text-[8.5px] text-amber-800 font-bold px-1.5 py-0.5 rounded-full mt-2 font-mono">
                    {progress.completedVocabIds.length} / {VOCABULARY_DATA.length} cleared
                  </span>
                </button>

                {/* Sing segment link */}
                <button
                  id="dash-songs-card"
                  onClick={() => setActiveTab('songs')}
                  className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 hover:border-sky-400 active:scale-95 transition-all text-center flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-2xl mb-1.5 shadow-xs">
                    🎤
                  </div>
                  <h4 className="text-slate-900 font-extrabold text-xs tracking-tight uppercase leading-none font-sans">Singing Arena</h4>
                  <p className="text-slate-400 text-[9px] font-black leading-none mt-1">ساحة الترديد والغناء</p>
                  <span className="bg-sky-100 text-[8.5px] text-sky-800 font-bold px-1.5 py-0.5 rounded-full mt-2 font-mono">
                    {progress.completedSongIds.length} / 3 cleared
                  </span>
                </button>

                {/* Stories segment link */}
                <button
                  id="dash-stories-card"
                  onClick={() => setActiveTab('stories')}
                  className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 hover:border-rose-400 active:scale-95 transition-all text-center flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                >
                  <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-2xl mb-1.5 shadow-xs">
                    📚
                  </div>
                  <h4 className="text-slate-900 font-extrabold text-xs tracking-tight uppercase leading-none">Interactive Stories</h4>
                  <p className="text-slate-400 text-[9px] font-black leading-none mt-1">قصص تفاعلية ممتعة</p>
                  <span className="bg-rose-100 text-[8.5px] text-rose-800 font-bold px-1.5 py-0.5 rounded-full mt-2 font-mono">
                    {progress.completedStoryIds.length} / 2 cleared
                  </span>
                </button>

                {/* Talk with Leo segment link */}
                <button
                  id="dash-chat-card"
                  onClick={() => setActiveTab('chat')}
                  className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 hover:border-emerald-400 active:scale-95 transition-all text-center flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl mb-1.5 shadow-xs">
                    💬
                  </div>
                  <h4 className="text-slate-900 font-extrabold text-xs tracking-tight uppercase leading-none">Talk with Leo</h4>
                  <p className="text-slate-400 text-[9px] font-black leading-none mt-1">محادثة الأسد ليو بذكاء</p>
                  <span className="bg-emerald-100 text-[8.5px] text-emerald-800 font-bold px-1.5 py-0.5 rounded-full mt-2 font-mono">
                    💬 AI Online Buddy
                  </span>
                </button>
              </div>

              {/* Quick interactive daily milestones link */}
              <button
                id="dash-progress-tracker"
                onClick={() => setActiveTab('profile')}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl p-3 text-white flex justify-between items-center shadow-lg active:scale-98 transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl animate-bounce">🏆</span>
                  <div className="text-left select-none">
                    <p className="text-[9.5px] font-black uppercase tracking-wider opacity-90 leading-none">ADVENTURE MILESTONES</p>
                    <p className="font-extrabold text-xs mt-0.5 leading-none">Check My Badges & Profile</p>
                    <p className="text-[8.5px] font-medium leading-none mt-1 opacity-80">
                      لوحة الأوسمة والشهادات المعتمدة بذكاء
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/20 p-2 rounded-full font-bold">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            </div>
          )}

        </div>
      )}

      {activeTab === 'vocab' && (
        <VocabularyQuest
          completedVocabIds={progress.completedVocabIds}
          markVocabComplete={markVocabComplete}
          addXp={addXp}
          addStar={addStar}
        />
      )}

      {activeTab === 'songs' && (
        <SongArena
          completedSongIds={progress.completedSongIds}
          markSongComplete={markSongComplete}
          addXp={addXp}
          addStar={addStar}
        />
      )}

      {activeTab === 'stories' && (
        <StoryWorld
          completedStoryIds={progress.completedStoryIds}
          markStoryComplete={markStoryComplete}
          addXp={addXp}
          addStar={addStar}
        />
      )}

      {activeTab === 'chat' && (
        <AiBuddy
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          addXp={addXp}
          addStar={addStar}
          incrementChatExchanges={incrementChatExchanges}
        />
      )}

      {activeTab === 'profile' && (
        <ProfileRewards
          progress={progress}
          updateProfile={updateProfile}
        />
      )}
    </MobileFrame>
  );
}
