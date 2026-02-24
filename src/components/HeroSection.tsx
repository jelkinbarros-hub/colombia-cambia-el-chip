import React, { useState, useEffect } from 'react';
import { Zap, Brain, Camera, CheckCircle, Smartphone } from 'lucide-react';
import UGradientText from './UGradientText';
import { CANDIDATE_PHOTO, FALLBACK_PHOTO } from '../constants';
import { useQuiz } from '../context/QuizContext';

interface HeroSectionProps {
  onOpenInfluencer: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInfluencer }) => {
  const { setIsAdminOpen } = useQuiz();
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let timer: any;
    if (clickCount > 0) {
      // Reset count if user stops clicking for 2 seconds
      timer = setTimeout(() => setClickCount(0), 2000);
    }
    
    if (clickCount === 6) {
      setIsAdminOpen(true);
      setClickCount(0);
    }

    return () => clearTimeout(timer);
  }, [clickCount, setIsAdminOpen]);

  const handleSecretClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative pt-28 pb-12 md:pt-32 md:pb-0 overflow-hidden bg-white min-h-screen md:min-h-[85vh] flex items-center">
      {/* Background Decorations - Smaller on mobile */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-gradient-to-b from-yellow-50 to-transparent rounded-full blur-3xl opacity-70 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-t from-red-50 to-transparent rounded-full blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left pt-4 lg:pt-0 order-1 lg:order-1">
            <div 
              onClick={handleSecretClick}
              className="inline-flex items-center px-3 py-1 mb-4 md:mb-6 rounded-full bg-yellow-50 border border-yellow-200 shadow-sm animate-fade-in mx-auto lg:mx-0 cursor-default select-none transition-all active:scale-95"
            >
              <Zap size={14} className="text-red-600 fill-current mr-2" />
              <span className="text-yellow-900 font-extrabold uppercase tracking-wide text-xs">Senado de la República</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4 md:mb-6">
              Llegó el momento de <br className="hidden md:block" />
              <UGradientText className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 block md:inline mt-1">
                CAMBIAR EL CHIP
              </UGradientText>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Aprende sobre el Congreso y la gestión de Alfredo Deluque con nuestra plataforma educativa inteligente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full sm:w-auto flex-wrap">
              <a href="#trivia" onClick={(e) => handleScrollTo(e, 'trivia')} className="px-6 py-3.5 md:px-8 md:py-4 bg-slate-900 text-white rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-purple-500/20 hover:bg-slate-800 transition transform active:scale-95 flex items-center justify-center gap-2 group w-full sm:w-auto">
                <Brain size={20} className="text-yellow-400" />
                Jugar Trivia
              </a>
              <button onClick={onOpenInfluencer} className="px-6 py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-pink-500/30 hover:brightness-110 transition transform active:scale-95 flex items-center justify-center gap-2 group w-full sm:w-auto">
                <Smartphone size={20} className="text-white" />
                Zona Influencer
              </button>
              <a href="#galeria" onClick={(e) => handleScrollTo(e, 'galeria')} className="px-6 py-3.5 md:px-8 md:py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-bold text-base md:text-lg hover:border-red-500 hover:text-red-600 transition flex items-center justify-center gap-2 active:scale-95 w-full sm:w-auto">
                <Camera size={20} className="text-red-500" /> Galería
              </a>
            </div>
          </div>
  
          {/* Image Content */}
          <div className="lg:col-span-6 relative flex justify-center items-end mt-8 lg:mt-0 order-2 lg:order-2">
             {/* Halo multicolor detrás del candidato */}
             <div className="absolute bottom-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-red-100 via-yellow-100 to-green-100 rounded-full opacity-60 blur-3xl"></div>
             
             <div className="relative z-10 w-full max-w-md transform transition duration-700 ease-out flex flex-col items-center">
               <div className="relative group">
                 {/* Marco Decorativo Multicolor */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 rounded-full opacity-75 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                 
                 {/* Contenedor de la Imagen */}
                 <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
                    <img 
                      src={CANDIDATE_PHOTO} 
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_PHOTO; }}
                      alt="Alfredo Deluque" 
                      className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                    />
                 </div>
  
                 {/* Badge Flotante */}
                 <div className="absolute bottom-2 -right-2 md:bottom-4 md:-right-4 bg-white p-2 md:p-3 rounded-2xl shadow-xl border-l-4 border-l-green-500 animate-bounce-slow flex items-center gap-2 md:gap-3 max-w-[160px] md:max-w-none">
                    <div className="bg-green-100 p-1.5 md:p-2 rounded-full text-green-600 shrink-0">
                      <CheckCircle size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase leading-tight">Proyectos Aprobados</p>
                      <p className="text-lg md:text-xl font-black text-slate-900">50% +</p>
                    </div>
                 </div>
               </div>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
