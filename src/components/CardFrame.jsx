import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CardFrame({ children, onNext, isLast, data }) {
  return (
    <div className="relative w-full h-full min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden">
      {/* Background Lace & Arch Wallpaper */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/assets/lacy_bg.webp"
          alt="Lace arch background"
          className="w-full h-full object-fill object-center"
        />
      </div>

      {/* Top subtle brand emblem */}
      <div className="relative z-10 pt-8 sm:pt-10 flex flex-col items-center opacity-80">
        <span className="font-serif italic text-xs tracking-[0.25em] text-[#726351]">
          {data.hero.monogram}
        </span>
      </div>

      {/* Main Slide Content Area inside the Arch */}
      <div className="relative z-10 flex-1 w-full max-w-[360px] px-6 py-4 flex flex-col items-center justify-center text-center overflow-y-auto no-scrollbar">
        {children}
      </div>

      {/* Bottom Floating Navigation Pill "Aşağı Kaydır ↓" */}
      <div className="relative z-20 pb-8 sm:pb-10 flex flex-col items-center">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          className="btn-luxury px-5 py-2.5 flex items-center gap-2 text-[11px] font-medium tracking-[0.16em]"
        >
          <span>{isLast ? data.outro.names : data.controls.scrollDown}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-gold-500 transition-transform duration-300 ${isLast ? 'rotate-180' : 'animate-bounce'}`} />
        </motion.button>
      </div>
    </div>
  );
}
