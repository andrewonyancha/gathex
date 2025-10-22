// components/ModalContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  openProductModal: (brand?: string, category?: string, subcategory?: string) => void;
  openContactModal: () => void;
  closeProductModal: () => void;
  closeContactModal: () => void;
  showProductModal: boolean;
  showContactModal: boolean;
  selectedBrand?: string;
  selectedCategory?: string;
  selectedSubcategory?: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();

  const openProductModal = (brand?: string, category?: string, subcategory?: string) => {
    setSelectedBrand(brand);
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedCategory(undefined);
    setSelectedSubcategory(undefined);
  };

  const openContactModal = () => setShowContactModal(true);

  const closeContactModal = () => setShowContactModal(false);

  return (
    <ModalContext.Provider value={{
      openProductModal, closeProductModal, openContactModal, closeContactModal,
      showProductModal, showContactModal, selectedBrand, selectedCategory, selectedSubcategory
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
}