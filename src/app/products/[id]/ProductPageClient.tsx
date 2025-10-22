// app/products/[id]/ProductPageClient.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Product, getProductById, getProductsByCategory, subcategories } from '@/data/products';
import { useCart } from '@/app/context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Home, ChevronRight } from 'lucide-react';

export default function ProductPageClient() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, removeFromCart, cart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id as string);
        if (!data) throw new Error('Product not found');
        setProduct(data);

        // Fetch related products (same subcategory, exclude current product)
        const allProducts = await getProductsByCategory(data.category);
        const related = allProducts
          .filter(p => p.subcategory === data.subcategory && p.id !== data.id)
          .slice(0, 4); // Limit to 4 related products
        setRelatedProducts(related);
      } catch (err) {
        setError((err as Error).message);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const isInCart = product ? cart.some((item) => item.id === product.id) : false;

  const handleCartAction = () => {
    if (!product) return;
    if (isInCart) {
      removeFromCart(product.id);
      toast.success(`${product.name} removed from cart`, { duration: 2000 });
    } else {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart`, { duration: 2000 });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > (product?.stock || 1)) return;
    setQuantity(newQuantity);
  };

  // Structured data for SEO
  const structuredData = useMemo(() => {
    if (!product) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.image,
      description: product.description,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'KES',
        price: product.price,
        availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.id}`,
      },
    };
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white   shadow p-6">
          <div className="animate-pulse">
            <div className="h-48 md:h-96 bg-gray-200   mb-4" />
            <div className="h-8 bg-gray-200   w-3/4 mb-2" />
            <div className="h-6 bg-gray-200   w-1/2 mb-4" />
            <div className="h-4 bg-gray-200   w-full mb-2" />
            <div className="h-4 bg-gray-200   w-full mb-2" />
            <div className="h-10 bg-gray-200   w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-center">
        <div className="max-w-4xl mx-auto bg-white   shadow p-6">
          <p className="text-red-600 text-lg">{error || 'Product not found'}</p>
          <Link href="/products/new-parts" className="mt-4 inline-block px-6 py-2 bg-red-600 text-white   hover:bg-red-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {structuredData && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        )}
        <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />

        {/* Hero Banner (Consistent with new-parts) */}
        
        <header 
          className="relative pt-12 md:pt-26 h-32 md:h-48 overflow-hidden"
          style={{ backgroundImage: 'url(/images/hero6.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white">{product.name}</h1>
              <p className="text-white/80 text-sm">{product.brand} - {subcategories[product.subcategory]?.title}</p>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
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
              <li>
                <Link href={product.category === 'new' ? '/products/new-parts' : '/products/ex-japan-parts'} className="hover:text-red-600">
                  {product.category === 'new' ? 'New Parts' : 'Ex-Japan Parts'}
                </Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>
        </div>

        <main className="container mx-auto px-4 py-6">
          <div className="bg-white   shadow md:flex">
            <div className="md:w-1/2">
              <Image
                src={product.image}
                alt={`${product.name} by ${product.brand}`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
                priority
              />
            </div>
            <div className="p-6 md:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-red-600 font-bold text-xl mb-2">KSh {product.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mb-2">Brand: {product.brand}</p>
              <p className="text-sm text-gray-500 mb-4">Category: {subcategories[product.subcategory]?.title}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <ul className="mb-6 list-disc pl-5">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 text-sm">{feature}</li>
                ))}
              </ul>
              <p className="text-sm mb-4">
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </p>
              {product.stock > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-8 h-8 border   text-sm hover:bg-gray-100 disabled:opacity-50"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number(e.target.value))}
                      className="w-16 text-center border   text-sm"
                      min="1"
                      max={product.stock}
                      aria-label="Quantity"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-8 h-8 border   text-sm hover:bg-gray-100 disabled:opacity-50"
                      disabled={quantity >= product.stock}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={handleCartAction}
                className={`w-full py-3 text-white font-medium   transition-colors ${
                  isInCart ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
                } ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={product.stock === 0}
                aria-label={isInCart ? `Remove ${product.name} from cart` : `Add ${product.name} to cart`}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((related) => (
                  <article
                    key={related.id}
                    className="group bg-white border   overflow-hidden hover:shadow transition-shadow"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={related.image}
                        alt={`${related.name} by ${related.brand}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        quality={75}
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1  ">
                        {related.category === 'new' ? 'NEW' : 'USED'}
                      </div>
                    </div>
                    <div className="p-3 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-red-600 font-medium">{related.brand}</span>
                        <p className="text-red-600 font-semibold">KSh {related.price.toLocaleString()}</p>
                      </div>
                      <h3 className="text-sm font-medium mb-2 group-hover:text-red-600">{related.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{related.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                      <div className="flex gap-2 mt-auto">
                        <Link
                          href={`/products/${related.id}`}
                          className="flex-1 py-2 border   text-center text-sm hover:bg-gray-100"
                          aria-label={`View ${related.name}`}
                        >
                          View
                        </Link>
                        <button
                          onClick={() => {
                            const isRelatedInCart = cart.some((item) => item.id === related.id);
                            if (isRelatedInCart) {
                              removeFromCart(related.id);
                              toast.success(`${related.name} removed from cart`, { duration: 2000 });
                            } else {
                              addToCart(related);
                              toast.success(`${related.name} added to cart`, { duration: 2000 });
                            }
                          }}
                          className="flex-1 py-2 border   text-center text-sm hover:bg-red-600 hover:text-white"
                          aria-label={`${cart.some((item) => item.id === related.id) ? 'Remove' : 'Add'} ${related.name} to cart`}
                        >
                          {cart.some((item) => item.id === related.id) ? 'Remove' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
    </div>
  );
}