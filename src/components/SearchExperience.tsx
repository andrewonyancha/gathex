'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, X, ChevronRight, Grid3X3 } from 'lucide-react';
import { FaCar, FaTools, FaLightbulb, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { debounce } from 'lodash';
import { searchProducts, products, subcategories } from '@/data/products';

const SuggestionItem = memo(({ product, index, onClick }: { product: typeof products[0]; index: number; onClick: () => void }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.button
      custom={index}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { delay: index * 0.05, duration: 0.3 } },
      }}
      initial="hidden"
      animate="visible"
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, rotateX: 2, boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)' }}
      onClick={onClick}
      className="suggestion-button w-full flex items-center gap-4 p-3  -xl bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-400/30 text-white transition-all duration-200 backdrop-blur-sm"
      aria-label={`Select ${product.name}`}
      style={{ willChange: 'transform, opacity' }}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={40}
        height={40}
        className="object-cover  "
      />
      <div className="flex-1 text-left">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-red-200/80">{product.brand} - KSh {product.price.toLocaleString()}</p>
      </div>
      <ChevronRight size={16} className="text-red-300" />
    </motion.button>
  );
});
SuggestionItem.displayName = 'SuggestionItem';

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<(typeof products[0])[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  // Category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    Engine: <FaCar size={16} />,
    'Brake & Steering': <FaTools size={16} />,
    'Suspension & Body': <FaCar size={16} />,
    'Electrical & Light': <FaLightbulb size={16} />,
  };

  // Derive categories
  const categories = Object.values(subcategories).map(cat => cat.title);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    const storedRecent = localStorage.getItem('recentSearches');
    if (storedRecent) {
      setRecentSearches(JSON.parse(storedRecent));
    }
  }, [isOpen]);

  // Create debounced function with useMemo to maintain reference
  const debouncedFetchSuggestions = useMemo(
    () => debounce((q: string) => {
      if (q.trim()) {
        searchProducts(q).then(results => {
          setSuggestions(results.slice(0, 4)); // Reduced to 4 for performance
        });
      } else {
        setSuggestions([]);
      }
    }, 300),
    [] // searchProducts is imported and should be stable
  );

  // Use useCallback for the fetch function that uses the debounced function
  const fetchSuggestions = useCallback(
    (q: string) => {
      debouncedFetchSuggestions(q);
    },
    [debouncedFetchSuggestions] // Now properly declared
  );

  useEffect(() => {
    fetchSuggestions(query);
    return () => debouncedFetchSuggestions.cancel();
  }, [query, fetchSuggestions, debouncedFetchSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const newRecent = [query, ...recentSearches.filter(r => r !== query)].slice(0, 4);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      onClose();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    const newRecent = [suggestion, ...recentSearches.filter(r => r !== suggestion)].slice(0, 4);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    onClose();
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleCategoryClick = (category: string) => {
    handleSuggestionClick(category);
  };

  const handleProductClick = (product: typeof products[0]) => {
    onClose();
    router.push(`/products/${product.id}`);
  };

  // ESC and keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const suggestionButtons = document.querySelectorAll('.suggestion-button');
        const focused = document.activeElement;
        const index = Array.from(suggestionButtons).indexOf(focused as HTMLElement);
        if (e.key === 'ArrowDown' && index < suggestionButtons.length - 1) {
          (suggestionButtons[index + 1] as HTMLElement).focus();
        } else if (e.key === 'ArrowUp' && index > 0) {
          (suggestionButtons[index - 1] as HTMLElement).focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120, damping: 15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .input-sparkle::after {
              content: '';
              position: absolute;
              top: -10px;
              left: 50%;
              width: 4px;
              height: 4px;
              background: rgba(220, 38, 38, 0.7);
              border-radius: 50%;
              animation: sparkle 1.5s infinite ease-in-out;
              opacity: 0;
            }
            .input-sparkle.focused::after {
              opacity: 1;
            }
            @keyframes sparkle {
              0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
              50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
            }
            .tooltip::after {
              content: 'Close';
              position: absolute;
              right: 100%;
              top: 50%;
              transform: translateY(-50%) scale(0);
              background: rgba(220, 38, 38, 0.9);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              white-space: nowrap;
              transition: transform 0.2s ease-out;
            }
            .tooltip:hover::after {
              transform: translateY(-50%) scale(1);
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/90"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Image
              src="/images/hero6.jpg"
              alt="Search Background"
              fill
              sizes="100vw"
              className="object-cover blur-xs"
              quality={30}
              loading="eager"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-red-900/60" />
          </motion.div>

          {/* Close Button (Screen Top-Right) */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90, boxShadow: '0 0 12px rgba(220, 38, 38, 0.6)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="fixed md:top-4 top-0.5 md:right-4 right-0.5 z-[60] md:w-14 w-6 md:h-14 h-6 flex items-center justify-center bg-red-600/20 hover:bg-red-600/40  -full backdrop-blur-sm transition-all duration-200 tooltip"
            aria-label="Close search overlay"
          >
            <X size={24} className="text-white hover:text-red-300" />
          </motion.button>

          {/* Main Search Interface */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center px-4 md:pt-20 pt-4"
            variants={shouldReduceMotion ? containerVariants : contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="dialog"
            aria-labelledby="search-overlay-title"
            aria-modal="true"
          >
            <div className="w-full max-w-4xl">
              {/* Main Search Container */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 120, damping: 15 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/5  -xl backdrop-blur-md border border-white/10 shadow-2xl shadow-red-600/10" />
                
                <div className="relative p-4">
                  {/* Search Form */}
                  <form onSubmit={handleSubmit} className="relative">
                    <div className={`relative flex items-center gap-3 p-4 transition-all duration-300 input-sparkle ${isFocused ? 'focused' : ''} ${
                      isFocused 
                        ? 'bg-white/10 border border-red-400/50 shadow shadow-red-500/20' 
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <Search className={`flex-shrink-0 transition-colors duration-300 ${
                        isFocused ? 'text-red-400' : 'text-red-400/50'
                      }`} size={24} />
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search parts, brands, or categories..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-red-100/60 text-base font-medium"
                        aria-label="Search automotive parts"
                      />
                      {query && (
                        <motion.button
                          type="button"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          onClick={() => setQuery('')}
                          className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20  -lg transition-colors"
                          aria-label="Clear search query"
                        >
                          <X size={16} className="text-white" />
                        </motion.button>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                      className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600  -2xl font-semibold text-white text-base sm:text-lg shadow-lg shadow-red-500/25 transition-all duration-200 flex items-center justify-center gap-3 relative overflow-hidden"
                      aria-label="Submit search"
                    >
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)] opacity-0 hover:opacity-100 transition-opacity duration-200" />
                      <Search size={20} />
                      Search Parts
                    </motion.button>
                  </form>

                  {/* Suggestions */}
                  <AnimatePresence>
                    {suggestions.length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
                      >
                        {suggestions.map((product, index) => (
                          <SuggestionItem
                            key={product.id}
                            product={product}
                            index={index}
                            onClick={() => handleProductClick(product)}
                          />
                        ))}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="col-span-full text-center mt-2"
                        >
                          <button
                            onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                            className="px-5 py-3 bg-red-600/50 hover:bg-red-600/70  -xl text-white text-sm transition-all duration-200"
                            aria-label="View all search results"
                          >
                            View All Results
                          </button>
                        </motion.div>
                      </motion.div>
                    ) : query && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 p-4 bg-white/10  -xl text-center"
                        role="alert"
                      >
                        <p className="text-red-100 mb-4">No results found for &quot;{query}&quot;. Contact us for assistance!</p>
                        <div className="flex justify-center gap-4 text-sm">
                          <a
                            href="https://wa.me/+254700393363"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 bg-green-600/50 hover:bg-green-600/70  -xl text-white flex items-center gap-2"
                            aria-label="Contact via WhatsApp"
                          >
                            <FaWhatsapp size={16} />
                            WhatsApp
                          </a>
                          <a
                            href="tel:+254700393363"
                            className="px-5 py-3 bg-blue-600/50 hover:bg-blue-600/70  -xl text-white flex items-center gap-2"
                            aria-label="Contact via Phone"
                          >
                            <FaPhone size={16} />
                            Call
                          </a>
                          <a
                            href="mailto:info@gathexautospares.com"
                            className="px-5 py-3 bg-red-600/50 hover:bg-red-600/70  -xl text-white flex items-center gap-2"
                            aria-label="Contact via Email"
                          >
                            <FaEnvelope size={16} />
                            Email
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Categories */}
                  <motion.div 
                    className="mt-6 hidden md:block"
                    variants={itemVariants}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Grid3X3 size={16} className="text-red-400" />
                      <h3 className="text-white text-sm font-semibold">Browse Categories</h3>
                    </div>
                    <motion.div
                      className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide"
                      variants={itemVariants}
                      custom={1}
                      initial="hidden"
                      animate="visible"
                    >
                      {categories.map((category, index) => (
                        <motion.button
                          key={category}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCategoryClick(category)}
                          className={`flex items-center gap-2 px-2 py-1 text-red-100 hover:text-white transition-all duration-200 text-sm backdrop-blur-sm ${
                            query.toLowerCase() === category.toLowerCase()
                              ? 'bg-red-600/50 border-red-400/50'
                              : 'bg-white/5 border-white/10 hover:bg-red-500/20 hover:border-red-400/30'
                          }`}
                          aria-label={`Select category ${category}`}
                          style={{ willChange: 'transform, opacity' }}
                        >
                          {categoryIcons[category] || <FaCar size={16} />}
                          {category}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Footer Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="text-center mt-8"
                  >
                    <p className="text-red-100/60 text-xs">
                      Press <kbd className="px-2 bg-white/10   text-red-100/80">ESC</kbd> to close
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}