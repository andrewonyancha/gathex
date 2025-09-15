'use client';

import { useState, useEffect } from 'react';
import { RiCustomerService2Fill } from "react-icons/ri";
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  DollarSign,
  ClipboardList,
  Truck,
  Users,
  Lightbulb,
  CheckCircle,
  
  Mail,
  Clock,
  ChevronRight,
  Play,
  MoveDownIcon
} from 'lucide-react';
import { Car } from 'lucide-react';

// Type definitions
interface LoanProduct {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  image: string;
}

interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  stats: string;
  image: string;
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
}

// Sample images - replace with your actual images
const HERO_IMAGES = [
  "/images/hero1.jpg",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "/images/hero3.jpg",
  "/images/hero4.jpg"
];

const PRODUCT_IMAGES = [
  "/images/car-loan-1.jpg",
  "/images/logbook-loan.jpg",
  "/images/karventure-post-1.jpg", 
  "/images/CleanShot-2024-02-20-at-21.01.04.webp"   
];

const ABOUT_IMAGE = "/images/car-logbook-loan1.jpg";
const HELP_IMAGE = "/images/help.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Create pointer animation based on scroll
  const pointerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const pointerScale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const pointerX = useTransform(scrollYProgress, [0, 0.1], [0, 10]);
  
  const heroSlides: HeroSlide[] = [
    {
      title: "Drive Your Dreams",
      subtitle: "Car Financing Made Simple",
      description: "Get approved for your dream car with competitive rates and flexible payment terms. No hidden fees, just transparent financing solutions.",
      cta: "Get Car Loan",
      stats: "Starting from 8.5% APR",
      image: HERO_IMAGES[0]
    },
    {
      title: "Instant Cash Solutions",
      subtitle: "Log Book Loans in 24 Hours",
      description: "Use your vehicle as security and get instant cash while keeping your car. Quick approval process with competitive interest rates.",
      cta: "Apply Now",
      stats: "Up to KES 5M Available",
      image: HERO_IMAGES[1]
    },
    {
      title: "Better Loan Terms",
      subtitle: "Transfer Your Existing Loan",
      description: "Switch to Karventure for better interest rates and improved payment terms. Save money with our buy-off loan solutions.",
      cta: "Calculate Savings",
      stats: "Save up to 30% on payments",
      image: HERO_IMAGES[2]
    },
    {
      title: "Import With Ease",
      subtitle: "Duty Clearance Financing",
      description: "Finance your import duty payments with flexible terms. Get your goods cleared faster with our specialized import financing.",
      cta: "Learn More",
      stats: "Fast 48-hour processing",
      image: HERO_IMAGES[3]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative h-screen bg-white overflow-hidden">
      {/* Background Images with Overlay Effect */}
      <div className="absolute inset-0 z-0">
        {/* Base background image - always visible */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSlides[0].image})` }}
        />
        
        {/* Overlay images that cover the base */}
        <AnimatePresence>
          {heroSlides.map((slide, index) => (
            index === currentSlide && index !== 0 && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Black-to-transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Animated Pointer - Desktop horizontal, with solid red */}
      <motion.div
        style={{ 
          opacity: pointerOpacity, 
          scale: pointerScale,
          x: pointerX
        }}
        className="absolute z-30 right-1/2 top-1/2 -translate-y-1/2 translate-x-8 hidden lg:flex lg:items-center lg:space-x-2"
      >
        <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[16px] border-t-transparent border-b-transparent border-r-white" />
        <div className="w-16 h-0.5 bg-red-600" />
      </motion.div>

      {/* Mobile Pointer - Downward with solid red */}
      <motion.div
        style={{ opacity: pointerOpacity }}
        className="absolute z-30 left-1/2 top-3/4 -translate-x-1/2 flex flex-col items-center space-y-2 lg:hidden"
      >
        
        <MoveDownIcon className="w-6 h-6 text-white" />
      </motion.div>

      {/* Content Container - Left Aligned, Transparent */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-5">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text Content - Left Side */}
            <AnimatePresence mode="wait">
              {heroSlides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="text-left max-w-xl"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "60px" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-1.5 bg-orange-500 mb-12"
                    />
                    
                    <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-white mb-2 leading-snug tracking-tight">
                      {slide.title}
                    </h1>
                    
                    <h2 className="text-xl sm:text-xl md:text-xl lg:text-xl font-serif font-bold text-[yellow] mb-4 leading-snug tracking-tight">
                      {slide.subtitle}
                    </h2>
                    
                    <p className="text-white text-base  mb-4 sm:mb-6 leading-relaxed max-w-lg">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-orange-500 text-white px-6 py-1 sm:px-8 sm:py-4 tracking-wide transition-all duration-300 hover:bg-[yellow] hover:text-white flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <span>{slide.cta}</span>
                        <motion.div
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </motion.div>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-red-600 px-6 py-3 sm:px-8 sm:py-4 font-medium tracking-wide transition-all duration-300 hover:bg-[yellow] hover:text-black flex items-center justify-center space-x-2 text-sm sm:text-base lg:text-lg"
                      >
                       
                        <span>Call Now</span> <RiCustomerService2Fill className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 hover:text-black" />
                      </motion.button>
                    </div>
                    
                    <div className="text-[yellow] text-sm  font-medium tracking-wider">
                      {slide.stats}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Right side - Empty space for image background */}
            <div className="hidden lg:block" />
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-8 flex space-x-2 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 transition-all duration-300 ${
                index === currentSlide ? 'bg-orange-500' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Slide Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-700/30">
          <motion.div
            className="h-full bg-[yellow]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            key={currentSlide}
          />
        </div>
      </div>
    </section>
  );
};

const ContentSection = ({
  title,
  description,
  features,
  icon: Icon,
  href,
  image,
  isReversed,
  stats,
  supportItems
}: ContentSectionProps) => {
  const { scrollYProgress } = useScroll();
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const arrowScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const arrowX = useTransform(scrollYProgress, [0, 0.2], [0, isReversed ? -10 : 10]);

  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-5">
        <div className={`grid lg:grid-cols-2 gap-5 md:gap-6 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
          
          {/* Image Container - Aligned left on large screens */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className={`${isReversed ? 'lg:col-start-2' : ''} h-[280px] sm:h-[320px] md:h-[360px] lg:ml-0 relative`}
          >
            {/* Animated Pointer Arrow - Desktop, solid red */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ 
                opacity: arrowOpacity, 
                scale: arrowScale,
                x: arrowX
              }}
              className={`absolute z-30 top-1/2 -translate-y-1/2 hidden lg:flex
                ${isReversed ? 'left-8 md:left-12' : 'right-8 md:right-12'}
                items-center space-x-2`}
            >
              {isReversed ? (
                <>
                  <motion.div
                    initial={{ rotate: 180 }}
                    whileInView={{ rotate: 180 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Play className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
                  </motion.div>
                  <motion.div 
                    className="w-12 md:w-16 h-1 bg-red-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: "48px" }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                  />
                </>
              ) : (
                <>
                  <motion.div 
                    className="w-12 md:w-16 h-1 bg-red-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: "48px" }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Play className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Mobile Pointer - Downward with solid red, moved up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ opacity: arrowOpacity }}
              className={`absolute z-30 left-1/2 top-[80%] -translate-x-1/2 flex flex-col items-center space-y-2 lg:hidden`}
            >
              
              <MoveDownIcon className="w-6 h-6 text-red-600" />
            </motion.div>
            
            <div className="h-full relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          </motion.div>

          {/* Content Container - Overlaps image on mobile */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`${isReversed ? 'lg:col-start-1 lg:mr-[-30px]' : 'lg:ml-[-30px]'} relative z-20 mt-[-40px] md:mt-[-60px] w-full max-w-[95%] mx-auto lg:max-w-none h-[320px] sm:h-[380px] md:h-[420px]`}
          >
            <div className="bg-orange-500 p-4 md:p-6 lg:p-7 text-white h-full overflow-y-auto scrollbar-hide">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="h-1.5 bg-[yellow] mb-3 md:mb-4"
              />
              
              <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-white flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-red-700" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-white">
                  {title}
                </h2>
              </div>
              
              <p className="text-white text-sm md:text-base mb-4 md:mb-5 leading-relaxed">
                {description}
              </p>
              
              {features && (
                <div className="space-y-1 md:space-y-2 mb-4 md:mb-5">
                  {features.map((feature: string, idx: number) => (
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
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[yellow] flex-shrink-0" />
                      </motion.div>
                      <span className="text-white text-xs md:text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {stats && (
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-5">
                  {stats.map((stat: { value: string; label: string }, idx: number) => (
                    <div key={idx}>
                      <div className="text-lg md:text-xl font-light text-[yellow] mb-1">{stat.value}</div>
                      <div className="text-white text-xs md:text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {supportItems && (
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-5">
                  {supportItems.map((item: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-6 h-6 md:w-7 md:h-7 bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="w-3 h-3 md:w-3 md:h-3 text-red-700" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-0.5 text-sm md:text-base">{item.title}</h3>
                        <p className="text-white text-xs md:text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4">
                <motion.a
                  href={href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-red-600 px-3 py-2 md:px-4 md:py-2 font-medium tracking-wide transition-all duration-300 hover:bg-[yellow] hover:text-black flex items-center justify-center space-x-1 text-xs md:text-sm"
                >
                  <span>{features ? 'Apply Now' : (stats ? 'Our Story' : 'Visit Help Center')}</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-red-600 hover:text-black" />
                  </motion.div>
                </motion.a>
                
                <motion.a
                  href={href === '/help' ? "tel:+254700393363" : href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white text-white px-3 py-2 md:px-4 md:py-2 font-medium tracking-wide transition-all duration-300 hover:bg-red-700 hover:text-white flex items-center justify-center space-x-1 text-xs md:text-sm"
                >
                  {href === '/help' ? (
                    <>
                     
                      <span>Call Now</span> <RiCustomerService2Fill className="w-3 h-3 md:w-4 md:h-4 text-white hover:text-white" />
                    </>
                  ) : (
                    <>
                      <span>Learn More</span>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white hover:text-white" />
                      </motion.div>
                    </>
                  )}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const loanProducts: LoanProduct[] = [
    {
      title: "Car Financing",
      description: "Transform your dream of car ownership into reality with our flexible car financing solutions. We offer competitive interest rates, quick approval processes, and payment terms tailored to fit your budget.",
      features: [
        "Interest rates starting from 8.5% APR",
        "Up to 7 years repayment period",
        "Quick 48-hour approval process",
        "No hidden fees or charges",
        "Flexible down payment options"
      ],
      icon: Car,
      href: "/loans/car-financing",
      image: PRODUCT_IMAGES[0]
    },
    {
      title: "Log Book Loans",
      description: "Access instant cash using your vehicle as collateral while continuing to drive it. Our log book loans provide quick financial solutions for emergencies or business opportunities.",
      features: [
        "Keep driving your vehicle",
        "Same-day loan approval",
        "Loan amounts up to KES 5,000,000",
        "Competitive interest rates from 2.5% monthly",
        "Flexible repayment terms"
      ],
      icon: ClipboardList,
      href: "/loans/log-book-loans",
      image: PRODUCT_IMAGES[1]
    },
    {
      title: "Buy Off Loans",
      description: "Switch your existing auto loan to Karventure and enjoy better terms, lower interest rates, and improved monthly payments. Save money while getting better service.",
      features: [
        "Lower interest rates than competitors",
        "Reduced monthly payments",
        "Better customer service",
        "Simplified transfer process",
        "No prepayment penalties"
      ],
      icon: DollarSign,
      href: "/loans/buy-off-loans",
      image: PRODUCT_IMAGES[2]
    },
    {
      title: "Import Duty Clearance",
      description: "Streamline your vehicle importation process with our specialized import duty financing. Get your imported vehicle cleared quickly with our expert support and competitive rates.",
      features: [
        "Fast 48-hour processing",
        "Competitive financing rates",
        "Expert clearance support",
        "Transparent fee structure",
        "Complete documentation assistance"
      ],
      icon: Truck,
      href: "/loans/import-duty-clearance",
      image: PRODUCT_IMAGES[3]
    }
  ];

  const aboutSection = {
    title: "About Karventure",
    description: "We are Kenya's premier automotive financing company, dedicated to making vehicle ownership accessible and affordable for everyone. With over a decade of experience in the financial services industry.",
    icon: Users,
    href: "/about",
    image: ABOUT_IMAGE,
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "5000+", label: "Happy Clients" },
      { value: "98%", label: "Approval Rate" },
      { value: "24hrs", label: "Processing Time" }
    ]
  };

  const helpSection = {
    title: "Help Center",
    description: "Get instant support and answers to your questions. Our comprehensive help center is designed to guide you through every step of your loan journey.",
    icon: Lightbulb,
    href: "/help",
    image: HELP_IMAGE,
    supportItems: [
      { icon: RiCustomerService2Fill, title: "24/7 RiCustomerService2Fill Support", desc: "Call us anytime for immediate assistance" },
      { icon: Mail, title: "Email Support", desc: "Get detailed answers via email within 2 hours" },
      { icon: Clock, title: "Live Chat", desc: "Instant messaging support during business hours" }
    ]
  };

  return (
    <div className="bg-white overflow-hidden">
      <HeroSection />
      {/* Spacer between Hero and Car Financing, matching other sections */}
      <div className="h-8 md:h-12" />
      {/* Loan Products - Perfect Alternating Pattern */}
      {loanProducts.map((product, index) => (
        <ContentSection
          key={product.title}
          title={product.title}
          description={product.description}
          features={product.features}
          icon={product.icon}
          href={product.href}
          image={product.image}
          isReversed={index % 2 === 0}
        />
      ))}
      
      {/* About Section - Should alternate from last loan product (Import Duty) */}
      <ContentSection
        title={aboutSection.title}
        description={aboutSection.description}
        icon={aboutSection.icon}
        href={aboutSection.href}
        image={aboutSection.image}
        stats={aboutSection.stats}
        isReversed={true}
      />
      
      {/* Help Section - Should alternate from About section */}
      <ContentSection
        title={helpSection.title}
        description={helpSection.description}
        icon={helpSection.icon}
        href={helpSection.href}
        image={helpSection.image}
        supportItems={helpSection.supportItems}
        isReversed={false}
      />
    </div>
  );
}