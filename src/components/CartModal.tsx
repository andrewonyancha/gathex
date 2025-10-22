'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();

  const handleQuantityChange = (id: string, quantity: number) => {
    const item = cart.find((item) => item.id === id);
    if (!item || quantity < 1 || quantity > item.stock) return;
    updateQuantity(id, quantity);
  };

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="dialog"
            aria-labelledby="cart-title"
            aria-modal="true"
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 id="cart-title" className="text-lg font-semibold">Your Cart ({totalItems})</h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100  "
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col min-h-0">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200 last:border-0">
                          <div className="w-16 h-16 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={`${item.name} in cart`}
                              width={64}
                              height={64}
                              className="object-cover  "
                              sizes="64px"
                              quality={75}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <p className="text-xs text-gray-500">KSh {item.price.toLocaleString()}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="w-4 h-4 border border-gray-200   text-xs hover:bg-gray-100 disabled:opacity-50"
                                disabled={item.quantity <= 1}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                -
                              </button>
                              <span className="text-xs w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="w-4 h-4 border border-gray-200   text-xs hover:bg-gray-100 disabled:opacity-50"
                                disabled={item.quantity >= item.stock}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">KSh {(item.price * item.quantity).toLocaleString()}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-red-600 hover:underline mt-1"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-base font-semibold mb-4">
                      <span>Total</span>
                      <span>KSh {totalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full py-2 bg-red-600 text-white   hover:bg-red-700 transition-colors"
                      disabled={cart.length === 0}
                      aria-label="Proceed to checkout"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="w-full mt-2 text-sm text-gray-600 hover:text-red-600"
                      aria-label="Clear cart"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}