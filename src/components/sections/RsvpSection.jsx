import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, Users } from 'lucide-react';

export default function RsvpSection({ data, onOpenAdmin }) {
  const r = data.rsvp;
  const [name, setName] = useState('');
  const [status, setStatus] = useState('yes'); // 'yes' or 'no'
  const [count, setCount] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSending(true);

    const submission = {
      id: Date.now(),
      name: name.trim(),
      status: status === 'yes' ? r.yesOption : r.noOption,
      count: status === 'yes' ? count : 0,
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
      existing.unshift(submission);
      localStorage.setItem('wedding_rsvp_list', JSON.stringify(existing));
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);

      // Gold & Ivory celebration confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#C9A96E', '#E5CC7A', '#F5E2A8', '#FAF8F3', '#B28A5D']
      });
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-2 py-2 w-full"
    >
      {/* RSVP Cartouche Badge */}
      <div className="cartouche-badge mb-0.5">
        {r.badge}
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#5C4718] tracking-[0.06em]">
        {r.title}
      </h3>

      <p className="font-serif italic text-xs text-[#726351] leading-relaxed max-w-[270px] text-center mb-1">
        {r.subtitle}
      </p>

      {/* Main RSVP Card */}
      <div className="relative w-full max-w-[290px] rounded-[24px] border border-gold-400/40 bg-gradient-to-b from-[#FDFBF7]/90 to-[#F7EFE4]/85 shadow-[0_6px_20px_rgba(114,99,81,0.08)] p-5 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-3.5 text-left"
            >
              {/* Name Field */}
              <div className="flex flex-col gap-1">
                <label className="font-cinzel text-[9px] tracking-[0.2em] text-[#8C7330] uppercase">
                  {r.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={r.namePlaceholder}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gold-400/40 bg-white/80 font-serif text-sm text-[#5C4718] placeholder:text-[#8C7330]/40 outline-none focus:border-gold-500 shadow-inner"
                />
              </div>

              {/* Attendance Radio Options */}
              <div className="flex flex-col gap-2 pt-1">
                {/* Yes Option */}
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-serif text-[#615243]">
                  <input
                    type="radio"
                    name="rsvp_status"
                    checked={status === 'yes'}
                    onChange={() => setStatus('yes')}
                    className="accent-[#B28A5D] w-4 h-4 cursor-pointer"
                  />
                  <span>{r.yesOption}</span>
                </label>

                {/* No Option */}
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-serif text-[#615243]">
                  <input
                    type="radio"
                    name="rsvp_status"
                    checked={status === 'no'}
                    onChange={() => setStatus('no')}
                    className="accent-[#B28A5D] w-4 h-4 cursor-pointer"
                  />
                  <span>{r.noOption}</span>
                </label>
              </div>

              {/* Guest Counter (Only if attending) */}
              {status === 'yes' && (
                <div className="flex items-center justify-between pt-1 border-t border-gold-400/20">
                  <span className="font-cinzel text-[9px] tracking-[0.2em] text-[#8C7330] uppercase">
                    {r.countLabel}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCount(Math.max(1, count - 1))}
                      className="w-6 h-6 rounded-full border border-gold-400/50 flex items-center justify-center text-xs text-[#8C7330] hover:bg-gold-50"
                    >
                      -
                    </button>
                    <span className="font-serif text-base text-[#5C4718] font-medium w-4 text-center">
                      {count}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCount(Math.min(10, count + 1))}
                      className="w-6 h-6 rounded-full border border-gold-400/50 flex items-center justify-center text-xs text-[#8C7330] hover:bg-gold-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="btn-luxury px-6 py-2.5 w-full mt-2 text-xs font-cinzel font-medium tracking-[0.2em] shadow-md disabled:opacity-60"
              >
                {isSending ? r.sendingBtn : r.submitBtn}
              </button>
            </motion.form>
          ) : (
            /* Success Card */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-3 flex flex-col items-center text-center gap-2"
            >
              <CheckCircle className="w-9 h-9 text-gold-500" />
              <h4 className="font-serif text-xl text-[#5C4718] font-medium">
                {r.successTitle}
              </h4>
              <p className="font-serif italic text-xs text-[#726351] leading-relaxed max-w-[240px]">
                {r.successMsg}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Admin view responses link */}
      <button
        type="button"
        onClick={onOpenAdmin}
        className="mt-2 text-[10px] font-cinzel tracking-[0.15em] text-[#8C7330]/70 hover:text-[#8C7330] flex items-center gap-1.5 transition"
      >
        <Users className="w-3 h-3" />
        <span>{data.controls.viewList}</span>
      </button>
    </motion.div>
  );
}
