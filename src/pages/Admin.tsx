import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const MotionBox = motion(Box);
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'caradmin123';

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

export default function Admin() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isUploadingRef = useRef(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(() => {
    // Check if user was previously authenticated
    return window.localStorage.getItem('adminAuthenticated') === 'true';
  });
  const [error, setError] = useState('');
  const [categorizedImages, setCategorizedImages] = useState<CategorizedImages>({
    services: {
      'Wheel Alignment': [],
      'Car Washing': [],
      'Tyres': [],
    },
    products: [],
  });
  const [selectedCategory, setSelectedCategory] = useState<'services' | 'products'>('services');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('Wheel Alignment');
  const [isUploading, setIsUploading] = useState(false);

  const cardBg = useColorModeValue('white', 'gray.900');
  const sectionBg = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    const stored = window.localStorage.getItem('adminCategorizedImages');
    if (stored) {
      setCategorizedImages(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('adminCategorizedImages', JSON.stringify(categorizedImages));
  }, [categorizedImages]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      window.localStorage.setItem('adminAuthenticated', 'true');
      setError('');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (isUploadingRef.current) return;

    const files = event.target.files;
    if (!files || files.length === 0) return;

    isUploadingRef.current = true;
    setIsUploading(true);

    try {
      const selectedFiles = Array.from(files);
      
      // Deduplicate files based on name and size to prevent duplicates
      const uniqueFiles = selectedFiles.filter((file, index, self) => 
        index === self.findIndex(f => f.name === file.name && f.size === file.size)
      );
      
      const newImages: UploadedImage[] = [];

      // Process files one by one to avoid race conditions
      for (const file of uniqueFiles) {
        const image = await new Promise<UploadedImage>((resolve, reject) => {
          const reader = new FileReader();
          let resolved = false;

          reader.onload = () => {
            if (resolved) return; // Prevent multiple calls
            resolved = true;

            if (typeof reader.result === 'string') {
              resolve({
                id: `${file.name}-${Date.now()}-${Math.random()}`,
                name: file.name,
                src: reader.result,
                category: selectedCategory,
                subcategory: selectedSubcategory,
              });
            } else {
              reject(new Error('Failed to read file.'));
            }
          };

          reader.onerror = () => {
            if (resolved) return;
            resolved = true;
            reject(new Error('Failed to read file.'));
          };

          reader.readAsDataURL(file);
        });

        newImages.push(image);
      }

      // Final deduplication of newImages array by ID
      const uniqueNewImages = newImages.filter((image, index, self) => 
        index === self.findIndex(img => img.id === image.id)
      );

      setCategorizedImages((prev) => {
        const updated = { ...prev };
        
        // Filter out any images that already exist to prevent duplicates
        const existingIds = new Set();
        if (selectedCategory === 'services') {
          updated.services[selectedSubcategory as keyof typeof updated.services].forEach(img => existingIds.add(img.id));
        } else {
          updated.products.forEach(img => existingIds.add(img.id));
        }
        
        const filteredNewImages = uniqueNewImages.filter(img => !existingIds.has(img.id));
        
        if (selectedCategory === 'services') {
          updated.services[selectedSubcategory as keyof typeof updated.services] = [
            ...filteredNewImages,
            ...updated.services[selectedSubcategory as keyof typeof updated.services],
          ];
        } else {
          updated.products = [...filteredNewImages, ...updated.products];
        }
        return updated;
      });
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('imagesUpdated'));
    } finally {
      event.target.value = '';
      isUploadingRef.current = false;
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (category: 'services' | 'products', subcategory: string, id: string) => {
    setCategorizedImages((prev) => {
      const updated = { ...prev };
      if (category === 'services') {
        updated.services[subcategory as keyof typeof updated.services] = 
          updated.services[subcategory as keyof typeof updated.services].filter((image) => image.id !== id);
      } else {
        updated.products = updated.products.filter((image) => image.id !== id);
      }
      return updated;
    });
  };

  return (
    <Container maxW="6xl" py={{ base: 8, md: 12 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box bg={cardBg} borderRadius="3xl" boxShadow="xl" p={{ base: 6, md: 10 }}>
          <Heading size="2xl" mb={4} textAlign="center">
            Admin Dashboard
          </Heading>
          <Text fontSize="lg" color="gray.500" mb={8} textAlign="center">
            Secure admin area for uploading photos from your phone or camera. Use the upload button below after login.
          </Text>

          {!authenticated ? (
            <Box bg={sectionBg} p={{ base: 6, md: 8 }} borderRadius="2xl">
              <form onSubmit={handleLogin}>
                <Stack spacing={5}>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="admin"
                      type="text"
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter admin password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  {error && (
                    <Text color="red.500" fontWeight="semibold">{error}</Text>
                  )}
                  <Button colorScheme="purple" size="lg" type="submit">
                    Log in as Admin
                  </Button>
                </Stack>
              </form>
            </Box>
          ) : (
            <Box>
              <Flex justify="space-between" align="center" mb={8} gap={4} direction={{ base: 'column', md: 'row' }}>
                <Box>
                  <Heading size="lg">Admin Dashboard</Heading>
                  <Text color="gray.500" mt={2}>
                    Manage uploaded images and content for your website.
                  </Text>
                </Box>
                <Button colorScheme="purple" size="md" onClick={() => {
                  setAuthenticated(false);
                  window.localStorage.removeItem('adminAuthenticated');
                }}>
                  Log out
                </Button>
              </Flex>

              <Tabs isFitted variant="soft-rounded" colorScheme="purple">
                <TabList mb={8} gap={3} flexWrap="wrap">
                  <Tab fontWeight="bold" _selected={{ bg: 'purple.500', color: 'white' }}>
                    📤 Upload Images
                  </Tab>
                  <Tab fontWeight="bold" _selected={{ bg: 'purple.500', color: 'white' }}>
                    🔧 Services ({Object.values(categorizedImages.services).flat().length})
                  </Tab>
                  <Tab fontWeight="bold" _selected={{ bg: 'purple.500', color: 'white' }}>
                    🛍️ Products ({categorizedImages.products.length})
                  </Tab>
                </TabList>

                <TabPanels>
                  {/* Upload Tab */}
                  <TabPanel>
                    <Box bg={sectionBg} p={{ base: 6, md: 8 }} borderRadius="2xl">
                      <Stack spacing={5}>
                  <FormControl>
                    <FormLabel>Select Category</FormLabel>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value as 'services' | 'products');
                        if (e.target.value === 'products') {
                          setSelectedSubcategory('Products');
                        } else {
                          setSelectedSubcategory('Wheel Alignment');
                        }
                      }}
                    >
                      <option value="services">Services</option>
                      <option value="products">Products</option>
                    </Select>
                  </FormControl>

                  {selectedCategory === 'services' && (
                    <FormControl>
                      <FormLabel>Select Service Type</FormLabel>
                      <Select
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                      >
                        <option value="Wheel Alignment">Wheel Alignment</option>
                        <option value="Car Washing">Car Washing</option>
                        <option value="Tyres">Tyres</option>
                      </Select>
                    </FormControl>
                  )}

                  <FormControl>
                    <FormLabel>Upload photos from phone</FormLabel>
                    <Flex gap={3} direction={{ base: 'column', md: 'row' }} align="flex-start">
                      <Button
                        colorScheme="purple"
                        onClick={() => fileInputRef.current?.click()}
                        size="lg"
                        isDisabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Upload from Phone'}
                      </Button>
                      <Text color="gray.500">Supports camera access on mobile devices.</Text>
                    </Flex>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      display="none"
                      onChange={handleFileChange}
                    />
                  </FormControl>

                  {/* Display uploaded images for current selection */}
                  <Box mt={6}>
                    <Heading size="sm" mb={4}>
                      {selectedCategory === 'services' 
                        ? `Uploaded ${selectedSubcategory} Images` 
                        : 'Uploaded Product Images'
                      }
                    </Heading>
                    {selectedCategory === 'services' && categorizedImages.services[selectedSubcategory as keyof typeof categorizedImages.services].length > 0 ? (
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                        {categorizedImages.services[selectedSubcategory as keyof typeof categorizedImages.services].map((image) => (
                          <Box key={image.id} bg="white" borderRadius="2xl" overflow="hidden" border="1px solid" borderColor="gray.200">
                            <Image src={image.src} alt={image.name} objectFit="cover" w="full" h="200px" />
                            <Flex p={3} justify="space-between" align="center">
                              <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
                                {image.name}
                              </Text>
                              <Button
                                size="sm"
                                onClick={() => handleRemoveImage('services', selectedSubcategory, image.id)}
                                variant="ghost"
                                colorScheme="red"
                              >
                                Remove
                              </Button>
                            </Flex>
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : selectedCategory === 'products' && categorizedImages.products.length > 0 ? (
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                        {categorizedImages.products.map((image) => (
                          <Box key={image.id} bg="white" borderRadius="2xl" overflow="hidden" border="1px solid" borderColor="gray.200">
                            <Image src={image.src} alt={image.name} objectFit="cover" w="full" h="200px" />
                            <Flex p={3} justify="space-between" align="center">
                              <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
                                {image.name}
                              </Text>
                              <Button
                                size="sm"
                                onClick={() => handleRemoveImage('products', 'Products', image.id)}
                                variant="ghost"
                                colorScheme="red"
                              >
                                Remove
                              </Button>
                            </Flex>
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <Text color="gray.500" textAlign="center" py={8}>
                        No images uploaded for {selectedCategory === 'services' ? selectedSubcategory : 'products'} yet.
                      </Text>
                    )}
                  </Box>

                </Stack>
              </Box>
            </TabPanel>

                  {/* Services Tab */}
                  <TabPanel>
                    <Box bg={sectionBg} p={{ base: 6, md: 8 }} borderRadius="2xl">
                      <Heading size="md" mb={6}>Uploaded Service Images</Heading>
                      {Object.keys(categorizedImages.services).some(key => categorizedImages.services[key as keyof typeof categorizedImages.services].length > 0) ? (
                        <Tabs isFitted variant="soft-rounded" colorScheme="blue" size="sm">
                          <TabList mb={6} gap={2} flexWrap="wrap">
                            {Object.entries(categorizedImages.services).map(([serviceType, images]) => (
                              images.length > 0 && (
                                <Tab key={serviceType} fontWeight="semibold">
                                  {serviceType} ({images.length})
                                </Tab>
                              )
                            ))}
                          </TabList>
                          <TabPanels>
                            {Object.entries(categorizedImages.services).map(([serviceType, images]) => (
                              images.length > 0 && (
                                <TabPanel key={serviceType}>
                                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                                    {images.map((image) => (
                                      <Box key={image.id} bg="white" borderRadius="2xl" overflow="hidden" border="1px solid" borderColor="gray.200">
                                        <Image src={image.src} alt={image.name} objectFit="cover" w="full" h="200px" />
                                        <Flex p={3} justify="space-between" align="center">
                                          <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
                                            {image.name}
                                          </Text>
                                          <Button
                                            size="sm"
                                            onClick={() => handleRemoveImage('services', serviceType, image.id)}
                                            variant="ghost"
                                            colorScheme="red"
                                          >
                                            Remove
                                          </Button>
                                        </Flex>
                                      </Box>
                                    ))}
                                  </SimpleGrid>
                                </TabPanel>
                              )
                            ))}
                          </TabPanels>
                        </Tabs>
                      ) : (
                        <Text color="gray.500" textAlign="center" py={8}>
                          No service images uploaded yet. Switch to the Upload tab to add images.
                        </Text>
                      )}
                    </Box>
                  </TabPanel>

                  {/* Products Tab */}
                  <TabPanel>
                    <Box bg={sectionBg} p={{ base: 6, md: 8 }} borderRadius="2xl">
                      <Heading size="md" mb={6}>Uploaded Product Images</Heading>
                      {categorizedImages.products.length > 0 ? (
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                          {categorizedImages.products.map((image) => (
                            <Box key={image.id} bg="white" borderRadius="2xl" overflow="hidden" border="1px solid" borderColor="gray.200">
                              <Image src={image.src} alt={image.name} objectFit="cover" w="full" h="200px" />
                              <Flex p={3} justify="space-between" align="center">
                                <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
                                  {image.name}
                                </Text>
                                <Button
                                  size="sm"
                                  onClick={() => handleRemoveImage('products', 'Products', image.id)}
                                  variant="ghost"
                                  colorScheme="red"
                                >
                                  Remove
                                </Button>
                              </Flex>
                            </Box>
                          ))}
                        </SimpleGrid>
                      ) : (
                        <Text color="gray.500" textAlign="center" py={8}>
                          No product images uploaded yet. Switch to the Upload tab to add images.
                        </Text>
                      )}
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          )}
        </Box>
      </MotionBox>
    </Container>
  );
}
