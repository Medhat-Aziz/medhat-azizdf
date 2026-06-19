import React, { useState } from 'react';
import { Sparkles, ArrowRight, Volume2, CheckCircle2, Star, HelpCircle } from 'lucide-react';
import { VocabularyCard, VOCABULARY_DATA } from '../types';

interface VocabularyQuestProps {
  completedVocabIds: string[];
  markVocabComplete: (id: string) => void;
  addXp: (amount: number) => void;
  addStar: () => void;
}

export default function VocabularyQuest({
  completedVocabIds,
  markVocabComplete,
  addXp,
  addStar
}: VocabularyQuestProps) {
  const [selectedCategory, setSelectedCategory] = useState<'animals' | 'food' | 'colors' | 'family'>('animals');
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Gamified Spelling Quiz State
  const [quizInput, setQuizInput] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  
  const filteredVocab = VOCABULARY_DATA.filter(item => item.category === selectedCategory);
  const activeCard = filteredVocab[activeCardIndex] || filteredVocab[0];

  const handleNextCard = () => {
    if (activeCardIndex < filteredVocab.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      setActiveCardIndex(0);
    }
    resetSpellingQuiz();
  };

  const handlePrevCard = () => {
    if (activeCardIndex > 0) {
      setActiveCardIndex(activeCardIndex - 1);
    } else {
      setActiveCardIndex(filteredVocab.length - 1);
    }
    resetSpellingQuiz();
  };

  const resetSpellingQuiz = () => {
    setQuizInput('');
    setQuizSubmitted(false);
    setQuizCorrect(null);
  };

  // Speaks aloud using SpeechSynthesis with kid-friendly pitch
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel active speaking to prevent overlap
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // slightly slower for children
      utterance.pitch = 1.25; // cute, playful higher pitch
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis unsupported');
    }
  };

  // Submit spelling quiz
  const handleCheckSpelling = () => {
    if (!quizInput.trim()) return;
    
    const isMatched = quizInput.trim().toLowerCase() === activeCard.word.toLowerCase();
    setQuizCorrect(isMatched);
    setQuizSubmitted(true);

    if (isMatched) {
      // Reward child!
      const isAlreadyDone = completedVocabIds.includes(activeCard.id);
      if (!isAlreadyDone) {
        markVocabComplete(activeCard.id);
        addXp(25); // high reward for spelling correctly!
        addStar();
      }
      speakWord(`Superb! ${activeCard.word}!`);
    } else {
      speakWord("Try again! You can do it!");
    }
  };

  // Solve vocabulary spelling instantly for absolute zero-knowledge kids (shows spelling help)
  const [showSpellingHint, setShowSpellingHint] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-2 select-none">
      
      {/* Category Jelly Pill Buttons */}
      <div className="grid grid-cols-4 gap-1 mb-2 bg-white/70 p-1.5 rounded-2xl shadow-sm border border-amber-200">
        {(['animals', 'food', 'colors', 'family'] as const).map(cat => (
          <button
            key={cat}
            id={`cat-tab-${cat}`}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveCardIndex(0);
              resetSpellingQuiz();
              setShowSpellingHint(false);
            }}
            className={`py-1.5 px-0.5 rounded-xl font-black text-[10px] sm:text-xs transition-all flex flex-col items-center justify-center border-b-2 capitalize ${
              selectedCategory === cat
                ? 'bg-amber-400 border-amber-600 text-slate-900 shadow-sm scale-102'
                : 'bg-amber-50/50 border-amber-100 text-slate-600 hover:bg-amber-100/50'
            }`}
          >
            <span className="text-sm">
              {cat === 'animals' && '🦁'}
              {cat === 'food' && '🍎'}
              {cat === 'colors' && '🎨'}
              {cat === 'family' && '🏠'}
            </span>
            <span className="font-extrabold uppercase tracking-tight">{cat}</span>
            <span className="text-[7.5px] font-medium text-slate-500">
              {cat === 'animals' && 'حيوانات'}
              {cat === 'food' && 'الأطعمة'}
              {cat === 'colors' && 'الألوان'}
              {cat === 'family' && 'العائلة'}
            </span>
          </button>
        ))}
      </div>

      {activeCard && (
        <div className="flex-1 flex flex-col justify-between">
          
          {/* Main Flash Card Board */}
          <div className="bg-white rounded-3xl p-4 shadow-md border-b-4 border-slate-200 flex-1 flex flex-col justify-around text-center relative overflow-hidden my-1">
            
            {/* Completion Ribbon Indicator */}
            {completedVocabIds.includes(activeCard.id) && (
              <div className="absolute top-3 right-3 bg-emerald-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm animate-bounce">
                <CheckCircle2 className="w-3 h-3 text-white" />
                <span>CLEARED! / مكتمل</span>
              </div>
            )}

            <span className="absolute top-3 left-3 bg-slate-100 text-[10px] font-bold text-slate-600 px-2 py-0.5 rounded-full">
              {activeCardIndex + 1} / {filteredVocab.length}
            </span>

            {/* Huge dynamic cartoon mascot symbol */}
            <div className="flex justify-center items-center my-1.5">
              <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center border-4 border-dashed border-amber-200 relative animate-pulse shadow-sm">
                <span className="text-6xl drop-shadow-md">{activeCard.emoji}</span>
              </div>
            </div>

            {/* Word Headers */}
            <div className="space-y-0.5">
              <div className="flex justify-center items-center gap-1.5">
                <h2 className="text-slate-900 font-extrabold text-3xl tracking-tight select-all">
                  {activeCard.word}
                </h2>
                <button
                  id="speak-vocab-btn"
                  onClick={() => speakWord(activeCard.word)}
                  className="bg-amber-100 text-amber-700 p-1.5 rounded-full hover:bg-amber-200 active:scale-90 transition-transform"
                  title="Listen / استمع للنطق"
                >
                  <Volume2 className="w-4 h-4 text-amber-700 animate-bounce" />
                </button>
              </div>

              {/* Phonetics & Arabic Meaning helper */}
              <p className="text-amber-800 font-black text-xs uppercase tracking-widest font-mono">
                {activeCard.phonetic} (كأنها: {activeCard.wordAr})
              </p>
              
              <div className="bg-amber-50/70 border border-amber-100 rounded-xl px-2 py-1 inline-block">
                <span className="text-slate-500 text-[10px] font-bold block leading-none">Meaning / المعنى</span>
                <span className="text-amber-900 font-black text-base">{activeCard.wordAr}</span>
              </div>
            </div>

            {/* Bilingual Kids Example Sentence */}
            <div className="bg-sky-50/80 rounded-2xl p-2.5 text-center border-l-4 border-sky-400 mt-2">
              <p className="text-slate-800 font-bold text-xs sm:text-sm select-all">
                "{activeCard.example}"
              </p>
              <p className="text-slate-600 text-[11px] font-medium leading-tight">
                "{activeCard.exampleAr}"
              </p>
            </div>

            {/* spelling check game widget for kids */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-tight flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Spelling Game / اختبار التهجئة
                </span>
                
                <button
                  id="toggle-hint-btn"
                  onClick={() => setShowSpellingHint(!showSpellingHint)}
                  className="text-[9.5px] font-extrabold text-sky-600 hover:text-sky-800 focus:outline-none flex items-center gap-0.5"
                >
                  <HelpCircle className="w-3 h-3" />
                  {showSpellingHint ? 'Hide Hint / إخفاء المساعدة' : 'Show Hint / إظهار المساعدة'}
                </button>
              </div>

              {/* Spelling help hint */}
              {showSpellingHint && (
                <div className="text-[11px] font-mono text-center text-amber-800 bg-amber-50 p-1 rounded-lg border border-amber-100 mb-1 leading-none uppercase tracking-widest">
                  Copy this: <span className="font-extrabold text-slate-900">{activeCard.word}</span>
                </div>
              )}

              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Type spelling / اكتب الكلمة بالإنجليزية"
                  value={quizInput}
                  onChange={(e) => setQuizInput(e.target.value)}
                  disabled={quizCorrect === true}
                  className="bg-slate-50 border-2 border-slate-200 focus:border-amber-400 focus:bg-white text-slate-800 rounded-xl px-2.5 py-1 text-xs font-bold text-center flex-1 focus:outline-none"
                />
                
                <button
                  id="check-spelling-btn"
                  onClick={handleCheckSpelling}
                  className="bg-slate-900 text-white hover:bg-slate-800 active:scale-95 text-[11px] font-extrabold py-1 px-3 rounded-xl transition-all"
                >
                  Check!
                </button>
              </div>

              {/* Spell Feedback Alert */}
              {quizSubmitted && (
                <div className={`mt-1.5 py-1 px-2 rounded-xl text-[10.5px] font-black tracking-tight ${
                  quizCorrect 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}>
                  {quizCorrect ? (
                    <span>🌟 Excellent! You spelled it perfectly! (+25 XP)</span>
                  ) : (
                    <span>🐰 Oh! Try spelling it again! Check the hint above.</span>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Flash Cards Navigation Buttons */}
          <div className="flex justify-between items-center gap-2 mt-1 sm:mt-2 select-none">
            <button
              id="prev-word-btn"
              onClick={handlePrevCard}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs py-2 px-4 rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-1"
            >
              ◀ Back / لشرائح الخلف
            </button>
            
            <button
              id="speak-again-btn"
              onClick={() => speakWord(activeCard.word)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs p-2 rounded-xl"
              title="Repeat sound"
            >
              🔊 REPLAY SOUND
            </button>

            <button
              id="next-word-btn"
              onClick={handleNextCard}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-2 px-4 rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-1 border-b-2 border-amber-600"
            >
              Next / التالي ▶
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
