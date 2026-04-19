import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import './App.css'

const MotionBox = motion(Box);

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Router>
          <Box 
            display="flex" 
            flexDirection="column" 
            minH="100vh"
            position="relative"
            overflow="hidden"
          >
            {/* Animated Background */}
            <Box
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={-1}
              bg="linear-gradient(135deg, #f8f9fa 0%, #f0e6ff 50%, #fff5f0 100%)"
            />

            {/* Decorative Background Elements */}
            <motion.div
              style={{
                position: 'fixed',
                top: '-100px',
                right: '-100px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
                zIndex: -1,
              }}
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
              style={{
                position: 'fixed',
                bottom: '-50px',
                left: '-50px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
                zIndex: -1,
              }}
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
            />

            <Navbar />
            <MotionBox 
              as="main" 
              flex="1"
              w="full"
              position="relative"
              zIndex={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Container
                maxW="7xl"
                mx="auto"
                px={{ base: 4, sm: 6, lg: 8 }}
                py={{ base: 6, md: 10 }}
                w="full"
              >
                {/* Glass-morphism Container Wrapper */}
                <Box
                  position="relative"
                  bg="rgba(255, 255, 255, 0.6)"
                  backdropFilter="blur(8px)"
                  borderRadius="2xl"
                  border="1px solid rgba(255, 255, 255, 0.8)"
                  boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.1)"
                  p={{ base: 6, md: 8 }}
                  minH="auto"
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </Box>
              </Container>
            </MotionBox>
            <Footer />
          </Box>
        </Router>
      </Provider>
    </ChakraProvider>
  );
}


export default App;
