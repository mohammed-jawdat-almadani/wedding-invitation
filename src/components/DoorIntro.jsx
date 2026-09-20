import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DoorIntro({ data, onOpen, isOpened }) {
  const [isOpening, setIsOpening] = useState(false);
  const videoRef = useRef(null);

  const handleOpen = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);

    // Try playing the door opening video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If video playback fails, proceed with fallback timer
        });
      }
    }

    // Trigger onOpen to start music
    onOpen();

    // After animation duration (~2.8s), finish opening
    setTimeout(() => {
      // Completed
    }, 2800);
  };

  if (isOpened) return null;

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAF8F3]"
          onClick={handleOpen}
        >
          {/* Background Poster & Video Layer */}
          <div className="absolute inset-0 w-full h-full">
            {/* Poster image with seamless background fallback */}
            <div
              className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url('/assets/lacy_intro-poster.jpg')` }}
            >
              <img
                src="/assets/lacy_intro-poster.jpg"
                alt=""
                aria-hidden="true"
                loading="eager"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                  isOpening ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </div>

            {/* Video of doors swinging open */}
            <video
              ref={videoRef}
              src="/assets/lacy_intro.mp4"
              playsInline
              preload="auto"
              muted
              className={`absolute inset-0 w-full h-full object-cover object-center ${
                isOpening ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          </div>

          {/* Realistic 3D CSS Door Fallback / Enhancement */}
          {isOpening && (
            <div className="absolute inset-0 flex pointer-events-none perspective-[1200px] overflow-hidden">
              {/* Left Door */}
              <motion.div
                initial={{ transform: 'rotateY(0deg)', opacity: 1 }}
                animate={{ transform: 'rotateY(-115deg)', opacity: 0 }}
                transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
                className="w-1/2 h-full origin-left bg-[#FAF8F3]/20 shadow-2xl"
              />
              {/* Right Door */}
              <motion.div
                initial={{ transform: 'rotateY(0deg)', opacity: 1 }}
                animate={{ transform: 'rotateY(115deg)', opacity: 0 }}
                transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
                className="w-1/2 h-full origin-right bg-[#FAF8F3]/20 shadow-2xl"
              />
            </div>
          )}

          {/* Central Oval Cameo & Tap Button Overlay */}
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer pointer-events-auto"
            >
              {/* Tap to open button with glowing ring */}
              <div className="relative flex items-center justify-center">
                {/* Expanding Halo Ring */}
                <span
                  className="absolute -inset-2.5 rounded-full border border-gold-400/80 animate-lacy-ring pointer-events-none"
                  aria-hidden="true"
                />

                {/* Main Pill Button */}
                <button
                  type="button"
                  className="relative z-10 px-8 py-3.5 rounded-full border border-[#C9A96E]/80 bg-gradient-to-r from-[#FDFBF7] via-[#F6ECE0] to-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_25px_rgba(114,99,81,0.22)] animate-sheen flex items-center gap-3 transition-transform active:scale-95"
                >
                  {/* Left decorative gold dot & line */}
                  <span className="w-4 h-[1px] bg-gradient-to-r from-transparent to-gold-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-sm" />

                  <span className="font-cinzel text-xs uppercase tracking-[0.28em] text-[#615243] font-medium px-1">
                    {data.controls.tapToOpen}
                  </span>

                  {/* Right decorative gold dot & line */}
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-sm" />
                  <span className="w-4 h-[1px] bg-gradient-to-l from-transparent to-gold-500" />
                </button>
              </div>

              <span className="text-[10px] tracking-[0.2em] font-serif italic text-charcoal-800/60">
                ✦ {data.couple.bride} & {data.couple.groom} ✦
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
