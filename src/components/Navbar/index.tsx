import React from 'react';
import { logout } from '../../slice/authSlice';
import Logo from '../Logo';
import {
  Box,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store';
import { FiLogOut } from 'react-icons/fi';
import { FaChevronDown, FaRegUserCircle, FaMoon, FaRegSun } from 'react-icons/fa';
import { User } from '../../types/user';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const Navbar: React.FC = () => {
  const user: User | null = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgNavbar = useColorModeValue('primary.500', 'gray.700');

  return (
    <Box as="nav" bg={bgNavbar} py={3} pos="sticky" zIndex={9999} top={0}>
      <HStack justify="space-between" className="container">
        <Link to="/create-playlist">
          <Logo />
        </Link>

        <HStack gap={3}>
          <Link to="/create-playlist" className={styles['nav-link']}>Home</Link>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FaChevronDown />}
                bg="transparent"
                _hover={{
                  bg: 'transparent'
                }}
                _active={{
                  bg: 'transparent',
                }}
                px={0}
              >
                {user?.display_name.split(' ')[0]}
              </MenuButton>
              <MenuList>
                <Link to="/profile">
                  <MenuItem icon={<FaRegUserCircle />}>
                    Profile
                  </MenuItem>
                </Link>
                <MenuItem
                  icon={colorMode === 'light' ? <FaMoon /> : <FaRegSun />}
                  onClick={toggleColorMode}
                >
                  {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                </MenuItem>
                <MenuItem
                  icon={<FiLogOut />}
                  onClick={() => dispatch(logout())}
                  color="red.500"
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>

        {/* <Button
          colorScheme="primary"
          onClick={() => dispatch(logout())}
          rightIcon={<FiLogOut />}
        >
          Logout
        </Button> */}
      </HStack>
    </Box>
  )
}

export default Navbar;
