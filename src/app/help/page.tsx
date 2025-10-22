'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import { useModal } from '@/components/ModalContext';

export default function HelpCenter() {
  const { openContactModal } = useModal();

  const helpSection = {
    title: "Help Center",
    description: "Find answers to common questions or get in touch with our team for personalized assistance.",
    icon: CheckCircle,
    faqs: [
      { title: "Order Tracking", desc: "Track your order status online in real-time." },
      { title: "Returns Policy", desc: "Hassle-free returns within 30 days." },
      { title: "Part Compatibility", desc: "Free checks to ensure the right fit." },
      { title: "Delivery Options", desc: "Countrywide delivery within 24 hours." },
      { title: "Payment Methods", desc: "Secure payments via card, mobile, or cash." },
      { title: "Warranty Information", desc: "Up to 6 months on select parts." }
    ],
    contactImages: [
      { src: "/images/hero6.jpg", alt: "WhatsApp", icon: FaWhatsapp, action: "whatsapp" },
      { src: "/images/hero6.jpg", alt: "Phone Call", icon: Phone, action: "phone" },
      { src: "/images/hero6.jpg", alt: "Email", icon: Mail, action: "email" },
      { src: "/images/hero6.jpg", alt: "Not Sure? Chat Now!", icon: MessageCircle, action: "chat" }
    ]
  };

  const handleContactAction = (action: string) => {
    switch (action) {
      case "whatsapp":
        window.open("https://wa.me/+254123456789", "_blank");
        break;
      case "phone":
        window.location.href = "tel:+254123456789";
        break;
      case "email":
        window.location.href = "mailto:support@gathexautospares.com";
        break;
      case "chat":
        window.location.href = "/live-chat";
        break;
      default:
        break;
    }
  };

  const ContentSection = ({
    title,
    description,
    faqs,
    contactImages,
    icon: Icon,
  }: {
    title: string;
    description: string;
    faqs: { title: string; desc: string }[];
    contactImages: { src: string; alt: string; icon: React.ComponentType<{ className?: string }>; action: string }[];
    icon: React.ComponentType<{ className?: string }>;
  }) => {
    return (
      <section className="py-8 md:py-12 md:px-12 overflow-hidden" role="region" aria-labelledby={`section-${title.replace(/\s+/g, '-')}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="grid grid-cols-2 gap-4 relative z-30 lg:mt-[-40px]"
            >
              <div className="space-y-4 lg:pt-0">
                {contactImages.slice(0, 2).map((img, idx) => (
                  <div key={idx} className="aspect-square relative overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <motion.button
                        onClick={() => handleContactAction(img.action)}
                        whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/70 text-red-600 px-4 py-2 font-medium tracking-wide transition-all duration-300 hover:bg-red-500 hover:text-white text-sm flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-red-600"
                        aria-label={img.alt}
                      >
                        <img.icon className="w-4 h-4 text-red-600 hover:text-white transition-colors duration-300" />
                        <span className="hover:text-white transition-colors duration-300">{img.alt}</span>
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-8 lg:pt-12">
                {contactImages.slice(2, 4).map((img, idx) => (
                  <div key={idx} className="aspect-square relative overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <motion.button
                        onClick={() => handleContactAction(img.action)}
                        whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/70 text-red-600 px-4 py-2 font-medium tracking-wide transition-all duration-300 hover:bg-red-500 hover:text-white text-sm flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-red-600"
                        aria-label={img.alt}
                      >
                        <img.icon className="w-4 h-4 text-red-600 hover:text-white transition-colors duration-300" />
                        <span className="hover:text-white transition-colors duration-300">{img.alt}</span>
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="lg:ml-[-30px] relative z-20 mt-[-40px] md:mt-[-60px] w-full max-w-[95%] mx-auto lg:max-w-none"
            >
              <div className="p-4 md:p-6 lg:p-7 text-black">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "50px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
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
                
                <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-5">
                  {faqs.map((faq, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + 0.5 }}
                      className="flex items-center space-x-2"
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 0.6, delay: idx * 0.1 + 0.7 }}
                      >
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-red-600 flex-shrink-0" />
                      </motion.div>
                      <div>
                        <h3 className="text-black font-medium mb-0.5 text-sm md:text-base">{faq.title}</h3>
                        <p className="text-black text-xs md:text-sm">{faq.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 relative">
                  <motion.button
                    onClick={openContactModal}
                    whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-red-600 text-red-600 px-4 py-2 font-medium tracking-wide transition-all duration-300 hover:bg-red-600 hover:text-white flex items-center justify-center space-x-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label="Contact Us"
                  >
                    <span className="hover:text-white transition-colors duration-300">Contact Us</span>
                    <Phone className="w-4 h-4 text-red-600 hover:text-white transition-colors duration-300" />
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
      <section className="relative h-60">
        <div className="absolute inset-0">
          <Image
            src="/images/hero6.jpg"
            alt="Gathex Autospares Help Center Background"
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
            <h1 className="text-4xl md:text-5xl font-light text-white mb-2">Help Center</h1>
          </motion.div>
        </div>
      </section>

      <div className="h-8 md:h-12" />

      <ContentSection
        key="help-center-section"
        title={helpSection.title}
        description={helpSection.description}
        faqs={helpSection.faqs}
        contactImages={helpSection.contactImages}
        icon={helpSection.icon}
      />
    </div>
  );
}