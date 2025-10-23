'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, X, SlidersHorizontal, ChevronDown, 
  Wrench, Zap, Gauge, Settings, Package, Filter, Eye,
  Heart, ShoppingCart, Grid3x3, List, Tag, LucideProps
} from 'lucide-react';
import { subcategories, brands, getProductsByCategory, searchProducts, Product, Subcategory } from '@/data/products';
import Image from 'next/image';
import Head from 'next/head';
import { useCart } from '@/app/context/CartContext';

// Define proper types for category icons
type LucideIcon = React.ComponentType<LucideProps>;
const categoryIcons: Record<string, LucideIcon> = {
  'engine-parts': Wrench,
  'electrical': Zap,
  'brakes': Gauge,
  'suspension': Settings,
  'body-parts': Package,
  'interior': Filter,
};
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low' },
  { value: 'price-high', label: 'Price: High' },
];

// Define filter type
type ActiveFilter = {
  type: 'search' | 'category' | 'brand';
  value: string;
  label: string;
};

const ITEMS_PER_LOAD = 12;

function ExJapanPartsContent() {
  const searchParams = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory');
  const validSubcategories = Object.keys(subcategories) as Subcategory[];
  
  const initialSubcategory = useMemo(() => 
    subcategoryParam && validSubcategories.includes(subcategoryParam as Subcategory) 
      ? subcategoryParam as Subcategory 
      : '', 
    [subcategoryParam, validSubcategories]
  );
  
  const initialBrand = useMemo(() => searchParams.get('brand') || '', [searchParams]);

  const [query, setQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | ''>(initialSubcategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const { cart, addToCart, removeFromCart } = useCart();

  const fetchProducts = useCallback(async () => {
    let products: Product[] = await getProductsByCategory('ex-japan');

    if (query) {
      products = await searchProducts(query);
      products = products.filter(p => p.category === 'ex-japan');
    }

    if (selectedSubcategory) {
      products = products.filter(p => p.subcategory === selectedSubcategory);
    }

    if (selectedBrand) {
      products = products.filter(p => p.brand === selectedBrand);
    }

    if (sortBy === 'price-low') {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products = products.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(products);
  }, [query, selectedSubcategory, selectedBrand, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [query, selectedSubcategory, selectedBrand, sortBy]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length));
  }, [filteredProducts.length]);

  const clearAllFilters = useCallback(() => {
    setSelectedSubcategory('');
    setSelectedBrand('');
    setQuery('');
  }, []);

  const removeFilter = useCallback((type: string) => {
    if (type === 'search') setQuery('');
    if (type === 'category') setSelectedSubcategory('');
    if (type === 'brand') setSelectedBrand('');
  }, []);

  const activeFilters = useMemo((): ActiveFilter[] => [
    query && { type: 'search', value: query, label: `"${query}"` },
    selectedSubcategory && { type: 'category', value: selectedSubcategory, label: subcategories[selectedSubcategory]?.title || '' },
    selectedBrand && { type: 'brand', value: selectedBrand, label: selectedBrand },
  ].filter(Boolean) as ActiveFilter[], [query, selectedSubcategory, selectedBrand]);

  const currentSortLabel = useMemo(() => 
    sortOptions.find(s => s.value === sortBy)?.label || 'Featured', 
    [sortBy]
  );

  const displayedProducts = useMemo(() => 
    filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  // Structured data for SEO
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filteredProducts.map((product, index) => ({
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
  }), [filteredProducts]);

  return (
    <>
      <Head>
        <title>Ex-Japan Auto Parts - Quality Used Parts from Japan</title>
        <meta name="description" content="Browse our premium ex-Japan auto parts. Find quality used engine parts, brakes, electrical components, and more from top Japanese brands." />
        <meta name="keywords" content="ex-japan auto parts, used car parts, japanese auto parts, engine parts, brakes, suspension, electrical, automotive" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ex-Japan Auto Parts - Quality Used Parts from Japan" />
        <meta property="og:description" content="Shop high-quality ex-Japan auto parts for your vehicle. Explore a wide range of categories and brands with fast delivery." />
        <meta property="og:image" content="/images/ex-japan-banner.jpg" />
        <meta property="og:type" content="website" />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Compact Hero */}
        <header 
          className="relative pt-12 md:pt-26 h-32 md:h-48 overflow-hidden"
          style={{ backgroundImage: 'url(/images/hero6.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">Ex-Japan Auto Parts</h1>
              <p className="text-white/80 text-sm">Quality used parts from Japan</p>
            </div>
          </div>
        </header>

        <main className="mx-auto px-0 w-full">
          {/* Products Section */}
          <section className="bg-white shadow-sm border border-gray-200 p-2 md:p-4 w-full" aria-label="Product Listings">
            {/* Horizontal Filter Bar - Desktop */}
            <div className="hidden lg:block bg-gray-100 shadow-sm border border-gray-200 mb-0 sticky top-12 z-30">
              <div className="p-4">
                <div className="grid grid-cols-12 gap-4 items-end">
                  {/* Search */}
                  <div className="col-span-4">
                    <label htmlFor="search-parts" className="block text-xs font-semibold text-gray-700 mb-2">Search Parts</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="search-parts"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search ex-Japan parts by name, brand, or part number..."
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        aria-label="Search ex-Japan auto parts"
                      />
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div className="col-span-3">
                    <label htmlFor="category-filter" className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
                    <div className="relative">
                      <button
                        id="category-filter"
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 flex items-center justify-between hover:border-gray-400 transition-colors text-sm"
                        aria-haspopup="listbox"
                        aria-expanded={showCategoryDropdown}
                      >
                        <span className="flex items-center gap-2 truncate">
                          {selectedSubcategory ? (
                            <>
                              {(() => {
                                const IconComponent = categoryIcons[selectedSubcategory] || Package;
                                return <IconComponent className="w-4 h-4 text-gray-600 flex-shrink-0" aria-hidden="true" />;
                              })()}
                              <span className="text-gray-900 font-medium">{subcategories[selectedSubcategory]?.title}</span>
                            </>
                          ) : (
                            <>
                              <Package className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
                              <span className="text-gray-500">All Categories</span>
                            </>
                          )}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${showCategoryDropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      
                      {showCategoryDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowCategoryDropdown(false)} />
                          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 shadow-xl max-h-80 overflow-y-auto" role="listbox">
                            <button
                              onClick={() => {
                                setSelectedSubcategory('');
                                setShowCategoryDropdown(false);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm ${
                                !selectedSubcategory ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'
                              }`}
                              role="option"
                              aria-selected={!selectedSubcategory}
                            >
                              <Package className="w-4 h-4" aria-hidden="true" />
                              All Categories
                            </button>
                            {Object.entries(subcategories).map(([key, { title }]) => {
                              const IconComponent = categoryIcons[key] || Wrench;
                              return (
                                <button
                                  key={key}
                                  onClick={() => {
                                    setSelectedSubcategory(key as Subcategory);
                                    setShowCategoryDropdown(false);
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm ${
                                    selectedSubcategory === key ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'
                                  }`}
                                  role="option"
                                  aria-selected={selectedSubcategory === key}
                                >
                                  <IconComponent className="w-4 h-4" aria-hidden="true" />
                                  {title}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Brand Dropdown */}
                  <div className="col-span-3">
                    <label htmlFor="brand-filter" className="block text-xs font-semibold text-gray-700 mb-2">Brand</label>
                    <div className="relative">
                      <button
                        id="brand-filter"
                        onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 flex items-center justify-between hover:border-gray-400 transition-colors text-sm"
                        aria-haspopup="listbox"
                        aria-expanded={showBrandDropdown}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
                          <span className={selectedBrand ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                            {selectedBrand || 'All Brands'}
                          </span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${showBrandDropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      
                      {showBrandDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowBrandDropdown(false)} />
                          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 shadow-xl max-h-80 overflow-y-auto" role="listbox">
                            <button
                              onClick={() => {
                                setSelectedBrand('');
                                setShowBrandDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm ${
                                !selectedBrand ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'
                              }`}
                              role="option"
                              aria-selected={!selectedBrand}
                            >
                              All Brands
                            </button>
                            {brands.map(brand => (
                              <button
                                key={brand}
                                onClick={() => {
                                  setSelectedBrand(brand);
                                  setShowBrandDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm ${
                                  selectedBrand === brand ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'
                                }`}
                                role="option"
                                aria-selected={selectedBrand === brand}
                              >
                                {brand}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* View & Sort Controls */}
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="flex bg-gray-100 p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 transition-colors ${
                          viewMode === 'grid' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'
                        }`}
                        aria-label="Switch to grid view"
                      >
                        <Grid3x3 className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 transition-colors ${
                          viewMode === 'list' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'
                        }`}
                        aria-label="Switch to list view"
                      >
                        <List className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Custom Sort Dropdown */}
                    <div className="relative">
                      <button
                        id="sort-filter"
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="px-3 py-2.5 bg-white border border-gray-300 flex items-center justify-between hover:border-gray-400 transition-colors text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-haspopup="listbox"
                        aria-expanded={showSortDropdown}
                      >
                        <span className="truncate">{currentSortLabel}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${showSortDropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      
                      {showSortDropdown && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
                          <div className="absolute z-50 left-0 mt-2 bg-white border border-gray-200 shadow-xl max-h-80 overflow-y-auto w-48" role="listbox">
                            {sortOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSortBy(option.value);
                                  setShowSortDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm ${
                                  sortBy === option.value ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'
                                }`}
                                role="option"
                                aria-selected={sortBy === option.value}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFilters.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-gray-700">Active:</span>
                      {activeFilters.map((filter) => (
                        <button
                          key={filter.type}
                          onClick={() => removeFilter(filter.type)}
                          className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-100 transition-colors"
                          aria-label={`Remove ${filter.label} filter`}
                        >
                          {filter.label}
                          <X className="w-3 h-3" aria-hidden="true" />
                        </button>
                      ))}
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-gray-500 hover:text-gray-700 font-medium ml-2"
                        aria-label="Clear all filters"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 mt-0.5">{filteredProducts.length} ex-Japan parts available</p>
              </div>
              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="p-2 bg-gray-100 relative"
                  aria-label="Open filters"
                >
                  <SlidersHorizontal className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  {activeFilters.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                      {activeFilters.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 bg-gray-100"
                  aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
                >
                  {viewMode === 'grid' ? <Grid3x3 className="w-5 h-5 text-gray-600" aria-hidden="true" /> : <List className="w-5 h-5 text-gray-600" aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                <p className="text-gray-900 text-lg font-semibold mb-2">No ex-Japan parts found</p>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your filters</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                  aria-label="Clear all filters"
                >
                  Clear All Filters
                </button>
              </div>
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
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          quality={80}
                        />
                        <button className="absolute top-2 right-2 p-2 bg-white/95 hover:bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-600" aria-hidden="true" />
                        </button>
                        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1">
                          EX JAPAN
                        </div>
                      </div>
                      <div className="p-3 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-green-700 font-bold uppercase tracking-wide">{product.brand}</span>
                          <p className="text-red-600 font-bold text-sm">KSh {product.price.toLocaleString()}</p>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-red-600 transition-colors flex-1">
                          {product.name}
                        </h3>
                        <div className="flex gap-2 mt-auto">
                          <Link 
                            href={`/products/${product.id}`}
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
                      aria-label="Load more ex-Japan parts"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl max-h-[85vh] flex flex-col">
                <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-gray-100"
                      aria-label="Close filters"
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Active Filters */}
                  {activeFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {activeFilters.map((filter) => (
                        <button
                          key={filter.type}
                          onClick={() => removeFilter(filter.type)}
                          className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-red-100 transition-colors"
                          aria-label={`Remove ${filter.label} filter`}
                        >
                          {filter.label}
                          <X className="w-3 h-3" aria-hidden="true" />
                        </button>
                      ))}
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-gray-500 hover:text-gray-700 font-medium ml-2"
                        aria-label="Clear all filters"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {/* Mobile Search */}
                  <div>
                    <label htmlFor="mobile-search" className="block text-sm font-semibold text-gray-900 mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="mobile-search"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search ex-Japan parts..."
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Search ex-Japan auto parts"
                      />
                    </div>
                  </div>

                  {/* Mobile Categories */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                    <div className="space-y-1">
                      <button
                        onClick={() => setSelectedSubcategory('')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-sm ${
                          !selectedSubcategory ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'
                        }`}
                        aria-label="Select all categories"
                      >
                        <Package className="w-4 h-4" aria-hidden="true" />
                        <span className="font-medium">All Categories</span>
                      </button>
                      {Object.entries(subcategories).map(([key, { title }]) => {
                        const IconComponent = categoryIcons[key] || Wrench;
                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedSubcategory(key as Subcategory)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-sm ${
                              selectedSubcategory === key ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'
                            }`}
                            aria-label={`Select ${title} category`}
                          >
                            <IconComponent className="w-4 h-4" aria-hidden="true" />
                            <span className="font-medium">{title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile Brands */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Brand</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedBrand('')}
                        className={`px-3 py-2 hover:bg-gray-50 transition-colors text-sm font-medium ${
                          !selectedBrand ? 'bg-red-50 text-red-600' : 'text-gray-700'
                        }`}
                        aria-label="Select all brands"
                      >
                        All Brands
                      </button>
                      {brands.map(brand => (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`px-3 py-2 hover:bg-gray-50 transition-colors text-sm font-medium ${
                            selectedBrand === brand ? 'bg-red-50 text-red-600' : 'text-gray-700'
                          }`}
                          aria-label={`Select ${brand} brand`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200 bg-white">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 transition-colors"
                    aria-label={`View ${filteredProducts.length} filtered ex-Japan parts`}
                  >
                    View {filteredProducts.length} Ex-Japan Parts
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default function ExJapanPartsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <ExJapanPartsContent />
    </Suspense>
  );
}