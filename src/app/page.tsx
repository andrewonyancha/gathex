'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Head from 'next/head';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTools, FaCar, FaTachometerAlt, FaLightbulb } from 'react-icons/fa';
import { Users, Lightbulb, Play, CheckCircle, MoveDownIcon, Clock } from 'lucide-react';
import { useModal } from '../components/ModalContext';

// Constants
const HERO_DESKTOP_IMAGES = [
  '/images/hero6.webp',
  '/images/mazda.webp',
  '/images/mercedes.webp',
  '/images/hero.webp',
  '/images/vw.webp',
  '/images/hyndai.webp',
  '/images/subaru1.webp',
];

const HERO_MOBILE_IMAGES = [
  '/images/toyot.webp',
  '/images/mazda1.webp',
  '/images/3.webp',
  '/images/audi1.webp',
  '/images/vwm.webp',
  '/images/hyu.webp',
  '/images/sub.webp',
];

const PRODUCT_IMAGES = [
  '/images/engine.webp',
  '/images/steer.webp',
  '/images/break.webp',
  '/images/light.webp',
];

const ABOUT_IMAGE = '/images/about.webp';
const HELP_IMAGE = '/images/contact.webp';
const FALLBACK_IMAGE = '/images/placeholder.webp';

// Types
interface Product {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  image: string;
  category: string;
  subcategory: string;
  keywords: string[];
}

interface HeroSlide {
  title: string;
  description: string;
  cta: string;
  stats: string;
  desktopImage: string;
  mobileImage: string;
}

interface ContentSectionProps {
  title: string;
  description: string;
  features?: string[];
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  image: string;
  isReversed: boolean;
  stats?: { value: string; label: string }[];
  supportItems?: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[];
  onShopClick?: () => void;
  onContactClick?: () => void;
  shopText?: string;
  contactText?: string;
  category?: string;
  subcategory?: string;
}

// Dynamic Imports
const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 animate-pulse" aria-hidden="true" />,
});

