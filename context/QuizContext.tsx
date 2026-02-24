import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QuizCategory } from '../types';
import { QUIZ_CATEGORIES as INITIAL_CATEGORIES, DEFAULT_GALLERY_IMAGES } from '../constants';

interface QuizContextType {
  categories: QuizCategory[];
  galleryImages: string[];
  updateCategoryQuestions: (categoryId: string, newQuestions: any[]) => void;
  updateGalleryImages: (newImages: string[]) => void;
  resetToDefaults: () => void;
  fullRestore: (data: any) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (isOpen: boolean) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Storage Keys
const KEY_CATEGORIES = 'alfredo_db_categories_v2';
const KEY_GALLERY = 'alfredo_db_gallery_v2';
const KEY_LEGACY = 'alfredo_quiz_data'; // Old key for migration

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // --- 1. INITIALIZATION: Categories ---
  const [categories, setCategories] = useState<QuizCategory[]>(() => {
    if (typeof window === 'undefined') return INITIAL_CATEGORIES;
    try {
        // A. Try new isolated storage
        const localData = localStorage.getItem(KEY_CATEGORIES);
        if (localData) {
            const parsed = JSON.parse(localData);
            // Smart Merge: Use Code Structure (titles/icons) + Saved Questions
            return INITIAL_CATEGORIES.map(defaultCat => {
                const savedCat = parsed.find((c: any) => c.id === defaultCat.id);
                return savedCat ? { ...defaultCat, questions: savedCat.questions } : defaultCat;
            });
        }

        // B. Migration: Check for legacy data
        const legacyData = localStorage.getItem(KEY_LEGACY);
        if (legacyData) {
            const parsed = JSON.parse(legacyData);
            if (parsed.categories) {
                console.log("Migrating Categories to V2...");
                return INITIAL_CATEGORIES.map(defaultCat => {
                    const savedCat = parsed.categories.find((c: any) => c.id === defaultCat.id);
                    return savedCat ? { ...defaultCat, questions: savedCat.questions } : defaultCat;
                });
            }
        }
    } catch (e) {
        console.error("Error initializing categories", e);
    }
    return INITIAL_CATEGORIES;
  });

  // --- 2. INITIALIZATION: Gallery ---
  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_GALLERY_IMAGES;
    try {
        // A. Try new isolated storage
        const localData = localStorage.getItem(KEY_GALLERY);
        if (localData) {
            const parsed = JSON.parse(localData);
            // Merge unique images
            return Array.from(new Set([...parsed, ...DEFAULT_GALLERY_IMAGES]));
        }

        // B. Migration: Check for legacy data
        const legacyData = localStorage.getItem(KEY_LEGACY);
        if (legacyData) {
            const parsed = JSON.parse(legacyData);
            if (parsed.galleryImages) {
                console.log("Migrating Gallery to V2...");
                return Array.from(new Set([...parsed.galleryImages, ...DEFAULT_GALLERY_IMAGES]));
            }
        }
    } catch (e) {
        console.error("Error initializing gallery", e);
    }
    return DEFAULT_GALLERY_IMAGES;
  });

  // --- 3. AUTO-SAVE (Isolated Effects) ---
  
  // Save Categories independently
  useEffect(() => {
    try {
        const minimalData = categories.map(c => ({ id: c.id, questions: c.questions }));
        localStorage.setItem(KEY_CATEGORIES, JSON.stringify(minimalData));
    } catch (e) {
        console.error("Failed to save categories", e);
    }
  }, [categories]);

  // Save Gallery independently
  useEffect(() => {
    try {
        localStorage.setItem(KEY_GALLERY, JSON.stringify(galleryImages));
    } catch (e) {
        console.error("Failed to save gallery", e);
    }
  }, [galleryImages]);


  // --- Actions ---

  const updateCategoryQuestions = (categoryId: string, newQuestions: any[]) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, questions: newQuestions } : cat
    ));
  };

  const updateGalleryImages = (newImages: string[]) => {
      setGalleryImages(newImages);
  };

  const resetToDefaults = () => {
    if(confirm("¿ATENCIÓN: Se borrarán TODOS los datos personalizados. ¿Estás seguro?")) {
      setCategories(INITIAL_CATEGORIES);
      setGalleryImages(DEFAULT_GALLERY_IMAGES);
      localStorage.removeItem(KEY_CATEGORIES);
      localStorage.removeItem(KEY_GALLERY);
      localStorage.removeItem(KEY_LEGACY);
    }
  };

  const fullRestore = (data: any) => {
    if (data.categories) {
        setCategories(INITIAL_CATEGORIES.map(defaultCat => {
            const savedCat = data.categories.find((c: any) => c.id === defaultCat.id);
            return savedCat ? { ...defaultCat, questions: savedCat.questions } : defaultCat;
        }));
    }
    if (data.gallery) {
        setGalleryImages(Array.from(new Set([...data.gallery, ...DEFAULT_GALLERY_IMAGES])));
    }
  };

  return (
    <QuizContext.Provider value={{ 
      categories, 
      galleryImages,
      updateCategoryQuestions, 
      updateGalleryImages,
      resetToDefaults,
      fullRestore,
      isAdminOpen,
      setIsAdminOpen
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};