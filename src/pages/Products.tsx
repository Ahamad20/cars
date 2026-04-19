import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type UploadedImage = {
  id: string;
  name: string;
  src: string;
  category: 'services' | 'products';
  subcategory: string;
};

type CategorizedImages = {
  services: {
    'Wheel Alignment': UploadedImage[];
    'Car Washing': UploadedImage[];
    'Tyres': UploadedImage[];
  };
  products: UploadedImage[];
};

export default function Products() {
  const dispatch = useDispatch();
  const [uploadedImages, setUploadedImages] = useState<CategorizedImages>({
    services: {
      'Wheel Alignment': [],
      'Car Washing': [],
      'Tyres': [],
    },
    products: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    const loadImages = (showNotification = false) => {
      setIsLoading(true);
      const stored = window.localStorage.getItem('adminCategorizedImages');
      if (stored) {
        setUploadedImages(JSON.parse(stored));
        if (showNotification) {
          setShowUpdateNotification(true);
          setTimeout(() => setShowUpdateNotification(false), 3000);
        }
      }
      setIsLoading(false);
    };

    // Load images on mount
    loadImages();

    // Listen for localStorage changes (cross-tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminCategorizedImages') {
        loadImages(true);
      }
    };

    // Listen for visibility changes (when user switches tabs and comes back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadImages();
      }
    };

    // Listen for custom events from admin panel
    const handleImagesUpdated = () => {
      loadImages(true);
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('imagesUpdated', handleImagesUpdated);

    // Fallback: poll for changes every 2 seconds
    const pollInterval = setInterval(() => {
      const currentStored = window.localStorage.getItem('adminCategorizedImages');
      if (currentStored) {
        const currentImages = JSON.parse(currentStored);
        const currentCount = Object.values(currentImages.services).flat().length + currentImages.products.length;
        const previousCount = Object.values(uploadedImages.services).flat().length + uploadedImages.products.length;
        
        if (currentCount !== previousCount) {
          setUploadedImages(currentImages);
        }
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('imagesUpdated', handleImagesUpdated);
      clearInterval(pollInterval);
    };
  }, []);

  const staticProducts = [
    {
      id: '1',
      name: 'LED Underglow Kit',
      price: 49.99,
      description: 'Multi-color LED underglow lighting system',
      emoji: '💡',
      image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=300&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Chrome Trim Set',
      price: 79.99,
      description: 'Premium chrome window and door trim',
      emoji: '✨',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=300&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Body Kit Package',
      price: 299.99,
      description: 'Complete aerodynamic body kit upgrade',
      emoji: '🎨',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'Window Tint Roll',
      price: 99.99,
      description: 'Professional grade window tinting film',
      emoji: '🕶️',
      image: 'https://images.unsplash.com/photo-1552820728-1a6e7076b8eb?w=300&h=300&fit=crop'
    },
    {
      id: '5',
      name: 'Spoiler Wing',
      price: 149.99,
      description: 'Adjustable rear spoiler for enhanced aerodynamics',
      emoji: '🏎️',
      image: 'https://images.unsplash.com/photo-1552820728-5dccf35f9bec?w=300&h=300&fit=crop'
    },
    {
      id: '6',
      name: 'Carbon Fiber Trim',
      price: 189.99,
      description: 'Carbon fiber interior trim panels',
      emoji: '🔲',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=300&h=300&fit=crop'
    },
    {
      id: '7',
      name: 'Custom Floor Mats',
      price: 59.99,
      description: 'Premium custom-fit floor mats',
      emoji: '🧵',
      image: 'https://images.unsplash.com/photo-1552820728-8c840f4e6359?w=300&h=300&fit=crop'
    },
    {
      id: '8',
      name: 'LED Headlight Upgrade',
      price: 199.99,
      description: 'Advanced LED headlight conversion kit',
      emoji: '🔆',
      image: 'https://images.unsplash.com/photo-1619405399517-d5f0ba1fbfef?w=300&h=300&fit=crop'
    },
  ];

  const uploadedProducts = uploadedImages.products.map((img) => ({
    id: `uploaded-${img.id}`,
    name: img.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '), // Remove extension and replace separators
    price: 99.99, // Default price for uploaded products
    description: 'Custom uploaded product',
    emoji: '📸',
    image: img.src,
  }));

  const products = [...staticProducts, ...uploadedProducts];

  const handleAddToCart = (product: typeof products[0]) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.emoji
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
          <h1 className="text-5xl font-bold mb-4">Car Decorations & Accessories</h1>
          <p className="text-xl text-gray-300">Browse our premium collection of car accessories</p>
        </div>
      </motion.div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Update Notification */}
          {showUpdateNotification && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Content Updated!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>New products have been added to our collection. Check out the latest items!</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-gray-600">Loading products...</span>
            </div>
          )}

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                whileHover={{ y: -10, boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}
              >
                <motion.div
                  className="relative h-48 bg-gray-50 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"%3E%3Crect fill="%23f3f4f6" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%236b7280"%3E{product.emoji}%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </motion.div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <motion.span
                      className="text-2xl font-bold text-accent"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ₹{product.price}
                    </motion.span>
                  </div>
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-primary text-white py-2 rounded transition hover:bg-blue-700"
                    whileHover={{ scale: 1.05, backgroundColor: '#1555c0' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