// Utility: Debounce function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// ContentSection Component
const ContentSection = memo(
  ({
    title,
    description,
    features,
    icon: Icon,
    image,
    isReversed,
    stats,
    supportItems,
    onShopClick,
    onContactClick,
    shopText = 'Shop Now',
    contactText = 'Contact Us',
    subcategory,
  }: ContentSectionProps) => {
    return (
      <section
        className="py-8 md:py-12 bg-white overflow-hidden will-change-transform"
        role="region"
        aria-labelledby={`section-${title.replace(/\s+/g, '-')}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`grid lg:grid-cols-2 gap-4 md:gap-6 items-end ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-50px' }}
              className={`${isReversed ? 'lg:col-start-2' : ''} h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] relative`}
            >
              <div className="h-full relative overflow-hidden">
                <Image
                  src={image}
                  alt={`${title} auto parts for small cars in Kenya${subcategory ? ` - ${subcategory}` : ''}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover will-change-transform"
                  priority={isReversed && title === 'Engine Parts'}
                  placeholder="blur"
                  blurDataURL={FALLBACK_IMAGE}
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true, margin: '-50px' }}
              className={`${isReversed ? 'lg:col-start-1 lg:mr-[-30px]' : 'lg:ml-[-30px]'} h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] flex flex-col justify-end relative z-20 mt-[35%] md:mt-[-60px] w-full max-w-[95%] mx-auto lg:max-w-none`}
            >
              <div className="bg-gray-100 p-4 md:p-6 lg:p-7 text-black">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '50px' }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-1.5 bg-red-600 mb-3 md:mb-4"
                />

                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                  <motion.div
                    className="w-8 h-8 md:w-9 md:h-9 bg-red-600 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <h2
                    id={`section-${title.replace(/\s+/g, '-')}`}
                    className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-black"
                  >
                    {title}
                  </h2>
                </div>

                <p className="text-black text-sm md:text-base mb-4 md:mb-5 leading-relaxed">{description}</p>

                {features && (
                  <div className="space-y-2 mb-4 md:mb-5">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="text-black text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {stats && (
                  <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-5">
                    {stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="text-lg md:text-xl font-bold text-red-600 mb-1">{stat.value}</div>
                        <div className="text-black text-sm md:text-base">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {supportItems && (
                  <div className="space-y-3 mb-4 md:mb-5">
                    {supportItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-2"
                      >
                        <motion.div
                          className="w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-black font-medium mb-0.5 text-sm md:text-base">{item.title}</h3>
                          <p className="text-black text-sm md:text-base">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  {onShopClick && (
                    <motion.button
                      onClick={onShopClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 font-medium tracking-wide hover:bg-red-500 flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                      aria-label={`Shop ${title}${subcategory ? ` - ${subcategory}` : ''}`}
                    >
                      <span>{shopText}</span>
                      <Play className="w-5 h-5 text-white" />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={onContactClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-red-600 text-red-600 px-4 py-2 md:px-6 md:py-3 font-medium tracking-wide hover:bg-red-600 hover:text-white flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Contact us about ${title}${subcategory ? ` - ${subcategory}` : ''}`}
                  >
                    <span>{contactText}</span>
                    <RiCustomerService2Fill className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  },
);

ContentSection.displayName = 'ContentSection';

// HeroSectionComponent
const HeroSectionComponent = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { openProductModal, openContactModal } = useModal();

  const heroSlides: HeroSlide[] = [
    {
      title: 'Toyota Car Parts',
      description: 'Explore our wide range of genuine Toyota parts for maintenance and repairs.',
      cta: 'Search Toyota Parts',
      stats: 'Starting from KES 500',
      desktopImage: HERO_DESKTOP_IMAGES[0],
      mobileImage: HERO_MOBILE_IMAGES[0],
    },
    // ... other slides (same as original, omitted for brevity)
  ];

  const checkIsMobile = useCallback(
    debounce(() => {
      setIsMobile(window.innerWidth < 768);
    }, 200),
    []
  );

  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [checkIsMobile]);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  return (
    <>
      <Head>
        {heroSlides.map((slide, index) => (
          <link
            key={index}
            rel="preload"
            href={isMobile ? slide.mobileImage : slide.desktopImage}
            as="image"
          />
        ))}
      </Head>
      <section
        className="relative h-screen bg-white overflow-hidden will-change-transform"
        role="banner"
        aria-labelledby="hero-section"
      >
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={isMobile ? heroSlides[currentSlide].mobileImage : heroSlides[currentSlide].desktopImage}
                alt={`${heroSlides[currentSlide].title} in Nairobi, Kenya`}
                fill
                sizes="100vw"
                className="object-cover will-change-transform"
                priority={currentSlide === 0}
                placeholder="blur"
                blurDataURL={FALLBACK_IMAGE}
                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 max-md:bg-black/50 md:bg-gradient-to-r md:from-black md:to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:-mb-[10%] mb-[20%] items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6 }}
                  className={`text-left ${isMobile ? 'max-w-md mx-auto text-center' : 'max-w-xl'}`}
                >
                  {isMobile ? (
                    <>
                      <motion.div className="flex justify-center mb-4 bg-white/20 p-1">
                        <Image
                          src="/images/logo.webp"
                          alt="Gathex Autospares Logo"
                          width={128}
                          height={64}
                          className="h-24 w-auto"
                          priority
                        />
                      </motion.div>
                      <h1
                        id="hero-section"
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-snug tracking-tight"
                      >
                        {heroSlides[currentSlide].title}
                      </h1>
                      <p className="text-white text-sm md:text-base mb-4 leading-relaxed">{heroSlides[currentSlide].description}</p>
                      <motion.button
                        onClick={() => openProductModal(heroSlides[currentSlide].title.replace(' Car Parts', ''))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600/80 text-white px-6 py-3 font-medium tracking-wide hover:bg-red-500 flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                        aria-label={heroSlides[currentSlide].cta}
                      >
                        <span>{heroSlides[currentSlide].cta}</span>
                        <Play className="w-5 h-5 text-white" />
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60px' }}
                        transition={{ duration: 0.6 }}
                        className="h-1.5 bg-red-600 mb-12"
                      />
                      <h1
                        id="hero-section"
                        className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 leading-tight tracking-tight"
                      >
                        {heroSlides[currentSlide].title}
                      </h1>
                      <p className="text-white text-base mb-6 leading-relaxed max-w-lg">{heroSlides[currentSlide].description}</p>
                      <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <motion.button
                          onClick={() => openProductModal(heroSlides[currentSlide].title.replace(' Car Parts', ''))}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white px-6 py-3 md:px-8 md:py-4 font-medium tracking-wide hover:bg-red-500 flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                          aria-label={heroSlides[currentSlide].cta}
                        >
                          <span>{heroSlides[currentSlide].cta}</span>
                          <Play className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          onClick={() => openContactModal()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border border-white text-white px-6 py-3 md:px-8 md:py-4 font-medium tracking-wide hover:bg-red-600 hover:text-white flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                          aria-label="Contact Us"
                        >
                          <span>Contact Us</span>
                          <RiCustomerService2Fill className="w-5 h-5 text-white" />
                        </motion.button>
                      </div>
                      <motion.div
                        className="text-red-600 text-sm md:text-base font-medium tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {heroSlides[currentSlide].stats}
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="hidden lg:block" />
            </div>
          </div>

          <div className="absolute bottom-6 left-24 flex space-x-2 z-30">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-red-600' : 'bg-white/50 hover:bg-white/70'
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600/30">
            <motion.div
              className="h-full bg-red-600"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              key={currentSlide}
            />
          </div>
        </div>
      </section>
    </>
  );
});

HeroSectionComponent.displayName = 'HeroSectionComponent';

// Main Landing Page
export default function LandingPage() {
  const { openProductModal, openContactModal } = useModal();

  const products: Product[] = [
    {
      title: 'Engine Parts',
      description: 'Keep your car running smoothly with quality engine parts.',
      features: ['Engines', 'Gearboxes', 'Clutches', 'Timing Belts', 'Turbo Kits', 'Drive Shafts'],
      icon: FaTools,
      href: '/products/engine-parts',
      image: PRODUCT_IMAGES[0],
      category: 'engine-parts',
      subcategory: 'engine',
      keywords: ['auto engine parts', 'gearbox spares', 'performance turbo', 'Nairobi car parts'],
    },
    // ... other products (same as original, omitted for brevity)
  ];

  const aboutSection = {
    title: 'About Gathex Autospares',
    description:
      'Gathex Autospares is a reliable provider of high-quality, original, and affordable auto parts for small vehicles.',
    icon: Users,
    href: '/about',
    image: ABOUT_IMAGE,
    stats: [
      { value: '20+', label: 'Years in Business' },
      { value: '10000+', label: 'Customers Supplied' },
      { value: '95%', label: 'Customer Satisfaction' },
      { value: '24hrs', label: 'Delivery Time' },
    ],
  };

  const helpSection = {
    title: 'Help Center',
    description: 'Our help center is here to assist you with all your auto parts needs.',
    icon: Lightbulb,
    href: '/help',
    image: HELP_IMAGE,
    supportItems: [
      { icon: RiCustomerService2Fill, title: '24/7 Customer Support', desc: 'Call us anytime for parts inquiries' },
      { icon: RiCustomerService2Fill, title: 'Email Support', desc: 'Get compatibility checks via email within 2 hours' },
      { icon: Clock, title: 'Live Chat', desc: 'Instant assistance during business hours' },
    ],
  };

  return (
    <div className="bg-white overflow-hidden">
      <HeroSectionComponent />
      <div className="h-8 md:h-12" />
      {products.map((product, index) => (
        <ContentSection
          key={product.title}
          title={product.title}
          description={product.description}
          features={product.features}
          icon={product.icon}
          href={product.href}
          image={product.image}
          isReversed={index % 2 === 0}
          onShopClick={() => openProductModal(undefined, product.category, product.subcategory)}
          onContactClick={() => openContactModal()}
          shopText="Shop Now"
          contactText="Contact Us"
          category={product.category}
          subcategory={product.subcategory}
        />
      ))}
      <TestimonialsSection />
      <ContentSection
        title={aboutSection.title}
        description={aboutSection.description}
        icon={aboutSection.icon}
        href={aboutSection.href}
        image={aboutSection.image}
        stats={aboutSection.stats}
        isReversed={true}
        onShopClick={undefined}
        onContactClick={() => openContactModal()}
        shopText="Our Story"
        contactText="Contact Us"
      />
      <ContentSection
        title={helpSection.title}
        description={helpSection.description}
        icon={helpSection.icon}
        href={helpSection.href}
        image={helpSection.image}
        supportItems={helpSection.supportItems}
        isReversed={false}
        onShopClick={undefined}
        onContactClick={() => openContactModal()}
        shopText="Visit Help Center"
        contactText="Contact Us"
      />
    </div>
  );
}