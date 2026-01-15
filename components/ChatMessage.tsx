
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const isPdf = message.file?.mimeType === 'application/pdf';

  return (
    <div className={`flex w-full mb-10 ${isAssistant ? 'justify-start' : 'justify-end animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out'}`}>
      <div className={`max-w-[92%] sm:max-w-[85%] lg:max-w-[75%] flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}>
        {/* User/Assistant Identity Badge */}
        <div className={`flex items-center gap-2 mb-2.5 px-3 text-[10px] font-black uppercase tracking-widest ${isAssistant ? 'text-indigo-400' : 'text-slate-400'}`}>
          {isAssistant ? (
            <div className="bg-indigo-100 p-1 rounded-md">
              <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          ) : null}
          <span>{isAssistant ? 'الأستاذ الذكي' : 'أنت'}</span>
          <span className="opacity-30">•</span>
          <span className="opacity-70">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        <div 
          className={`relative px-6 py-5 rounded-[2.5rem] shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap transition-all group
            ${isAssistant 
              ? 'bg-white text-slate-800 border border-indigo-50 rounded-tr-none shadow-indigo-100/20' 
              : 'bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 text-white rounded-tl-none shadow-indigo-200 shadow-xl'}`}
        >
          {/* File Attachment Styling */}
          {message.file && (
            <div className="mb-5 overflow-hidden rounded-[1.8rem] border border-black/5 ring-1 ring-white/10">
              {isPdf ? (
                <div className={`flex items-center gap-4 p-5 ${isAssistant ? 'bg-indigo-50/50' : 'bg-white/15 backdrop-blur-md'}`}>
                  <div className="bg-red-500 p-3 rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[11px] font-black uppercase tracking-wider ${isAssistant ? 'text-indigo-900' : 'text-white'}`}>ملف مرفق</span>
                    <span className={`text-[9px] opacity-60 font-bold uppercase ${isAssistant ? 'text-indigo-400' : 'text-indigo-100'}`}>Adobe PDF Document</span>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden group/img">
                  <img 
                    src={message.file.url} 
                    alt="Uploaded exercise" 
                    className="max-h-[450px] w-full object-contain bg-slate-100/50 backdrop-blur-sm transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
          )}
          
          <div className="relative z-10 font-bold tracking-tight text-indigo-950/90 leading-relaxed sm:leading-loose">
            <div className={isAssistant ? 'text-indigo-950' : 'text-white'}>
              {message.content}
            </div>
          </div>

          {/* Subtle reflection effect for user bubbles */}
          {!isAssistant && (
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[2.5rem]" />
          )}
        </div>
      </div>
    </div>
  );
};
