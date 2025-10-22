'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { ChevronRight, Home, MapPin, Phone, Mail, ShoppingCart, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Dynamically import PaystackButton with SSR disabled
const PaystackButton = dynamic(
  () => import('@makozi/paystack-react-pay').then((mod) => mod.PaystackButton),
  { ssr: false }
);

// Form validation schema
const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Valid email is required'),
  phone: z
    .string()
    .regex(/^\+?\d{10,12}$/, 'Enter a valid phone number (e.g., +2547xxxxxxxx)'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City is required'),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
    },
  });

  const email = watch('email'); // Watch email for Paystack

  const onSubmit = async (data: FormData) => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setLoading(true);
    // Simulate sending form data and cart to backend (e.g., /api/orders)
    console.log('Order Data:', {
      ...data,
      cart,
      totalPrice,
    });
    // In production, await fetch('/api/orders', { method: 'POST', body: JSON.stringify({ ...data, cart, totalPrice }) });
  };

  const handlePaymentSuccess = (reference: string) => {
    setLoading(false);
    clearCart();
    reset();
    toast.success(`Payment successful! Order ref: ${reference}`, { duration: 3000 });
    router.push(`/thank-you?ref=${reference}`);
  };

  const handlePaymentClose = () => {
    setLoading(false);
    toast.error('Payment cancelled or failed');
  };

  const paystackProps = {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    amount: totalPrice * 100, // Paystack expects amount in cents for KES
    email: email,
    currency: 'KES',
    onSuccess: handlePaymentSuccess,
    onClose: handlePaymentClose,
    text: 'Pay Now',
  };

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
      <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />

      {/* Hero Banner */}
      <header className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        <Image
          src="/images/hero6.jpg"
          alt="Checkout Hero"
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
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1.5 bg-red-600 mb-4"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-2">
              Checkout
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Secure payment with M-Pesa or other methods
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
              Checkout
            </motion.li>
          </motion.ol>
        </nav>
      </div>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {cart.length === 0 ? (
            <motion.div
              className="text-center bg-gray-100 p-8 md:p-10 lg:p-12 shadow"
              variants={itemVariants}
            >
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2">
                Your Cart is Empty
              </h2>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium tracking-wide hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Continue Shopping
                </motion.span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Summary */}
              <motion.section
                aria-labelledby="order-summary"
                className="bg-gray-100 p-6 md:p-8 lg:p-10 shadow"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '50px' }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="h-1.5 bg-red-600"
                  />
                  <h2
                    id="order-summary"
                    className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900"
                  >
                    Order Summary
                  </h2>
                </div>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-3 pb-3 border-b border-gray-200 last:border-0"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover"
                          sizes="64px"
                          quality={75}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm md:text-base font-medium text-gray-900">{item.name}</h3>
                        <p className="text-xs md:text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-red-600 font-medium">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    className="pt-4 border-t border-gray-200"
                    variants={itemVariants}
                  >
                    <div className="flex justify-between text-lg md:text-xl font-semibold text-gray-900">
                      <span>Total</span>
                      <span>KSh {totalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Shipping fee is separate and will be calculated accordingly.
                    </p>
                  </motion.div>
                </div>
              </motion.section>

              {/* Payment Form */}
              <motion.section
                aria-labelledby="payment-details"
                className="bg-gray-100 p-6 md:p-8 lg:p-10 shadow"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '50px' }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="h-1.5 bg-red-600"
                  />
                  <h2
                    id="payment-details"
                    className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900"
                  >
                    Payment Details
                  </h2>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="fullName"
                      className="block text-sm md:text-base font-medium mb-1 flex items-center gap-2"
                    >
                      <span>Full Name</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      {...register('fullName')}
                      className="w-full px-3 py-2 border border-gray-200 bg-white focus:ring-2 focus:ring-red-500 text-sm md:text-base"
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="email"
                      className="block text-sm md:text-base font-medium mb-1 flex items-center gap-2"
                    >
                      <motion.div
                        className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-full"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </motion.div>
                      <span>Email</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="w-full px-3 py-2 border border-gray-200 bg-white focus:ring-2 focus:ring-red-500 text-sm md:text-base"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="phone"
                      className="block text-sm md:text-base font-medium mb-1 flex items-center gap-2"
                    >
                      <motion.div
                        className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-full"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <Phone className="w-5 h-5 text-white" />
                      </motion.div>
                      <span>Phone (e.g., +2547xxxxxxxx)</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="w-full px-3 py-2 border border-gray-200 bg-white focus:ring-2 focus:ring-red-500 text-sm md:text-base"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="address"
                      className="block text-sm md:text-base font-medium mb-1 flex items-center gap-2"
                    >
                      <motion.div
                        className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-full"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="w-5 h-5 text-white" />
                      </motion.div>
                      <span>Shipping Address</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      {...register('address')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 bg-white focus:ring-2 focus:ring-red-500 text-sm md:text-base"
                      aria-invalid={!!errors.address}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="city"
                      className="block text-sm md:text-base font-medium mb-1 flex items-center gap-2"
                    >
                      <span>City</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      {...register('city')}
                      className="w-full px-3 py-2 border border-gray-200 bg-white focus:ring-2 focus:ring-red-500 text-sm md:text-base"
                      aria-invalid={!!errors.city}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <PaystackButton
                      {...paystackProps}
                      className={`w-full py-3 text-white font-medium tracking-wide transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        loading || !email ? 'bg-gray-400 cursor-not-allowed pointer-events-none' : 'bg-red-600 hover:bg-red-500'
                      }`}
                      aria-label="Proceed to payment with Paystack"
                    />
                  </motion.div>
                </form>
              </motion.section>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}