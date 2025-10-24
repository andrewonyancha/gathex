'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaEnvelope, 
  FaCar,  
  FaTools,
  FaBars,
  FaTimes,
  FaStar,
  FaChevronRight,
  FaHome,
  FaBlog,
  FaShoppingCart,
} from 'react-icons/fa';
import { useModal } from './ModalContext';
import { Plus, Search } from 'lucide-react';
import { GiChatBubble } from 'react-icons/gi';
import { BsPeople } from 'react-icons/bs';
import { useCart } from '@/app/context/CartContext';
import CartModal from './CartModal';
import SearchOverlay from './SearchExperience';
import { memo } from 'react';

type NavLink = {
  name: string;
  href?: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

type ProductCategory = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  href: string;
  ctaText: string;
  category: string;
};

const topNavLinks: NavLink[] = [
  { name: 'Home', href: '/', icon: <FaHome size={16} /> },
  { name: 'About', href: '/about', icon: <BsPeople size={16} /> },
  { name: 'Help Center', href: '/help', icon: <GiChatBubble size={16} /> },
  { name: 'Blog', href: '/blog', icon: <FaBlog size={16} /> },
];

const productCategories: ProductCategory[] = [
  {
    id: 'new-parts',
    title: 'New Parts',
    description: 'Brand-new auto parts for small vehicles, ensuring top performance.',
    features: ['Engines', 'Brake Pads', 'Batteries', 'Body Panels'],
    icon: <FaCar size={14} />,
    href: '/products/new-parts',
    ctaText: 'Shop New Parts',
    category: 'new'
  },
  {
    id: 'ex-japan-parts',
    title: 'Ex-Japan Parts',
    description: 'High-quality used parts sourced from Japan, tested for reliability.',
    features: ['Transmissions', 'Suspension', 'Headlights', 'Interior Trim'],
    icon: <FaTools size={14} />,
    href: '/products/ex-japan-parts',
    ctaText: 'Shop Ex-Japan Parts',
    category: 'ex-japan'
  }
];

const mobileNavLinks: NavLink[] = [
  { name: 'New Parts', href: '/products/new-parts', icon: <FaCar size={14} /> },
  { name: 'Ex-Japan', href: '/products/ex-japan-parts', icon: <FaTools size={14} /> },
  { name: 'Search', icon: <Search size={14} />, onClick: () => {} },
  { name: 'Cart', icon: <FaShoppingCart size={14} />, onClick: () => {} },
];

const bottomNavLinks: NavLink[] = [
  { name: 'New Parts', href: '/products/new-parts', icon: <FaCar size={14} /> },
  { name: 'Ex-Japan Parts', href: '/products/ex-japan-parts', icon: <FaTools size={14} /> },
  { name: 'Search Parts', icon: <Search size={14} />, onClick: () => {} },
  { name: 'Contact Us', icon: <GiChatBubble size={14} />, onClick: undefined },
  { name: 'Cart', icon: <FaShoppingCart size={14} />, onClick: () => {} },
];

const brands = ['Toyota', 'Mazda', 'Mercedes', 'Subaru', 'Honda'];

