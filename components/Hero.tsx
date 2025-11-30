import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://www.shutterstock.com/shutterstock/videos/3827690273/preview/stock-footage-santorini-s-iconic-blue-domed-view-over-aegean-sea.webm" type="video/webm" />
        </video>
        {/* Semi-transparent overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center text-white max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
          {t('捕捉希腊文明的灵魂', 'Capture the Soul of Greek Civilization')}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto">
          {t('用于旅游和房地产的高保真空间重建。', 'High-fidelity spatial reconstruction for tourism and real estate.')}
        </p>
        <button className="px-8 py-3 bg-accent text-white rounded-full font-semibold shadow-lg shadow-accent/30 hover:-translate-y-1 hover:shadow-accent/50 transition-all duration-300">
          {t('开始探索', 'Start Exploration')}
        </button>
      </div>
    </section>
  );
};

export default Hero;