import React from 'react';
import { motion } from 'framer-motion';

export default function MenuSection({ data }) {
  const m = data.menu;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-3 py-3 w-full"
    >
      {/* Decorative Cartouche Badge "Menü" */}
      <div className="cartouche-badge mb-1">
        {m.badge}
      </div>

      {/* Courses List */}
      <div className="flex flex-col items-center gap-2 max-w-[280px] w-full text-center">
        {m.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center py-1">
              {/* Category (e.g. BAŞLANGIÇ, ANA YEMEK, TATLI) */}
              <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#8C7330] uppercase mb-0.5 opacity-90">
                {item.category}
              </span>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#5C4718] tracking-[0.02em]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-serif italic text-xs text-[#726351]/80 mt-0.5">
                {item.desc}
              </p>
            </div>

            {/* Star Divider between courses */}
            {idx < m.items.length - 1 && (
              <span className="text-gold-500 text-xs my-0.5 opacity-60">✦</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
