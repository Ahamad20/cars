import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { RootState } from '../redux/store';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  if (cart.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold">Shopping Cart</h1>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl mb-4"
            >
              🛒
            </motion.div>
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Cart is Empty
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Start adding some amazing car decorations!
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/products"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        className="bg-slate-900 text-white py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-xl text-gray-300">You have {cart.length} items</p>
        </div>
      </motion.div>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {cart.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center justify-between p-6 border-b hover:bg-gray-50 transition"
                    variants={itemVariants}
                    custom={idx}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="text-5xl"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.image}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <p className="text-accent font-bold">₹{item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="flex items-center border rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </motion.div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <motion.button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-700 font-bold"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ✕
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow p-6 sticky top-20"
                whileHover={{ boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}
              >
                <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                <motion.div
                  className="space-y-4 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      ₹{totalPrice.toFixed(2)}
                    </motion.span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      ₹{(totalPrice * 1.1).toFixed(2)}
                    </motion.span>
                  </div>
                </motion.div>
                <motion.button
                  className="w-full bg-accent text-white py-3 rounded-lg hover:bg-red-600 transition font-bold mb-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Proceed to Checkout
                </motion.button>
                <motion.button
                  onClick={() => dispatch(clearCart())}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Cart
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
