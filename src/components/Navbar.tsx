import {
  Box,
  Flex,
  HStack,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  VStack,
  Spacer,
  Collapse,
  Container
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position="fixed" top="0" w="100%" zIndex="1000" bg="gray.50">
      {/* Apply Blue Background Only Inside the Container */}
      <Container maxW="800px" bg="blue.600" borderRadius="lg" py={3} px={4} shadow="md">
        <Flex h={12} alignItems="center">
          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            variant="ghost"
            color="white"
            aria-label="Toggle Menu"
            mr={2}
          />

          {/* Left Side - Dashboard Link */}
          <Button as={Link} to="/dashboard" variant="link" color="white" fontWeight="bold" fontSize="lg">
            Dashboard
          </Button>

          <Spacer />

          {/* Center - Navigation Links (Hidden on Mobile) */}
          <HStack spacing={6} display={{ base: "none", md: "flex" }}>
            <Button as={Link} to="/transactions" variant="link" color="white">Transactions</Button>
            <Button as={Link} to="/report" variant="link" color="white">Report</Button>
          </HStack>

          <Spacer />

          {/* Right Side - User Avatar */}
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

        {/* Mobile Menu - Slide Down Effect */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: "none" }}>
            <VStack spacing={4} alignItems="center">
              <Button as={Link} to="/transactions" variant="link" color="white">Transactions</Button>
              <Button as={Link} to="/report" variant="link" color="white">Report</Button>
              <Button as={Link} to="/budget" variant="link" color="white">Budget</Button>
            </VStack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar;
