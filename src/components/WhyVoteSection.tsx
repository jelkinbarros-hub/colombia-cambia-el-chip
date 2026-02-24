import React, { useState, useEffect } from 'react';
import { MousePointer, X, FileText, Calendar, CheckCircle } from 'lucide-react';
import UGradientText from './UGradientText';
import { ACHIEVEMENTS_LIST } from '../constants';
import { Achievement } from '../types';

const WhyVoteSection: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedAchievement) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAchievement]);

  return (
    <section id="razones" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4">
            Resultados que se <br/>
            <UGradientText>Comprueban</UGradientText>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto px-2">
            Dale clic a cada propuesta para conocer la <span className="font-bold text-slate-900">Ley de la República</span> detrás de ella.
          </p>
        </div>

        {/* Grid de Tarjetas Interactivas */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {ACHIEVEMENTS_LIST.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedAchievement(item)}
              className="group cursor-pointer relative bg-white rounded-3xl p-1 shadow-lg active:scale-[0.98] md:hover:shadow-2xl md:hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition duration-300 blur-sm -z-10`}></div>
              
              <div className="bg-white rounded-[22px] p-5 md:p-6 h-full border border-slate-100 group-hover:border-transparent relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition transform group-hover:scale-150 duration-500`}>
                  {React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement, { className: `w-24 h-24 md:w-32 md:h-32 text-slate-900` })}
                </div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`p-3 md:p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg ${item.shadow} transform group-hover:rotate-6 transition duration-300 shrink-0`}>
                    {React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement, { className: `w-6 h-6 md:w-8 md:h-8 text-white` })}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-xl md:text-2xl text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                      {item.shortDesc}
                    </p>
                    <div className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:underline">
                      <MousePointer size={14} className="mr-1" />
                      Ver Detalles
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE DETALLE */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
          <div 
            className="bg-white w-full md:max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden relative transform transition-all animate-slide-up flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Sticky */}
            <div className={`h-24 md:h-32 bg-gradient-to-r ${selectedAchievement.color} flex items-center justify-center relative shrink-0`}>
              <button 
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white p-2 rounded-full transition backdrop-blur-md z-10"
              >
                <X size={20} />
              </button>
              <div className="p-3 md:p-4 bg-white/20 rounded-full backdrop-blur-md">
                {React.isValidElement(selectedAchievement.icon) && React.cloneElement(selectedAchievement.icon as React.ReactElement, { className: "w-8 h-8 md:w-12 md:h-12 text-white" })}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 text-center leading-tight">
                {selectedAchievement.title}
              </h3>
              <p className="text-center text-xs md:text-sm font-bold text-blue-600 uppercase tracking-wider mb-6 bg-blue-50 py-1.5 px-3 rounded-full inline-block mx-auto">
                {selectedAchievement.law}
              </p>

              <div className="space-y-6">
                <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-sm md:text-base">
                    <FileText size={18} className="text-slate-500" />
                    ¿De qué trata?
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                    {selectedAchievement.fullDesc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 border border-slate-100 rounded-xl text-center">
                    <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase mb-1">Radicación</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-slate-900 font-bold text-sm md:text-base">
                      <Calendar size={14} className="text-yellow-500 hidden md:block" />
                      {selectedAchievement.radicacion}
                    </div>
                  </div>
                  <div className="p-3 md:p-4 border border-green-100 bg-green-50 rounded-xl text-center">
                    <p className="text-[10px] md:text-xs text-green-600 font-bold uppercase mb-1">Estado</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-green-700 font-bold text-sm md:text-base">
                      <CheckCircle size={14} className="hidden md:block" />
                      {selectedAchievement.aprobacion}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedAchievement(null)}
                className="w-full mt-8 bg-slate-900 text-white py-3.5 md:py-4 rounded-xl font-bold hover:bg-slate-800 transition active:scale-[0.98]"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyVoteSection;
