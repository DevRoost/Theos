import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  VStack,
  Collapse,
  Text,
} from "@chakra-ui/react";
import MarketplaceCard from "components/card/MarketplaceCard";
import Sidebar from "components/sidebar/Sidebar";


export default function Marketplace({showSidebar,appList,menuSelected}) {
  console.log("showSidebar",showSidebar )
  const [activeSection, setActiveSection] = useState(appList[0]?.categoryName || "Conversational AI");
  const [openSubmenu, setOpenSubmenu] = useState({});

  // Toggle the visibility of submenu
  const toggleSubmenu = (sectionName) => {
    setOpenSubmenu((prev) => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  // Render the cards of the active section
  const renderCards = () => {
    if(!showSidebar){
      return appList || [];
    }
    console.log("appList",appList,activeSection )
    const section = appList?.find((app) => app.categoryName === activeSection);
    return section?.cards || [];
  };

  const getGridTemplateColumns = () => {
    switch(menuSelected) {
     
      case 'In-Apps':
        return {
          base: "repeat(1, 1fr)"
        };
      default:
        return {
          sm: "repeat(auto-fit, minmax(200px, 1fr))",
          md: "repeat(auto-fit, minmax(250px, 1fr))",
          xl: "repeat(auto-fit, minmax(300px, 1fr))",
          "2xl": "repeat(auto-fit, minmax(max-content, 1fr))",
        };
    }
  };

  // Render the content of the active section
  const renderContent = () => {
    const cards = renderCards();
    if (cards.length > 0) {
      return (
       
        <SimpleGrid
          gridTemplateColumns={getGridTemplateColumns()}
          spacing="20px"
        >
          {cards.map((apps, index) => (
            <MarketplaceCard key={index} 
            data={apps}
            menuSelected={menuSelected}
             />
          ))}
        </SimpleGrid>
      );
    }

    const section = appList?.find((section) => section.categoryName === activeSection);
    return <Text>{section?.content || "No content available."}</Text>;
  };

  return (
    <Box display="flex">
      {showSidebar && (
        <Box width="max-content"  borderRight="1px solid gray">
          <VStack align="start" >
            {appList?.map((section) => (
              <Box key={section.categoryName} width="100%">
                <Button
                  width="100%"
                 justifyContent="flex-start"
                 borderRadius="0"
                  variant={activeSection === section.categoryName ? "solid" : "ghost"}
                  colorScheme="teal"
                  onClick={() => {
                    setActiveSection(section.categoryName);
                    if (section.submenu) toggleSubmenu(section.categoryName);
                  }}
                >
                  {section.categoryName}
                </Button>
                {/* {section?.submenu && (
                  <Collapse in={openSubmenu[section.categoryName]} animateOpacity>
                    <VStack align="start" pl={4} spacing={2}>
                      {section.submenu.map((sub) => (
                        <Button
                          key={sub.categoryName}
                          variant={activeSection === sub.categoryName ? "solid" : "ghost"}
                          colorScheme="teal"
                          size="sm"
                          onClick={() => setActiveSection(sub.categoryName)}
                        >
                          {sub.categoryName}
                        </Button>
                      ))}
                    </VStack>
                  </Collapse>
                )} */}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
      <Box flex={1} p={4}>
        {renderContent()}
      </Box>
    </Box>
  );
}
