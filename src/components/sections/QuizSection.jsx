import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export default function QuizSection({ data }) {
  const qz = data.quiz;
  const [guestName, setGuestName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setIsPlaying(true);
  };

  const handleSelectOption = (option) => {
    const nextAnswers = { ...answers, [currentQIndex]: option };
    setAnswers(nextAnswers);

    if (currentQIndex < qz.questions.length - 1) {
      setTimeout(() => setCurrentQIndex(prev => prev + 1), 300);
    } else {
      setTimeout(() => setIsFinished(true), 400);
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setIsFinished(false);
    setCurrentQIndex(0);
    setAnswers({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-2 py-3 w-full"
    >
      {/* Title */}
      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#5C4718] tracking-[0.02em]">
        {qz.title}
      </h3>

      {/* Subtitle */}
      <p className="font-serif italic text-xs text-[#726351] leading-relaxed max-w-[270px] text-center mb-2">
        {qz.subtitle}
      </p>

      {/* Main Interactive Card */}
      <div className="relative w-full max-w-[290px] rounded-[24px] border border-gold-400/40 bg-gradient-to-b from-[#FDFBF7]/90 to-[#F7EFE4]/85 shadow-[0_6px_20px_rgba(114,99,81,0.08)] p-5 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isPlaying && !isFinished ? (
            /* Step 1: Name Input and Start Button (Matches Video exactly) */
            <motion.form
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleStart}
              className="w-full flex flex-col items-center gap-4"
            >
              <div className="w-full">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={qz.namePlaceholder}
                  required
                  className="w-full px-4 py-2.5 rounded-full border border-gold-400/50 bg-white/80 text-center font-serif text-base text-[#5C4718] placeholder:text-[#8C7330]/50 outline-none focus:border-gold-500 shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="btn-luxury px-6 py-2.5 w-full text-xs font-cinzel font-medium tracking-[0.2em] shadow-md"
              >
                {qz.startBtn}
              </button>
            </motion.form>
          ) : !isFinished ? (
            /* Step 2: Interactive Trivia Questions */
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col items-center gap-3"
            >
              <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#8C7330] uppercase">
                {currentQIndex + 1} / {qz.questions.length}
              </span>

              <h4 className="font-serif text-lg text-[#5C4718] font-medium leading-snug">
                {qz.questions[currentQIndex].q}
              </h4>

              <div className="flex flex-col gap-2 w-full mt-2">
                {qz.questions[currentQIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className="w-full py-2 px-3 rounded-full border border-gold-400/40 bg-white/70 hover:bg-gold-50 text-xs font-serif text-[#615243] transition active:scale-98"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Step 3: Finished / Feedback Screen */
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-2 py-2"
            >
              <CheckCircle2 className="w-8 h-8 text-gold-500" />
              <h4 className="font-serif text-lg text-[#5C4718] font-medium">
                {qz.completedTitle}
              </h4>
              <p className="font-serif italic text-xs text-[#726351]">
                {qz.completedMsg}
              </p>

              <button
                type="button"
                onClick={handleRestart}
                className="mt-3 text-[11px] font-cinzel text-[#8C7330] flex items-center gap-1 underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Tekrar Oyna</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
