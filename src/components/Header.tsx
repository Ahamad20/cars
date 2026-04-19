import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const location = useLocation();
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-slate-900 h-full"></div>

      {/* Blur Effect Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-opacity-95 h-full bg-blue-900/80"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex justify-between items-center h-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                className="text-4xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                🚗
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-2xl font-bold text-white">Devi Car Services</h1>
                <p className="text-xs text-blue-200">Premium Car Solutions</p>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden md:flex space-x-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link to={item.path} className="relative px-4 py-2 group">
                    <motion.span
                      className="text-white font-medium flex items-center space-x-1 transition-colors duration-300 group-hover:text-yellow-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.span>

                    {/* Active Indicator */}
                    {isActive(item.path) && (
                      <motion.div
                        className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"
                        layoutId="underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      ></motion.div>
                    )}

                    {/* Hover Background */}
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                      whileHover={{ scale: 1.05 }}
                      initial={false}
                      transition={{ duration: 0.2 }}
                    ></motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Cart Button */}
            <motion.div
              className="flex items-center space-x-2 md:space-x-4"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              {/* Desktop Cart */}
              <Link to="/cart" className="hidden md:block">
                <motion.div
                  className="relative px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-red-500/50 cursor-pointer"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: '0 0 25px rgba(239, 68, 68, 0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-xl">🛒</span>
                  <span className="hidden sm:inline">₹{totalPrice.toFixed(2)}</span>

                  {/* Cart Badge */}
                  {cartItems.length > 0 && (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={cartItems.length}
                        className="absolute -top-3 -right-3 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        {cartItems.length}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                className="md:hidden pb-6 space-y-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-lg'
                          : 'text-white hover:bg-white/20'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Cart Link */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <Link
                    to="/cart"
                    className="block px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-red-500/50 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <span>🛒</span>
                        <span>Cart</span>
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">₹{totalPrice.toFixed(2)}</span>
                        {cartItems.length > 0 && (
                          <motion.span
                            className="bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            {cartItems.length}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
