import React, { useState } from 'react';
import { BookOpen, AlertCircle, HelpCircle, Volume2, ArrowLeft, ArrowRight, CheckCircle, Award } from 'lucide-react';
import { StoryItem, STORIES_DATA } from '../types';

interface StoryWorldProps {
  completedStoryIds: string[];
  markStoryComplete: (id: string) => void;
  addXp: (amount: number) => void;
  addStar: () => void;
}

export default function StoryWorld({
  completedStoryIds,
  markStoryComplete,
  addXp,
  addStar
}: StoryWorldProps) {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Quiz interactive state
  const [quizActive, setQuizActive] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);

  const startStory = (story: StoryItem) => {
    setSelectedStory(story);
    setCurrentPageIndex(0);
    setQuizActive(false);
    setSelectedOptionIndex(null);
    setQuizSubmitted(false);
    setQuizCorrect(null);
    speakStoryPage(story.pages[0].textEn);
  };

  const handleNextPage = () => {
    if (!selectedStory) return;
    if (currentPageIndex < selectedStory.pages.length - 1) {
      const nextIndex = currentPageIndex + 1;
      setCurrentPageIndex(nextIndex);
      speakStoryPage(selectedStory.pages[nextIndex].textEn);
    } else {
      // Open Comprehension Quiz!
      setQuizActive(true);
      speakStoryPage(selectedStory.quiz.question);
    }
  };

  const handlePrevPage = () => {
    if (!selectedStory) return;
    if (quizActive) {
      setQuizActive(false);
      setCurrentPageIndex(selectedStory.pages.length - 1);
      speakStoryPage(selectedStory.pages[selectedStory.pages.length - 1].textEn);
    } else if (currentPageIndex > 0) {
      const prevIndex = currentPageIndex - 1;
      setCurrentPageIndex(prevIndex);
      speakStoryPage(selectedStory.pages[prevIndex].textEn);
    }
  };

  const speakStoryPage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove any emojis
      const cleanText = text.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // baby/child story style
      utterance.pitch = 1.25;
      window.speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = () => {
    if (!selectedStory || selectedOptionIndex === null) return;

    const isCorrect = selectedOptionIndex === selectedStory.quiz.answerIndex;
    setQuizCorrect(isCorrect);
    setQuizSubmitted(true);

    if (isCorrect) {
      const isAlreadyCompleted = completedStoryIds.includes(selectedStory.id);
      if (!isAlreadyCompleted) {
        markStoryComplete(selectedStory.id);
        addXp(50); // huge reward
        addStar();
      }
      speakStoryPage(`Wonderful! That is correct!`);
    } else {
      speakStoryPage(`Oh! Try again. You can do it!`);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-2 select-none">
      
      {!selectedStory ? (
        // Library shelf list
        <div className="space-y-2.5">
          <div className="bg-white/80 p-3 rounded-2xl border border-rose-200 text-center">
            <h3 className="text-slate-800 font-extrabold text-sm sm:text-base flex justify-center items-center gap-1">
              <BookOpen className="w-4 h-4 text-rose-500 animate-bounce" />
              Interactive Bedtime Stories / عالم القصص التفاعلية
            </h3>
            <p className="text-slate-600 text-xs mt-0.5">
              Select an exciting story, read step-by-step, and unlock stars with quizzes! 📚✨
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {STORIES_DATA.map(story => {
              const isStoryFinished = completedStoryIds.includes(story.id);
              return (
                <div
                  key={story.id}
                  id={`story-card-${story.id}`}
                  className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 hover:border-rose-400 transition-all flex justify-between items-center relative overflow-hidden"
                >
                  <button
                    onClick={() => startStory(story)}
                    className="flex-1 flex items-center gap-3 text-left focus:outline-none"
                  >
                    {/* Cover art badge */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${story.themeColor} flex items-center justify-center text-white text-xl shadow-sm relative overflow-hidden`}>
                      <span>{story.coverEmoji}</span>
                      <div className="absolute top-0 right-0 w-4 h-4 bg-white/20 rounded-bl-full"></div>
                    </div>

                    <div>
                      <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm tracking-tight leading-tight uppercase select-all">
                        {story.title}
                      </h4>
                      <p className="text-slate-500 text-[10px] font-bold leading-none mt-0.5 select-all">
                        {story.titleAr}
                      </p>
                      
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[8.5px] font-extrabold bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded border border-rose-100">
                          {story.difficulty}
                        </span>
                        <span className="text-[8.5px] font-bold text-slate-500">
                          📖 {story.pages.length} Pages
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="z-10 flex items-center gap-1.5">
                    {isStoryFinished && (
                      <span className="bg-emerald-50 text-emerald-600 font-bold text-[9px] px-1.5 py-1 rounded-md border border-emerald-200 flex items-center gap-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        CLEARED!
                      </span>
                    )}

                    <button
                      id={`start-story-btn-${story.id}`}
                      onClick={() => startStory(story)}
                      className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white py-1.5 px-3 rounded-xl font-extrabold text-xs cursor-pointer shadow-sm"
                    >
                      Read!
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-rose-400 to-amber-400 rounded-3xl p-3 text-white flex items-center gap-2 shadow-sm border-b-4 border-rose-600 mt-2">
            <span className="text-3xl animate-pulse">🦁🎈</span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider opacity-90 leading-none">Lesson Quest / مهمة اليوم</p>
              <p className="font-extrabold text-xs mt-0.5 leading-tight">
                "Complete a story quiz cleanly. Leo is waiting to hand over a story gold coin!" 🌟
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Active Stories Viewer
        <div className="flex-grow flex flex-col justify-between">
          
          <div className="bg-white rounded-3xl p-4 shadow-md border-b-4 border-slate-200 flex-1 flex flex-col justify-around text-center relative overflow-hidden">
            
            <button
              id="library-back-btn"
              onClick={() => setSelectedStory(null)}
              className="absolute top-3 left-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full cursor-pointer focus:outline-none"
            >
              ◀ Exit / خروج
            </button>

            {!quizActive ? (
              // Active page view
              <div className="space-y-3 flex-1 flex flex-col justify-around">
                
                {/* Visual Page badge */}
                <div className="flex flex-col items-center justify-center mt-3">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${selectedStory.themeColor} flex items-center justify-center relative p-1 shadow-sm`}>
                    <div className="w-full h-full bg-slate-50 rounded-full flex items-center justify-center">
                      <span className="text-4xl">{selectedStory.coverEmoji}</span>
                    </div>
                  </div>
                  <span className="text-slate-400 font-mono text-[10.5px] mt-1">
                    Page / صفحة {currentPageIndex + 1} of {selectedStory.pages.length}
                  </span>
                </div>

                {/* Bilingual Lyrical Story text block */}
                <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100/50">
                  <p className="text-slate-800 font-black text-sm sm:text-base leading-relaxed select-all">
                    "{selectedStory.pages[currentPageIndex].textEn}"
                  </p>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mt-2 select-all">
                    "{selectedStory.pages[currentPageIndex].textAr}"
                  </p>
                </div>

                <div className="flex justify-center items-center">
                  <button
                    id="speak-story-page-btn"
                    onClick={() => speakStoryPage(selectedStory.pages[currentPageIndex].textEn)}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-[10.5px] font-black tracking-tight flex items-center gap-1 active:scale-95 transition-all"
                  >
                    <Volume2 className="w-4 h-4 text-amber-700 animate-spin-slow" />
                    Leo Reads Page / اقرأ لي يا ليو 👋
                  </button>
                </div>

              </div>
            ) : (
              // Story comprehension quiz view
              <div className="space-y-2 flex-grow flex flex-col justify-around">
                
                <div className="text-center mt-3">
                  <span className="bg-amber-400 text-slate-900 font-black text-[9.5px] px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-amber-600 inline-flex items-center gap-0.5">
                    <Award className="w-3.5 h-3.5 text-amber-950 animate-bounce" />
                    Gold Star Quiz / اختبار النجمة الذهبية
                  </span>
                  
                  <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-200 mt-2">
                    <p className="text-slate-900 font-extrabold text-xs sm:text-sm">
                      {selectedStory.quiz.question}
                    </p>
                    <p className="text-amber-950 font-bold text-xs mt-1">
                      {selectedStory.quiz.questionAr}
                    </p>
                  </div>
                </div>

                {/* Options layout */}
                <div className="space-y-1.5 my-2">
                  {selectedStory.quiz.options.map((opt, idx) => (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      onClick={() => {
                        if (!quizSubmitted) {
                          setSelectedOptionIndex(idx);
                        }
                      }}
                      className={`w-full py-1.5 px-3 rounded-xl text-left text-xs font-black transition-all border-2 flex items-center justify-between ${
                        selectedOptionIndex === idx
                          ? 'bg-amber-400 border-amber-600 text-slate-950'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="uppercase">{opt}</span>
                      <span className="font-mono text-[9px] text-slate-400">Option {idx + 1}</span>
                    </button>
                  ))}
                </div>

                {/* Confirm Quiz action */}
                <div className="flex flex-col gap-1.5">
                  {!quizSubmitted ? (
                    <button
                      id="submit-story-quiz-btn"
                      onClick={checkAnswer}
                      disabled={selectedOptionIndex === null}
                      className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-black text-xs py-2 rounded-xl transition-all"
                    >
                      Verify Selection / تحقق من الإجابة!
                    </button>
                  ) : (
                    <div className="space-y-1.5">
                      <div className={`p-2 rounded-xl text-[11px] font-black text-center ${
                        quizCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {quizCorrect ? (
                          <p>⭐ {selectedStory.quiz.explanationEn} (رائع! {selectedStory.quiz.explanationAr}) (+50 XP / +1 Star)</p>
                        ) : (
                          <p>❌ Not quite right! {selectedStory.quiz.explanationAr} Try again! ⭐</p>
                        )}
                      </div>

                      {!quizCorrect && (
                        <button
                          id="retry-story-quiz-btn"
                          onClick={() => {
                            setSelectedOptionIndex(null);
                            setQuizSubmitted(false);
                            setQuizCorrect(null);
                          }}
                          className="w-full bg-amber-500 text-slate-950 font-extrabold text-xs py-1.5 rounded-xl text-center"
                        >
                          Try Quiz Again / أعد المحاولة
                        </button>
                      )}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center gap-2 border-t border-slate-100 pt-3">
              <button
                id="story-prev-btn"
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0 && !quizActive}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-1.5 px-3 rounded-xl active:scale-95 disabled:opacity-40"
              >
                ◀ Prev / السابق
              </button>

              {!quizActive && (
                <button
                  id="story-next-btn"
                  onClick={handleNextPage}
                  className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-black py-1.5 px-4 rounded-xl shadow-sm active:scale-95 border-b-2 border-rose-700"
                >
                  {currentPageIndex === selectedStory.pages.length - 1 ? 'Go to Quiz / للاختبار ▶' : 'Next / التالي ▶'}
                </button>
              )}
            </div>

          </div>

          <div className="mt-2 text-center text-[10px] text-slate-500 font-mono">
            {completedStoryIds.includes(selectedStory.id) ? (
              <span className="text-emerald-600 font-bold">📚 Story cleared in your records! Outstanding job! (+50 XP awarded)</span>
            ) : (
              <span>💡 Unlocked fully once you solve the star comprehension quiz.</span>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
