// Chakra Imports
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';

export default function AdminNavbar(props) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', changeNavbar);

		return () => {
			window.removeEventListener('scroll', changeNavbar);
		};
	});

	const { secondary, message, brandText } = props;

	let navbarPosition = 'fixed';
	let navbarFilter = 'none';
	let navbarBackdrop = 'blur(20px)';
	let navbarShadow = 'none';
	let navbarBorder = 'transparent';
	let secondaryMargin = '0px';
	let gap = '0px';
	const changeNavbar = () => {
		if (window.scrollY > 1) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	const [isPopup, setIsPopup] = useState(false);

	useEffect(() => {
		// Check if the current window was opened by another window
		if (window.opener) {
			setIsPopup(true);
		}
	}, []);

	return (
		<>
			{!isPopup && (
				// Conditionally hide the component if it's a popup window
				// <div>Popup window content hidden here</div>


				<Box
					position={navbarPosition}
					boxShadow={navbarShadow}
					// bg={navbarBg}
					borderColor={navbarBorder}
					
					backgroundPosition='center'
					backgroundSize='cover'
					borderRadius='40px'
					borderWidth='1.5px'
					borderStyle='solid'
					transitionDelay='0s, 0s, 0s, 0s'
					transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
					transition-property='box-shadow, background-color, filter, border'
					transitionTimingFunction='linear, linear, linear, linear'
					alignItems={{ xl: 'center' }}
					display={secondary ? 'block' : 'flex'}

					justifyContent={{ xl: 'center' }}
					lineHeight='25.6px'
					mx='auto'
					mt={secondaryMargin}

					right='0px'
					left='0px'
					bottom='10px'



					w={{
						base: "auto",
					}}
				>
					<Flex
						w='100%'
						flexDirection={{
							sm: 'column',
							md: 'row'
						}}
						alignItems={{ xl: 'center' }}
						mb={gap}>

						<Box ms='auto' w={{ sm: '100%', }} >
							<AdminNavbarLinks
								onOpen={props.onOpen}
								logoText={props.logoText}
								handleLogoClick={props.handleLogoClick}
								handleAppStoreClick={props.handleAppStoreClick}
								handleSettingClick={props.handleSettingClick}
								handleHomeMenu={props.handleHomeMenu}
								fixed={props.fixed}
								scrolled={scrolled}
							/>
						</Box>
					</Flex>
					{secondary ? <Text color='white'>{message}</Text> : null}
					<div>

					</div>
				</Box>
			)}
		</>
	);
}

