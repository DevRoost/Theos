import React from 'react';
import { Box, Button, Grid, Image, Text, Stack, Icon, Divider, Flex,IconButton } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import image from "../../../../assets/img/background-image.png"
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AppDetailsPage = ({ appdetails }) => {
    console.log("appdetails",appdetails)
    const appData = {
        name: appdetails?.name,
        tagline: appdetails?.appType,
        image: appdetails?.image,  // Replace with your image path
        description: appdetails?.description, 
        features: [
          { title: "Task Management", description: "Organize your tasks and get reminders." },
          { title: "Calendar Integration", description: "Sync your calendar with tasks and events." },
          { title: "Real-time Collaboration", description: "Work with your team on shared tasks." },
        ],
        useCase: appdetails?.useCase, 
        reviews: [
          { user: "Alice", rating: 5, comment: "Amazing app! It has helped me stay on top of my tasks." },
          { user: "Bob", rating: 4, comment: "Great features, but could use a better design." },
          { user: "Charlie", rating: 3, comment: "It works well, but there are some bugs." },
        ],
       
      };
      
      const images = [
        image,
        image,
        image,
      ];

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };
      const sliderRef = React.useRef(null);

    
  return (
    <Box p={6} maxW="1200px" mx="auto">
      {/* App Header Section */}
      <Flex   mb={6}>
        {/* App Image */}
       
        <Image src={appData.image} alt={appData.name} boxSize="100" objectFit="cover" borderRadius="md" />
        <Stack spacing={4} ml={6}>
          {/* App Title */}
          <Text fontSize="3xl" fontWeight="bold">{appData.name}</Text>
          <Text fontSize="lg" color="gray.600">{appData.tagline}</Text>
          {/* Download Button */}
          <Button colorScheme="teal" size="lg" width="max-content" >
            Download
          </Button>
        </Stack>
      </Flex>

      {/* Description Section */}
      <Box mb={6}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>Description</Text>
        <Text fontSize="md" color="gray.700">{appData.description}</Text>
      </Box>
      <Box mb={6}>
      <Box position="relative" maxW="1200px" mx="auto" mb={6}>
      {/* Custom Arrows */}
      <Flex position="absolute" top="50%" left="10px" transform="translateY(-50%)">
        <IconButton
          aria-label="Previous Slide"
          icon={<ArrowBackIcon />}
          onClick={() => sliderRef.current.slickPrev()}
          variant="ghost"
        />
      </Flex>

      <Slider ref={sliderRef}  {...settings}>
        {images.map((src, index) => (
          <Box key={index}>
            <Image src={src} alt={`Slide ${index + 1}`} height="300" width='100%' borderRadius="md" />
          </Box>
        ))}
      </Slider>

      <Flex position="absolute" top="50%" right="10px" transform="translateY(-50%)">
        <IconButton
          aria-label="Next Slide"
          icon={<ArrowForwardIcon />}
          onClick={() => sliderRef.current.slickNext()}
          variant="ghost"
        />
      </Flex>
    </Box>
      </Box>

      {/* Features Section */}
      <Box mb={6}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>Key Features</Text>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {appData.features.map((feature, idx) => (
            <Box key={idx} p={4} borderWidth="1px" borderRadius="lg" boxShadow="sm">
              <Icon as={FaStar} boxSize={6} color="teal.500" />
              <Text fontSize="lg" fontWeight="bold" mt={2}>{feature.title}</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>{feature.description}</Text>
            </Box>
          ))}
        </Grid>
      </Box>
        {/* Description Section */}
        <Box mb={6}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>Use Case</Text>
        <Text fontSize="md" color="gray.700">{appData.useCase}</Text>
      </Box>

      {/* Reviews Section */}
      {/* <Box mb={6}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>User Reviews</Text>
        <Stack spacing={4}>
          {appData.reviews.map((review, idx) => (
            <Box key={idx} p={4} borderWidth="1px" borderRadius="lg" boxShadow="sm">
              <Flex align="center" mb={2}>
                <Text fontSize="lg" fontWeight="bold">{review.user}</Text>
                <Flex ml={2}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={FaStar} boxSize={4} color={i < review.rating ? 'teal.400' : 'gray.300'} />
                  ))}
                </Flex>
              </Flex>
              <Text fontSize="sm" color="gray.600">{review.comment}</Text>
            </Box>
          ))}
        </Stack>
      </Box> */}

      {/* Footer Section with Call-to-Action */}
      <Box textAlign="center" mb={6}>
        <Button colorScheme="teal" size="lg" >
          Download App
        </Button>
      </Box>
    </Box>
  );
};

export default AppDetailsPage;
