import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, Volume2, CheckCircle2, RotateCcw, Heart } from 'lucide-react';
import { SongItem, SONGS_DATA } from '../types';

interface SongArenaProps {
  completedSongIds: string[];
  markSongComplete: (id: string) => void;
  addXp: (amount: number) => void;
  addStar: () => void;
}

export default function SongArena({
  completedSongIds,
  markSongComplete,
  addXp,
  addStar
}: SongArenaProps) {
  const [selectedSong, setSelectedSong] = useState<SongItem | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [kidsLikedSongs, setKidsLikedSongs] = useState<string[]>([]);

  // Auto advance lyrics effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && selectedSong) {
      timer = setTimeout(() => {
        if (currentLineIndex < selectedSong.lyrics.length - 1) {
          setCurrentLineIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          // Song finished!
          const isAlreadyCompleted = completedSongIds.includes(selectedSong.id);
          if (!isAlreadyCompleted) {
            markSongComplete(selectedSong.id);
            addXp(40); // high reward for finishing the song
            addStar();
          }
        }
      }, 5500); // 5.5 seconds per sentence
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentLineIndex, selectedSong]);

  const togglePlay = () => {
    if (!selectedSong) return;
    setIsPlaying(!isPlaying);
    // Speak first line if starting to play
    if (!isPlaying) {
      speakLine(selectedSong.lyrics[currentLineIndex].en);
    }
  };

  const handleRestart = () => {
    setCurrentLineIndex(0);
    setIsPlaying(false);
  };

  const speakLine = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove emojis before pronouncing
      const cleanText = text.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // perfect children's speed
      utterance.pitch = 1.3; // baby adventure buddy pitch
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLikeSong = (songId: string) => {
    if (kidsLikedSongs.includes(songId)) {
      setKidsLikedSongs(kidsLikedSongs.filter(id => id !== songId));
    } else {
      setKidsLikedSongs([...kidsLikedSongs, songId]);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-2 select-none">
      
      {!selectedSong ? (
        // Song Library List
        <div className="space-y-2.5">
          <div className="bg-white/80 p-3 rounded-2xl border border-sky-200 text-center">
            <h3 className="text-slate-800 font-extrabold text-sm sm:text-base flex justify-center items-center gap-1">
              <Music className="w-4 h-4 text-sky-500 animate-bounce" />
              Sing & Learn Arena / ساحة الغناء والترديد
            </h3>
            <p className="text-slate-600 text-xs mt-0.5">
              Listen to funny lyrics, repeat in English, and understand in Arabic! 🎵
            </p>
          </div>

          <div className="space-y-2">
            {SONGS_DATA.map(song => {
              const isCleared = completedSongIds.includes(song.id);
              const isLiked = kidsLikedSongs.includes(song.id);
              return (
                <div
                  key={song.id}
                  id={`song-card-${song.id}`}
                  className="bg-white rounded-3xl p-3 shadow-md border-b-4 border-slate-200 hover:border-sky-400 transition-all flex justify-between items-center relative overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setSelectedSong(song);
                      setCurrentLineIndex(0);
                      setIsPlaying(true);
                      speakLine(song.lyrics[0].en);
                    }}
                    className="flex-1 flex items-center gap-3 text-left focus:outline-none"
                  >
                    {/* Big glowing record disc */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${song.themeColor} flex items-center justify-center text-white text-xl relative shadow-sm`}>
                      <span className="relative z-10">{song.emoji}</span>
                      <div className="absolute inset-2 border border-white/30 rounded-full"></div>
                    </div>

                    <div>
                      <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm tracking-tight leading-tight uppercase">
                        {song.title}
                      </h4>
                      <p className="text-slate-500 text-[10px] font-bold leading-none mt-0.5">
                        {song.titleAr}
                      </p>
                      <span className="inline-block bg-slate-100 text-[9px] text-slate-500 rounded px-1.5 py-0.5 mt-1 font-mono">
                        ⏱️ {song.duration}
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 z-10">
                    <button
                      id={`like-song-btn-${song.id}`}
                      onClick={() => handleLikeSong(song.id)}
                      className={`p-1.5 rounded-full transition-transform active:scale-90 ${
                        isLiked ? 'text-rose-500 bg-rose-5' : 'text-slate-300 hover:text-rose-400'
                      }`}
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>

                    {isCleared && (
                      <span className="bg-emerald-50 text-emerald-600 font-bold text-[9px] px-1.5 py-1 rounded-md border border-emerald-200 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        CLEARED!
                      </span>
                    )}

                    <button
                      id={`play-song-btn-${song.id}`}
                      onClick={() => {
                        setSelectedSong(song);
                        setCurrentLineIndex(0);
                        setIsPlaying(true);
                        speakLine(song.lyrics[0].en);
                      }}
                      className="bg-sky-500 hover:bg-sky-600 active:scale-95 text-white p-2 rounded-xl shadow-sm cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current text-white" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Karaoke Mascot Banner */}
          <div className="bg-gradient-to-r from-teal-400 to-sky-400 rounded-3xl p-3 text-white flex items-center gap-2 shadow-sm border-b-4 border-sky-600 mt-2">
            <span className="text-3xl animate-bounce">🦁🎤</span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider opacity-90 leading-none">Leo Says / ليو مغرّداً</p>
              <p className="font-extrabold text-xs mt-0.5 leading-tight">
                "Singing makes English pronunciation super easy! Press play and sing with me!" 🌟
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Karaoke Player Screen
        <div className="flex-1 flex flex-col justify-between">
          
          <div className="bg-white rounded-3xl p-4 shadow-md border-b-4 border-slate-200 flex-1 flex flex-col justify-around text-center relative overflow-hidden">
            
            <button
              id="back-to-library-btn"
              onClick={() => {
                setSelectedSong(null);
                setIsPlaying(false);
              }}
              className="absolute top-3 left-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full cursor-pointer focus:outline-none"
            >
              ◀ Back / رجوع
            </button>

            {/* Glowing active vinyl display */}
            <div className="flex flex-col items-center justify-center my-1.5">
              <div className={`w-28 h-28 rounded-full bg-gradient-to-tr ${selectedSong.themeColor} flex items-center justify-center relative p-1.5 shadow-lg ${
                isPlaying ? 'animate-spin' : ''
              }`} style={{ animationDuration: '8s' }}>
                <div className="w-full h-full rounded-full bg-slate-900 border-2 border-white/20 flex items-center justify-center relative">
                  <span className="text-4xl drop-shadow-md pb-1">{selectedSong.emoji}</span>
                  {/* vinyl record lines */}
                  <div className="absolute inset-4 border border-dashed border-white/10 rounded-full"></div>
                  <div className="absolute inset-8 border border-white/5 rounded-full"></div>
                </div>
              </div>

              {/* Music Equalizer waves mockup or particles */}
              {isPlaying && (
                <div className="flex items-center gap-0.5 mt-1 h-3 overflow-hidden">
                  <div className="w-1 bg-amber-500 rounded-full animate-pulse h-2"></div>
                  <div className="w-1 bg-sky-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 bg-teal-500 rounded-full animate-ping h-2.5"></div>
                  <div className="w-1 bg-rose-500 rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 bg-amber-500 rounded-full animate-pulse h-3"></div>
                </div>
              )}
            </div>

            {/* Main Lyrics Screen panel */}
            <div className="space-y-1.5 my-1 px-1">
              <span className="bg-sky-50 text-[9.5px] text-sky-800 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest border border-sky-100">
                Line / السطر {currentLineIndex + 1} of {selectedSong.lyrics.length}
              </span>

              {/* English lyrical sentence container */}
              <div className="min-h-[56px] flex flex-col justify-center">
                <p className="text-slate-800 font-black text-sm sm:text-base leading-tight select-all">
                  "{selectedSong.lyrics[currentLineIndex].en}"
                </p>
                <p className="text-slate-500 font-medium text-[11px] mt-1 select-all">
                  "{selectedSong.lyrics[currentLineIndex].ar}"
                </p>
              </div>

              <div className="flex justify-center items-center gap-1 mt-1">
                <button
                  id="speak-lyric-btn"
                  onClick={() => speakLine(selectedSong.lyrics[currentLineIndex].en)}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-[10px] font-black tracking-tight flex items-center gap-1 active:scale-95 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700 animate-sine" />
                  Leo reads aloud / استمع لنطق ليو
                </button>
              </div>
            </div>

            {/* Controls segment */}
            <div className="flex justify-center items-center gap-4 border-t border-slate-100 pt-3">
              <button
                id="prev-lyric-btn"
                onClick={() => {
                  if (currentLineIndex > 0) {
                    setCurrentLineIndex(prev => prev - 1);
                    speakLine(selectedSong.lyrics[currentLineIndex - 1].en);
                  }
                }}
                disabled={currentLineIndex === 0}
                className="p-1.5 rounded-full bg-slate-50 border hover:bg-slate-100 text-slate-800 disabled:opacity-40 cursor-pointer"
              >
                ⏮️
              </button>

              <button
                id="play-pause-lyrics-btn"
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:scale-95 text-white flex items-center justify-center shadow-md focus:outline-none"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current text-white" />
                ) : (
                  <Play className="w-5 h-5 fill-current text-white ml-0.5" />
                )}
              </button>

              <button
                id="reset-song-btn"
                onClick={handleRestart}
                className="p-1.5 rounded-full bg-slate-50 border hover:bg-slate-100 text-slate-800 cursor-pointer"
                title="Restart Song"
              >
                <RotateCcw className="w-4 h-4 text-slate-700" />
              </button>

              <button
                id="next-lyric-btn"
                onClick={() => {
                  if (currentLineIndex < selectedSong.lyrics.length - 1) {
                    setCurrentLineIndex(prev => prev + 1);
                    speakLine(selectedSong.lyrics[currentLineIndex + 1].en);
                  } else {
                    // Manual Complete
                    setIsPlaying(false);
                    const isAlreadyCompleted = completedSongIds.includes(selectedSong.id);
                    if (!isAlreadyCompleted) {
                      markSongComplete(selectedSong.id);
                      addXp(40);
                      addStar();
                    }
                  }
                }}
                className="p-1.5 rounded-full bg-slate-50 border hover:bg-slate-100 text-slate-800 cursor-pointer"
              >
                ⏭️
              </button>
            </div>

          </div>

          {/* Quick interactive helpers progress gauge */}
          <div className="mt-2 text-center text-[10px] text-slate-500 font-mono">
            {completedSongIds.includes(selectedSong.id) ? (
              <span className="text-emerald-600 font-bold">✨ Song complete! Completed in your profile. (+40 XP awarded)</span>
            ) : (
              <span>💡 When the song completes, you will unlock 40 XP and 1 star!</span>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
