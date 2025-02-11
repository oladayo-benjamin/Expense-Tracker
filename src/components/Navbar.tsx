import { Box, Flex, HStack, IconButton, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, useDisclosure, VStack, Collapse } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const navLinks = [
  { path: "/report", label: "Report" },
  { path: "/transactions", label: "Transaction" },
  // Add more links here
];

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position="fixed" top="0" w="full" zIndex="1000" bg="blue.600" shadow="md">
      <Flex h={14} alignItems="center" px={4} justifyContent="space-between">
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onToggle}
          variant="ghost"
          color="white"
          aria-label="Toggle Menu"
        />
        <Button as={Link} to="/dashboard" variant="link" color="white" fontWeight="bold" fontSize="lg">
          Dashboard
        </Button>
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <Button key={link.path} as={Link} to={link.path} variant="link" color="white">
              {link.label}
            </Button>
          ))}
        </HStack>
        <Menu>
          <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
            <Avatar size="sm" name="User" src="https://bit.ly/broken-link" />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }} bg="blue.700">
          <VStack spacing={4} alignItems="center">
            {navLinks.map((link) => (
              <Button key={link.path} as={Link} to={link.path} variant="link" color="white" w="full">
                {link.label}
              </Button>
            ))}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;










