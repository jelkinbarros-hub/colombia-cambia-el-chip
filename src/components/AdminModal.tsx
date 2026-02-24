import React, { useState } from 'react';
import { X, Save, Upload, AlertTriangle, FileText, RefreshCw, CheckCircle, Image, List, ImagePlus, Download, HardDriveDownload } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { QuizQuestion } from '../types';

const AdminModal: React.FC = () => {
  const { categories, updateCategoryQuestions, galleryImages, updateGalleryImages, resetToDefaults, fullRestore, isAdminOpen, setIsAdminOpen } = useQuiz();
  
  // selectedId can be a category ID or 'gallery_manager'
  const [selectedId, setSelectedId] = useState<string>(categories[0].id);
  const [textInput, setTextInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Effect to load data when switching tabs
  React.useEffect(() => {
      if (selectedId === 'gallery_manager') {
          setTextInput(galleryImages.join('\n'));
      } else {
          // It's a category
          setTextInput(''); 
      }
      setStatus('idle');
      setMessage('');
  }, [selectedId, galleryImages]);

  if (!isAdminOpen) return null;

  const parseQuestionsFromText = (text: string): QuizQuestion[] => {
    // Normalize newlines and split by double newlines (blocks)
    const blocks = text.replace(/\r\n/g, '\n').split(/\n\s*\n/).filter(b => b.trim());
    
    const questions: QuizQuestion[] = [];

    blocks.forEach((block, index) => {
      const lines = block.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length < 3) return; // Skip incomplete blocks

      // Extract Question
      const questionText = lines[0].replace(/^(\d+[\.\)]|P:|Pregunta:)\s*/i, '');

      const options: string[] = [];
      let answerIndex = -1;
      let rationale = ""; // Default empty to trigger auto-generation

      // Regex patterns
      const optionRegex = /^([a-d]|[1-4])[\.\)]\s+(.+)/i;
      const answerRegex = /^(R:|Respuesta:|Answer:|Correcta:)\s*([a-d]|[1-4])/i;
      const rationaleRegex = /^(E:|Explicación:|Justificación:|Nota:)\s*(.*)/i;

      lines.slice(1).forEach(line => {
        // Check for Answer
        const ansMatch = line.match(answerRegex);
        if (ansMatch) {
          const val = ansMatch[2].toLowerCase();
          if (val === 'a' || val === '1') answerIndex = 0;
          if (val === 'b' || val === '2') answerIndex = 1;
          if (val === 'c' || val === '3') answerIndex = 2;
          if (val === 'd' || val === '4') answerIndex = 3;
          return;
        }

        // Check for Rationale
        const ratMatch = line.match(rationaleRegex);
        if (ratMatch) {
          rationale = ratMatch[2].trim();
          return;
        }

        // Check for Options
        const optMatch = line.match(optionRegex);
        if (optMatch) {
          options.push(optMatch[2]);
        }
      });

      if (options.length >= 2 && answerIndex !== -1) {
        questions.push({
          question: questionText,
          options: options.slice(0, 4), 
          answer: answerIndex,
          rationale
        });
      }
    });

    if (questions.length === 0) {
      throw new Error("No se pudieron detectar preguntas válidas. Revisa el formato.");
    }

    return questions;
  };

  const fillMissingRationalesLocally = (questions: QuizQuestion[]): QuizQuestion[] => {
    return questions.map(q => {
      if (!q.rationale || q.rationale.trim() === '') {
        const correctOption = q.options[q.answer];
        return {
          ...q,
          rationale: `La respuesta correcta es: ${correctOption}.`
        };
      }
      return q;
    });
  };

  // --- HANDLERS FOR BACKUP SYSTEM ---
  
  const handleBackupDownload = () => {
    const backupData = {
        timestamp: new Date().toISOString(),
        categories: categories.map(c => ({ id: c.id, questions: c.questions })),
        gallery: galleryImages
    };
    
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(backupData, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `backup_alfredo_deluque_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(element);
    element.click();
    element.remove();
    setMessage("Copia de seguridad descargada correctamente.");
    setStatus('success');
  };

  const handleBackupRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const data = JSON.parse(ev.target?.result as string);
            fullRestore(data);
            setMessage("¡Base de datos restaurada con éxito!");
            setStatus('success');
        } catch (err) {
            setMessage("El archivo de respaldo no es válido.");
            setStatus('error');
        }
    };
    reader.readAsText(file);
  };

  // --- END HANDLERS ---

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setTextInput(text);
      setStatus('idle');
      setMessage('Archivo cargado. Revisa el contenido y guarda.');
    };
    reader.readAsText(file);
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setStatus('idle');
    setMessage('Procesando imágenes... esto puede tardar unos segundos.');

    const promises: Promise<string>[] = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file as Blob);
        });
    });

    Promise.all(promises).then(base64Images => {
        setTextInput(prev => {
            const existing = prev.trim();
            return existing + (existing ? '\n' : '') + base64Images.join('\n');
        });
        setMessage(`Se añadieron ${base64Images.length} imágenes. Dale a "Actualizar Galería" para guardar.`);
    }).catch(err => {
        setStatus('error');
        setMessage('Error al leer las imágenes.');
        console.error(err);
    });
  };

  const handleSave = () => {
    setStatus('idle');
    setMessage('');

    try {
      if (selectedId === 'gallery_manager') {
          const urls = textInput.split('\n').map(l => l.trim()).filter(l => l !== '' && (l.startsWith('http') || l.startsWith('data:image')));
          
          if (urls.length === 0) throw new Error("No se encontraron imágenes válidas (URL o Archivo).");
          
          updateGalleryImages(urls);
          setStatus('success');
          setMessage(`¡Éxito! Galería actualizada con ${urls.length} fotos.`);
      } else {
          let parsedQuestions: QuizQuestion[] = [];
          if (textInput.trim().startsWith('[')) {
            try {
              parsedQuestions = JSON.parse(textInput);
            } catch (e) {
              parsedQuestions = parseQuestionsFromText(textInput);
            }
          } else {
            parsedQuestions = parseQuestionsFromText(textInput);
          }

          if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
            throw new Error("No se encontraron preguntas válidas.");
          }

          parsedQuestions = fillMissingRationalesLocally(parsedQuestions);

          updateCategoryQuestions(selectedId, parsedQuestions);
          setStatus('success');
          setMessage(`¡Éxito! Se guardaron ${parsedQuestions.length} preguntas.`);
      }

      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Error al procesar.');
    }
  };

  const downloadTemplate = () => {
    const text = `INSTRUCCIONES:
1. Escribe la pregunta.
2. Opciones: a), b), c), d).
3. Respuesta: "R: [letra]".
4. Explicación: "E: [texto]" (Si la dejas vacía, se autocompletará con la respuesta correcta).

