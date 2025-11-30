import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import ArVrSection from './components/ArVrSection';
import PlayerSection from './components/PlayerSection';
import HardwareSection from './components/HardwareSection';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="antialiased text-primary bg-white selection:bg-accent selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <FeatureGrid />
          <ArVrSection />
          <PlayerSection />
          <HardwareSection />
          <HorizontalScrollSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;