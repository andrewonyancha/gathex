'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ChevronRight, Home, Download } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderRef = searchParams.get('ref') || 'ORDER-UNKNOWN';
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  useEffect(() => {
    const generateAndDownloadPDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Order Receipt - Gathex Autospares', 20, 20);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Order Reference: ${orderRef}`, 20, 40);
      doc.text('Thank you for your purchase!', 20, 50);
      doc.text('Items:', 20, 60);
      doc.text('- Engine Block: KSh 1,500 x 1', 30, 70);
      doc.text('Total: KSh 1,500', 20, 90);
      doc.text('Shipping: To be calculated', 20, 100);
      doc.text('Delivery: 3-5 business days', 20, 110);
      doc.save(`receipt_${orderRef}.pdf`);
      setDownloadTriggered(true);
    };

    generateAndDownloadPDF();
  }, [orderRef]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <header className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        <Image
          src="/images/hero6.jpg"
          alt="Order Confirmed Hero"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
        <motion.div
          className="relative z-10 container mx-auto px-4 h-full flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1.5 bg-red-600 mb-4"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-2">
              Order Confirmed!
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Thank you for shopping with Gathex Autospares
            </p>
          </div>
        </motion.div>
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
          <motion.ol
            className="flex items-center gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.li variants={itemVariants}>
              <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors duration-300">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <ChevronRight className="w-4 h-4" />
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link href="/products" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                Products
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <ChevronRight className="w-4 h-4" />
            </motion.li>
            <motion.li variants={itemVariants} className="text-gray-900">
              Order Confirmed
            </motion.li>
          </motion.ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-2xl mx-auto text-center bg-gray-100 p-8 md:p-10 lg:p-12 shadow-lg h-[320px] sm:h-[380px] md:h-[420px] lg:h-auto lg:overflow-visible overflow-y-auto scrollbar-hide"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={itemVariants}>
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2"
          >
            Thank You!
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-sm md:text-base mb-4"
          >
            Your order has been placed successfully.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-500 mb-6"
          >
            Order Reference: <span className="font-semibold text-red-600">{orderRef}</span>
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="space-y-4 mb-8"
          >
            <p className="text-sm md:text-base">
              We&apos;ll send a confirmation email with tracking details soon.
            </p>
            <p className="text-sm md:text-base">
              Estimated delivery: 3-5 business days.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <p className="text-sm md:text-base text-gray-600 mb-2">
              Your receipt is downloading automatically.
            </p>
            {!downloadTriggered && (
              <motion.button
                onClick={() => {
                  const doc = new jsPDF();
                  doc.setFontSize(18);
                  doc.setFont('helvetica', 'bold');
                  doc.text('Order Receipt - Gathex Autospares', 20, 20);
                  doc.setFontSize(12);
                  doc.setFont('helvetica', 'normal');
                  doc.text(`Order Reference: ${orderRef}`, 20, 40);
                  doc.text('Thank you for your purchase!', 20, 50);
                  doc.text('Items:', 20, 60);
                  doc.text('- Engine Block: KSh 1,500 x 1', 30, 70);
                  doc.text('Total: KSh 1,500', 20, 90);
                  doc.text('Shipping: To be calculated', 20, 100);
                  doc.text('Delivery: 3-5 business days', 20, 110);
                  doc.save(`receipt_${orderRef}.pdf`);
                }}
                className="inline-flex items-center gap-1 text-sm md:text-base text-red-600 hover:text-red-500 transition-colors duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </motion.button>
            )}
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/products"
              className="px-6 py-3 bg-red-600 text-white font-medium tracking-wide hover:bg-red-500 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Continue Shopping
              </motion.span>
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 text-gray-900 font-medium tracking-wide hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Back to Home
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}