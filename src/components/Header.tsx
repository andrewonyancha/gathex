'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GiMoneyStack } from "react-icons/gi";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaEnvelope, 
  FaCar,  
  FaShip,
  FaBars,
  FaTimes,
  FaPlus,
  FaStar,
  FaChevronRight,
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaBlog,
  
} from 'react-icons/fa';
import { BookCopy } from 'lucide-react';
import { BiCart } from 'react-icons/bi';

type NavLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type LoanProduct = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  href: string;
  ctaText: string;
};

const topNavLinks: NavLink[] = [
  { name: 'Home', href: '/', icon: <FaHome size={16} /> },
  { name: 'About Us', href: '/about', icon: <FaInfoCircle size={16} /> },
  { name: 'Help Center', href: '/help', icon: <FaQuestionCircle size={16} /> },
  { name: 'Blog', href: '/blog', icon: <FaBlog size={16} /> },
];

const loanProducts: LoanProduct[] = [
  {
    id: 'car-financing',
    title: 'Car Financing',
    description: 'Get your dream car with flexible payment plans',
    features: ['Low interest rates', 'Quick approval', 'Flexible terms'],
    icon: <FaCar size={14} />,
    href: '/loans/car-financing',
    ctaText: 'Apply for Car Loan'
  },
  {
    id: 'logbook-loans',
    title: 'Log Book Loans',
    description: 'Use your vehicle as security for instant cash',
    features: ['Keep your car', 'Same day approval', 'Competitive rates'],
    icon: <BookCopy size={14} />,
    href: '/loans/log-book-loans',
    ctaText: 'Get Instant Cash'
  },
  {
    id: 'buyoff-loans',
    title: 'Buy Off Loans',
    description: 'Transfer your loan to us for better terms',
    features: ['Lower rates', 'Better terms', 'Easy process'],
    icon: <BiCart size={16} />,
    href: '/loans/buy-off-loans',
    ctaText: 'Transfer Your Loan'
  },
  {
    id: 'import-duty',
    title: 'Import Duty Clearance',
    description: 'Finance your import duty payments easily',
    features: ['Fast processing', 'Competitive rates', 'Expert support'],
    icon: <FaShip size={14} />,
    href: '/loans/import-duty-clearance',
    ctaText: 'Clear Import Duty'
  }
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileContact, setShowMobileContact] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundOpacity = isSticky ? 1 : 0;

  const handleLoanProductClick = (href: string) => {
    setShowLoanModal(false);
    router.push(href);
  };

  const handleContactClick = (type: 'whatsapp' | 'phone' | 'email') => {
    setShowMobileContact(false);
    switch (type) {
      case 'whatsapp':
        window.open('https://wa.me/your-number', '_blank');
        break;
      case 'phone':
        window.location.href = 'tel:+your-number';
        break;
      case 'email':
        window.location.href = 'mailto:info@yourcompany.com';
        break;
    }
  };

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
        {/* Top Section - Hidden when sticky */}
        <div className={`${isSticky ? 'hidden' : 'block'} border-b border-white/30 transition-all duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
              {/* Logo - Hidden when sticky */}
              {!isSticky && (
                <Link href="/" className="flex items-center">
                  <div className="relative">
                    <div className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white">
                      KARVENTURE
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="mt-1"
                    />
                  </div>
                </Link>
              )}

              {/* Desktop Top Navigation */}
              <nav className="flex items-center">
                {topNavLinks.map((link, index) => (
                  <div key={link.name} className="flex items-center">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative group overflow-hidden"
                    >
                      <Link
                        href={link.href}
                        className={`relative flex items-center space-x-2 px-4 py-2 text-sm font-light tracking-wide transition-all duration-500 z-10 ${
                          pathname === link.href
                            ? 'text-white'
                            : 'text-white hover:text-orange-500'
                        }`}
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: pathname === link.href ? 0 : "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0 bg-orange-500 -z-10"
                        />
                      </Link>
                    </motion.div>
                    {index < topNavLinks.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        className="w-px h-6 bg-orange-500 mx-2"
                      />
                    )}
                  </div>
                ))}
              </nav>

              {/* Get Loan Button - Hidden when sticky */}
              {!isSticky && (
                <motion.button
                  onClick={() => setShowLoanModal(true)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 relative group overflow-hidden px-6 py-2.5 text-sm bg-orange-500 text-white tracking-wide border border-orange-500 transition-all duration-500"
                >
                  <GiMoneyStack size={16} />
                  <span className="relative z-10">Get A Loan</span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-orange-600"
                  />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section - Sticks to top when scrolling */}
        <div className="bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              {/* Logo - Visible only when sticky */}
              {isSticky && (
                <Link href="/" className="flex items-center">
                  <div className="relative">
                    <div className="text-xl font-light tracking-[0.2em] text-gray-800">
                      KARVENTURE
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="h-0.5 bg-orange-500 mt-1"
                    />
                  </div>
                </Link>
              )}

              <div className="flex items-center justify-center flex-1">
                <div className="flex items-center space-x-4">
                  {loanProducts.map((product, index) => (
                    <motion.button
                      key={product.id}
                      onClick={() => handleLoanProductClick(product.href)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                      whileHover={{ y: -2, backgroundColor: "yellow" }}
                      className="group flex items-center space-x-2 px-4 py-2 bg-[yellow] transition-all duration-300"
                    >
                      <span className="text-[red] group-hover:text-black">{product.icon}</span>
                      <span className="text-sm   text-[red] group-hover:text-black transition-colors duration-300">
                        {product.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Get Loan Button - Visible only when sticky */}
              {isSticky && (
                <motion.button
                  onClick={() => setShowLoanModal(true)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 relative group overflow-hidden px-6 py-2.5 text-sm bg-orange-500 text-white   tracking-wide border border-orange-500 transition-all duration-500"
                >
                  <GiMoneyStack size={16} />
                  <span className="relative z-10">Get A Loan</span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-orange-600"
                  />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Floating Buttons */}
      <div className="lg:hidden fixed top-4 left-0 right-0 z-40 flex justify-between px-4">
        <motion.button
          onClick={() => setShowMobileMenu(true)}
          initial={{ 
            opacity: 0, 
            scale: 0,
            left: -100
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            left: 0
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          whileHover={{ 
            scale: 1.1,
            y: -5,
            backgroundColor: "#f97316"
          }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-white text-orange-500 shadow hover:bg-orange-500 hover:text-black transition-all duration-500 flex items-center justify-center"
        >
          <FaBars size={16} />
        </motion.button>

        <motion.button
          onClick={() => setShowMobileContact(true)}
          initial={{ 
            opacity: 0, 
            scale: 0,
            right: -100
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            right: 0
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          whileHover={{ 
            scale: 1.1,
            y: -5,
            backgroundColor: "#f97316"
          }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-white text-orange-500 shadow hover:bg-orange-500 hover:text-black transition-all duration-500 flex items-center justify-center"
        >
          <FaPhone size={16} />
        </motion.button>
      </div>

      {/* Mobile Bottom Loan Products */}
      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white shadow"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex items-center justify-around px-2 py-3">
          {loanProducts.slice(0, 2).map((product, index) => (
            <motion.button
              key={product.id}
              onClick={() => handleLoanProductClick(product.href)}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center gap-1 p-2 text-white hover:text-white transition-colors duration-300 rounded flex-1"
            >
              <span className="text-orange-500 group-hover:text-white">{product.icon}</span>
              <span className="text-xs   text-orange-500 group-hover:text-white transition-colors duration-300">
                {product.title.split(' ')[0]}
              </span>
            </motion.button>
          ))}
          <motion.button
            onClick={() => setShowLoanModal(true)}
            whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
            whileTap={{ scale: 0.9 }}
            className="mx-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white transition-colors duration-300"
          >
            <FaPlus size={16} />
          </motion.button>
          {loanProducts.slice(2).map((product, index) => (
            <motion.button
              key={product.id}
              onClick={() => handleLoanProductClick(product.href)}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: (index + 2) * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center gap-1 p-2 text-white hover:text-white transition-colors duration-300 rounded flex-1"
            >
              <span className="text-orange-500 group-hover:text-white">{product.icon}</span>
              <span className="text-xs   text-orange-500 group-hover:text-white transition-colors duration-300">
                {product.title.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Loan Products Modal */}
      <AnimatePresence>
        {showLoanModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowLoanModal(false)}
            />
            <motion.div
              className="relative bg-white border border-orange-500 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-light tracking-wide text-gray-900"
                >
                  Choose Your Loan
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowLoanModal(false)}
                  className="w-10 h-10 bg-red text-white flex items-center justify-center border border-black hover:bg-orange-500 transition-colors duration-300"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {loanProducts.map((product, index) => (
                  <motion.button
                    key={product.id}
                    onClick={() => handleLoanProductClick(product.href)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    whileHover={{ y: -2, backgroundColor: "#fff7ed" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden bg-white border border-orange-500 p-6 transition-all duration-500 text-left"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-white flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                        <span className="text-white">{product.icon}</span>
                      </div>
                      <FaChevronRight className="w-5 h-5 text-gray-900 group-hover:text-orange-500" />
                    </div>

                    <h3 className="text-xl   text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-gray-700 mb-4 text-sm">
                      {product.description}
                    </p>

                    <div className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <FaStar className="w-3 h-3 text-orange-500" />
                          <span className="text-xs text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      className="absolute inset-0 bg-orange-500 -z-10 opacity-10"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              className="absolute top-0 left-0 w-80 h-full bg-white border-r border-orange-500 shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>
                
                <nav className="space-y-6 mt-8">
                  {topNavLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center space-x-2 text-gray-800 hover:text-orange-500 transition-all duration-300 text-lg font-light tracking-wide group border-b border-orange-500 pb-2 ${
                          pathname === link.href ? 'text-orange-500' : ''
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowLoanModal(true);
                    }}
                    className="w-full text-left py-3 px-4 text-lg   bg-orange-500 text-white hover:bg-orange-600 transition-colors mt-4 flex items-center gap-2"
                  >
                    <GiMoneyStack size={16} />
                    Get a Loan
                  </button>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Contact Modal */}
      <AnimatePresence>
        {showMobileContact && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileContact(false)}
            />
            <motion.div
              className="relative bg-white border border-orange-500 w-full max-w-md mb-20"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-900 text-lg   tracking-wide"
                  >
                    Get in Touch
                  </motion.h3>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#f97316" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMobileContact(false)}
                    className="w-10 h-10 bg-white text-red flex items-center justify-center border border-black hover:bg-orange-500 transition-colors duration-300"
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
                    className="w-full flex items-center gap-4 p-4 hover:bg-orange-500/10 transition-colors border-b border-orange-500"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-green-100 text-green-600">
                      <FaWhatsapp size={20} />
                    </div>
                    <span className="  text-gray-900">WhatsApp</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleContactClick('phone')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-orange-500/10 transition-colors border-b border-orange-500"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-blue-100 text-blue-600">
                      <FaPhone size={20} />
                    </div>
                    <span className="  text-gray-900">Phone Call</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleContactClick('email')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-orange-500/10 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-orange-100 text-orange-600">
                      <FaEnvelope size={20} />
                    </div>
                    <span className="  text-gray-900">Email</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}