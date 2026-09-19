import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin } from 'lucide-react';

export default function LocationSection({ data }) {
  const loc = data.location;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-3 py-3 w-full"
    >
      {/* Decorative Cartouche Badge "Konum" */}
      <div className="cartouche-badge mb-1">
        {loc.badge}
      </div>

      {/* Styled Arched Map Card */}
      <div className="relative w-full max-w-[280px] rounded-[24px] overflow-hidden border border-gold-400/50 bg-[#FAF4EB] shadow-[0_8px_25px_rgba(114,99,81,0.14)] p-2">
        {/* Inner Arched Map Visual */}
        <div className="relative w-full h-[155px] rounded-[18px] overflow-hidden border border-gold-400/30">
          <img
            src="/assets/map_window.png"
            alt="Venue Map"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
          />

          {/* Map Pin Pulse Overlay */}
          <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <span className="absolute w-8 h-8 rounded-full bg-red-500/20 animate-ping" />
            <MapPin className="w-6 h-6 text-red-700 drop-shadow-md fill-red-600" />
          </div>
        </div>

        {/* Venue Info Below Map */}
        <div className="pt-3 pb-1 px-2 text-center">
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#5C4718] leading-tight">
            {loc.venueName}
          </h3>
          <p className="font-serif italic text-xs text-[#8C7330] mt-0.5">
            {loc.venueSub}
          </p>
          <p className="font-serif text-[11px] text-[#726351]/80 mt-1 leading-snug">
            {loc.address}
          </p>
        </div>
      </div>

      {/* "YOL TARİFİ AL" Button */}
      <motion.a
        href={loc.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="btn-luxury px-6 py-2.5 mt-2 flex items-center gap-2.5 text-xs font-cinzel font-medium tracking-[0.2em] shadow-md"
      >
        <Navigation className="w-3.5 h-3.5 text-gold-600" />
        <span>{loc.cta}</span>
      </motion.a>
    </motion.div>
  );
}
