import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { motion } from 'framer-motion';
import { Box, Flex, Button, Text, VStack, Container, Badge } from '@chakra-ui/react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Services', path: '/services', icon: '🔧' },
    { name: 'Products', path: '/products', icon: '🛍️' },
    { name: 'Contact', path: '/contact', icon: '📞' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const MotionBox = motion(Box);
  const MotionButton = motion(Button);

  return (
    <MotionBox
      as="nav"
      position="sticky"
      top={0}
      zIndex={50}
      style={{
        background: 'linear-gradient(to right, #4f46e5, #9333ea, #ec4899)',
      }}
      boxShadow="0 20px 25px rgba(0, 0, 0, 0.2)"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container maxW="7xl" px={4}>
        <Flex justify="space-between" align="center" h="80px">
          {/* Logo */}
          <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div
              style={{ fontSize: '32px' }}
              whileHover={{ scale: 1.15, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              🚗
            </motion.div>
            <VStack gap={0} align="flex-start">
              <Text fontSize="2xl" fontWeight="bold" color="white">
                Devi Car Services
              </Text>
              <Text fontSize="xs" color="whiteAlpha.800">
                Premium Auto Solutions
              </Text>
            </VStack>
          </RouterLink>

          {/* Desktop Navigation */}
          <Flex gap={2} display={{ base: 'none', lg: 'flex' }}>
            {navItems.map((item) => (
              <Box key={item.path} position="relative">
                <RouterLink to={item.path} style={{ textDecoration: 'none' }}>
                  <MotionButton
                    variant="ghost"
                    color="white"
                    fontSize="1rem"
                    fontWeight="semibold"
                    display="flex"
                    gap={2}
                    px={4}
                    py={2}
                    borderRadius="lg"
                    bg={isActive(item.path) ? 'rgba(255,255,255,0.25)' : 'transparent'}
                    _hover={{
                      bg: 'rgba(255,255,255,0.15)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    {item.name}
                  </MotionButton>
                </RouterLink>
                {isActive(item.path) && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '16px',
                      right: '16px',
                      height: '4px',
                      borderRadius: '9999px',
                      background: 'linear-gradient(90deg, #fcd34d, #ffffff)',
                    }}
                    layoutId="navUnderline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Box>
            ))}
          </Flex>

          {/* Desktop Cart Button */}
          <Flex gap={4} display={{ base: 'none', md: 'flex' }} align="center">
            <RouterLink to="/admin" style={{ textDecoration: 'none' }}>
              <MotionButton
                px={6}
                py={2}
                color="white"
                fontWeight="bold"
                borderRadius="full"
                display="flex"
                gap={2}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Admin Login
              </MotionButton>
            </RouterLink>
            <RouterLink to="/cart" style={{ textDecoration: 'none' }}>
              <MotionButton
                position="relative"
                px={6}
                py={2}
                color="gray.900"
                fontWeight="bold"
                borderRadius="full"
                display="flex"
                gap={2}
                style={{
                  background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
                  boxShadow: '0 20px 25px rgba(251, 191, 36, 0.4)',
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span style={{ fontSize: '18px' }}>🛒</span>
                <Text display={{ base: 'none', sm: 'inline' }} fontSize="sm">
                  ₹{totalPrice.toFixed(2)}
                </Text>

                {cartItems.length > 0 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '-12px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: '2px solid white',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {cartItems.length}
                  </motion.div>
                )}
              </MotionButton>
            </RouterLink>
          </Flex>

          {/* Mobile Menu Items */}
          <Flex gap={3} display={{ base: 'flex', lg: 'none' }}>
            {/* Mobile Cart Icon */}
            <RouterLink to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
              <MotionButton
                variant="ghost"
                color="white"
                fontSize="2xl"
                p={2}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                🛒
                {cartItems.length > 0 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {cartItems.length}
                  </motion.div>
                )}
              </MotionButton>
            </RouterLink>

            {/* Hamburger Menu */}
            <MotionButton
              display={{ base: 'flex', lg: 'none' }}
              variant="ghost"
              color="white"
              fontSize="lg"
              p={2}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </MotionButton>
          </Flex>
        </Flex>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VStack py={4} align="stretch" gap={2}>
              {navItems.map((item) => (
                <RouterLink key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                  <Button
                    w="full"
                    display="flex"
                    gap={2}
                    px={4}
                    py={3}
                    borderRadius="lg"
                    fontWeight="semibold"
                    color="white"
                    bg={isActive(item.path) ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0)'}
                    _hover={{
                      bg: 'rgba(255,255,255,0.20)',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    {item.name}
                  </Button>
                </RouterLink>
              ))}

              {/* Mobile Cart Link */}
              <RouterLink to="/admin" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                  w="full"
                  color="white"
                  fontWeight="bold"
                  px={4}
                  py={3}
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    backdropFilter: 'blur(12px)',
                  }}
                  _hover={{ background: 'rgba(255, 255, 255, 0.25)' }}
                >
                  Admin Login
                </Button>
              </RouterLink>
              <RouterLink to="/cart" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                  w="full"
                  color="gray.900"
                  fontWeight="bold"
                  px={4}
                  py={3}
                  borderRadius="lg"
                  display="flex"
                  justifyContent="space-between"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
                    boxShadow: '0 4px 6px rgba(251, 191, 36, 0.3)',
                  }}
                >
                  <Flex gap={2} align="center">
                    <span style={{ fontSize: '18px' }}>🛒</span>
                    <Text>Cart</Text>
                  </Flex>
                  <Flex gap={2} align="center">
                    <Text fontSize="sm" fontWeight="bold">
                      ₹{totalPrice.toFixed(2)}
                    </Text>
                    {cartItems.length > 0 && (
                      <Badge colorScheme="red" borderRadius="full">
                        {cartItems.length}
                      </Badge>
                    )}
                  </Flex>
                </Button>
              </RouterLink>
            </VStack>
          </motion.div>
        )}
      </Container>

      {/* Animated Bottom Border */}
      <motion.div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, #fcd34d, #f472b6, #c084fc)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </MotionBox>
  );
}
