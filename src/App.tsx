import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import WhyVoteSection from './components/WhyVoteSection';
import QuizSection from './components/QuizSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import InfluencerModal from './components/InfluencerModal';
import { QuizProvider } from './context/QuizContext';

const App: React.FC = () => {
  const [isInfluencerOpen, setIsInfluencerOpen] = useState(false);

  return (
    <QuizProvider>
      <div className="min-h-screen font-sans bg-white selection:bg-yellow-200 selection:text-red-900 scroll-smooth">
        <Navigation />
        <main>
          <HeroSection onOpenInfluencer={() => setIsInfluencerOpen(true)} />
          <WhyVoteSection />
          <GallerySection />
          <QuizSection />
          <ContactSection />
        </main>
        <Footer />
        <AdminModal />
        <InfluencerModal isOpen={isInfluencerOpen} onClose={() => setIsInfluencerOpen(false)} />
      </div>
    </QuizProvider>
  );
};

export default App;
