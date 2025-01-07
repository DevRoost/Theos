import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

export default function DialogComponent(props) {
  const [modalSize, setModalSize] = useState("lg"); // Default modal size
  const [isMinimized, setIsMinimized] = useState(false); // Tracks minimized state

  const closeModal = () => {
    props.close();
    resetModalState();
  };

  const minimizeModal = () => {
    setIsMinimized(true); // Minimize hides the content
  };

  const maximizeModal = () => {
    setModalSize(modalSize === "full" ? "lg" : "full"); // Toggle between full and normal size
    setIsMinimized(false); // Ensure content is visible when maximized
  };

  const restoreModal = () => {
    setModalSize("lg"); // Restore to default size
    setIsMinimized(false); // Show content
  };

  const resetModalState = () => {
    setModalSize("lg");
    setIsMinimized(false);
  };

  // Dynamic height and width for the modal
  const modalHeight = modalSize === "full" ? "92vh" : "auto"; // 90% of the viewport height when maximized, else auto
  const modalWidth = modalSize === "full" ? "100%" : "60vw"; // 100% width when maximized, else 60% width

  return (
    <Modal isOpen={props.open} onClose={closeModal} isCentered={false}>
      <ModalContent
        sx={{
          marginTop: modalSize === "full" ? "0px" : "10%",
          height: modalHeight, // Apply dynamic height
          width: modalWidth,   // Apply dynamic width
          maxWidth: modalSize === "full" ? "100%" : "60vw", // Ensure it doesn't exceed 100% width
          transition: "all 0.3s ease-in-out", // Smooth transition for size change
          maxHeight: "90vh", // Max height of the modal
          overflow: "visible", // Allow overflow within the modal itself
        }}
      >
        <ModalHeader >
          <Flex justifyContent="space-between" alignItems="center">
            <span>{props.header}</span>
            <Box>
              <Button
                size="xs"
                onClick={modalSize === "full" ? restoreModal : maximizeModal}
                mr={2}
                title="Maximize/Restore"
                fontSize="lg"
              >
                &#9744;
              </Button>
              <Button size="xs" onClick={closeModal} title="Close" fontSize="lg">
                &times;
              </Button>
            </Box>
          </Flex>
        </ModalHeader>

        {!isMinimized && (
          <ModalBody
            sx={{
              minHeight: "200px", // Set minimum height for content
              overflowY: "auto",  // Enable auto-scrolling when content overflows
              maxHeight: modalSize === "full" ? "100%" : "70vh",   // Max height for the body when not minimized
              paddingBottom: "1rem", // Ensure padding at the bottom of content
              touchAction: "auto", // Enable touch scrolling
            }}
          >
            {props.content}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
