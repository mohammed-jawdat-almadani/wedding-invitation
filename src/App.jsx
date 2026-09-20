import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { invitationData } from './data/invitationData';

import DeviceWrapper from './components/DeviceWrapper';
import DoorIntro from './components/DoorIntro';
import MusicPlayer from './components/MusicPlayer';
import CardFrame from './components/CardFrame';
import AdminRsvpModal from './components/AdminRsvpModal';

import HeroSection from './components/sections/HeroSection';
import InvitationSection from './components/sections/InvitationSection';
import DateSection from './components/sections/DateSection';
import LocationSection from './components/sections/LocationSection';
import CountdownSection from './components/sections/CountdownSection';
import TimelineSection from './components/sections/TimelineSection';
import MenuSection from './components/sections/MenuSection';
import PhotoWallSection from './components/sections/PhotoWallSection';
import QuizSection from './components/sections/QuizSection';
import RsvpSection from './components/sections/RsvpSection';
import ClosingSection from './components/sections/ClosingSection';

export default function App() {
  const [lang, setLang] = useState('tr');
  const [isOpened, setIsOpened] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState(null);

  const data = invitationData[lang];
  const totalSlides = 11;

  // Set HTML dir and lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = data.dir;
  }, [lang, data.dir]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleRestart = () => {
    setCurrentSlide(0);
  };

  const handleDoorOpen = () => {
    setTimeout(() => {
      setIsOpened(true);
    }, 2600);
  };

  // Keyboard navigation (Arrow keys / Space)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpened) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpened, handleNextSlide, handlePrevSlide]);

  // Touch Swipe navigation
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    // Swipe up (scroll down to next slide)
    if (diff > 50) {
      handleNextSlide();
    }
    // Swipe down (scroll up to prev slide)
    else if (diff < -50) {
      handlePrevSlide();
    }
    setTouchStartY(null);
  };

  const renderSection = () => {
    switch (currentSlide) {
      case 0:
        return <HeroSection data={data} />;
      case 1:
        return <InvitationSection data={data} />;
      case 2:
        return <DateSection data={data} />;
      case 3:
        return <LocationSection data={data} />;
      case 4:
        return <CountdownSection data={data} />;
      case 5:
        return <TimelineSection data={data} />;
      case 6:
        return <MenuSection data={data} />;
      case 7:
        return <PhotoWallSection data={data} />;
      case 8:
        return <QuizSection data={data} />;
      case 9:
        return <RsvpSection data={data} onOpenAdmin={() => setIsAdminOpen(true)} />;
      case 10:
        return <ClosingSection data={data} onRestart={handleRestart} />;
      default:
        return <HeroSection data={data} />;
    }
  };

  return (
    <DeviceWrapper
      lang={lang}
      onToggleLang={() => setLang(lang === 'tr' ? 'ar' : 'tr')}
      onOpenAdmin={() => setIsAdminOpen(true)}
      data={data}
      isOpened={isOpened}
    >
      {/* 3D Intro Doors */}
      <DoorIntro
        data={data}
        isOpened={isOpened}
        onOpen={handleDoorOpen}
      />

      {/* Background Music Player */}
      <MusicPlayer autoPlay={isOpened} data={data} />

      {/* Main Card View */}
      <div
        className="w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <CardFrame
          data={data}
          onNext={handleNextSlide}
          isLast={currentSlide === totalSlides - 1}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide}-${lang}`}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="w-full flex items-center justify-center"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </CardFrame>
      </div>

      {/* Admin RSVP Management Modal */}
      <AdminRsvpModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={data}
      />
    </DeviceWrapper>
  );
}
