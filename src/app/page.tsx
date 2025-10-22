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

interface Product {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  image: string;
  category: string;
  subcategory: string;
}

interface HeroSlide {
  title: string;
  subtitle: string;
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

const HERO_DESKTOP_IMAGES = [
  '/images/hero6.jpg',
  '/images/mazda.jpg',
  '/images/mercedes.jpg',
  '/images/hero.jpg',
  '/images/vw.jpg',
  '/images/hyndai.jpg',
  '/images/subaru1.jpg',
];

const HERO_MOBILE_IMAGES = [
  '/images/toyot.jpg',
  '/images/mazda1.jpg',
  '/images/3.jpg',
  '/images/audi1.jpg',
  '/images/vwm.jpg',
  '/images/hyu.jpg',
  '/images/sub.jpg',
];

const PRODUCT_IMAGES = [
  '/images/engine.jpg',
  '/images/steer.jpg',
  '/images/break.jpg',
  '/images/light.jpg',
];

const ABOUT_IMAGE = '/images/about.jpeg';
const HELP_IMAGE = '/images/contact.jpg';

const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 animate-pulse" aria-hidden="true" />,
});

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
    const handleShopClick = useCallback(() => onShopClick?.(), [onShopClick]);
    const handleContactClick = useCallback(() => onContactClick?.(), [onContactClick]);

    return (
      <section
        className="py-8 md:py-12 bg-white overflow-hidden"
        role="region"
        aria-labelledby={`section-${title.replace(/\s+/g, '-')}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`grid lg:grid-cols-2 gap-4 md:gap-6 items-end ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
              className={`${isReversed ? 'lg:col-start-2' : ''} h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] relative`}
            >
              <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
              <Image
                src={image}
                alt={`${title} auto parts for small cars in Kenya${subcategory ? ` - ${subcategory}` : ''}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={isReversed && title === 'Engine Parts'}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
              className={`${isReversed ? 'lg:col-start-1 lg:mr-[-30px]' : 'lg:ml-[-30px]'} h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] flex flex-col justify-end relative z-20 mt-[35%] md:mt-[-60px] w-full max-w-[95%] mx-auto lg:max-w-none`}
            >
              <div className="bg-gray-100 p-4 md:p-6 lg:p-7 text-black">
                <div className="h-1.5 bg-red-600 mb-3 md:mb-4 w-12" />

                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-red-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2
                    id={`section-${title.replace(/\s+/g, '-')}`}
                    className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-black"
                  >
                    {title}
                  </h2>
                </div>

                <p className="text-black text-sm md:text-base mb-4 md:mb-5 leading-relaxed" data-subcategory={subcategory}>
                  {description}
                </p>

                {features && (
                  <div className="space-y-2 mb-4 md:mb-5">
                    {features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="text-black text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {stats && (
                  <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-5">
                    {stats.map((stat: { value: string; label: string }, idx: number) => (
                      <div key={idx}>
                        <div className="text-lg md:text-xl font-bold text-red-600 mb-1">{stat.value}</div>
                        <div className="text-black text-sm md:text-base">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {supportItems && (
                  <div className="space-y-3 mb-4 md:mb-5">
                    {supportItems.map(
                      (item: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }, idx: number) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-black font-medium mb-0.5 text-sm md:text-base">{item.title}</h3>
                            <p className="text-black text-sm md:text-base">{item.desc}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={handleShopClick}
                    className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 font-medium tracking-wide transition-all duration-300 hover:bg-red-500 flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Shop ${title}${subcategory ? ` - ${subcategory}` : ''}`}
                  >
                    <span>{shopText}</span>
                    <Play className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={handleContactClick}
                    className="border border-red-600 text-red-600 px-4 py-2 md:px-6 md:py-3 font-medium tracking-wide transition-all duration-300 hover:bg-red-600 hover:text-white flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label={`Contact us about ${title}${subcategory ? ` - ${subcategory}` : ''}`}
                  >
                    <span>{contactText}</span>
                    <RiCustomerService2Fill className="w-5 h-5 text-red-600 hover:text-white" />
                  </button>
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

const HeroSectionComponent = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { openProductModal, openContactModal } = useModal();

  const handleProductClick = useCallback(
    (title: string) => openProductModal(title.replace(' Car Parts', '')),
    [openProductModal],
  );
  const handleContactClick = useCallback(() => openContactModal(), [openContactModal]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
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
        <link
          rel="preload"
          href={isMobile ? heroSlides[0].mobileImage : heroSlides[0].desktopImage}
          as="image"
        />
      </Head>
      <section
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
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

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:-mb-[10%] mb-[20%] items-center">
              <AnimatePresence mode="wait">
                {heroSlides.map((slide, index) => (
                  index === currentSlide && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.5 }}
                      className={`text-left ${isMobile ? 'max-w-md mx-auto text-center' : 'max-w-xl'}`}
                    >
                      {isMobile ? (
                        <>
                          <div className="flex justify-center mb-4 bg-white/20 p-1">
                            <Image
                              src="/images/logo.png"
                              alt="Gathex Autospares Logo"
                              width={128}
                              height={64}
                              className="h-24 w-auto"
                              priority
                            />
                          </div>

                          <h1
                            id="hero-section"
                            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-snug tracking-tight"
                          >
                            {slide.title}
                          </h1>
                          <p className="text-white text-sm md:text-base mb-4 leading-relaxed">{slide.description}</p>
                          <button
                            onClick={() => handleProductClick(slide.title)}
                            className="bg-red-600/80 text-white px-6 py-3 font-medium tracking-wide transition-all duration-300 hover:bg-red-500 flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                            aria-label={slide.cta}
                          >
                            <span>{slide.cta}</span>
                            <Play className="w-5 h-5 text-white" />
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="h-1.5 bg-red-600 mb-12 w-16" />
                          <h1
                            id="hero-section"
                            className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 leading-tight tracking-tight"
                          >
                            {slide.title}
                          </h1>
                          <p className="text-white text-base mb-6 leading-relaxed max-w-lg">{slide.description}</p>
                          <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                              onClick={() => handleProductClick(slide.title)}
                              className="bg-white px-6 py-3 md:px-8 md:py-4 font-medium tracking-wide transition-all duration-300 hover:bg-red-500 flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                              aria-label={slide.cta}
                            >
                              <span>{slide.cta}</span>
                              <Play className="w-5 h-5" />
                            </button>
                            <button
                              onClick={handleContactClick}
                              className="border border-white text-white px-6 py-3 md:px-8 md:py-4 font-medium tracking-wide transition-all duration-300 hover:bg-red-600 hover:text-white flex items-center justify-center space-x-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                              aria-label="Contact Us"
                            >
                              <span>Contact Us</span>
                              <RiCustomerService2Fill className="w-5 h-5 text-white" />
                            </button>
                          </div>
                          <div className="text-red-600 text-sm md:text-base font-medium tracking-wider">
                            {slide.stats}
                          </div>
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
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === currentSlide ? 'bg-red-600' : 'bg-white/50 hover:bg-white/70'
                }`}
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

export default function LandingPage() {
  const { openProductModal, openContactModal } = useModal();

  const products: Product[] = [
    {
      title: 'Engine Parts',
      description: 'Keep your car running smoothly with quality engine parts',
      features: ['Engines', 'Gearboxes', 'Clutches', 'Timing Belts', 'Turbo Kits', 'Drive Shafts'],
      icon: FaTools,
      href: '/products/engine-parts',
      image: PRODUCT_IMAGES[0],
      category: 'engine-parts',
      subcategory: 'engine',
    },
    {
      title: 'Brake & Steering Parts',
      description: 'Stay safe on the road with reliable brake and steering parts',
      features: ['Brake Pads', 'Steering Racks', 'Brake Discs', 'Tie Rods', 'Brake Shoes', 'Steering Pumps'],
      icon: FaCar,
      href: '/products/brake-steering',
      image: PRODUCT_IMAGES[1],
      category: 'brake-steering',
      subcategory: 'brake-steering',
    },
    {
      title: 'Suspension & Body Parts',
      description: 'Ride smoothly and look great with quality suspension and body parts.',
      features: ['Shock Absorbers', 'Control Arms', 'Body Panels', 'Springs', 'Bumpers', 'Performance Shocks'],
      icon: FaTachometerAlt,
      href: '/products/suspension-body',
      image: PRODUCT_IMAGES[2],
      category: 'suspension-body',
      subcategory: 'suspension-body',
    },
    {
      title: 'Electrical & Light Parts',
      description: 'Power up and light the way with dependable electrical and lighting parts',
      features: ['Batteries', 'Headlights', 'Sensors', 'Alternators', 'LED Lights', 'Starters'],
      icon: FaLightbulb,
      href: '/products/electrical-light',
      image: PRODUCT_IMAGES[3],
      category: 'electrical-light',
      subcategory: 'electrical-light',
    },
  ];

  const aboutSection = {
    title: 'About Gathex Autospares',
    description:
      'Gathex Autospares is a reliable provider of high-quality, original, and affordable auto parts for small vehicles. Conveniently located along Kirinyaga Road, Nairobi, we offer countrywide delivery.',
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
          onContactClick={openContactModal}
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
        onContactClick={openContactModal}
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
        onContactClick={openContactModal}
        shopText="Visit Help Center"
        contactText="Contact Us"
      />
    </div>
  );
}