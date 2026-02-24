import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, Loader2, ImageOff, ImagePlus } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useQuiz } from '../context/QuizContext';
import UGradientText from './UGradientText';

const GallerySection: React.FC = () => {
  const { galleryImages, updateGalleryImages } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lazy Loading with react-intersection-observer
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  // Reset loading state when index changes
  useEffect(() => {
    setIsImageLoaded(false);
    setHasError(false);
  }, [currentIndex]);

  // Preload Neighbors (Background Priority)
  useEffect(() => {
    if (!inView || galleryImages.length === 0) return;

    const indexesToPreload = [
      (currentIndex + 1) % galleryImages.length,
      (currentIndex + 2) % galleryImages.length,
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    ];

    indexesToPreload.forEach((idx) => {
      const preloadImg = new Image();
      preloadImg.src = galleryImages[idx];
    });
  }, [inView, currentIndex, galleryImages]);

  // Auto-play effect
  useEffect(() => {
    let interval: any;
    if (isAutoPlaying && galleryImages.length > 1 && inView) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length, inView]);

  const prevSlide = () => {
    setIsAutoPlaying(false);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    const isLastSlide = currentIndex === galleryImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(slideIndex);
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const promises: Promise<string>[] = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file as Blob);
        });
    });

    Promise.all(promises).then(base64Images => {
        const newImages = [...galleryImages, ...base64Images];
        updateGalleryImages(newImages);
        setIsUploading(false);
        // Jump to the first uploaded image
        if (galleryImages.length > 0) {
             setCurrentIndex(galleryImages.length);
        }
        // If it was empty, it naturally starts at 0
    }).catch(err => {
        console.error("Error uploading images", err);
        setIsUploading(false);
    });
  };

  if (galleryImages.length === 0) return null;

  return (
    <section 
        id="galeria" 
        ref={ref}
        className="py-16 md:py-24 bg-slate-900 text-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="inline-block p-2 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20">
            <Camera className="text-yellow-400 w-6 h-6" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Galería de <UGradientText>Gestión</UGradientText>
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Recorriendo el país y trabajando incansablemente por nuestra gente.
          </p>

          {/* Quick Upload Button */}
          <div className="absolute top-0 right-0">
             <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold border border-slate-700 transition disabled:opacity-50"
                title="Añadir fotos"
             >
                {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                <span className="hidden sm:inline">Añadir Fotos</span>
             </button>
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                accept="image/*" 
                onChange={handleLocalImageUpload} 
            />
          </div>
        </div>

        {/* Main Slider */}
        <div className="relative w-full max-w-5xl mx-auto group">
          <div 
            className="w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-2xl md:rounded-3xl bg-slate-800 relative overflow-hidden shadow-2xl border-4 border-white/10 flex items-center justify-center"
          >
             {/* Loading State */}
             {!isImageLoaded && !hasError && inView && (
               <div className="absolute inset-0 flex items-center justify-center bg-slate-800 z-10 transition-opacity duration-300">
                 <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
               </div>
             )}

             {/* Error State */}
             {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-slate-500 z-10">
                    <ImageOff className="w-12 h-12 mb-2 opacity-50" />
                    <p className="text-sm">No se pudo cargar la imagen</p>
                </div>
             )}

             {/* Image - using img tag for better object-fit support and load events */}
             {inView && (
                <img 
                  src={galleryImages[currentIndex]} 
                  alt={`Foto de gestión ${currentIndex + 1}`}
                  className={`max-w-full max-h-full object-contain duration-500 transition-opacity ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => {
                      setIsImageLoaded(true);
                      setHasError(true);
                  }}
                />
             )}
             
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>

             {/* Caption */}
             <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10 pointer-events-none">
                 <span className="bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-md">
                     Foto {currentIndex + 1} de {galleryImages.length}
                 </span>
             </div>
          </div>

          {/* Left Arrow */}
          <button 
             onClick={prevSlide}
             className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-4 md:left-6 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-yellow-500 hover:text-black transition z-20 backdrop-blur-sm"
          >
            <ChevronLeft size={30} />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-4 md:right-6 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-yellow-500 hover:text-black transition z-20 backdrop-blur-sm"
          >
            <ChevronRight size={30} />
          </button>
        </div>

        {/* Thumbnails / Dots */}
        <div className="flex justify-center py-6 gap-2 flex-wrap">
          {galleryImages.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`transition-all duration-300 cursor-pointer rounded-full ${currentIndex === slideIndex ? 'bg-yellow-500 w-8 md:w-12 h-2 md:h-3' : 'bg-slate-700 hover:bg-slate-600 w-2 md:w-3 h-2 md:h-3'}`}
            ></div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
