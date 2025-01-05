import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import Card from "components/card/Card.js";
import IframeContentLoader from "views/admin/default/components/IframeComponent";

export default function MarketplaceCard(props) {
  const { image, name, description, useCase, download, currentbid } = props.data;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");

  const [showWebview, setShowWebview] = useState(false);

  // Function to show the modal with iframe
  const handleShowWebView = () => {
    setShowWebview(true);
  };

  const handleCloseWebView = () => {
    setShowWebview(false);
  };

  // Determine image width based on the menuSelected
  const getImageWidth = () => {
    if (props.menuSelected === 'In-Apps') {
      return { base: "150px", "3xl": "350px" }; // Large images
    } else {
      return { base: "50px", "3xl": "200px" }; // Default size for other cases
    }
  };

  const getImageHeight = () => {
    if (props.menuSelected === 'In-Apps') {
      return { base: "150px", "3xl": "350px" }; // Large images
    } else {
      return { base: "50px", "3xl": "200px" }; // Default size for other cases
    }
  };

  return (
    <>
      <Card>
        <Flex
          direction={{ base: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap="30px"
          justify="left"
        >
          <Flex position="relative" direction="row" alignItems="center" >
            <Image
              src={image}
              w={getImageWidth()}  // Dynamically set the image width
              h={getImageHeight()}
              minW={getImageWidth()}     
            />
            <Flex direction="column" flexGrow={1}>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                ml="30px"
                fontWeight="bold"
                me="14px"
              >
                {name}
              </Text>
              {description && (
                <Text
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  ml="30px"
                  fontWeight="regular"
                  me="14px"
                  whiteSpace="normal"   // Ensure the description wraps properly
                  wordBreak="break-word" // Break words if necessary for long words
                  overflowWrap="break-word" // Ensure long words are wrapped
                >
                  {description}
                </Text>
              )}
            </Flex>
          </Flex>

          <Flex flexDirection="row" alignItems="center" h="100%">
            <Flex direction="column">
              <Link
                href={download}
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}
              >
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="70px"
                  px="24px"
                  py="5px"
                  onClick={handleShowWebView}
                >
                  Get
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {/* Modal for iframe */}
      <Modal isOpen={showWebview} onClose={handleCloseWebView} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justify="space-between" alignItems="center">
              {/* <span>Plato LDX</span> */}
              {/* <Button onClick={handleCloseWebView}>&times;</Button> */}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} m={0}>
            <IframeContentLoader />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
