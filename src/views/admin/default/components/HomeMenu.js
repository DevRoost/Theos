import React, { useEffect, useState } from 'react';
import { Box, Grid, Icon, Text, Center } from '@chakra-ui/react';
import { FaVideo } from 'react-icons/fa';
import Papa from 'papaparse'; // Install this with `npm install papaparse`
import app1 from "assets/img/marketplace/a2.jpeg";
import app2 from "assets/img/marketplace/dax.jpeg";
import app3 from "assets/img/marketplace/hrx.jpeg";
import app4 from "assets/img/marketplace/itx.jpeg";
import app5 from "assets/img/marketplace/lcx.jpeg";
import app6 from "assets/img/marketplace/ldx.jpeg";

const HomeMenu = (props) => {
  const [inappStoreData, setInAppsStoreData] = useState([]);
  const [inpartnerStoreData, setInPartnerStoreData] = useState([]);
  const [inenterpriseStoreData, setInenterpriseStoreData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [platoappData, setPlatoappData] = useState([
    { name: "Plato A2", image: app1 },
    { name: "Plato DAX", image: app2 },
    { name: "Plato HRX", image: app3 },
    { name: "Plato ITX", image: app4 },
    { name: "Plato ICX", image: app5 },
    { name: "Plato LDX", image: app6 },
  ]);

  // Fetch and group data from Google Sheets
  const fetchSheetData = async () => {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSpXJHBIpbFkhSzbPBBpjU17MrkGz69xMIWFlHdoL8wiki-Y7IEHf0AbYdgJRGoQF7S2y827Qxo9RQQ/pub?output=csv';

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true }).data;
      const groupedData = groupDataByCategoryAndAssociation(parsedData);
      setGroupedData(groupedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const groupDataByCategoryAndAssociation = (data) => {
    const groupedData = {};

    data.forEach((row) => {
      const associationType = row['Starkien Ecosystem Association Type']; // First-level grouping
      const category = row['Category']; // Second-level grouping

      if (!groupedData[associationType]) {
        groupedData[associationType] = {};
      }

      if (!groupedData[associationType][category]) {
        groupedData[associationType][category] = [];
      }

      groupedData[associationType][category].push(row);
    });

    return groupedData;
  };

  const groupByClickElement = (name) => {
    let originalData;
    if (name === "In-Apps") {
      originalData = groupedData["In-App Store"];
    }
    if (name === "Partner Apps") {
      originalData = groupedData["Partner Store"];
    }
    if (name === "Enterprise Apps") {
      originalData = groupedData["Enterprise App"];
    }

    console.log("originalData",originalData)
    if (originalData) {
      const sections = Object.entries(originalData).map(([categoryName, items]) => ({
        categoryName,
        cards: items.map((item) => ({
          name: item["Starkien Product Names"],
          description: item["Description"],
          useCase: item["Use cases"],
          appType: item["Starkien Ecosystem Association Type"],
          starkeinPrdName: item["Starkien Product Names"],
          image: item["image"] || "path/to/default/image.jpg", // Add a default image if missing
        })),
      }));

      return sections;
    } else {
      console.warn("No data found for the selected menu.");
      return [];
    }
  };

  useEffect(() => {
    fetchSheetData();
  }, []);

  useEffect(() => {
    if (Object.keys(groupedData).length > 0) {
      const sectionData = groupByClickElement("In-Apps");
      setInAppsStoreData(sectionData);
      const partnerApps = groupByClickElement("Partner Apps");
      setInPartnerStoreData(partnerApps);
      const enterpriseApp = groupByClickElement("Enterprise Apps");
      setInenterpriseStoreData(enterpriseApp);
    }
  }, [groupedData]);

  const menulist = [
    { name: "Plato Apps", clickevent: props?.handlePlatoAppsClick, appList: platoappData },
    { name: "In-Apps", clickevent: props?.handlePlatoAppsClick, appList: inappStoreData },
    { name: "⁠Partner Apps", clickevent: props?.handlePlatoAppsClick, appList: inpartnerStoreData },
    { name: "⁠Enterprise Apps", clickevent: props?.handlePlatoAppsClick, appList: inenterpriseStoreData },
  ];

  const handleMenuButton = (menuItem) => {
    menuItem.clickevent();
    props.handleMenuClick(menuItem);
  };

  return (
    <Center>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
        maxW="500px"
        w="full"
        p={4}
        borderRadius="lg"
      >
        {menulist.map((list, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            border="1px solid #e0e0e0"
            borderRadius="lg"
            cursor="pointer"
            _hover={{
              bg: '#f0f0f0',
              boxShadow: 'md',
            }}
            onClick={() => handleMenuButton(list)}
          >
            <Icon as={FaVideo} boxSize={10} color="#0078d4" mb={3} />
            <Text fontSize="sm" color="gray.600">{list.name}</Text>
          </Box>
        ))}
      </Grid>
    </Center>
  );
};

export default HomeMenu;
