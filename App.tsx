import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import WhyVoteSection from './components/WhyVoteSection';
import QuizSection from './components/QuizSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import { QuizProvider } from './context/QuizContext';

const App: React.FC = () => {
  return (
    <QuizProvider>
      <div className="min-h-screen font-sans bg-white selection:bg-yellow-200 selection:text-red-900 scroll-smooth">
        <Navigation />
        <main>
          <HeroSection />
          <WhyVoteSection />
          <GallerySection />
          <QuizSection />
          <ContactSection />
        </main>
        <Footer />
        <AdminModal />
      </div>
    </QuizProvider>
  );
};

export default App;