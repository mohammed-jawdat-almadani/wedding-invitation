import React from 'react';
import { motion } from 'framer-motion';

export default function InvitationSection({ data }) {
  const inv = data.invitation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-4 py-4 w-full"
    >
      {/* Couple Header */}
      <h2 className="font-serif text-2xl sm:text-3xl text-[#5C4718] font-normal tracking-[0.04em]">
        {inv.kicker}
      </h2>

      {/* Invitation Lines */}
      <div className="font-serif italic text-base sm:text-lg text-[#726351] leading-relaxed max-w-[280px]">
        <p>{inv.message}</p>
        <p>{inv.message2}</p>
      </div>

      {/* Decorative Star Divider */}
      <div className="flex items-center gap-3 my-1 opacity-60">
        <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-gold-400" />
        <span className="text-gold-500 text-xs">✦</span>
        <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-gold-400" />
      </div>

      {/* Families Section */}
      <div className="w-full mt-2">
        <span className="block font-cinzel text-[11px] tracking-[0.25em] text-[#8C7330] uppercase mb-4 opacity-90">
          {inv.familiesTitle}
        </span>

        <div className="grid grid-cols-2 gap-6 max-w-[260px] mx-auto text-center">
          {/* Bride Family */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-[#5C4718] font-medium tracking-[0.05em]">
              {inv.brideFamily}
            </span>
            <span className="font-cinzel text-[9px] tracking-[0.2em] text-[#8C7330]/80 uppercase mt-0.5">
              {inv.brideFamilySuffix}
            </span>
          </div>

          {/* Groom Family */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-base text-[#5C4718] font-medium tracking-[0.05em]">
              {inv.groomFamily}
            </span>
            <span className="font-cinzel text-[9px] tracking-[0.2em] text-[#8C7330]/80 uppercase mt-0.5">
              {inv.groomFamilySuffix}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
