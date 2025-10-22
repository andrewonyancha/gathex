import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { useModal } from './ModalContext';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { openContactModal } = useModal();

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No products found. Try a different search or inquire directly.</p>
        <div className="flex justify-center gap-4">
          <button onClick={openContactModal} className="bg-red-600 text-white px-4 py-2">Contact Us</button>
          <button onClick={() => window.open('https://wa.me/+254700393363', '_blank')} className="bg-green-600 text-white px-4 py-2">WhatsApp</button>
          <form onSubmit={(e) => { e.preventDefault(); alert('Callback requested!'); }} className="flex gap-2">
            <input type="tel" placeholder="Your Phone" className="border p-2" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">Request Callback</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}