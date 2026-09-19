import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownSection({ data }) {
  const cd = data.countdown;
  const targetDate = new Date(data.date.targetDate || '2026-08-08T19:00:00').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-3 py-3 w-full"
    >
      {/* Decorative Cartouche Badge "BULUŞMAYA KALAN" */}
      <div className="cartouche-badge mb-1">
        {cd.badge}
      </div>

      <span className="text-gold-500 text-xs opacity-70">✦</span>

      {/* Main Countdown Display Card */}
      <div className="relative px-7 py-4 rounded-[28px] border border-gold-400/40 bg-gradient-to-b from-[#FDFBF7]/85 to-[#F7EFE4]/80 shadow-[0_6px_20px_rgba(114,99,81,0.08)] flex flex-col items-center min-w-[240px]">
        {/* Days Big Display */}
        <div className="flex flex-col items-center -mb-1">
          <span className="font-serif text-[56px] sm:text-[64px] font-light leading-none text-[#5C4718] tracking-tight">
            {pad(timeLeft.days)}
          </span>
          <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#8C7330] uppercase mt-1">
            {cd.labels.days}
          </span>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent my-3" />

        {/* Row of Hours, Minutes, Seconds */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl text-[#5C4718] font-normal leading-tight">
              {pad(timeLeft.hours)}
            </span>
            <span className="font-cinzel text-[8px] tracking-[0.2em] text-[#8C7330]/75 uppercase mt-0.5">
              {cd.labels.hours}
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center border-x border-gold-400/20 px-3">
            <span className="font-serif text-2xl text-[#5C4718] font-normal leading-tight">
              {pad(timeLeft.minutes)}
            </span>
            <span className="font-cinzel text-[8px] tracking-[0.2em] text-[#8C7330]/75 uppercase mt-0.5">
              {cd.labels.minutes}
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl text-[#C9A96E] font-medium leading-tight">
              {pad(timeLeft.seconds)}
            </span>
            <span className="font-cinzel text-[8px] tracking-[0.2em] text-[#8C7330]/75 uppercase mt-0.5">
              {cd.labels.seconds}
            </span>
          </div>
        </div>
      </div>

      {/* Romantic Quote */}
      <div className="font-serif italic text-sm sm:text-base text-[#726351] leading-relaxed max-w-[260px] text-center mt-3 opacity-90">
        <p>{cd.quote}</p>
        <p>{cd.quote2}</p>
      </div>
    </motion.div>
  );
}
