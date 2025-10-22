
// app/products/[id]/page.tsx

import { Metadata } from 'next';
import { getProductById, subcategories } from '@/data/products';
import ProductPageClient from './ProductPageClient';

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(params.id);
  if (!product) {
    return {
      title: 'Product Not Found | Gathex Autospares',
      description: 'The requested auto part could not be found. Browse our catalog for other high-quality parts.',
    };
  }

  const title = `${product.name} - ${product.brand} | Gathex Autospares`;
  const description = `${product.description} Shop this high-quality ${subcategories[product.subcategory]?.title} part with warranty.`;

  return {
    title,
    description,
    keywords: [product.name, product.brand, product.subcategory, 'auto parts', 'new car parts', 'automotive'].join(', '),
    openGraph: {
      title,
      description,
      images: [product.image],
      type: 'website',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${params.id}`,
    },
    robots: 'index, follow',
  };
}

export default function ProductPage() {
  return <ProductPageClient />;
}
