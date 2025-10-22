// components/ProductCard.tsx
'use client'; // Client component for interactions

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { Product } from '@/data/products'; // Adjust path if needed

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="bg-white border border-gray-200 p-4 hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.05 }}
    >
      <Link href={`/products/${product.category}/${product.id}`}>
        <div className="relative h-48 w-full">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-red-600 font-bold mt-1">${product.price}</p>
        <div className="flex items-center mt-2">
          {product.features.map((feature, idx) => (
            <FaStar key={idx} className="text-yellow-400 mr-1" />
          ))}
        </div>
      </Link>
      <button className="mt-2 bg-red-600 text-white px-4 py-2 w-full">Add to Cart</button> {/* Integrate cart later */}
    </motion.div>
  );
}