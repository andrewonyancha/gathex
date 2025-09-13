import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Karventure Investment Ltd. - Car Finance Solutions in Kenya',
    template: '%s | Karventure Investment Ltd.',
  },
  description:
    'KARVENTURE INVESTMENT LIMITED is a dynamic and rapidly expanding microcredit institution based in Nairobi, Kenya. We specialize in providing secured loan solutions tailored to meet the diverse financial needs of individuals and small businesses across the country.',
  openGraph: {
    title: 'Karventure Investment Ltd.',
    description:
      'Your one-stop car finance solution in Nairobi, Kenya. Secured loans for individuals and businesses.',
    url: 'https://karventureltd.co.ke',
    siteName: 'Karventure Investment Ltd.',
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
       <Header />
        <main className="relative z-10 absolute">
           {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}