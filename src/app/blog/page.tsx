'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBlog, FaQuestionCircle } from 'react-icons/fa';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Gathex Autospares Blog | Auto Parts News & Tips - Nairobi</title>
        <meta
          name="description"
          content="Stay updated with Gathex Autospares' blog for tips, news, and guides on auto parts for Toyota, Nissan, Honda, and more in Nairobi, Kenya."
        />
        <meta
          name="keywords"
          content="Nairobi auto parts blog, Kenya car parts tips, Gathex Autospares blog, auto repair guides"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.gathexautospares.com/blog" />
      </Head>
      <main role="main" aria-labelledby="blog-heading">
        <section
          className="relative py-24 md:py-32"
          data-keywords="Nairobi auto parts blog, Kenya car parts tips"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero6.jpg"
              alt="Gathex Autospares blog banner featuring auto parts in Nairobi"
              fill
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              priority={true}
            />
            <div
              className="absolute inset-0 bg-black/50 to-transparent z-10"
              aria-hidden="true"
            />
          </div>
          <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
            <motion.h1
              id="blog-heading"
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Gathex Autospares Blog
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your source for auto parts tips, news, and guides in Nairobi, Kenya.
            </motion.p>
          </div>
        </section>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FaBlog className="text-red-600 w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto mb-6">
                Our blog is under construction! Check back soon for expert tips on auto parts, maintenance guides, and more for Kenyan drivers and mechanics.
              </p>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "#b91c1c" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/help"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Visit Help Center for support"
                >
                  <FaQuestionCircle size={16} />
                  Visit Help Center
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}