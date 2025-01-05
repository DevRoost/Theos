

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  useColorMode,
  useColorModeValue,
  Input,
  HStack,
} from '@chakra-ui/react';
import wallpaper1 from "../../../../assets/img/banner.png"
import wallpaper2 from "../../../../assets/img/background-image.png"
const SettingsComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [wallpaper, setWallpaper] = useState(null);
 

  const wallpapers = {
    default: wallpaper2,
    nature: wallpaper1,
  };


  useEffect(() => {
    const currentBackgroundImage = document.body.style.backgroundImage;
    const matchedWallpaper = Object.entries(wallpapers).find(([, url]) => currentBackgroundImage.includes(url));
    if (matchedWallpaper) {
      setWallpaper(matchedWallpaper[0]);
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${wallpapers[wallpaper] || wallpapers.default})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, [wallpaper]);

  return (
    <Box
     
      bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
      p={4}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
        p={6}
        rounded="md"
        shadow="md"
      >
        <FormControl mb={4}>
          <FormLabel>Theme</FormLabel>
          <Button onClick={toggleColorMode}>
            Switch to {colorMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </FormControl>
        <Box mt={4} display="flex" flexDirection="column" alignItems="left" width="100%" gap={4}>
        <h4>Wallpaper</h4>
        <Box display="flex" gap={4}>
        {Object.entries(wallpapers).map(([key, url]) => (
            <Image
              key={key}
              src={url}
              alt={`${key} Wallpaper`}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
              cursor="pointer"
              border={wallpaper === key ? '3px solid teal' : 'none'}
              onClick={() => {
                setWallpaper(key);
               
              }}
            />
          ))}
        </Box>
          
        </Box>

        
     
      </Flex>
    </Box>
  );
};

export default SettingsComponent;

