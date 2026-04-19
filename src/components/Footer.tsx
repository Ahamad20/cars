import { motion } from 'framer-motion';
import { Box, Container, Grid, GridItem, Text, VStack, Link, Divider, Flex } from '@chakra-ui/react';

const MotionBox = motion(Box);
const MotionText = motion(Text);

export default function Footer() {
  return (
    <MotionBox
      as="footer"
      mt={12}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Main Footer Content */}
      <Box 
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #3f3f4e 50%, #2d1b4e 100%)',
        }}
        py={12}
      >
        <Container maxW="7xl" px={4}>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
            mb={8}
          >
            {/* Brand Section */}
            <GridItem>
              <VStack align="flex-start" gap={3}>
                <MotionText
                  fontSize="2xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, #fbbf24, #ec4899)"
                  bgClip="text"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  🚗 CarDecor
                </MotionText>
                <Text color="gray.400" fontSize="sm" lineHeight="1.6">
                  Your ultimate destination for premium car decorations and professional services. Transform your vehicle with style and elegance.
                </Text>
              </VStack>
            </GridItem>

            {/* Quick Links */}
            <GridItem>
              <VStack align="flex-start" gap={4}>
                <MotionText
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Quick Links
                </MotionText>
                <VStack align="flex-start" gap={2}>
                  {['Home', 'Services', 'Products', 'Contact', 'Cart'].map((link, i) => (
                    <motion.div
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                    >
                      <Link
                        href="#"
                        color="gray.400"
                        _hover={{
                          color: '#fbbf24',
                          textDecoration: 'none',
                        }}
                        transition="color 0.3s"
                      >
                        {link}
                      </Link>
                    </motion.div>
                  ))}
                </VStack>
              </VStack>
            </GridItem>

            {/* Contact Section */}
            <GridItem>
              <VStack align="flex-start" gap={4}>
                <MotionText
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Get in Touch
                </MotionText>
                <VStack align="flex-start" gap={3}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.300">
                        📧 Email
                      </Text>
                      <Link
                        href="mailto:info@cardecor.com"
                        color="gray.400"
                        fontSize="sm"
                        _hover={{ color: '#fbbf24' }}
                      >
                        info@cardecor.com
                      </Link>
                    </Box>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.300">
                        📞 Phone
                      </Text>
                      <Link
                        href="tel:+18008002336"
                        color="gray.400"
                        fontSize="sm"
                        _hover={{ color: '#fbbf24' }}
                      >
                        +1-800-CAR-DECOR
                      </Link>
                    </Box>
                  </motion.div>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>

          {/* Divider */}
          <Divider borderColor="rgba(255, 255, 255, 0.1)" my={8} />

          {/* Bottom Section */}
          <Flex
            justify="space-between"
            align="center"
            flexDir={{ base: 'column', md: 'row' }}
            gap={4}
          >
            <MotionText
              fontSize="sm"
              color="gray.500"
              textAlign={{ base: 'center', md: 'left' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              © 2026 CarDecor. All rights reserved. | Premium Car Solutions
            </MotionText>

            {/* Social Links */}
            <Flex gap={4}>
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <motion.div
                  key={social}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href="#"
                    w="40px"
                    h="40px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    bg="rgba(251, 191, 36, 0.1)"
                    color="#fbbf24"
                    _hover={{
                      bg: '#fbbf24',
                      color: '#1e293b',
                    }}
                    transition="all 0.3s"
                    fontSize="lg"
                  >
                    {social[0]}
                  </Link>
                </motion.div>
              ))}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Top Accent Border */}
      <motion.div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, #fbbf24, #ec4899, #9333ea, #fbbf24)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </MotionBox>
  );
}
