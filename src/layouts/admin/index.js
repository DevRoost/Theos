// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState,useEffect } from 'react';

import DialogComponent from 'views/admin/default/components/DialogComponent';
import MyAppStore from 'views/admin/marketplace';
import SettingComponent from 'views/admin/default/components/SettingComponent';
import wallpaperdefault from "../../assets/img/background-image.png"
import HomeMenu from 'views/admin/default/components/HomeMenu';

import Papa from 'papaparse'; // Install this with `npm install papaparse`

// Custom Chakra theme
export default function Dashboard(props) {

  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [platoAppStore, setplatoAppStore] = useState(false);
  const [settingVisible, setSettingVisible ] = useState(false)
  const [ homeMenuVisible, setHomeMenuVisible] = useState(false)
  const [ showSidebar, setShowSidebar] = useState(false)
  const [ menuSelected, setMenuSelected ] = useState("Plato Apps")
  const [appListData, setAppListData] = useState([])


  const handleLogoClick = () => {
    setChatbotVisible((prev) => !prev);

    if (!document.getElementById('chatbot-iframe')) {
      // Dynamically inject the script
      const script = document.createElement('script');
      script.src = 'https://chatbot.speakdaddy.com/embed.iframe.js';
      script.charset = 'utf-8';
      document.body.appendChild(script);

      // Configure the chatbot
      window.chatpilotIframeConfig = {
        chatbotId: '9ff9f531b2fe415d8ff48685c6913263',
        domain: 'https://chatbot.speakdaddy.com',
      };
    }
  };


  // const handleAppStoreClick = () => {
  //   setplatoAppStore(true);
  // }

  const handleAppStoreClose = () => {
    setplatoAppStore(false);
  }


  const handleSettingClick = () => {
    setSettingVisible(true);
  }

  const handleSettingClose = () => {
    setSettingVisible(false);
  }
  const handleHomeMenu = () => {
    setHomeMenuVisible(true);
  }

  const handleHomeMenuClose = () => {
    setHomeMenuVisible(false);
  }

  const handlePlatoAppsClick = () => {
    setplatoAppStore(true)
    setShowSidebar(false)
  }

  const handleInappsClick = () => {
    setplatoAppStore(true)
    setShowSidebar(true)
  }
  

  const handleMenuClick = (menuItem) => {
    console.log("menuItem",menuItem)
    setMenuSelected(menuItem.name)
    setAppListData(menuItem.appList)
    if(menuItem.name == "Plato Apps"){
      handlePlatoAppsClick()
    }
    else if(menuItem.name = "In-Apps"){
      handleInappsClick()
    } else if(menuItem.name = "Partner Apps"){
      handleInappsClick()
    }else if(menuItem.name = "⁠Enterprise Apps"){
      handleInappsClick()
    }
  }
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);


  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  document.documentElement.dir = 'ltr';

  useEffect(() => {
    document.body.style.backgroundImage = `url(${wallpaperdefault})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, []);

  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          {/* <Sidebar routes={routes} display="none" {...rest} /> */}
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: '100%',}}
            maxWidth={{ base: '100%' }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={'Theos'}
                  handleLogoClick={handleLogoClick}
                  // handleAppStoreClick={handleAppStoreClick}
                  handleSettingClick = {handleSettingClick}
                  handleHomeMenu={handleHomeMenu}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

          
           
          </Box>
        </SidebarContext.Provider>
      </Box>
      {platoAppStore && <DialogComponent open={platoAppStore}  close={handleAppStoreClose}
       header={menuSelected}
      content={
      <MyAppStore
      showSidebar = {showSidebar}
      appList={appListData}
      menuSelected={menuSelected}
      
      />} />}
      {settingVisible && <DialogComponent open={settingVisible}  close={handleSettingClose} header="Settings" content={<SettingComponent />} />}
      {homeMenuVisible && <DialogComponent open={homeMenuVisible}  close={handleHomeMenuClose} header="Settings" 
      content={<HomeMenu
        handlePlatoAppsClick={handlePlatoAppsClick}
        handleMenuClick = {handleMenuClick}
         />}
      /> }
      {chatbotVisible && (
        <iframe
          allow="microphone"
          src="https://chatbot.speakdaddy.com/chatbot-iframe/9ff9f531b2fe415d8ff48685c6913263"
          id="chatbot-iframe"
          style={{
           
            borderRadius:"20px",
            width: '460px',
            height: '600px',
            position: 'fixed',
            bottom: '10px',
            right: '20px',
            zIndex: 1000,
          }}
          frameBorder="0"
        ></iframe>
      )}
    </Box>
  );
}
