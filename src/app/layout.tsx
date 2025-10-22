// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ModalProvider } from '@/components/ModalContext';
import { CartProvider } from './context/CartContext';

export const metadata: Metadata = {
  title: {
    default: 'Gathex Auto Spares - High-Quality Auto Parts in Nairobi',
    template: '%s | Gathex Auto Spares',
  },
  description:
    'Gathex Auto Spares offers high-quality, original, and affordable auto parts in Nairobi, Kenya. Located along Kirinyaga Road, we provide genuine spare parts for all vehicle models with fast delivery.',
  keywords: [
    'auto parts Nairobi',
    'genuine car spares Kenya',
    'affordable auto spares Kirinyaga Road',
    'Gathex Auto Spares',
    'original vehicle parts Nairobi',
    'car spare parts Kenya',
    'automotive parts Nairobi',
  ],
  openGraph: {
    title: 'Gathex Auto Spares',
    description:
      'Your trusted source for high-quality, original, and affordable auto parts in Nairobi. Visit us on Kirinyaga Road for genuine spares and fast service.',
    url: 'https://gathexautospares.co.ke',
    siteName: 'Gathex Auto Spares',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <ModalProvider>
          <CartProvider>
            <Header />
            <main className="relative z-10 absolute">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ModalProvider>
      </body>
    </html>
  );
}