import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const MotionBox = motion(Box);

const wheelAlignmentImages = [
  new URL('../assets/wheelalignment/car1.webp', import.meta.url).href,
  new URL('../assets/wheelalignment/car2.webp', import.meta.url).href,
  new URL('../assets/wheelalignment/car3.webp', import.meta.url).href,
  new URL('../assets/wheelalignment/car4.jpg', import.meta.url).href,
  new URL('../assets/wheelalignment/car5.jpg', import.meta.url).href,
  new URL('../assets/wheelalignment/car6.jpg', import.meta.url).href,
];

const carWashingImages = [
  new URL('../assets/washing/wash1.jpg', import.meta.url).href,
  new URL('../assets/washing/wash2.jpg', import.meta.url).href,
  new URL('../assets/washing/wash3.jpg', import.meta.url).href,
];

const tyreImages = [
  new URL('../assets/tyres/tyre1.jpg', import.meta.url).href,
  new URL('../assets/tyres/tyre2.jpg', import.meta.url).href,
  new URL('../assets/tyres/tyre3.webp', import.meta.url).href,
  new URL('../assets/tyres/tyre4.webp', import.meta.url).href,
];

const tabs = ['Wheel Alignment', 'Car Washing', 'Tyres'] as const;

type ServiceTab = (typeof tabs)[number];

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

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
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

  const serviceTabs: Record<ServiceTab, { title: string; description: string; images: string[] }> = {
    'Wheel Alignment': {
      title: 'Precision Wheel Alignment',
      description: 'Keep your vehicle driving straight with expert wheel alignment services that improve safety and tire life.',
      images: [...wheelAlignmentImages, ...uploadedImages.services['Wheel Alignment'].map(img => img.src)],
    },
    'Car Washing': {
      title: 'Showroom Car Washing',
      description: 'High-quality wash packages with shine-enhancing finishes and gentle care for your paint.',
      images: [...carWashingImages, ...uploadedImages.services['Car Washing'].map(img => img.src)],
    },
    Tyres: {
      title: 'Premium Tyre Services',
      description: 'Tyre replacement, balancing, and inspection for maximum handling and comfort.',
      images: [...tyreImages, ...uploadedImages.services['Tyres'].map(img => img.src)],
    },
  };

  const activeTabKey = tabs[activeTab];
  const activeImages = serviceTabs[activeTabKey].images;

  const bg = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.900');

  const currentImage = useMemo(() => activeImages[activeSlide % activeImages.length], [activeImages, activeSlide]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setActiveSlide(0);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % activeImages.length);
  };

  const services = [
    {
      id: 1,
      name: 'Paint Protection',
      description: 'Professional ceramic coating and paint protection film application',
      price: '₹299',
      emoji: '🛡️',
    },
    {
      id: 2,
      name: 'Window Tinting',
      description: 'Premium window tinting for style and heat protection',
      price: '₹199',
      emoji: '🕶️',
    },
    {
      id: 3,
      name: 'LED Installation',
      description: 'Custom LED light installation for interior and exterior',
      price: '₹249',
      emoji: '💡',
    },
    {
      id: 4,
      name: 'Wrap Installation',
      description: 'Professional vinyl wrap installation for complete car transformation',
      price: '₹799',
      emoji: '🎨',
    },
    {
      id: 5,
      name: 'Audio System',
      description: 'High-quality sound system installation and upgrades',
      price: '₹499',
      emoji: '🔊',
    },
    {
      id: 6,
      name: 'Detailing Service',
      description: 'Professional car detailing and polishing service',
      price: '₹149',
      emoji: '✨',
    },
  ];

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
    <Box w="full" bg={bg}>
      <MotionBox
        bg="linear-gradient(135deg, #1e293b 0%, #4338ca 50%, #d946ef 100%)"
        color="white"
        py={{ base: 14, md: 20 }}
        px={{ base: 4, md: 8 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container maxW="7xl">
          <Heading as="h1" size="2xl" mb={4} letterSpacing="tight">
            Our Services
          </Heading>
          <Text fontSize="lg" maxW="3xl" color="rgba(255,255,255,0.85)">
            Professional car decoration and service solutions designed to keep your vehicle looking sharp and running smoothly.
          </Text>
        </Container>
      </MotionBox>

      <Container maxW="7xl" py={{ base: 10, md: 16 }}>
        <Box bg={cardBg} borderRadius="3xl" boxShadow="lg" p={{ base: 6, md: 10 }}>
          <Tabs index={activeTab} onChange={handleTabChange} isFitted variant="soft-rounded" colorScheme="purple">
            <TabList mb={8} gap={3} flexWrap="wrap">
              {tabs.map((label) => (
                <Tab key={label} fontWeight="bold" _selected={{ bg: 'purple.500', color: 'white' }}>
                  {label}
                </Tab>
              ))}
            </TabList>

            {/* Update Notification */}
            {showUpdateNotification && (
              <Alert status="success" mb={6} borderRadius="lg">
                <AlertIcon />
                <Box>
                  <AlertTitle>Content Updated!</AlertTitle>
                  <AlertDescription>
                    New images have been added to our services. Check out the latest updates!
                  </AlertDescription>
                </Box>
              </Alert>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <Flex justify="center" align="center" py={8}>
                <Spinner size="lg" color="purple.500" />
                <Text ml={3}>Loading services...</Text>
              </Flex>
            )}

            <TabPanels>
              {tabs.map((label) => (
                <TabPanel key={label} p={0}>
                  <Flex direction={{ base: 'column', md: 'row' }} gap={8} alignItems="center">
                    <Box flex="1">
                      <Heading size="xl" mb={4}>
                        {serviceTabs[label as ServiceTab].title}
                      </Heading>
                      <Text fontSize="lg" color="gray.600" mb={6}>
                        {serviceTabs[label as ServiceTab].description}
                      </Text>
                      <Flex gap={2} alignItems="center" direction={{ base: 'column', md: 'row' }} w="full">
                        <Button 
                          colorScheme="purple" 
                          variant="outline" 
                          size={{ base: 'md', md: 'lg' }} 
                          onClick={handlePrev}
                          w={{ base: 'full', md: 'auto' }}
                        >
                          ← <Text display={{ base: 'none', md: 'inline' }} ml={2}>Previous</Text>
                        </Button>
                        <Button 
                          colorScheme="purple"  
                          size={{ base: 'md', md: 'lg' }} 
                          onClick={handleNext}
                          w={{ base: 'full', md: 'auto' }}
                        >
                          <Text display={{ base: 'none', md: 'inline' }} mr={2}>Next</Text> →
                        </Button>
                      </Flex>
                    </Box>

                    <Box flex="1" position="relative">
                      <Box
                        borderRadius="2xl"
                        overflow="hidden"
                        boxShadow="2xl"
                        border="1px solid"
                        borderColor="purple.100"
                      >
                        <Image
                          src={currentImage}
                          alt={`${label} example image`}
                          objectFit="cover"
                          w="full"
                          h={{ base: '280px', md: '420px' }}
                        />
                      </Box>
                      <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
                        {activeSlide + 1} / {activeImages.length} images
                      </Text>
                    </Box>
                  </Flex>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Container>

      <Container maxW="7xl" py={{ base: 10, md: 16 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {services.map((service) => (
              <MotionBox
                key={service.id}
                bg="white"
                rounded="3xl"
                p={8}
                shadow="lg"
                whileHover={{ y: -10, boxShadow: '0 24px 60px rgba(79,70,229,0.15)' }}
                variants={itemVariants}
              >
                <Text fontSize="4xl" mb={4}>
                  {service.emoji}
                </Text>
                <Heading size="md" mb={3}>
                  {service.name}
                </Heading>
                <Text color="gray.600" mb={6}>
                  {service.description}
                </Text>
                <Flex align="center" justify="space-between">
                  <Text fontSize="2xl" fontWeight="extrabold" color="purple.600">
                    {service.price}
                  </Text>
                  <Button colorScheme="purple" variant="solid" size="md">
                    Book Now
                  </Button>
                </Flex>
              </MotionBox>
            ))}
          </SimpleGrid>
        </motion.div>
      </Container>

      <Box bg={useColorModeValue('purple.50', 'gray.900')} py={{ base: 10, md: 14 }}>
        <Container maxW="7xl" textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading size="xl" mb={4}>
              Ready to Transform Your Car?
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
              Contact us today for a free consultation and let the experts handle your vehicle with premium care.
            </Text>
            <Button colorScheme="purple" size="lg">
              Get Free Consultation
            </Button>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}
