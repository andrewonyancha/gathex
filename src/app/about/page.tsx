'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Play, CheckCircle } from 'lucide-react';
import { RiCustomerService2Fill } from 'react-icons/ri';
import Image from 'next/image';
import { useModal } from '@/components/ModalContext';

export default function AboutPage() {
  const { openContactModal } = useModal();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const aboutSection = {
    title: "About Gathex Autospares",
    description: "Gathex Autospares is a reliable provider of high-quality, original, and affordable auto parts for small vehicles. Conveniently located along Kirinyaga Road, Nairobi, we offer countrywide delivery.",
    icon: Users,
    href: "/about",
    stats: [
      { value: "20+", label: "Years in Business" },
      { value: "10000+", label: "Customers supplied" },
      { value: "95%", label: "Customer Satisfaction" },
      { value: "24hrs", label: "Delivery Time" }
    ]
  };

  const whyShopSection = {
    title: "Why Shop with Gathex Autospares",
    description: "Choose Gathex Autospares for unbeatable value, convenience, and reliability. Our customer-focused services make car maintenance hassle-free.",
    icon: CheckCircle,
    href: "/products",
    incentives: [
      { title: "Price Match Guarantee", desc: "We match or beat competitor prices for identical parts." },
      { title: "Free Compatibility Check", desc: "Our experts verify part compatibility for your vehicle." },
      { title: "Loyalty Rewards", desc: "Earn points on every purchase for future savings." }
    ]
  };

  const handleShopClick = () => {
    setShowModal(true);
  };

  const handleContactClick = () => {
    openContactModal();
  };

  const handleOptionClick = (option: string) => {
    console.log(`${option} selected`);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ContentSection = ({
    title,
    description,
    stats,
    incentives,
    icon: Icon,
    isReversed,
    image1,
    image2,
  }: {
    title: string;
    description: string;
    stats?: { value: string; label: string }[];
    incentives?: { title: string; desc: string }[];
    icon: React.ComponentType<{ className?: string }>;
    isReversed: boolean;
    image1: string;
    image2: string;
  }) => {
    return (
      <section className="py-8 md:py-12  overflow-hidden" role="region" aria-labelledby={`section-${title.replace(/\s+/g, '-')}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`grid lg:grid-cols-2 gap-4 md:gap-6 items-start ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 relative z-30 lg:mt-[-40px]"
            >
              <div className="space-y-4 md:mt-16">
                <div className="aspect-square relative   overflow-hidden">
                  <Image
                    src={image1}
                    alt={`${title} image 1`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover  "
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8 md:pt-4">
                <div className="aspect-square relative   overflow-hidden">
                  <Image
                    src={image2}
                    alt={`${title} image 2`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover  "
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isReversed ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`${isReversed ? 'lg:col-start-1 lg:mr-[-30px]' : 'lg:ml-[-30px]'} relative z-20 mt-[-40px] md:mt-[-60px] w-full max-w-[95%] mx-auto lg:max-w-none`}
            >
              <div className="bg-gray-100  md:mt-0 p-4 md:p-6 lg:p-7 text-black">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "50px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-1.5 bg-red-600 mb-3 md:mb-4"
                />
                
                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-red-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <h2 id={`section-${title.replace(/\s+/g, '-')}`} className="text-xl md:text-2xl lg:text-3xl font-light text-black">
                    {title}
                  </h2>
                </div>
                
                <p className="text-black text-sm md:text-base mb-4 md:mb-5 leading-relaxed">
                  {description}
                </p>
                
                {stats && (
                  <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-5">
                    {stats.map((stat: { value: string; label: string }, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="text-lg md:text-xl font-light text-red-600 mb-1">{stat.value}</div>
                        <div className="text-black text-xs md:text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {incentives && (
                  <div className="space-y-1 md:space-y-2 mb-4 md:mb-5">
                    {incentives.map((item: { title: string; desc: string }, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -15, scale: 0.8 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileInView={{ rotate: [0, 360] }}
                          transition={{ duration: 0.6, delay: idx * 0.1 + 0.7 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-red-600 flex-shrink-0" />
                        </motion.div>
                        <div>
                          <h3 className="text-black font-medium mb-0.5 text-sm md:text-base">{item.title}</h3>
                          <p className="text-black text-xs md:text-sm">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 relative">
                  <motion.button
                    onClick={handleShopClick}
                    whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 text-white px-4 py-2 font-medium tracking-wide transition-all duration-300 hover:bg-red-500 hover:text-white flex items-center justify-center space-x-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label="Shop"
                  >
                    <span>Shop</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Play className="w-4 h-4 text-white" />
                    </motion.div>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleContactClick}
                    whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-red-600 text-red-600 px-4 py-2 font-medium tracking-wide transition-all duration-300 hover:bg-red-600 hover:text-white flex items-center justify-center space-x-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label="Contact Us"
                  >
                    <span>Contact Us</span>
                    <RiCustomerService2Fill className="w-4 h-4 text-red-600 hover:text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-60">
        <div className="absolute inset-0">
          <Image
            src="/images/hero6.jpg"
            alt="Gathex Autospares Hero Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="w-16 h-1 bg-red-600 mb-4"></div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-2">About Gathex Autospares</h1>
          </motion.div>
        </div>
      </section>

      {/* Spacer to Prevent Overlap */}
      <div className="h-8 md:h-12" />

      {/* Modal for Shop Options */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white   p-6 w-full max-w-sm mx-4"
            >
              <h3 className="text-lg font-medium text-black mb-4">Select Part Type</h3>
              <button
                onClick={() => handleOptionClick('New')}
                className="w-full text-left border border-gray-100 px-4 py-2 text-sm text-black hover:bg-red-600 hover:text-white transition-colors duration-200   mb-2"
                aria-label="Select New Parts"
              >
                New
              </button>
              <button
                onClick={() => handleOptionClick('Ex-Japan')}
                className="w-full text-left px-4 py-2 text-sm text-black border border-gray-100 hover:bg-red-600 hover:text-white transition-colors duration-200   mb-4"
                aria-label="Select Ex-Japan Parts"
              >
                Ex-Japan
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full bg-gray-200 text-black px-4 py-2 text-sm font-medium   hover:bg-gray-300 transition-colors duration-200"
                aria-label="Close Modal"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 1: About Gathex Autospares */}
      <ContentSection
        title={aboutSection.title}
        description={aboutSection.description}
        stats={aboutSection.stats}
        icon={aboutSection.icon}
        isReversed={true}
        image1="/images/about.jpeg"
        image2="/images/engine.jpg"
      />

      {/* Section 2: Why Shop with Gathex Autospares */}
      <ContentSection
        title={whyShopSection.title}
        description={whyShopSection.description}
        incentives={whyShopSection.incentives}
        icon={whyShopSection.icon}
        isReversed={false}
        image1="/images/hero3.jpeg"
        image2="/images/hero4.jpeg"
      />
    </div>
  );
}