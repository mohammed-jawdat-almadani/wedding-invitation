import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-3 py-6"
    >
      {/* Bride Name */}
      <h1 className="font-serif text-[clamp(44px,12vw,56px)] font-normal text-[#5C4718] tracking-[0.02em] leading-tight">
        {data.couple.bride}
      </h1>

      {/* "ve" in cursive script */}
      <span className="font-script text-[32px] sm:text-[36px] text-gold-500/90 -my-2 select-none">
        {data.couple.and}
      </span>

      {/* Groom Name */}
      <h1 className="font-serif text-[clamp(44px,12vw,56px)] font-normal text-[#5C4718] tracking-[0.02em] leading-tight">
        {data.couple.groom}
      </h1>

      {/* Four-point gold star divider */}
      <div className="flex items-center gap-3 mt-4 opacity-70">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-400" />
        <span className="text-gold-500 text-xs font-serif">✦</span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-400" />
      </div>
    </motion.div>
  );
}
