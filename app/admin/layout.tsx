"use client"

import React, { ReactNode } from 'react'; 
import {
  IconButton, 
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue, 
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps, 
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  Avatar,
  MenuDivider
} from '@chakra-ui/react';
import {
  FiTruck, 
  FiMenu,
  FiBell, 
  FiChevronDown 
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import {  
  HiOutlinePresentationChartLine
} from 'react-icons/hi'; 
import Link from 'next/link'   
import { usePathname, useRouter } from 'next/navigation'; 
import { signOut  } from 'next-auth/react'; 
import { TiSocialTwitter } from "react-icons/ti";
import { useSession } from 'next-auth/react';  
import { BsFillSendFill } from "react-icons/bs";
import { LuSettings } from 'react-icons/lu';

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
  child?: Array<LinkItemProps>;
}
const LinkItems: Array<LinkItemProps> = [ 
  { name: 'Home', icon: FiBell, link: '/admin/home'  },   
];

const UserLayout = ({children}:{children:ReactNode})=> {
  const {colorMode} = useColorMode() 
  const { isOpen, onOpen, onClose } = useDisclosure();  
  const active = usePathname()
  const { data: session } = useSession();
  return (
    <> 
    <Box minH="100vh" bg="white">
    <SidebarContent
      active={active}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent >
          <SidebarContent onClose={onClose} 
            active={active}/> 
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} nama={session?.user?.name||"User"} 
      logout={()=>signOut({callbackUrl:"/", redirect:true})}/>
      <Box ml={{ base: 0, md: 60 }} p="5">
        {children}
      </Box>
    </Box> 
    </>
  )
}
interface SidebarProps extends BoxProps {
  onClose: () => void;
  active:string
}
const SidebarContent = ({ onClose,active, ...rest }: SidebarProps) => {
  const router = useRouter()
  return (
    <Box
      transition="1s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl"  fontWeight="bold" onClick={()=>router.push("/")} cursor={'pointer'}>
          
        <Icon
            mr="4"
            fontSize="45"
            color="blue.600"
            as={TiSocialTwitter}
        /> 
        Tuwiter
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link,index) => 
        (
          // pn close di sini
          <NavItem key={index} isActive={active.startsWith(link.link)} {...link}>
            {link.name} 
          </NavItem> 
        )  
      )}
    
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  isActive:boolean;
  children: string;
  link:string;
  child?: Array<LinkItemProps>;
}
const NavItem = ({ icon, link, isActive, children, ...rest }: NavItemProps) => {
  return (
    <>
    {/* {rest.child!=undefined && <DropdownSidebarMenu items={rest.child} isActive={isActive} name={children} icon={icon}/>} */}
    {rest.child==undefined && 
      <Link href={link} style={{ textDecoration: 'none' }} > 
        {!isActive &&  
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer" 
                _hover={{
                  bg:  useColorModeValue("cyan.300", "blue.600")
                }}
                {...rest}> 
                <Icon
                    mr="4"
                    fontSize="16"
                    as={icon}
                /> 
                <span className='w-3/4'>{children}</span>
            </Flex>
        }{
            isActive &&
             
            <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer" 
            bg = {useColorModeValue("cyan.300", "blue.600")} 
            {...rest}>
            {icon && ( 
            <Icon
                mr="4"
                fontSize="16" 
                as={icon}
            /> 
            )}
            {children}
        </Flex>
        }
        </Link>}
    </>
  );
};
interface MobileProps extends FlexProps {
  onOpen: () => void;
  nama: string;
  logout: () => void;
}
const MobileNav = ({ onOpen,nama,logout, ...rest }: MobileProps) => {
  const router = useRouter()
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      className='print:invisible'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        className='print:invisible'
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="xl"
        onClick={()=>router.push("/")}
        fontWeight="bold"
        cursor={'pointer'}>
        <Icon
            mr="4"
            fontSize="45"
            color="blue.600"
            as={TiSocialTwitter}
        />  
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}> 
        <Flex alignItems={'center'} className='print:invisible'>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size="sm"/>
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="md">{nama}</Text> 
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={()=>{signOut({callbackUrl:"/", redirect:true})}}>
                Keluar
              </MenuItem> 
            </MenuList>
          </Menu>
        </Flex>
        
      </HStack>
    </Flex>
  );
};
export default UserLayout