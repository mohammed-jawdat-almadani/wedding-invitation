import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineSection({ data }) {
  const tl = data.timeline;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-3 py-4 w-full"
    >
      {/* Decorative Cartouche Badge "« Günün Çizgisi »" */}
      <div className="cartouche-badge mb-2">
        {tl.badge}
      </div>

      {/* Timeline Schedule Items */}
      <div className="flex flex-col items-center gap-2 max-w-[240px] w-full text-center">
        {tl.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center py-1">
              {/* Time */}
              <span className="font-cinzel text-xs tracking-[0.2em] text-[#8C7330] opacity-80 mb-0.5">
                {item.time}
              </span>

              {/* Title */}
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#5C4718] tracking-[0.04em]">
                {item.title}
              </span>
            </div>

            {/* Star Divider between items */}
            {idx < tl.items.length - 1 && (
              <span className="text-gold-500 text-xs my-0.5 opacity-60">✦</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
