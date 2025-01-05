import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  VStack,
  Text,
  SimpleGrid,
  Collapse,
} from "@chakra-ui/react";
import MarketplaceCard from "components/card/MarketplaceCard";

// Assets
import app1 from "assets/img/marketplace/a2.jpeg";
import app2 from "assets/img/marketplace/dax.jpeg";
import app3 from "assets/img/marketplace/hrx.jpeg";
import app4 from "assets/img/marketplace/itx.jpeg";
import app5 from "assets/img/marketplace/lcx.jpeg";
import app6 from "assets/img/marketplace/ldx.jpeg";

export default function Marketplace() {
  const [activeSection, setActiveSection] = useState("All");
  const [openSubmenu, setOpenSubmenu] = useState({});

  const toggleSubmenu = (sectionName) => {
    setOpenSubmenu((prev) => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  const menuSections = [
    { name: "All" },
    {
      name: "Categories",
      submenu: ["Tech", "Business", "Health"],
    },
    { name: "Favorites" },
    { name: "Settings" },
  ];

  const cardData = {
    All: [
      { name: "A2", image: app1 },
      { name: "DAX", image: app2 },
      { name: "HRX", image: app3 },
      { name: "ITX", image: app4 },
      { name: "LCX", image: app5 },
      { name: "LDX", image: app6 },
    ],
    Tech: [
      { name: "A2", image: app1 },
      { name: "DAX", image: app2 },
    ],
    Business: [
      { name: "HRX", image: app3 },
      { name: "ITX", image: app4 },
    ],
    Health: [
      { name: "LCX", image: app5 },
      { name: "LDX", image: app6 },
    ],
    Favorites: [],
    Settings: [],
  };

  const renderCards = () => {
    const cards = cardData[activeSection] || [];
    return cards.length ? (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="20px">
        {cards.map((card, index) => (
          <MarketplaceCard key={index} name={card.name} image={card.image} />
        ))}
      </SimpleGrid>
    ) : (
      <Text>No items to display</Text>
    );
  };

  return (
    <Box display="flex" minH="100vh">
      {/* Sidebar */}
      <Box bg="gray.100" width="20%" p={4} borderRight="1px solid gray">
        <VStack align="start" spacing={4}>
          {menuSections.map((section) => (
            <Box key={section.name} width="100%">
              <Button
                width="100%"
                variant={activeSection === section.name ? "solid" : "ghost"}
                colorScheme="teal"
                onClick={() => {
                  setActiveSection(section.name);
                  if (section.submenu) toggleSubmenu(section.name);
                }}
              >
                {section.name}
              </Button>
              {section.submenu && (
                <Collapse in={openSubmenu[section.name]} animateOpacity>
                  <VStack align="start" pl={4} spacing={2}>
                    {section.submenu.map((sub) => (
                      <Button
                        key={sub}
                        width="100%"
                        variant={activeSection === sub ? "solid" : "ghost"}
                        colorScheme="teal"
                        size="sm"
                        onClick={() => setActiveSection(sub)}
                      >
                        {sub}
                      </Button>
                    ))}
                  </VStack>
                </Collapse>
              )}
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={4}>
        <Grid gap="20px">{renderCards()}</Grid>
      </Box>
    </Box>
  );
}