--- EJEMPLO ---

1. ¿Cuál es el departamento de Alfredo?
a) Atlántico
b) Magdalena
c) La Guajira
d) Cesar
R: c
E: 

2. ¿Cuál es su número en el tarjetón?
a) U1
b) U3
c) L5
d) C10
R: b
`;
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "plantilla_preguntas.txt";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const isGalleryMode = selectedId === 'gallery_manager';

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[95vh] text-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 rounded-t-2xl shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-gradient-to-r from-red-600 to-red-500 px-3 py-1 rounded text-xs font-bold text-white tracking-widest uppercase shadow-md">Admin</div>
             <h2 className="text-xl font-bold text-white">Gestor de Contenido</h2>
          </div>
          <button onClick={() => setIsAdminOpen(false)} className="text-slate-400 hover:text-white transition bg-white/5 hover:bg-white/10 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-950/50 border-r border-slate-700 overflow-y-auto p-4 shrink-0 flex flex-col gap-6">
            
            {/* Categories */}
            <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <List size={14} /> Temáticas Trivia
                </h3>
                <div className="space-y-1">
                {categories.map(cat => (
                    <button
                    key={cat.id}
                    onClick={() => setSelectedId(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-between group ${selectedId === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
                    >
                    <span className="truncate">{cat.title}</span>
                    {selectedId === cat.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </button>
                ))}
                </div>
            </div>

            {/* Multimedia */}
            <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Image size={14} /> Multimedia
                </h3>
                <button
                    onClick={() => setSelectedId('gallery_manager')}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-between group ${selectedId === 'gallery_manager' ? 'bg-yellow-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
                >
                    <span className="truncate">Gestión de Galería</span>
                    {selectedId === 'gallery_manager' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </button>
            </div>

            {/* Security Zone */}
            <div className="mt-auto pt-6 border-t border-slate-800">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <HardDriveDownload size={14} /> Copia de Seguridad
               </h3>
               <div className="space-y-2">
                   <button 
                    onClick={handleBackupDownload}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition border border-slate-700"
                   >
                       <Download size={14} /> Descargar Datos
                   </button>
                   <label className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition border border-slate-700">
                       <Upload size={14} /> Restaurar Datos
                       <input type="file" accept=".json" onChange={handleBackupRestore} className="hidden" />
                   </label>
               </div>

               <div className="mt-4">
                 <button onClick={resetToDefaults} className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-white hover:bg-red-500/20 py-2 rounded-lg text-xs font-bold transition">
                    <RefreshCw size={14} /> BORRAR TODO
                 </button>
               </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-900 flex flex-col min-h-0">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <span className={isGalleryMode ? "text-yellow-400" : "text-blue-400"}>
                      {isGalleryMode ? "Editando: Galería de Fotos" : `Editando: ${categories.find(c => c.id === selectedId)?.title}`}
                  </span>
                </h3>
                <p className="text-xs md:text-sm text-slate-400">
                    {isGalleryMode ? "Pega URLs o sube imágenes desde tu dispositivo." : 'Si dejas "E:" vacío, se autocompletará con la respuesta correcta.'}
                </p>
              </div>
              
              <div className="flex gap-2">
                {!isGalleryMode && (
                    <button 
                        onClick={downloadTemplate}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-xs font-bold border border-slate-600 text-slate-300 transition shadow-sm"
                    >
                        <FileText size={16} /> Plantilla
                    </button>
                )}

                {isGalleryMode && (
                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-xs font-bold border border-yellow-700 transition shadow-sm hover:shadow-yellow-500/20">
                        <ImagePlus size={16} /> Subir Fotos
                        <input type="file" multiple accept="image/*" onChange={handleLocalImageUpload} className="hidden" />
                    </label>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="relative flex-1 min-h-[300px] mb-4 group">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={isGalleryMode ? `https://ejemplo.com/foto1.jpg\nhttps://ejemplo.com/foto2.jpg` : `EJEMPLO:\n1. Pregunta...\n...`}
                className="w-full h-full bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm text-slate-300 focus:text-green-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none shadow-inner leading-relaxed"
              />
              {!isGalleryMode && (
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border border-slate-600 transition shadow-lg hover:shadow-xl hover:translate-y-0.5">
                    <Upload size={14} /> Cargar TXT
                    <input type="file" accept=".txt,.json" onChange={handleFileUpload} className="hidden" />
                    </label>
                </div>
              )}
            </div>

            {/* Status & Actions */}
            <div className="shrink-0">
                {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold flex items-center gap-2 animate-fade-in ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : status === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                    {status === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
                    {message}
                </div>
                )}

                <button 
                onClick={handleSave}
                disabled={!textInput}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] ${!textInput ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25'}`}
                >
                <Save size={20} /> {isGalleryMode ? "ACTUALIZAR GALERÍA" : "GUARDAR CAMBIOS"}
                </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
