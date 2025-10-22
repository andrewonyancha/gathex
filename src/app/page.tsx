'use client';

import { useState, useEffect, memo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, MoveDownIcon } from 'lucide-react';
import { useModal } from '../components/ModalContext';

interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  stats: string;
  desktopImage: string;
  mobileImage: string;
}

const HERO_DESKTOP_IMAGES = [
  '/images/hero6.jpg',
  '/images/mazda.jpg',
  '/images/mercedes.jpg',
  '/images/hero.jpg',
  '/images/vw.jpg',
  '/images/hyndai.jpg',
  '/images/subaru.jpg',
];

const HERO_MOBILE_IMAGES = [
  '/images/hero6.jpg',
  '/images/4.jpg',
  '/images/3.jpg',
  '/images/audi.jpg',
  '/images/vwm.jpg',
  '/images/hyu.jpg',
  '/images/subaru.jpg',
];

const HeroSectionComponent = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const { openProductModal, openContactModal } = useModal();

  const pointerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const pointerScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const pointerX = useTransform(scrollYProgress, [0, 0.1], [0, 10]);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const heroSlides: HeroSlide[] = [
    {
      title: 'Toyota Car Parts',
      subtitle: 'Original Toyota Spares',
      description: 'Explore our wide range of genuine Toyota parts, perfect for maintenance and repairs of your vehicle.',
      cta: 'Search Toyota Parts',
      stats: 'Starting from KES 500',
      desktopImage: HERO_DESKTOP_IMAGES[0],
      mobileImage: HERO_MOBILE_IMAGES[0],
    },
    {
      title: 'Mazda Car Parts',
      subtitle: 'Genuine Mazda Spares',
      description: 'Find affordable, high-quality Mazda parts at our store along Kirinyaga Road, Nairobi.',
      cta: 'Search Mazda Parts',
      stats: 'Up to 50% Savings',
      desktopImage: HERO_DESKTOP_IMAGES[1],
      mobileImage: HERO_MOBILE_IMAGES[1],
    },
    {
      title: 'Mercedes Car Parts',
      subtitle: 'Reliable Mercedes Spares',
      description: 'Discover a comprehensive selection of Mercedes parts with expert advice.',
      cta: 'Search Mercedes Parts',
      stats: '1000+ Parts Available',
      desktopImage: HERO_DESKTOP_IMAGES[2],
      mobileImage: HERO_MOBILE_IMAGES[2],
    },
    {
      title: 'Audi Car Parts',
      subtitle: 'Premium Audi Spares',
      description: 'Get top-quality Audi parts with same-day pickup options at our Nairobi store.',
      cta: 'Search Audi Parts',
      stats: 'Same Day Pickup',
      desktopImage: HERO_DESKTOP_IMAGES[3],
      mobileImage: HERO_MOBILE_IMAGES[3],
    },
    {
      title: 'VW Car Parts',
      subtitle: 'Trusted VW Spares',
      description: 'Reliable and affordable VW parts to keep your vehicle running smoothly, available in Nairobi.',
      cta: 'Search VW Parts',
      stats: 'Fast Delivery',
      desktopImage: HERO_DESKTOP_IMAGES[4],
      mobileImage: HERO_MOBILE_IMAGES[4],
    },
    {
      title: 'Hyundai Car Parts',
      subtitle: 'Durable Hyundai Spares',
      description: 'High-performance Hyundai parts for all small vehicle models, available in stock.',
      cta: 'Search Hyundai Parts',
      stats: 'Affordable Prices',
      desktopImage: HERO_DESKTOP_IMAGES[5],
      mobileImage: HERO_MOBILE_IMAGES[5],
    },
    {
      title: 'Subaru Car Parts',
      subtitle: 'Reliable Subaru Spares',
      description: 'Quality Subaru parts for efficient and compact vehicles.',
      cta: 'Search Subaru Parts',
      stats: 'Quick Delivery',
      desktopImage: HERO_DESKTOP_IMAGES[6],
      mobileImage: HERO_MOBILE_IMAGES[6],
    },
  ];

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
        key={`hero-${isMobile}`}
        className="relative h-screen bg-white overflow-hidden"
        role="banner"
        aria-labelledby="hero-section"
      >
        <div className="absolute inset-0 z-0">
          {isImageLoaded ? (
            <AnimatePresence initial={false}>
              {heroSlides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={isMobile ? slide.mobileImage : slide.desktopImage}
                      alt={`${slide.title} in Nairobi, Kenya`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                      onLoadingComplete={() => setIsImageLoaded(true)}
                      onError={() => console.error(`Failed to load image: ${isMobile ? slide.mobileImage : slide.desktopImage}`)}
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          ) : (
            <Image
              src={isMobile ? heroSlides[0].mobileImage : heroSlides[0].desktopImage}
              alt={`${heroSlides[0].title} in Nairobi, Kenya`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              onLoadingComplete={() => setIsImageLoaded(true)}
            />
          )}
          <div className="absolute inset-0 max-md:bg-black/50 md:bg-gradient-to-r md:from-black md:to-transparent" />
        </div>

        <motion.div
          style={{ opacity: pointerOpacity, scale: pointerScale, x: pointerX }}
          className="absolute z-30 right-1/2 top-1/2 -translate-y-1/2 translate-x-8 hidden lg:flex lg:items-center lg:space-x-2"
        >
          <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[16px] border-t-transparent border-b-transparent border-r-white" />
          <div className="w-16 h-0.5 bg-red-600" />
        </motion.div>

        <motion.div
          style={{ opacity: pointerOpacity }}
          className="absolute z-30 left-1/2 top-3/4 -translate-x-1/2 flex flex-col items-center space-y-2 lg:hidden"
        >
          <MoveDownIcon className="w-6 h-6 text-white" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:-mb-[10%] mb-[20%] items-center">
              <AnimatePresence mode="wait">
                {heroSlides.map((slide, index) => (
                  index === currentSlide && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className={`text-left ${isMobile ? 'max-w-md mx-auto text-center' : 'max-w-xl'}`}
                    >
                      {isMobile ? (
                        <>
                          <motion.div
                            className="flex justify-center mb-4 bg-white/20 p-1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                          >
                            <Image
                              src="/images/logo.png"
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
                            {slide.title}
                          </h1>
                          <p className="text-white text-sm md:text-base mb-4 leading-relaxed">{slide.description}</p>
                          <motion.button
                            onClick={() => openProductModal(slide.title.replace(' Car Parts', ''))}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-600/80 text-white px-6 py-3 font-medium tracking-wide transition-all duration-300 hover:bg-red-500 flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                            aria-label={slide.cta}
                          >
                            <span>{slide.cta}</span>
                            <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                              <Play className="w-5 h-5 text-white" />
                            </motion.div>
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60px' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1.5 bg-red-600 mb-12"
                          />
                          <h1
                            id="hero-section"
                            className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 leading-tight tracking-tight"
                          >
                            {slide.title}
                          </h1>
                          <p className="text-white text-base mb-6 leading-relaxed max-w-lg">{slide.description}</p>
                          <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <motion.button
                              onClick={() => openProductModal(slide.title.replace(' Car Parts', ''))}
                              whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-white px-6 py-3 md:px-8 md:py-4 font-medium tracking-wide transition-all duration-300 hover:bg-red-500 flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                              aria-label={slide.cta}
                            >
                              <span>{slide.cta}</span>
                              <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                <Play className="w-5 h-5" />
                              </motion.div>
                            </motion.button>
                            <motion.button
                              onClick={() => openContactModal()}
                              whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
                              whileTap={{ scale: 0.95 }}
                              className="border border-white text-white px-6 py-3 md:px-8 md:py-4 font-medium tracking-wide transition-all duration-300 hover:bg-red-600 hover:text-white flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                              aria-label="Contact Us"
                            >
                              <span>Contact Us</span>
                              <RiCustomerService2Fill className="w-5 h-5 text-white" />
                            </motion.button>
                          </div>
                          <motion.div
                            className="text-red-600 text-sm md:text-base font-medium tracking-wider"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                          >
                            {slide.stats}
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              <div className="hidden lg:block" />
            </div>
          </div>

          <div className="absolute bottom-6 left-24 flex space-x-2 z-30">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === currentSlide ? 'bg-red-600' : 'bg-white/50 hover:bg-white/70'
                }`}
                whileHover={{ scale: 1.2, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
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

export default HeroSectionComponent;