// Memoized NavLink component to prevent unnecessary re-renders
const NavLinkItem = memo(({ link, pathname, onClick }: { link: NavLink; pathname: string; onClick?: () => void }) => {
  const { totalItems } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      {link.name === 'Contact Us' || link.name === 'Search Parts' || link.name === 'Cart' ? (
        <button
          onClick={onClick}
          className={`flex items-center space-x-2 px-4 py-2 bg-white transition-colors duration-300  ${
            pathname === link.href 
              ? 'text-red bg-red-600 shadow-md' 
              : 'text-black group-hover:text-red-600 group-hover:bg-red-50'
          }`}
          aria-label={link.name === 'Cart' ? `Open cart with ${totalItems} items` : link.name === 'Search Parts' ? 'Open search' : 'Open contact options'}
        >
          <span className="relative text-black group-hover:text-red-600">
            {link.icon}
            {link.name === 'Cart' && totalItems > 0 && (
              <span className="absolute -top-2 left-[calc(100%+4px)] lg:left-[calc(100%+2px)] bg-red-600 text-white text-xs rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </span>
          <span className={`text-sm text-black group-hover:text-red-600 transition-colors duration-300 ${pathname === link.href ? 'text-white' : ''}`}>
            {link.name}
          </span>
        </button>
      ) : (
        <Link
          href={link.href!}
          className={`flex items-center space-x-2 px-4 py-2 bg-white transition-colors duration-300  ${
            pathname === link.href 
              ? 'text-white bg-red-600 shadow' 
              : 'text-black group-hover:text-red-600 group-hover:bg-red-50'
          }`}
          aria-current={pathname === link.href ? 'page' : undefined}
          aria-label={`Go to ${link.name}`}
        >
          <span className="text-black group-hover:text-red-600">{link.icon}</span>
          <span className={`text-sm text-black group-hover:text-red-600 transition-colors duration-300 ${pathname === link.href ? 'text-red-600' : ''}`}>
            {link.name}
          </span>
        </Link>
      )}
    </motion.div>
  );
});

NavLinkItem.displayName = 'NavLinkItem';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { openProductModal, openContactModal, showProductModal, showContactModal, closeProductModal, closeContactModal, selectedBrand, selectedCategory, selectedSubcategory } = useModal();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const { totalItems } = useCart();

  const handleScroll = useCallback(() => {
    setIsSticky(window.scrollY > 100);
  }, []);

  useEffect(() => {
    setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setModalStep(selectedBrand || selectedCategory ? 2 : 1);
  }, [selectedBrand, selectedCategory, showProductModal]);

  const backgroundOpacity = isSticky ? 1 : 0;

  const handleBrandSelect = useCallback((brand: string | undefined) => {
    openProductModal(brand, selectedCategory, selectedSubcategory);
    setModalStep(2);
  }, [openProductModal, selectedCategory, selectedSubcategory]);

  const handleProductClick = useCallback((href: string) => {
    closeProductModal();
    const params = new URLSearchParams();
    if (selectedBrand) params.append('brand', selectedBrand);
    if (selectedSubcategory) params.append('subcategory', selectedSubcategory);
    router.push(`${href}?${params.toString()}`);
  }, [closeProductModal, router, selectedBrand, selectedSubcategory]);

  const handleContactClick = useCallback((type: 'whatsapp' | 'phone' | 'email' | 'chat') => {
    closeContactModal();
    switch (type) {
      case 'whatsapp':
        window.open('https://wa.me/+254 748 094055', '_blank', 'noopener,noreferrer');
        break;
      case 'phone':
        window.location.href = 'tel:+254 748 094055';
        break;
      case 'email':
        window.location.href = 'mailto:Gathecha75@gmail.com';
        break;
      case 'chat':
        router.push('/chat');
        break;
    }
  }, [closeContactModal, router]);

  const handleOpenCart = useCallback(() => {
    setShowCartModal(true);
  }, []);

  mobileNavLinks[2].onClick = () => setShowSearchOverlay(true);
  mobileNavLinks[3].onClick = handleOpenCart;
  bottomNavLinks[2].onClick = () => setShowSearchOverlay(true);
  bottomNavLinks[4].onClick = handleOpenCart;

  return (
    <>
      {/* Main Header - Desktop */}
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 hidden lg:block"
        style={{
          background: `rgba(255, 255, 255, ${backgroundOpacity})`,
          backdropFilter: isSticky ? 'blur(10px)' : 'none',
        }}
      >
        <div className={`${isSticky ? 'hidden' : 'block'} border-b bg-black/10 border-white/30 transition-all duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
              {!isSticky && (
                <Link href="/" aria-label="Gathex Autospares Home">
                  <div className="relative">
                    <Image
                      src="/images/logo.jpeg"
                      alt="Gathex Autospares Logo"
                      width={128}
                      height={64}
                      className="h-10 w-auto"
                      priority
                      sizes="(max-width: 1024px) 100vw, 128px"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-0.5 bg-red-600 mt-1"
                    />
                  </div>
                </Link>
              )}

              <nav className="flex items-center" aria-label="Main navigation">
                {topNavLinks.map((link, index) => (
                  <div key={link.name} className="flex items-center">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative group overflow-hidden"
                    >
                      <Link
                        href={link.href!}
                        className={`relative flex items-center space-x-2 px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 z-10 ${
                          pathname === link.href
                            ? 'text-white bg-red-600'
                            : 'text-white hover:border-b'
                        }`}
                        aria-current={pathname === link.href ? 'page' : undefined}
                        aria-label={`Go to ${link.name}`}
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                    {index < topNavLinks.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-px h-6 bg-white/50 mx-2"
                      />
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                {!isSticky && (
                  <motion.button
                    onClick={() => setShowSearchOverlay(true)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 relative group overflow-hidden px-6 py-2.5 text-sm bg-red-600 text-white tracking-wide border border-red-600 transition-all duration-300"
                    aria-label="Open search overlay"
                  >
                    <Search size={16} />
                    <span className="relative z-10">Search Parts</span>
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 bg-red-700"
                    />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-transparent shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              {isSticky && (
                <Link href="/" aria-label="Gathex Autospares Home">
                  <div className="relative">
                    <Image
                      src="/images/logo.png"
                      alt="Gathex Autospares Logo"
                      width={128}
                      height={64}
                      className="h-8 w-auto"
                      priority
                      sizes="(max-width: 1024px) 100vw, 128px"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-0.5 bg-red-600 mt-1"
                    />
                  </div>
                </Link>
              )}

              <div className="flex items-center justify-center flex-1">
                <nav className="flex items-center space-x-4" aria-label="Secondary navigation">
                  {bottomNavLinks.map((link) => (
                    <NavLinkItem
                      key={link.name}
                      link={link}
                      pathname={pathname}
                      onClick={link.name === 'Contact Us' ? () => openContactModal() : link.onClick}
                    />
                  ))}
                </nav>
              </div>

              {isSticky && (
                <motion.button
                  onClick={() => setShowSearchOverlay(true)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 relative group overflow-hidden px-6 py-2.5 text-sm bg-red-600 text-white tracking-wide border border-red-600 transition-all duration-300"
                  aria-label="Open search overlay"
                >
                  <Search size={16} />
                  <span className="relative z-10">Search Parts</span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 bg-red-700"
                  />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <div className="lg:hidden fixed top-4 left-0 right-0 z-40 flex justify-between px-4">
        <motion.button
          onClick={() => setShowMobileMenu(true)}
          initial={{ opacity: 0, scale: 0, left: -100 }}
          animate={{ opacity: 1, scale: 1, left: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1, y: -5, backgroundColor: "#dc2626" }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-white text-red-600 shadow hover:bg-red-600 hover:text-black transition-all duration-300 flex items-center justify-center"
          aria-label="Open mobile menu"
        >
          <FaBars size={16} />
        </motion.button>

        <motion.button
          onClick={() => openContactModal()}
          initial={{ opacity: 0, scale: 0, right: -100 }}
          animate={{ opacity: 1, scale: 1, right: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1, y: -5, backgroundColor: "#dc2626" }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-white text-red-600 shadow hover:bg-red-600 hover:text-black transition-all duration-300 flex items-center justify-center"
          aria-label="Open contact options"
        >
          <FaPhone size={16} />
        </motion.button>
      </div>

      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 border-b"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-around px-0 py-0">
          {mobileNavLinks.slice(0, 2).map((link, index) => (
            <motion.button
              key={link.name}
              onClick={() => router.push(link.href!)}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
              whileTap={{ scale: 0.95 }}
              className={`group flex flex-col items-center gap-1 p-2 text-white hover:text-white transition-colors duration-300 flex-1 ${
                pathname === link.href ? 'bg-red-600 text-white' : ''
              }`}
              aria-label={`Go to ${link.name}`}
            >
              <span className={`text-red-600 group-hover:text-white ${pathname === link.href ? 'text-white' : ''}`}>{link.icon}</span>
              <span className={`text-xs text-red-600 group-hover:text-white transition-colors duration-300 ${pathname === link.href ? 'text-white' : ''}`}>
                {link.name}
              </span>
            </motion.button>
          ))}
          <motion.button
            onClick={() => router.push('/help')}
            whileHover={{ scale: 1.1, backgroundColor: "#dc2626" }}
            whileTap={{ scale: 0.9 }}
            className="mx-2 w-10 h-10 bg-red-600 flex items-center justify-center text-white transition-colors duration-300"
            aria-label="Go to About page"
          >
            <Plus size={24} />
          </motion.button>
          <motion.button
            key={mobileNavLinks[2].name}
            onClick={mobileNavLinks[2].onClick}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-1 p-2 text-white hover:text-white transition-colors duration-300 flex-1"
            aria-label="Open search"
          >
            <span className="text-red-600 group-hover:text-white">{mobileNavLinks[2].icon}</span>
            <span className="text-xs text-red-600 group-hover:text-white transition-colors duration-300">
              {mobileNavLinks[2].name}
            </span>
          </motion.button>
          <motion.button
            key={mobileNavLinks[3].name}
            onClick={handleOpenCart}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-1 p-2 text-white hover:text-white transition-colors duration-300 flex-1"
            aria-label={`Open cart with ${totalItems} items`}
          >
            <span className="relative text-red-600 group-hover:text-white">
              {mobileNavLinks[3].icon}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </span>
            <span className="text-xs text-red-600 group-hover:text-white transition-colors duration-300">
              {mobileNavLinks[3].name}
            </span>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showProductModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-labelledby="product-modal-title"
            aria-modal="true"
          >
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeProductModal}
              aria-hidden="true"
            />
            <motion.div
              className="relative bg-white border border-red-600 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 id="product-modal-title" className="text-3xl font-light tracking-wide text-gray-900">
                  {modalStep === 1 ? 'Select Brand' : 'Select Category'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#dc2626" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeProductModal}
                  className="w-10 h-10 bg-white text-red-600 flex items-center justify-center border border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300"
                  aria-label="Close product modal"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-600">Step {modalStep} of {selectedCategory ? 1 : 2}</span>
                <div className="h-1 bg-gray-200 mt-2">
                  <motion.div
                    className="h-full bg-red-600"
                    initial={{ width: selectedCategory ? '100%' : modalStep === 1 ? '50%' : '100%' }}
                    animate={{ width: selectedCategory ? '100%' : modalStep === 1 ? '50%' : '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {modalStep === 1 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {brands.map((brand, index) => (
                    <motion.button
                      key={brand}
                      onClick={() => handleBrandSelect(brand)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 bg-gray-100 text-gray-900 border border-gray-300 hover:bg-red-100 hover:text-red-600 ${
                        selectedBrand === brand ? 'bg-red-100 text-red-600' : ''
                      }`}
                      aria-label={`Select ${brand} brand`}
                    >
                      {brand}
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={() => handleBrandSelect(undefined)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: brands.length * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-gray-100 text-gray-900 border border-gray-300 hover:bg-red-100 hover:text-red-600 col-span-full md:col-auto"
                    aria-label="Select all brands"
                  >
                    All Brands
                  </motion.button>
                </div>
              ) : (
                <>
                  {!selectedCategory && (
                    <motion.button
                      onClick={() => setModalStep(1)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-4 text-sm text-red-600 hover:underline"
                      aria-label="Go back to brand selection"
                    >
                      Back to Brand Selection
                    </motion.button>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    {productCategories.map((product, index) => (
                      <motion.button
                        key={product.id}
                        onClick={() => handleProductClick(product.href)}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ y: -2, backgroundColor: "#fee2e2" }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative overflow-hidden bg-white border border-red-600 p-6 transition-all duration-300 text-left ${
                          selectedCategory === product.category ? 'bg-red-50' : ''
                        }`}
                        aria-label={`Shop ${product.title}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-white flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                            <span className="text-red-600 group-hover:text-white">{product.icon}</span>
                          </div>
                          <FaChevronRight className="w-5 h-5 text-gray-900 group-hover:text-red-600" />
                        </div>

                        <h3 className="text-xl text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                          {product.title}
                        </h3>
                        <p className="text-gray-700 mb-4 text-sm">
                          {product.description}
                        </p>

                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <FaStar className="w-3 h-3 text-red-600" />
                              <span className="text-xs text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <motion.div
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          className="absolute inset-0 bg-red-600 -z-10 opacity-10"
                        />
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-labelledby="mobile-menu-title"
            aria-modal="true"
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileMenu(false)}
              aria-hidden="true"
            />
            <motion.div
              className="absolute top-0 left-0 w-80 h-full bg-white border-r border-red-600 shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 id="mobile-menu-title" className="sr-only">Mobile Menu</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-gray-100"
                    aria-label="Close mobile menu"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>
                
                <nav className="space-y-6 mt-8" aria-label="Mobile navigation">
                  {topNavLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link
                        href={link.href!}
                        className={`flex items-center space-x-2 text-gray-800 hover:text-red-600 transition-all duration-300 text-lg font-light tracking-wide group border-b border-red-600 pb-2 ${
                          pathname === link.href ? 'text-red-600' : ''
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                        aria-current={pathname === link.href ? 'page' : undefined}
                        aria-label={`Go to ${link.name}`}
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowSearchOverlay(true);
                    }}
                    className="w-full text-left py-3 px-4 text-lg bg-red-600 text-white hover:bg-red-700 transition-colors mt-4 flex items-center gap-2"
                    aria-label="Open search"
                  >
                    <Search size={16} />
                    Search Parts
                  </button>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center lg:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-labelledby="contact-modal-title"
            aria-modal="true"
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={closeContactModal}
              aria-hidden="true"
            />
            <motion.div
              className="relative bg-white w-full max-w-md mb-20 lg:mb-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 id="contact-modal-title" className="text-gray-900 text-lg tracking-wide">
                    Get in Touch
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#dc2626" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeContactModal}
                    className="w-10 h-10 bg-white text-red-600 flex items-center justify-center border border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300"
                    aria-label="Close contact modal"
                  >
                    <FaTimes className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="space-y-3">
                  <motion.button
                    onClick={() => handleContactClick('whatsapp')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-red-600/10 transition-colors border-b border-red-600"
                    whileHover={{ x: 5 }}
                    aria-label="Contact via WhatsApp"
                  >
                    <div className="p-2 bg-green-100 text-green-600">
                      <FaWhatsapp size={20} />
                    </div>
                    <span className="text-gray-900">WhatsApp</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleContactClick('phone')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-red-600/10 transition-colors border-b border-red-600"
                    whileHover={{ x: 5 }}
                    aria-label="Contact via Phone"
                  >
                    <div className="p-2 bg-blue-100 text-blue-600">
                      <FaPhone size={20} />
                    </div>
                    <span className="text-gray-900">Phone Call</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleContactClick('email')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-red-600/10 transition-colors border-b border-red-600"
                    whileHover={{ x: 5 }}
                    aria-label="Contact via Email"
                  >
                    <div className="p-2 bg-red-100 text-red-600">
                      <FaEnvelope size={20} />
                    </div>
                    <span className="text-gray-900">Email</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleContactClick('chat')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-red-600/10 transition-colors"
                    whileHover={{ x: 5 }}
                    aria-label="Start live chat"
                    rel="nofollow"
                  >
                    <div className="p-2 bg-yellow-100 text-yellow-600">
                      <FaStar size={20} />
                    </div>
                    <span className="text-gray-900">Not Sure? Chat Now!</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartModal isOpen={showCartModal} onClose={() => setShowCartModal(false)} />
      <SearchOverlay isOpen={showSearchOverlay} onClose={() => setShowSearchOverlay(false)} />
    </>
  );
}