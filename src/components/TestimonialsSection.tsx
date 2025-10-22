'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Gathex provided me with genuine Toyota parts at unbeatable prices. Their service is exceptional and highly professional.",
    author: "Judy Gichohi, Nairobi",
    role: "Car Owner"
  },
  {
    quote: "The staff's expertise helped me find the perfect suspension parts for my Nissan. Truly a reliable source.",
    author: "Otieno Sam, Nairobi",
    role: "Mechanic"
  },
  {
    quote: "Fast delivery and premium quality parts. Gathex is my trusted shop for all Honda spares!",
    author: "Serem William, Nairobi",
    role: "Car Enthusiast"
  }
];

const TestimonialsSection = memo(() => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section
      className="py-12 md:mb-12 mb-4 relative overflow-hidden"
      role="region"
      aria-labelledby="testimonials-heading"
      data-keywords="car parts testimonials Nairobi, Kenya auto spares reviews, customer reviews Gathex Autospares"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero6.jpg"
          alt="Nairobi auto parts testimonials background for Gathex Autospares"
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          priority={false}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10"
          aria-hidden="true"
        />
      </div>
      <div className="relative z-20 container mx-auto px-4 sm:px-6">
        <h2 id="testimonials-heading" className="text-2xl md:text-4xl font-serif font-bold text-center text-white pb-8">
          What Our Clients Say
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            {TESTIMONIALS.map((testimonial, index) => (
              index === currentTestimonial && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 max-w-3xl mx-auto bg-white rounded-xl"
                >
                  <p className="text-black mb-6 font-serif text-base md:text-lg">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.author[0]}
                    </div>
                    <div className="ml-4">
                      <p className="text-black font-semibold text-base md:text-md text-xs">{testimonial.author}</p>
                      <p className="text-black md:text-md text-xs md:text-base">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden md:flex justify-between px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="text-black p-3"
              aria-label="Previous testimonial"
            >
              <Play className="w-12 h-12 text-white shadow rotate-180" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="text-black p-3"
              aria-label="Next testimonial"
            >
              <Play className="w-12 h-12 text-white shadow" />
            </motion.button>
          </div>
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-red-600' : 'bg-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-red-600`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;