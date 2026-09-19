import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function ClosingSection({ data, onRestart }) {
  const c = data.outro;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-4 py-8 w-full text-center"
    >
      <Heart className="w-6 h-6 text-gold-500 fill-gold-400/20" />

      {/* Couple Names */}
      <h2 className="font-serif text-[clamp(34px,10vw,48px)] font-normal text-[#5C4718] tracking-[0.04em] leading-tight">
        {c.names}
      </h2>

      {/* Gold Star Divider */}
      <div className="flex items-center gap-3 my-1 opacity-70">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-400" />
        <span className="text-gold-500 text-xs font-serif">✦</span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-400" />
      </div>

      {/* Event Date */}
      <span className="font-cinzel text-sm tracking-[0.3em] text-[#8C7330] uppercase">
        {c.date}
      </span>

      {/* Restart Button */}
      <button
        type="button"
        onClick={onRestart}
        className="mt-6 px-5 py-2 rounded-full border border-gold-400/40 bg-white/70 text-[11px] font-cinzel tracking-[0.2em] text-[#726351] hover:bg-gold-50 transition"
      >
        Başa Dön ↑
      </button>
    </motion.div>
  );
}
