import React, { useEffect, useState } from 'react';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Grid, Icon, Text, Center } from '@chakra-ui/react';
import { FaVideo } from 'react-icons/fa';
import Papa from 'papaparse';
import app1 from "assets/img/marketplace/a2.jpeg";
import app2 from "assets/img/marketplace/dax.jpeg";
import app3 from "assets/img/marketplace/hrx.jpeg";
import app4 from "assets/img/marketplace/itx.jpeg";
import app5 from "assets/img/marketplace/lcx.jpeg";
import app6 from "assets/img/marketplace/ldx.jpeg";
import MyAppStore from 'views/admin/marketplace';

const HomeMenu = (props) => {
  const [inappStoreData, setInAppsStoreData] = useState([]);
  const [inpartnerStoreData, setInPartnerStoreData] = useState([]);
  const [inenterpriseStoreData, setInenterpriseStoreData] = useState([]);
  const [menuSelected, setMenuSelected] = useState("Plato Apps");
  const [showSidebar, setShowSidebar] = useState(false);
  const [groupedData, setGroupedData] = useState({});
  const [platoappData, setPlatoappData] = useState([
    { name: "Plato A2", image: app1 },
    { name: "Plato DAX", image: app2 },
    { name: "Plato HRX", image: app3 },
    { name: "Plato ITX", image: app4 },
    { name: "Plato ICX", image: app5 },
    { name: "Plato LDX", image: app6 },
  ]);

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
      const associationType = row['Starkien Ecosystem Association Type']; 
      const category = row['Category']; 

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

    if (originalData) {
      const sections = Object.entries(originalData).map(([categoryName, items]) => ({
        categoryName,
        cards: items.map((item) => ({
          name: item["Starkien Product Names"],
          description: item["Description"],
          useCase: item["Use cases"],
          appType: item["Starkien Ecosystem Association Type"],
          starkeinPrdName: item["Starkien Product Names"],
          image: item["image"] || "path/to/default/image.jpg", 
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
    { name: "Plato Apps", appList: platoappData },
    { name: "In-Apps", appList: inappStoreData },
    { name: "Partner Apps", appList: inpartnerStoreData },
    { name: "Enterprise Apps", appList: inenterpriseStoreData },
  ];

  const handleTabChange = (index) => {
    const selectedMenu = menulist[index];
    setMenuSelected(selectedMenu);
    console.log("selectedMenu",selectedMenu)
    if (selectedMenu.name === "Plato Apps") {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };

  return (
    <Center sx={{width:"100%"}}>
      <Tabs  colorScheme="teal" onChange={handleTabChange} sx={{width:"100%"}}>
        <TabList
          position="sticky"
          top={0}
          zIndex={10}
          bg="white" // You can change the background color if needed
          boxShadow="sm" // Optional shadow for better visibility
        >
          {menulist.map((list, index) => (
            <Tab key={index}>
             
              <Text fontSize="sm">{list.name}</Text>
            </Tab>
          ))}
        </TabList>
        <TabPanels >
          {menulist.map((list, index) => (
            <TabPanel key={index}>
              <MyAppStore
                showSidebar={showSidebar}
                appList={list.appList}
                menuSelected={menuSelected}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default HomeMenu;
