import React, { useState } from 'react';
import { Brain, Award, RefreshCw, ChevronRight, ChevronLeft, CheckCircle2, ArrowRight, XCircle } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { QuizCategory } from '../types';

const QuizSection: React.FC = () => {
  // Use context instead of constants
  const { categories } = useQuiz();
  
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleCategorySelect = (category: QuizCategory) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  const handleAnswerOptionClick = (index: number) => {
    if (!selectedCategory) return;
    
    setSelectedAnswer(index);
    const correct = index === selectedCategory.questions[currentQuestion].answer;
    if (correct) setScore(score + 1);
    
    // Auto-advance removed to allow reading the rationale
  };

  const handleNextQuestion = () => {
    if (!selectedCategory) return;

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedCategory.questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const resetSelection = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswer(null);
  };

  const restartCurrentQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswer(null);
  };

  return (
    <section id="trivia" className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden min-h-screen md:min-h-0 flex flex-col justify-center">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20">
            <Brain className="text-yellow-400 w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">Plataforma Educativa</h2>
          <p className="text-blue-200 text-base md:text-lg max-w-2xl mx-auto">
            {selectedCategory 
              ? `Demuestra qué tanto sabes sobre: ${selectedCategory.title}`
              : "Selecciona una temática para conocer más sobre la gestión de Alfredo Deluque."}
          </p>
        </div>
        
        {!selectedCategory ? (
          /* CATEGORY SELECTION MENU */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/20"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-500`}></div>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4 shadow-lg text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">{category.title}</h3>
                <p className="text-sm text-blue-200">{category.description}</p>
                <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                  Jugar ahora <ChevronRight size={14} className="ml-1" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* ACTIVE QUIZ INTERFACE */
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl border border-white/10 max-w-3xl mx-auto animate-slide-up">
            
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <button onClick={resetSelection} className="flex items-center text-sm text-blue-200 hover:text-white transition">
                <ChevronLeft size={20} /> Volver al menú
              </button>
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${selectedCategory.color}`}>
                {selectedCategory.title}
              </span>
            </div>

            {selectedCategory.questions.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-slate-300">No hay preguntas cargadas en esta categoría aún.</p>
                </div>
            ) : showScore ? (
              /* RESULTS VIEW */
              <div className="text-center animate-fade-in py-6">
                <Award size={64} className="mx-auto text-yellow-400 mb-6 drop-shadow-lg" />
                <h3 className="text-3xl font-bold mb-2">¡Resultado Final!</h3>
                <div className="text-6xl font-black text-white mb-6 tracking-tighter">
                  {score} <span className="text-3xl text-white/50">/ {selectedCategory.questions.length}</span>
                </div>
                
                <p className="text-xl text-blue-100 mb-10 max-w-md mx-auto">
                  {score === selectedCategory.questions.length 
                    ? "¡Perfecto! Tienes el chip completamente cambiado." 
                    : score > selectedCategory.questions.length / 2 
                      ? "¡Muy bien! Conoces bastante sobre este tema." 
                      : "Sigue explorando nuestra plataforma para aprender más."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={restartCurrentQuiz} className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold transition flex items-center justify-center gap-2">
                    <RefreshCw size={18} /> Repetir Temática
                  </button>
                  <button onClick={resetSelection} className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold shadow-lg transition flex items-center justify-center gap-2">
                    Explorar otro tema <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              /* QUESTION VIEW */
              <div className="animate-fade-in">
                {/* Progress Bar */}
                <div className="w-full bg-slate-800/50 rounded-full h-2 mb-8">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${selectedCategory.color}`} 
                    style={{ width: `${((currentQuestion + 1) / selectedCategory.questions.length) * 100}%` }}
                  ></div>
                </div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-bold mb-8 leading-snug">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-sm align-middle mb-1 mr-2 bg-gradient-to-r ${selectedCategory.color} text-white`}>
                    {currentQuestion + 1}/{selectedCategory.questions.length}
                  </span>
                  {selectedCategory.questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {selectedCategory.questions[currentQuestion].options.map((option, index) => {
                    let buttonClass = "w-full text-left p-4 md:p-5 rounded-xl transition-all duration-200 font-medium border text-base md:text-lg relative overflow-hidden group";
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === selectedCategory.questions[currentQuestion].answer;
                    
                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        buttonClass += " bg-green-500 border-green-400 text-white shadow-lg scale-[1.01]";
                      } else if (isSelected) {
                        buttonClass += " bg-red-500 border-red-400 text-white opacity-90";
                      } else {
                        buttonClass += " border-white/5 bg-white/5 opacity-40 cursor-not-allowed grayscale";
                      }
                    } else {
                      buttonClass += " border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]";
                    }

                    // Calculate letter A, B, C, D...
                    const letter = String.fromCharCode(65 + index);

                    return (
                      <button 
                        key={index} 
                        onClick={() => !selectedAnswer && handleAnswerOptionClick(index)} 
                        className={buttonClass} 
                        disabled={selectedAnswer !== null}
                      >
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`font-black mr-3 text-lg ${selectedAnswer !== null && isCorrect ? 'text-white' : 'text-yellow-400'}`}>
                                {letter})
                            </span>
                            {option}
                          </div>
                          {selectedAnswer !== null && isCorrect && <CheckCircle2 size={24} className="animate-bounce shrink-0 ml-2" />}
                          {selectedAnswer !== null && isSelected && !isCorrect && <XCircle size={24} className="shrink-0 ml-2 text-white/80" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Rationale Section */}
                {selectedAnswer !== null && (
                  <div className="mt-6 p-6 bg-blue-950/80 rounded-2xl border border-white/10 shadow-2xl animate-slide-up backdrop-blur-md">
                    {(() => {
                        const currentQ = selectedCategory.questions[currentQuestion];
                        const isCorrect = selectedAnswer === currentQ.answer;
                        
                        return (
                            <div className={`border-l-4 ${isCorrect ? 'border-green-400' : 'border-red-500'} pl-4 mb-6`}>
                                <div className="flex items-center gap-2 mb-2">
                                   {isCorrect ? (
                                     <CheckCircle2 className="text-green-400" size={20} />
                                   ) : (
                                     <XCircle className="text-red-400" size={20} />
                                   )}
                                   <p className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'} uppercase tracking-widest`}>
                                     {isCorrect ? '¡Respuesta Correcta!' : 'Incorrecto'}
                                   </p>
                                </div>
                                
                                <div className="text-base md:text-lg text-white leading-relaxed space-y-3">
                                    {!isCorrect && (
                                        <p className="font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-red-100">
                                            La respuesta correcta es: <span className="text-white underline decoration-yellow-400 underline-offset-4">{currentQ.options[currentQ.answer]}</span>
                                        </p>
                                    )}
                                    <p className="text-blue-100">
                                        <span className="font-bold text-yellow-400 uppercase text-xs tracking-wider mr-2 block sm:inline">¿Sabías qué?</span>
                                        {currentQ.rationale}
                                    </p>
                                </div>
                            </div>
                        );
                    })()}

                    <button 
                        onClick={handleNextQuestion}
                        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold rounded-xl shadow-lg transition transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                    >
                        {currentQuestion + 1 < selectedCategory.questions.length ? "Siguiente Pregunta" : "Ver Resultados Finales"}
                        <ArrowRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizSection;