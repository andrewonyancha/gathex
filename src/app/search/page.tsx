'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ChevronRight, Home, AlertCircle, Grid3x3, List, Heart, ShoppingCart, Eye } from 'lucide-react';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { searchProducts, Product } from '@/data/products';
import { useCart } from '@/app/context/CartContext';

const ITEMS_PER_LOAD = 12;

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim() || '';
  const [results, setResults] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const { cart, addToCart, removeFromCart } = useCart();

  const fetchProducts = useCallback(async () => {
    if (query) {
      const products = await searchProducts(query);
      setResults(products);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [results]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_LOAD, results.length));
  }, [results.length]);

  const displayedProducts = useMemo(() => 
    results.slice(0, visibleCount),
    [results, visibleCount]
  );

  const hasMore = visibleCount < results.length;

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: results.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: `${product.name} by ${product.brand}`,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KES',
          price: product.price,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  }), [results]);

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No Search Query</h2>
          <p className="text-gray-500 text-sm mb-6">Please enter a search term to find products.</p>
          <Link 
            href="/" 
            className="px-6 py-2.5 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
            aria-label="Back to Home"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Search Results for &quot;{query}&quot; - Gathex Auto Spares</title>
        <meta name="description" content={`Browse auto parts matching "${query}". Find high-quality new and ex-Japan parts from top brands.`} />
        <meta name="keywords" content={`auto parts, ${query}, car parts, automotive, new parts, ex-Japan parts`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Search Results for "${query}"`} />
        <meta property="og:description" content={`Browse auto parts matching "${query}". Find high-quality new and ex-Japan parts from top brands.`} />
        <meta property="og:image" content="/images/hero6.jpg" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header 
          className="relative h-32 md:h-48 overflow-hidden"
          style={{ backgroundImage: 'url(/images/hero6.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
                Search Results for &quot;{query}&quot;
              </h1>
              <p className="text-white/80 text-sm">Browse matching auto parts</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-4">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-red-600 flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-900">Search Results</li>
            </ol>
          </nav>
        </div>

        <main className="mx-auto px-0 w-full">
          <section className="bg-white shadow-sm border border-gray-200 p-2 md:p-4 w-full" aria-label="Search Results">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 mt-0.5">{results.length} products available</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'}`}
                    aria-label="Switch to grid view"
                  >
                    <Grid3x3 className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'}`}
                    aria-label="Switch to list view"
                  >
                    <List className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {results.length === 0 ? (
              <motion.div 
                className="text-center py-16 bg-white border border-gray-200 shadow-sm p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No Results Found for &quot;{query}&quot;
                </h2>
                <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                  Our inventory is constantly updated, and some items may not yet be listed. Contact our dedicated support team for personalized assistance in finding the parts you need.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm max-w-lg mx-auto">
                  <motion.a
                    href="https://wa.me/254748094055"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-1 bg-gray-200 text-black font text-sm hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
                    aria-label="Contact via WhatsApp"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaWhatsapp size={14} />
                    WhatsApp
                  </motion.a>
                  <motion.a
                    href="tel:+254748094055"
                    className="px-6 py-1 bg-gray-200 text-black font hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
                    aria-label="Contact via Phone"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPhone size={12} />
                    Call Us
                  </motion.a>
                  <motion.a
                    href="mailto:Gathecha75@gmail.com"
                    className="px-6 py-1 bg-gray-200 text-black hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center"
                    aria-label="Contact via Email"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEnvelope size={12} />
                    Email Us
                  </motion.a>
                </div>
              </motion.div>
            ) : (
              <>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4' 
                  : 'grid grid-cols-1 lg:grid-cols-3 gap-4'
                }>
                  {displayedProducts.map(product => (
                    <article 
                      key={product.id} 
                      className={`group bg-white border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div className={`bg-gray-100 relative overflow-hidden ${
                        viewMode === 'list' ? 'w-40 h-40 flex-shrink-0' : 'aspect-square'
                      }`}>
                        <Image
                          src={product.image}
                          alt={`${product.name} by ${product.brand}`}
                          fill
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          quality={80}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <button className="absolute top-2 right-2 p-2 bg-white/95 hover:bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-600" aria-hidden="true" />
                        </button>
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1">
                          {product.category === 'new' ? 'NEW' : 'EX-JAPAN'}
                        </div>
                      </div>
                      <div className="p-3 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-red-600 font-bold uppercase tracking-wide">{product.brand}</span>
                          <p className="text-red-600 font-bold text-lg">KSh {product.price.toLocaleString()}</p>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-red-600 transition-colors flex-1">
                          {product.name}
                        </h3>
                        <div className="flex gap-2 mt-auto">
                          <Link 
                            href={`/products/${product.category}-parts/${product.id}`}
                            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 transition-colors text-sm font-medium"
                            aria-label={`View details for ${product.name}`}
                          >
                            <Eye className="w-4 h-4" aria-hidden="true" />
                            View
                          </Link>
                          <button 
                            onClick={() => {
                              const isInCart = cart.some((item) => item.id === product.id);
                              isInCart ? removeFromCart(product.id) : addToCart(product);
                            }}
                            className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-900 py-2 transition-colors text-sm font-medium hover:bg-red-600 hover:text-white"
                            aria-label={`${cart.some((item) => item.id === product.id) ? 'Remove' : 'Add'} ${product.name} to cart`}
                          >
                            <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                            {cart.some((item) => item.id === product.id) ? 'Remove' : 'Add'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={loadMore}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                      aria-label="Load more products"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}