import React, { useState } from 'react';
import { Smartphone, Maximize2, Minimize2, Globe, Users } from 'lucide-react';

export default function DeviceWrapper({ children, lang, onToggleLang, onOpenAdmin, data }) {
  const [isFullWidth, setIsFullWidth] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#1C1715] flex flex-col items-center justify-center overflow-x-hidden selection:bg-gold-400 selection:text-white">
      {/* Ambient background glow & wallpaper pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gold-400/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gold-600/5 blur-[120px]" />
      </div>

      {/* Desktop Top Floating Utility Bar */}
      <header className="hidden md:flex fixed top-4 z-40 items-center gap-3 px-4 py-2 rounded-full border border-gold-400/30 bg-[#241F1C]/85 backdrop-blur-md shadow-lg text-cream-200 text-xs font-cinzel">
        {/* Language Toggle */}
        <button
          onClick={onToggleLang}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400/30 hover:bg-gold-400/10 transition"
        >
          <Globe className="w-3.5 h-3.5 text-gold-400" />
          <span>{lang === 'tr' ? 'العربية' : 'Türkçe'}</span>
        </button>

        {/* View Mode Toggle */}
        <button
          onClick={() => setIsFullWidth(!isFullWidth)}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400/30 hover:bg-gold-400/10 transition"
        >
          {isFullWidth ? (
            <>
              <Smartphone className="w-3.5 h-3.5 text-gold-400" />
              <span>Telefon Modu</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
              <span>Geniş Ekran</span>
            </>
          )}
        </button>

        {/* Admin List */}
        <button
          onClick={onOpenAdmin}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400/30 hover:bg-gold-400/10 transition"
        >
          <Users className="w-3.5 h-3.5 text-gold-400" />
          <span>{data.controls.viewList}</span>
        </button>
      </header>

      {/* Main Content Container */}
      <div
        className={`relative z-10 w-full transition-all duration-500 ease-out flex items-center justify-center ${
          isFullWidth
            ? 'max-w-xl my-0 min-h-[100dvh]'
            : 'md:my-8 md:max-w-[420px] md:h-[870px] md:rounded-[50px] md:border-[10px] md:border-[#352D28] md:shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(201,169,110,0.15)] md:overflow-hidden'
        }`}
      >
        {/* iPhone Dynamic Island Simulation (Desktop only) */}
        {!isFullWidth && (
          <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full bg-black z-50 items-center justify-end px-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222]" />
          </div>
        )}

        {/* Mobile Viewport Header Utility (Mobile only) */}
        <div className="md:hidden fixed top-3 left-3 z-40 flex items-center gap-2">
          <button
            onClick={onToggleLang}
            type="button"
            className="px-3 py-1 rounded-full border border-gold-400/40 bg-cream-100/90 text-[10px] font-cinzel text-charcoal-800 shadow-md backdrop-blur-sm flex items-center gap-1"
          >
            <Globe className="w-3 h-3 text-gold-600" />
            <span>{lang === 'tr' ? 'العربية' : 'TR'}</span>
          </button>
        </div>

        {/* Children (Card & Slides) */}
        <div className="w-full h-full min-h-[100dvh] md:min-h-0 bg-[#FAF8F3]">
          {children}
        </div>
      </div>
    </div>
  );
}
