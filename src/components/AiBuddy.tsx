import React, { useState, useEffect, useRef } from 'react';
import { Send, Volume2, Sparkles, MessageCircle, RefreshCw, Loader } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiBuddyProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  addXp: (amount: number) => void;
  addStar: () => void;
  incrementChatExchanges: () => void;
}

const QUICK_TALK_PROMPTS = [
  { text: "Hello Leo! 👋", textAr: "مرحباً يا ليو!" },
  { text: "What is your favorite animal? 🦁", textAr: "ما هو حيوانك المفضل؟" },
  { text: "Let's learn colors! 🎨", textAr: "لنلعب مع الألوان!" },
  { text: "Tell me a sweet joke! 😂", textAr: "أخبرني بنكتة لطيفة!" },
  { text: "What is your favorite fruit? 🍎", textAr: "ما هي فاكهتك المفضلة؟" }
];

export default function AiBuddy({
  chatHistory,
  setChatHistory,
  addXp,
  addStar,
  incrementChatExchanges
}: AiBuddyProps) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest bubbles
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Initial welcome message from Leo if history is empty
  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([
        {
          id: 'welcome_leo',
          role: 'model',
          text: "Hello, my brave helper! (مرحباً يا صديقي البطل!) I am Leo, your English Adventure Buddy! 🦁 What is your name? (ما اسمك الكريم؟) ✨",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [chatHistory, setChatHistory]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Regular expression to replace emoji and clean up bracketed text if we want clean audio
      // Let's remove the Arabic parts inside parentheses so SpeechSynthesis only speaks the English part!
      // This is a superb educational tactic so SpeechSynthesis speaks pure English!
      const cleanEnglishText = text.replace(/\([^)]*\)/g, "").replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, "");
      
      const utterance = new SpeechSynthesisUtterance(cleanEnglishText.trim() || text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // highly comprehensible
      utterance.pitch = 1.25; // cartoon adventurer voice
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = 'msg_' + Date.now();
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const parentHistoryFormat = chatHistory.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: textToSend,
          history: parentHistoryFormat
        })
      });

      if (!res.ok) {
        throw new Error("API request error connected to Gemini server");
      }

      const data = await res.json();
      
      const modelMessage: ChatMessage = {
        id: 'msg_' + (Date.now() + 1),
        role: 'model',
        text: data.text || "Leo is thinking! Let's play together! 🦁",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, modelMessage]);
      addXp(15); // reward for typing/talking in English!
      incrementChatExchanges();

      // Automatically speak Leo's reply!
      speakText(modelMessage.text);

    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: 'msg_' + (Date.now() + 1),
        role: 'model',
        text: "Oh! Leo needs a small rest! (البطل ليو يحتاج قسطاً من الراحة!) Let's try again! 🦁❤️",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([
      {
        id: 'welcome_leo_reset',
        role: 'model',
        text: "Hello, my brave helper! (مرحباً يا صديقي البطل!) I am Leo, your English Adventure Buddy! 🦁 What is your name? (ما اسمك الكريم؟) ✨",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex-grow flex flex-col justify-between p-1 bg-white rounded-3xl shadow-sm my-1 overflow-hidden min-h-[500px]">
      
      {/* Friendly Chat Partner Title */}
      <div className="bg-slate-900 text-white px-3 py-2 rounded-2xl flex justify-between items-center select-none shadow-sm mx-1 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center border-2 border-white select-none text-xl animate-bounce">
            🦁
          </div>
          <div>
            <h4 className="text-xs font-black tracking-wider leading-none">Leo the Smart AI Lion</h4>
            <p className="text-[9.5px] text-amber-300 font-bold leading-none mt-0.5">صديقي الأسد الذكي ليو</p>
          </div>
        </div>

        <button
          id="clear-chat-btn"
          onClick={clearChat}
          className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-all cursor-pointer"
          title="Reset chat / إفراغ المحادثة"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message logs viewable region */}
      <div id="bubbles-scroll-chamber" className="flex-1 overflow-y-auto px-2 py-3 space-y-2.5 max-h-[340px] bg-slate-50/50 rounded-2xl border border-slate-100 my-1">
        {chatHistory.map(msg => {
          const isModel = msg.role === 'model';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} animate-fade-in`}
            >
              <div className="flex items-start gap-1 max-w-[85%]">
                {isModel && (
                  <span className="text-base select-none mt-1">🦁</span>
                )}
                
                <div className={`p-2.5 rounded-2xl text-xs font-black select-all tracking-tight ${
                  isModel
                    ? 'bg-amber-100/90 text-slate-900 rounded-tl-none border border-amber-200'
                    : 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-tr-none shadow-sm'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  {isModel && (
                    <button
                      id={`speak-btn-${msg.id}`}
                      onClick={() => speakText(msg.text)}
                      className="mt-1 bg-white/95 text-amber-900 border border-amber-300 font-bold text-[9px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                    >
                      <Volume2 className="w-3 h-3 text-amber-800" />
                      Speak / استمع
                    </button>
                  )}
                </div>
              </div>
              <span className="text-[8px] text-slate-400 font-bold mt-0.5 px-6">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-1.5 text-slate-500 px-6 animate-pulse select-none">
            <Loader className="w-3.5 h-3.5 animate-spin" />
            <span className="text-[10px] font-extrabold text-amber-700">Leo is writing / ليو يكتب لك...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preschool Clickable Prompt pill boxes */}
      <div className="px-1.5 py-0.5 select-none text-[9.5px] font-black text-slate-400 uppercase tracking-tight">
        ✨ Try speaking / اضغط للتحدث بالإنجليزية:
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 px-2 select-none" style={{ scrollbarWidth: 'none' }}>
        {QUICK_TALK_PROMPTS.map((qp, i) => (
          <button
            key={i}
            id={`quick-bub-${i}`}
            onClick={() => handleSendMessage(qp.text)}
            className="flex-shrink-0 bg-white border border-slate-200 hover:border-amber-400 text-slate-800 hover:text-slate-950 hover:bg-amber-50 rounded-full px-3 py-1 font-extrabold text-[10px] transition-all flex flex-col items-center justify-center leading-none shadow-xs"
            disabled={isLoading}
          >
            <span>{qp.text}</span>
            <span className="text-[7.5px] text-slate-400 font-medium leading-none mt-0.5">{qp.textAr}</span>
          </button>
        ))}
      </div>

      {/* Typing/Writing send forms */}
      <div className="flex items-center gap-1.5 p-1 border-t border-slate-100 bg-slate-50 rounded-2xl mx-1 mb-1">
        <input
          type="text"
          placeholder="Type english word or greeting / اكتب بالإنجليزية"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(inputText);
            }
          }}
          disabled={isLoading}
          className="bg-white border-2 border-slate-100 focus:border-amber-400 text-xs text-slate-800 font-extrabold px-3 py-2 rounded-xl flex-grow focus:outline-none placeholder:text-slate-400"
        />

        <button
          id="submit-chat-btn"
          onClick={() => handleSendMessage(inputText)}
          disabled={isLoading || !inputText.trim()}
          className="bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-slate-900 p-2.5 rounded-xl cursor-pointer active:scale-95 transition-all shadow"
        >
          <Send className="w-4 h-4 fill-current text-slate-900" />
        </button>
      </div>

    </div>
  );
}
