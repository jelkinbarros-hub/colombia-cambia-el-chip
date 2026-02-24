import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Youtube, Instagram, Twitter, ExternalLink, PlayCircle } from 'lucide-react';
import { INFLUENCER_CONTENT } from '../constants';

interface InfluencerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfluencerModal: React.FC<InfluencerModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INFLUENCER_CONTENT.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INFLUENCER_CONTENT.length) % INFLUENCER_CONTENT.length);
  };

  const currentItem = INFLUENCER_CONTENT[currentIndex];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return <Youtube className="text-red-600" />;
      case 'instagram': return <Instagram className="text-pink-600" />;
      case 'x (twitter)': return <Twitter className="text-blue-400" />;
      default: return <ExternalLink className="text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
      >
        <X size={32} />
      </button>

      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row h-[80vh] md:h-[600px]">
        
        {/* Left/Top: Media Content */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative group h-1/2 md:h-full">
          {currentItem.type === 'youtube' ? (
            <iframe 
              src={currentItem.url} 
              title={currentItem.title}
              className="w-full h-full absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          ) : (
            <img 
              src={currentItem.url} 
              alt={currentItem.title} 
              className="w-full h-full object-contain"
            />
          )}
          
          {/* Navigation Arrows (Overlay on mobile, side on desktop) */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Right/Bottom: Info & List */}
        <div className="w-full md:w-1/3 bg-slate-800 p-6 flex flex-col h-1/2 md:h-full border-t md:border-t-0 md:border-l border-white/10">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">
              {getPlatformIcon(currentItem.platform)}
              {currentItem.platform}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{currentItem.title}</h2>
            <p className="text-slate-400 text-sm">Explora el contenido exclusivo de Alfredo en sus redes sociales.</p>
          </div>

          {/* Thumbnail List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {INFLUENCER_CONTENT.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg ring-1 ring-white/20' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                  <img 
                    src={item.type === 'youtube' ? item.thumbnail : item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  {item.type === 'youtube' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayCircle size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className={`text-sm font-bold truncate ${index === currentIndex ? 'text-white' : 'text-slate-200'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-xs truncate ${index === currentIndex ? 'text-blue-200' : 'text-slate-500'}`}>
                    {item.platform}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Ver perfil completo <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerModal;
