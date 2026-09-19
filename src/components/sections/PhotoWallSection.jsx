import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, X, Upload } from 'lucide-react';

export default function PhotoWallSection({ data }) {
  const pw = data.photoWall;
  const targetDate = new Date(data.date.targetDate || '2026-08-08T19:00:00').getTime();
  const [showModal, setShowModal] = useState(false);
  const [testPhotos, setTestPhotos] = useState([
    '/assets/lacy_intro-poster.jpg',
    '/assets/map_window.png'
  ]);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 10000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTestPhotos(prev => [url, ...prev]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-2 py-3 w-full"
    >
      {/* Decorative Cartouche Badge "En güzel anlarımız" */}
      <div className="cartouche-badge mb-0.5">
        {pw.badge}
      </div>

      <p className="font-serif italic text-xs text-[#8C7330] mb-2">
        {pw.subtitle}
      </p>

      {/* Main Locked Announcement Card */}
      <div className="relative w-full max-w-[290px] rounded-[24px] border border-gold-400/40 bg-gradient-to-b from-[#FDFBF7]/90 to-[#F7EFE4]/85 shadow-[0_6px_20px_rgba(114,99,81,0.08)] p-5 text-center flex flex-col items-center gap-3">
        <Camera className="w-6 h-6 text-gold-500 opacity-80" />

        <div className="font-serif text-sm text-[#5C4718] leading-snug">
          <p className="font-medium">{pw.noticeTitle}</p>
          <p className="text-xs text-[#726351]/80 mt-1">{pw.noticeDesc}</p>
        </div>

        <span className="text-gold-500 text-xs opacity-70">✦</span>

        {/* Live Remaining Badge */}
        <div className="flex flex-col items-center">
          <span className="font-serif text-base text-[#5C4718] font-medium">
            {timeLeft.days} {data.countdown.labels.days} {timeLeft.hours} {data.countdown.labels.hours} {timeLeft.minutes} {data.countdown.labels.minutes}
          </span>
          <span className="font-cinzel text-[9px] tracking-[0.2em] text-[#8C7330] uppercase mt-0.5 opacity-90">
            {pw.unlockBadge}
          </span>
        </div>

        {/* Interactive Try Button */}
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="mt-1 px-4 py-1.5 rounded-full border border-gold-400/40 bg-white/70 text-[10px] font-cinzel tracking-[0.16em] text-[#726351] hover:bg-gold-50 transition"
        >
          {pw.testUploadBtn}
        </button>
      </div>

      {/* Photo Wall Preview Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm rounded-[24px] bg-[#FAF8F3] border border-gold-400/50 p-6 shadow-2xl flex flex-col items-center text-center"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-charcoal-800/60 hover:bg-charcoal-800/10"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="font-serif text-xl text-[#5C4718] font-normal mb-1">
                {pw.badge}
              </h4>
              <p className="font-serif text-xs text-[#726351] mb-4">
                {pw.subtitle}
              </p>

              {/* Photo Grid Preview */}
              <div className="grid grid-cols-2 gap-2.5 w-full mb-4 max-h-[220px] overflow-y-auto no-scrollbar p-1">
                {testPhotos.map((src, i) => (
                  <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden border border-gold-400/30 shadow-sm">
                    <img src={src} alt="memory" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Test Upload Action */}
              <label className="btn-luxury px-5 py-2.5 flex items-center gap-2 text-xs font-cinzel cursor-pointer">
                <Upload className="w-4 h-4 text-gold-600" />
                <span>{pw.testUploadBtn}</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
