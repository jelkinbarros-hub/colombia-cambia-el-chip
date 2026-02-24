import React, { useState, useEffect } from 'react';
import { Menu, X, Brain, ChevronRight } from 'lucide-react';
import LogoU3 from './LogoU3';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScrollListener = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScrollListener);
    return () => window.removeEventListener('scroll', handleScrollListener);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <LogoU3 />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#inicio" onClick={(e) => handleScrollTo(e, 'inicio')} className="text-slate-700 hover:text-red-600 font-bold transition duration-300">Inicio</a>
            <a href="#razones" onClick={(e) => handleScrollTo(e, 'razones')} className="text-slate-700 hover:text-yellow-600 font-bold transition duration-300">Propuestas</a>
            <a href="#trivia" onClick={(e) => handleScrollTo(e, 'trivia')} className="text-slate-700 hover:text-purple-600 font-bold transition duration-300 flex items-center gap-1"><Brain size={18}/> Trivia</a>
            <a href="#sumate" onClick={(e) => handleScrollTo(e, 'sumate')} className="bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold shadow-lg transform hover:-translate-y-0.5 transition duration-300 ring-2 ring-offset-2 ring-transparent hover:ring-yellow-400">
              ¡Cambia el Chip!
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 -mr-2 text-slate-800 hover:bg-slate-100 rounded-full transition duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {[
            { id: "inicio", label: "Inicio", color: "hover:text-red-600", bg: "active:bg-red-50" },
            { id: "razones", label: "Propuestas", color: "hover:text-yellow-600", bg: "active:bg-yellow-50" },
            { id: "trivia", label: "Trivia", color: "hover:text-purple-600", bg: "active:bg-purple-50" }
          ].map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`}
              className={`flex items-center justify-between px-4 py-4 text-lg font-bold text-slate-800 rounded-xl transition duration-200 ${link.bg} ${link.color} group`} 
              onClick={(e) => handleScrollTo(e, link.id)}
            >
              {link.label}
              <ChevronRight size={20} className="text-slate-300 group-hover:text-current transition-colors" />
            </a>
          ))}
          <div className="pt-4 px-2">
            <a 
              href="#sumate"
              onClick={(e) => handleScrollTo(e, 'sumate')} 
              className="block w-full py-4 text-center text-lg font-bold text-white bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 rounded-xl shadow-lg active:scale-95 transition duration-200" 
            >
              Únete Ahora
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;