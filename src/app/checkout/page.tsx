// app/checkout/page.tsx
import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), // Add metadataBase
  title: 'Checkout | Gathex Autospares',
  description: 'Complete your purchase with secure Paystack payment, including M-Pesa and other options.',
  openGraph: {
    title: 'Checkout - Secure Payment',
    description: 'Review your cart and pay securely with M-Pesa, card, or bank transfer.',
    images: ['/images/hero6.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/checkout`, // Already using baseUrl
  },
  robots: 'noindex, nofollow', // Sensitive page; don't index
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}