import React from 'react';
import { motion } from 'framer-motion';

export default function DateSection({ data }) {
  const d = data.date;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-4 py-4 w-full"
    >
      {/* Decorative Cartouche Badge "TARİH" */}
      <div className="cartouche-badge mb-2">
        {d.badge}
      </div>

      {/* Date Frame Card */}
      <div className="relative px-8 py-5 rounded-[28px] border border-gold-400/40 bg-gradient-to-b from-[#FDFBF7]/85 to-[#F7EFE4]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_20px_rgba(114,99,81,0.08)] flex flex-col items-center min-w-[200px]">
        {/* Day Number */}
        <span className="font-serif text-[68px] sm:text-[76px] font-light leading-none text-[#5C4718] tracking-tight">
          {d.day}
        </span>

        {/* Month */}
        <span className="font-cinzel text-base tracking-[0.22em] text-[#726351] uppercase mt-1">
          {d.month}
        </span>

        {/* Star */}
        <span className="text-gold-500 text-xs my-1 opacity-70">✦</span>

        {/* Year */}
        <span className="font-cinzel text-sm tracking-[0.28em] text-[#8C7330]/80">
          {d.year}
        </span>
      </div>

      {/* Day of Week & Time Pill Badges */}
      <div className="flex items-center gap-3 mt-2">
        {/* Day of Week */}
        <div className="px-5 py-2 rounded-full border border-gold-400/40 bg-cream-100/90 shadow-sm font-cinzel text-[11px] tracking-[0.18em] text-[#615243] uppercase">
          {d.weekday}
        </div>

        {/* Time */}
        <div className="px-5 py-2 rounded-full border border-gold-400/40 bg-cream-100/90 shadow-sm font-cinzel text-[11px] tracking-[0.18em] text-[#615243]">
          {d.time}
        </div>
      </div>
    </motion.div>
  );
}
