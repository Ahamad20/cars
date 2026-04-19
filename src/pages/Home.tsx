import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Box, Container, Heading, Text, Button, Grid, HStack, Image } from '@chakra-ui/react';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const heroBackground = new URL('../assets/washing/home1.webp', import.meta.url).href;

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

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState<CategorizedImages | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('adminCategorizedImages');
    if (stored) {
      setUploadedImages(JSON.parse(stored));
    }
  }, []);

  const uploadedCards = uploadedImages
    ? [
        ...Object.values(uploadedImages.services).flat(),
        ...uploadedImages.products,
      ]
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <Box w="full">
      {/* Hero Section */}
      <MotionBox
        position="relative"
        overflow="hidden"
        minH={{ base: '500px', md: '600px' }}
        display="flex"
        alignItems="center"
        py={{ base: 8, md: 12 }}
        mb={12}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        borderRadius={{ base: 'md', md: 'xl' }}
        boxShadow="0 20px 50px rgba(0, 0, 0, 0.3)"
      >

        <Container maxW="7xl" position="relative" zIndex={1}>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8} alignItems="center">
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div variants={itemVariants}>
                <Heading
                  as="h1"
                  size="2xl"
                  mb={4}
                  color="white"
                  textShadow="0 4px 25px rgba(0, 0, 0, 0.9), 0 2px 12px rgba(0, 0, 0, 0.8), 0 1px 6px rgba(0, 0, 0, 0.7)"
                  fontWeight="bold"
                >
                  Transform Your Car
                </Heading>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Text fontSize="lg" color="white" mb={8} lineHeight="1.8" textShadow="0 3px 15px rgba(0, 0, 0, 0.8), 0 1px 8px rgba(0, 0, 0, 0.7)">
                  Premium car decorations and professional services to make your vehicle stand out.
                </Text>
              </motion.div>
              <motion.div variants={itemVariants}>
                <HStack gap={4} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                  <RouterLink to="/products">
                    <MotionButton
                      bg="linear-gradient(135deg, #fbbf24, #f59e0b)"
                      color="gray.900"
                      fontWeight="bold"
                      px={8}
                      py={6}
                      fontSize="lg"
                      borderRadius="lg"
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(251, 191, 36, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Shop Now
                    </MotionButton>
                  </RouterLink>
                  <RouterLink to="/services">
                    <MotionButton
                      borderWidth="2px"
                      borderColor="white"
                      color="white"
                      fontWeight="bold"
                      px={8}
                      py={6}
                      fontSize="lg"
                      borderRadius="lg"
                      bg="rgba(255, 255, 255, 0.1)"
                      backdropFilter="blur(10px)"
                      _hover={{ bg: 'rgba(255, 255, 255, 0.2)', borderColor: '#fbbf24' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Our Services
                    </MotionButton>
                  </RouterLink>
                </HStack>
              </motion.div>
            </MotionBox>

            {/* Animated Emoji */}
            <MotionBox
              display={{ base: 'none', md: 'flex' }}
              alignItems="center"
              justifyContent="center"
              fontSize="120px"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🏎️
            </MotionBox>
          </Grid>
        </Container>
      </MotionBox>

      {/* Features Section */}
      <MotionBox
        py={{ base: 10, md: 16 }}
        px={{ base: 4, md: 0 }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container maxW="7xl">
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              size="xl"
              textAlign="center"
              mb={12}
              bgGradient="linear(to-r, #4f46e5, #9333ea, #ec4899)"
              bgClip="text"
            >
              Why Choose Us?
            </Heading>
          </motion.div>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {[
              { emoji: '⭐', title: 'Quality Products', desc: 'Premium decorations that enhance your car\'s appearance' },
              { emoji: '🔧', title: 'Expert Services', desc: 'Professional installation and maintenance services' },
              { emoji: '🚚', title: 'Fast Delivery', desc: 'Quick shipping and hassle-free returns' },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <MotionBox
                    bg="white"
                    p={8}
                    borderRadius="xl"
                    textAlign="center"
                    boxShadow="0 10px 30px rgba(0, 0, 0, 0.1)"
                    backdropFilter="blur(10px)"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    whileHover={{
                      y: -10,
                      boxShadow: '0 20px 40px rgba(79, 70, 229, 0.2)',
                    }}
                  >
                  <motion.div
                    style={{ fontSize: '48px', marginBottom: '16px' }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {feature.emoji}
                  </motion.div>
                  <Heading as="h3" size="md" mb={2} color="gray.800">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    {feature.desc}
                  </Text>
                </MotionBox>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </MotionBox>

      {uploadedCards.length > 0 && (
        <MotionBox
          py={{ base: 10, md: 16 }}
          px={{ base: 4, md: 0 }}
          bg="white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Container maxW="7xl">
            <motion.div variants={itemVariants}>
              <Heading as="h2" size="xl" mb={12} bgGradient="linear(to-r, #4f46e5, #9333ea)" bgClip="text">
                Recent Uploads
              </Heading>
            </motion.div>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={10}>
              {uploadedCards.slice(0, 6).map((image) => (
                <motion.div key={image.id} variants={itemVariants}>
                  <MotionBox
                    bg="gray.50"
                    borderRadius="xl"
                    overflow="hidden"
                    boxShadow="0 10px 25px rgba(0, 0, 0, 0.08)"
                    whileHover={{ y: -5 }}
                  >
                    <Image src={image.src} alt={image.name} objectFit="cover" w="full" h="220px" />
                    <Box p={6}>
                      <Heading as="h3" size="md" mb={2} color="gray.800">
                        {image.name}
                      </Heading>
                      <Text color="gray.600" fontSize="sm">
                        {image.category === 'services'
                          ? `${image.subcategory} Service Upload`
                          : 'Product Upload'}
                      </Text>
                    </Box>
                  </MotionBox>
                </motion.div>
              ))}
            </Grid>
          </Container>
        </MotionBox>
      )}

      {/* Featured Products Section */}
      <MotionBox
        py={{ base: 10, md: 16 }}
        px={{ base: 4, md: 0 }}
        bg="rgba(79, 70, 229, 0.05)"
        borderY="1px solid rgba(79, 70, 229, 0.1)"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container maxW="7xl">
          <motion.div variants={itemVariants}>
            <Heading as="h2" size="xl" mb={12} bgGradient="linear(to-r, #4f46e5, #ec4899)" bgClip="text">
              Featured Products
            </Heading>
          </motion.div>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={10}>
            {[
              { name: 'LED Underglow Kit', price: 49.99, emoji: '💡' },
              { name: 'Chrome Trim Set', price: 79.99, emoji: '✨' },
              { name: 'Body Kit Package', price: 299.99, emoji: '🎨' },
              { name: 'Window Tint', price: 199.99, emoji: '🕶️' },
            ].map((product, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <MotionBox
                  bg="white"
                  borderRadius="lg"
                  p={6}
                  textAlign="center"
                  boxShadow="0 10px 25px rgba(0, 0, 0, 0.08)"
                  backdropFilter="blur(10px)"
                  whileHover={{
                    y: -10,
                    boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)',
                  }}
                >
                  <motion.div
                    style={{ fontSize: '56px', marginBottom: '16px' }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {product.emoji}
                  </motion.div>
                  <Heading as="h3" size="md" mb={2} color="gray.800">
                    {product.name}
                  </Heading>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      bgGradient="linear(to-r, #4f46e5, #ec4899)"
                      bgClip="text"
                      mb={4}
                    >
                      ₹{product.price}
                    </Text>
                  </motion.div>
                  <MotionButton
                    w="full"
                    bg="linear-gradient(135deg, #4f46e5, #7c3aed)"
                    color="white"
                    fontWeight="bold"
                    py={2}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </MotionButton>
                </MotionBox>
              </motion.div>
            ))}
          </Grid>

          <motion.div
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <RouterLink to="/products">
              <MotionButton
                bg="linear-gradient(135deg, #4f46e5, #7c3aed)"
                color="white"
                fontWeight="bold"
                px={8}
                py={6}
                fontSize="lg"
                borderRadius="lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Products
              </MotionButton>
            </RouterLink>
          </motion.div>
        </Container>
      </MotionBox>
    </Box>
  );
}
