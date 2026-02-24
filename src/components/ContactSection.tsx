import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Lightbulb } from 'lucide-react';
import { FormStatus } from '../types';

const ContactSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <section id="sumate" className="py-16 md:py-24 bg-white text-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight">El Cambio Comienza Contigo</h2>
        <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-12 font-medium">Envíanos una idea corta sobre cómo <span className="text-slate-900 font-black">Cambiar el Chip</span> en el país.</p>
        
        <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl border-t-8 border-gradient-to-r border-yellow-500 max-w-2xl mx-auto text-left relative overflow-hidden">
          {formStatus === 'success' ? (
            <div className="text-center py-8 md:py-12 animate-fade-in">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"><CheckCircle size={32} className="md:w-10 md:h-10" /></div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">¡Idea Recibida!</h3>
              <p className="text-slate-500 text-base md:text-lg">Gracias por tu aporte. Juntos construimos país.</p>
              <button onClick={() => setFormStatus('idle')} className="mt-6 md:mt-8 text-red-600 font-bold hover:underline text-sm md:text-base">Enviar otra idea</button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nombre</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition outline-none text-base" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Apellido</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition outline-none text-base" placeholder="Tu apellido" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <Lightbulb size={16} className="text-yellow-500"/> Tu Idea
                </label>
                <textarea 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition outline-none text-base min-h-[120px] resize-none" 
                    placeholder="Cuéntanos brevemente tu propuesta para mejorar el país..." 
                />
              </div>

              <div className="pt-2 md:pt-4">
                <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 hover:from-red-700 hover:via-yellow-600 hover:to-green-700 text-white font-black text-base md:text-lg py-3.5 md:py-4 rounded-xl shadow-lg transform active:scale-95 transition duration-200 flex justify-center items-center gap-2">
                  {formStatus === 'submitting' ? 'Enviando...' : <>ENVIAR MI IDEA <ChevronRight size={20} className="md:w-6 md:h-6" /></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
