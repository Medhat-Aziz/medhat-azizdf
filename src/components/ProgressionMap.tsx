import React, { useState } from 'react';
import { 
  Trophy, Star, Lock, Play, CheckCircle2, ChevronDown, ChevronUp, 
  Sparkles, Calendar, Heart, MessageSquare, ListCollapse, Award
} from 'lucide-react';
import { 
  UserProgress, LearningLevel, LearningWorld, LEARNING_WORLDS, getLevelContent 
} from '../types';

interface ProgressionMapProps {
  progress: UserProgress;
  addXp: (amount: number) => void;
  addStar: (stars: number) => void;
  completeLevel: (levelNum: number, starsEarned: number) => void;
  playDailyChallenge: () => void;
  canPlayDailyChallenge: boolean;
}

export default function ProgressionMap({
  progress,
  addXp,
  addStar,
  completeLevel,
  playDailyChallenge,
  canPlayDailyChallenge
}: ProgressionMapProps) {
  // Navigation states
  const [selectedWorldId, setSelectedWorldId] = useState<number>(1);
  const [activePlayLevel, setActivePlayLevel] = useState<LearningLevel | null>(null);
  
  // Lesson/Quiz state
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizMistakes, setQuizMistakes] = useState<number>(0);
  
  // Daily challenge state
  const [activeChallengeLevel, setActiveChallengeLevel] = useState<LearningLevel | null>(null);

  // Determine current active level
  const unlockedLevelCount = progress.completedLevelIds.length;
  const currentActiveLevel = unlockedLevelCount + 1; // Start with 1

  // Handle playing a Level
  const handleStartLevel = (levelNum: number) => {
    const lvlContent = getLevelContent(levelNum);
    setActivePlayLevel(lvlContent);
    setIsQuizMode(false);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizMistakes(0);
  };

  const handleCompleteLessonOnly = () => {
    // Earn 20 XP for reading lesson
    addXp(20);
    // Move to Quiz Mode automatically
    setIsQuizMode(true);
  };

  const handleSelectOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitQuiz = () => {
    if (selectedOption === null || !activePlayLevel) return;
    
    setQuizSubmitted(true);
    const isCorrect = selectedOption === activePlayLevel.answerIndex;
    if (!isCorrect) {
      setQuizMistakes(prev => prev + 1);
    }
  };

  const handleNextLevelProgress = () => {
    if (!activePlayLevel) return;
    
    // Star rating system
    // 0 mistakes = ⭐⭐⭐, 1 mistake = ⭐⭐, 2+ mistakes = ⭐
    let starsEarned = 1;
    if (quizMistakes === 0) {
      starsEarned = 3;
    } else if (quizMistakes === 1) {
      starsEarned = 2;
    }

    addStar(starsEarned);
    // Complete Lesson (20 XP was already added) + Complete Quiz (10 XP)
    addXp(10);
    completeLevel(activePlayLevel.levelNumber, starsEarned);
    
    // Close modal
    setActivePlayLevel(null);
  };

  // Daily Challenge actions
  const handleStartDailyChallenge = () => {
    if (!canPlayDailyChallenge) return;
    // Generate a random level from the user's current world
    const currentWorldId = Math.min(10, Math.floor((currentActiveLevel - 1) / 10) + 1);
    const minLvl = (currentWorldId - 1) * 10 + 1;
    const maxLvl = Math.min(100, currentWorldId * 10);
    const randomLvlNum = Math.floor(Math.random() * (maxLvl - minLvl + 1)) + minLvl;
    
    const lvlContent = getLevelContent(randomLvlNum);
    // Custom challenge theme
    lvlContent.title = `🔥 DAILY CHALLENGE: ${lvlContent.title}`;
    setActiveChallengeLevel(lvlContent);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizMistakes(0);
  };

  const handleFinishDailyChallenge = () => {
    if (!activeChallengeLevel) return;
    
    // Daily Challenge gives 50 XP
    addXp(50);
    playDailyChallenge(); // sets date to lock today
    addStar(3); // Daily challenges award perfect 3 stars directly as encouragement

    setActiveChallengeLevel(null);
  };

  // Sound emulation triggers a cute kid animation/message
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakText = (text: string) => {
    setIsSpeaking(true);
    // Emulate speech engine
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // slower kid speed
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-2 select-none overflow-y-auto space-y-3">
      
      {/* Daily Challenge Card at top */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-3 shadow-md border-b-4 border-orange-600 relative overflow-hidden">
        <div className="absolute top-1 right-2 text-2xl opacity-15">🔥</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">🦖</span>
            <div className="text-white text-left">
              <span className="bg-white/30 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider block w-fit">
                DAILY SPECIAL / التحدي اليومي
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm mt-0.5">Big Daily Spelling Challenge!</h4>
              <p className="text-[10px] font-bold opacity-90 leading-none">Complete once a day for +50 XP / ٥٠ نقطة مضافة</p>
            </div>
          </div>

          {canPlayDailyChallenge ? (
            <button
              id="start-daily-challenge-btn"
              onClick={handleStartDailyChallenge}
              className="bg-white hover:bg-slate-50 text-orange-600 font-extrabold text-[11px] py-1.5 px-3 rounded-xl border-b-2 border-orange-200 transition-transform active:scale-95 cursor-pointer"
            >
              PLAY NOW 🚀
            </button>
          ) : (
            <div className="bg-emerald-500/30 text-white font-bold text-[10px] py-1 px-2.5 rounded-lg border border-emerald-400">
              ✓ CLEARED!
            </div>
          )}
        </div>
      </div>

      {/* 10 Worlds Selector Carousel */}
      <div className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 flex flex-col space-y-2">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-slate-800 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            Adventure Worlds / مـدائن مغـامرات الإنجليزية
          </h4>
          <span className="text-[10px] font-bold text-amber-600 font-mono bg-amber-50 px-2 py-0.5 rounded-full">
            Level {currentActiveLevel} of 100
          </span>
        </div>

        {/* Horizontal world pill list */}
        <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-hide">
          {LEARNING_WORLDS.map(world => {
            const isCompleted = currentActiveLevel > world.levelsRange[1];
            const isActive = currentActiveLevel >= world.levelsRange[0] && currentActiveLevel <= world.levelsRange[1];
            const isLocked = currentActiveLevel < world.levelsRange[0];
            const selected = selectedWorldId === world.id;

            return (
              <button
                key={world.id}
                id={`world-selector-btn-${world.id}`}
                onClick={() => setSelectedWorldId(world.id)}
                className={`flex items-center gap-1.5 py-1.5 px-3 rounded-2xl text-[11px] font-extrabold border-2 transition-all shrink-0 cursor-pointer ${
                  selected
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 border-amber-600 scale-102 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : isActive
                    ? 'bg-slate-50 border-amber-300 text-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span>{world.emoji}</span>
                <span className="truncate max-w-[110px]">{world.name}</span>
                {isCompleted && <span className="text-[9px]">👑</span>}
                {isLocked && <Lock className="w-2.5 h-2.5 opacity-60" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected World Focus Section */}
      {(() => {
        const world = LEARNING_WORLDS[selectedWorldId - 1];
        if (!world) return null;

        const isWorldCompleted = currentActiveLevel > world.levelsRange[1];
        const isWorldLocked = currentActiveLevel < world.levelsRange[0];

        // Generate levels range for this world (10 levels total)
        const rangeLevels: number[] = [];
        for (let i = world.levelsRange[0]; i <= world.levelsRange[1]; i++) {
          rangeLevels.push(i);
        }

        return (
          <div className="space-y-2.5">
            {/* World Header Info Panel */}
            <div className={`bg-gradient-to-r ${world.colorClass} text-white rounded-3xl p-3.5 shadow-md border-b-4 ${world.borderColor} relative overflow-hidden`}>
              <div className="absolute top-1 right-2 text-4xl opacity-10">{world.emoji}</div>
              <div className="relative z-10 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">{world.emoji}</span>
                  <div>
                    <span className="text-[9.5px] font-black uppercase tracking-wider text-amber-100">
                      World {world.id} ({world.levelsRange[0]}-{world.levelsRange[1]})
                    </span>
                    <h3 className="font-extrabold text-sm uppercase leading-none mt-0.5">
                      {world.name} / {world.nameAr}
                    </h3>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1">
                  {world.topics.map(topic => (
                    <span key={topic} className="bg-white/20 text-[9px] font-black py-0.5 px-2 rounded-lg">
                      #{topic}
                    </span>
                  ))}
                </div>

                {/* World reward details */}
                <div className="mt-3 pt-2.5 border-t border-white/20 flex justify-between items-center text-[10px] font-bold">
                  <span>✨ World Rewards: {world.rewardXp} XP + {world.id === 10 ? '👑 Trophy' : '🏅 Badge'}</span>
                  {isWorldCompleted ? (
                    <span className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-full">✓ ALL COMPLETED</span>
                  ) : isWorldLocked ? (
                    <span className="text-amber-100 uppercase tracking-wider text-[8px] flex items-center gap-0.5">
                      <Lock className="w-2 h-2" /> Locked
                    </span>
                  ) : (
                    <span className="bg-white/25 text-white text-[9px] px-2 py-0.5 rounded-full">IN PROGRESS</span>
                  )}
                </div>
              </div>
            </div>

            {/* levels winding board */}
            <div className="bg-white rounded-3xl p-4 shadow-md border-b-4 border-slate-200">
              <h4 className="text-slate-700 font-extrabold text-xs uppercase tracking-wider text-center mb-4 leading-none">
                🌟 TAP THE PATH OF LEVELS / مسار المستويات العشرة 🌟
              </h4>

              {/* Game board winding path representation */}
              <div className="flex flex-col space-y-4 relative">
                {/* Visual Connector Line */}
                <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-2 bg-slate-100 rounded-full z-0"></div>

                <div className="grid grid-cols-1 gap-3 relative z-10">
                  {rangeLevels.map((lvlNum, index) => {
                    const isLvlCompleted = progress.completedLevelIds.includes(lvlNum);
                    const isLvlActive = currentActiveLevel === lvlNum;
                    const isLvlLocked = lvlNum > currentActiveLevel;

                    // Stagger paths slightly (left/right/center) to mock a zig zag winding road
                    const alignClass = index % 3 === 0 
                      ? 'justify-start md:pl-8' 
                      : index % 3 === 1 
                      ? 'justify-end md:pr-8' 
                      : 'justify-center';

                    // Mock stars earned by lookup (every 3 levels can have 3/2 stars mock-saved in list or defaults to 3)
                    const mockStars = isLvlCompleted ? 3 : 0;

                    return (
                      <div key={lvlNum} className={`flex ${alignClass} w-full`}>
                        <button
                          id={`level-road-node-${lvlNum}`}
                          disabled={isLvlLocked}
                          onClick={() => handleStartLevel(lvlNum)}
                          className={`flex items-center gap-3 p-2 px-4 rounded-3xl border-2 transition-all active:scale-95 disabled:scale-100 text-left relative ${
                            isLvlCompleted
                              ? 'bg-emerald-50 border-emerald-300 text-slate-800 shadow-sm cursor-pointer'
                              : isLvlActive
                              ? 'bg-amber-400 border-amber-600 text-slate-950 scale-105 shadow-md font-black cursor-pointer animate-pulse'
                              : 'bg-slate-50 border-slate-200 text-slate-400 opacity-80'
                          }`}
                        >
                          {/* Circle Level Number Badge */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${
                            isLvlCompleted
                              ? 'bg-emerald-500 text-white border-emerald-600'
                              : isLvlActive
                              ? 'bg-white text-slate-950 border-amber-600 text-sm'
                              : 'bg-slate-200 text-slate-400 border-slate-300'
                          }`}>
                            {lvlNum}
                          </div>

                          <div className="min-w-[120px]">
                            <p className="text-[10px] font-extrabold uppercase opacity-85 leading-none">
                              {isLvlLocked ? "🔒 Locked" : isLvlActive ? "▶ PLAY ACTIVE" : "✓ COMPLETED"}
                            </p>
                            <p className="text-[11px] font-bold truncate max-w-[140px] mt-0.5 text-slate-800">
                              {getLevelContent(lvlNum).title}
                            </p>
                            
                            {/* Star rating for completed levels */}
                            {isLvlCompleted && (
                              <div className="flex gap-0.5 mt-0.5">
                                {[1, 2, 3].map(st => (
                                  <Star key={st} className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                                ))}
                              </div>
                            )}
                          </div>

                          {isLvlActive && (
                            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-extrabold text-[8px] py-0.5 px-1.5 rounded-full uppercase tracking-wider animate-bounce">
                              HERE!
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Floating Level Lesson + Quiz Modal Panel */}
      {activePlayLevel && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 z-50 animate-fade-in select-none">
          <div className="bg-white rounded-[32px] p-5 shadow-2xl border-4 border-amber-400 relative w-full max-w-[420px] max-h-[85vh] overflow-y-auto flex flex-col text-slate-800">
            
            {/* Header progress line */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <span className="text-[11px] font-extrabold text-amber-600 uppercase font-sans">
                ⭐ LEVEL {activePlayLevel.levelNumber} ADVENTURE
              </span>
              <button
                id="close-play-modal-btn"
                onClick={() => setActivePlayLevel(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-black p-1"
              >
                ✕ Cancel Lesson
              </button>
            </div>

            {!isQuizMode ? (
              /* LESSON MODE VIEW */
              <div className="flex-1 flex flex-col space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-4xl block animate-bounce">{activePlayLevel.wordEmoji}</span>
                  <h3 className="text-slate-900 font-extrabold text-base sm:text-lg tracking-tight uppercase leading-none">
                    {activePlayLevel.title}
                  </h3>
                  <p className="text-slate-500 text-[10.5px] font-bold leading-none uppercase">
                    {activePlayLevel.titleAr}
                  </p>
                </div>

                {/* Simulated interactive kid phonetic audio speaker */}
                <div className="bg-sky-50 rounded-2xl p-3 border border-sky-100 flex items-center gap-3">
                  <button
                    id="speak-phonetics-btn"
                    onClick={() => speakText(activePlayLevel.title.split(":")[1] || activePlayLevel.title)}
                    className={`w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center transition-transform active:scale-90 shrink-0 ${isSpeaking ? 'animate-ping' : ''}`}
                    title="Read Aloud / استمع للصوت"
                  >
                    📢
                  </button>
                  <div className="text-left">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase leading-none block">PHONETIC SOUNDS / لفظ الصوت:</span>
                    <span className="text-xs font-mono font-black text-sky-850 block">{activePlayLevel.phonetics}</span>
                  </div>
                </div>

                {/* Lesson text space */}
                <div className="bg-amber-50/50 p-3.5 rounded-2xl text-left border border-amber-100/50 space-y-2">
                  <p className="text-slate-800 font-extrabold text-xs leading-relaxed">
                    {activePlayLevel.lessonEn}
                  </p>
                  <p className="text-slate-500 font-bold text-[11px] leading-relaxed">
                    {activePlayLevel.lessonAr}
                  </p>
                </div>

                {/* Leo the Lion speech motivation */}
                <div className="flex gap-2.5 items-start bg-emerald-50 rounded-2xl p-2.5 border border-emerald-100">
                  <span className="text-2xl pt-1">🦁</span>
                  <p className="text-slate-600 text-[10.5px] font-bold leading-tight text-left">
                    "Awesome superkid! Say it out loud three times to lock the magic spell in your brain!"
                  </p>
                </div>

                <button
                  id="complete-lesson-btn"
                  onClick={handleCompleteLessonOnly}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs py-2.5 rounded-xl border-b-4 border-orange-700 shadow-md transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5 uppercase"
                >
                  <Sparkles className="w-4 h-4" /> COMPLETE LESSON & START QUIZ (+20 XP)!
                </button>
              </div>
            ) : (
              /* QUIZ MODE VIEW */
              <div className="flex-1 flex flex-col space-y-4">
                <div className="bg-slate-50 rounded-2xl p-3 border text-center">
                  <span className="text-[9px] font-black text-slate-400 block uppercase">Level interactive quiz:</span>
                  <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm leading-tight mt-1">
                    {activePlayLevel.question}
                  </h4>
                  <p className="text-slate-500 text-[10.5px] font-bold leading-tight mt-0.5">
                    {activePlayLevel.questionAr}
                  </p>
                </div>

                {/* Option list */}
                <div className="space-y-1.5">
                  {activePlayLevel.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrectAnswer = idx === activePlayLevel.answerIndex;
                    
                    let bgBorderClass = "bg-slate-50 border-slate-200 hover:bg-slate-100";
                    if (isSelected) {
                      bgBorderClass = "bg-amber-100 border-amber-400 text-slate-900";
                    }
                    if (quizSubmitted) {
                      if (isCorrectAnswer) {
                        bgBorderClass = "bg-emerald-100 border-emerald-400 text-emerald-950 font-black";
                      } else if (isSelected) {
                        bgBorderClass = "bg-rose-100 border-rose-400 text-rose-950 line-through";
                      } else {
                        bgBorderClass = "bg-slate-50 border-slate-100 text-slate-300 pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={opt}
                        id={`quiz-option-${idx}`}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-2.5 px-4 rounded-2xl border-2 text-xs font-extrabold transition-all cursor-pointer ${bgBorderClass}`}
                      >
                        {idx + 1}. {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Feedback / Answer explanation */}
                {quizSubmitted && (
                  <div className={`p-3 rounded-2xl text-left border ${
                    selectedOption === activePlayLevel.answerIndex 
                      ? 'bg-emerald-50 border-emerald-100 text-slate-700' 
                      : 'bg-rose-50 border-rose-100 text-slate-700'
                  }`}>
                    <span className="text-[10px] font-extrabold uppercase block leading-none">
                      {selectedOption === activePlayLevel.answerIndex ? '👏 Superlative / ممتاز!' : '😢 Try Again / حاول مجدداً:'}
                    </span>
                    <p className="text-xs font-bold leading-relaxed mt-1">
                      {activePlayLevel.explanationEn}
                    </p>
                    <p className="text-[11px] font-medium leading-relaxed mt-0.5 opacity-80">
                      {activePlayLevel.explanationAr}
                    </p>
                  </div>
                )}

                {/* Action CTA */}
                {!quizSubmitted ? (
                  <button
                    id="submit-quiz-btn"
                    disabled={selectedOption === null}
                    onClick={handleSubmitQuiz}
                    className="w-full bg-slate-900 disabled:opacity-45 text-white font-black text-xs py-2.5 rounded-xl border-b-4 border-slate-950 text-center uppercase cursor-pointer"
                  >
                    CHECK ANSWER / التحقق من الإجابة
                  </button>
                ) : (
                  <button
                    id="next-level-claim-btn"
                    onClick={handleNextLevelProgress}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs py-2.5 rounded-xl border-b-4 border-emerald-700 shadow-md text-center uppercase cursor-pointer"
                  >
                    CLAIM REWARD & END LEVEL (+10 XP) ⭐
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Daily Challenge Floating Modal */}
      {activeChallengeLevel && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 z-50 animate-fade-in select-none">
          <div className="bg-white rounded-[32px] p-5 shadow-2xl border-4 border-orange-500 relative w-full max-w-[420px] text-slate-800">
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <span className="text-[11.5px] font-black text-orange-600 flex items-center gap-1 uppercase">
                🔥 DAILY CHALLENGE SPECIAL
              </span>
              <button
                id="close-challenge-btn"
                onClick={() => setActiveChallengeLevel(null)}
                className="text-slate-400 hover:text-slate-600 text-[10px] font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <span className="text-4xl animate-bounce block">🦁🔥</span>
                <h3 className="text-slate-900 font-extrabold text-sm sm:text-base leading-tight uppercase mt-1">
                  {activeChallengeLevel.question}
                </h3>
                <p className="text-slate-500 text-[11px] font-bold mt-0.5 leading-tight">
                  {activeChallengeLevel.questionAr}
                </p>
              </div>

              {/* Quiz option list */}
              <div className="space-y-1.5 text-left">
                {activeChallengeLevel.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeChallengeLevel.answerIndex;
                  
                  let optClass = "bg-slate-50 border-slate-200 hover:bg-emerald-50";
                  if (isSelected) optClass = "bg-orange-100 border-orange-400 text-orange-950 font-black";
                  if (quizSubmitted) {
                    if (isCorrect) optClass = "bg-emerald-100 border-emerald-400 text-emerald-950 font-black scale-102";
                    else if (isSelected) optClass = "bg-rose-100 border-rose-400 text-rose-950 line-through";
                    else optClass = "bg-slate-50 border-slate-100 text-slate-350 opacity-50";
                  }

                  return (
                    <button
                      key={opt}
                      id={`challenge-option-${idx}`}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-2.5 rounded-2xl border-2 text-xs font-extrabold transition-all cursor-pointer ${optClass}`}
                    >
                      {idx + 1}. {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {quizSubmitted && (
                <div className={`p-3 rounded-2xl text-left border text-xs font-bold leading-normal ${
                  selectedOption === activeChallengeLevel.answerIndex ? 'bg-emerald-50 border-emerald-200 text-slate-700' : 'bg-rose-50 border-rose-200 text-slate-700'
                }`}>
                  {selectedOption === activeChallengeLevel.answerIndex ? '🎉 MARVELOUS JOB CHAMPION!' : '😢 Opps! Try your best tomorrow!'}
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    {activeChallengeLevel.explanationEn}
                  </p>
                </div>
              )}

              {/* Actions */}
              {!quizSubmitted ? (
                <button
                  id="submit-challenge-btn"
                  disabled={selectedOption === null}
                  onClick={handleSubmitQuiz}
                  className="w-full bg-orange-500 disabled:opacity-50 text-white font-black text-xs py-2.5 rounded-xl border-b-4 border-orange-700 text-center uppercase tracking-wide cursor-pointer"
                >
                  SUBMIT CHALLENGE / إرسال حل التحدي
                </button>
              ) : (
                <button
                  id="claim-challenge-reward-btn"
                  onClick={handleFinishDailyChallenge}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs py-2.5 rounded-xl border-b-4 border-emerald-700 shadow-md text-center uppercase tracking-wide cursor-pointer animate-pulse"
                >
                  CLAIM GRANDEUR REWARD (+50 XP)!
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
