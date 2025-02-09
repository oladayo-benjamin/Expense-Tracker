import { Box, Container, Flex, Text, Link, HStack, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="blue.600" color="white" py={4} mt={8} boxShadow="md">
      <Container maxW="800px">
        <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between">
          
          {/* Left Side - App Name */}
          <Text fontSize="sm" fontWeight="bold">Oladayo Benjamin Expense Tracker © {new Date().getFullYear()}</Text>

          {/* Center - Navigation Links */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href="/dashboard" _hover={{ textDecoration: "underline" }}>Dashboard</Link>
            <Link href="/transactions" _hover={{ textDecoration: "underline" }}>Transactions</Link>
            <Link href="/budget" _hover={{ textDecoration: "underline" }}>Budget</Link>
            <Link href="/report" _hover={{ textDecoration: "underline" }}>Report</Link>
          </HStack>

          {/* Right Side - Contact / Terms */}
          <VStack spacing={1} align="center" fontSize="sm">
            <Link href="/terms" _hover={{ textDecoration: "underline" }}>Terms of Service</Link>
            <Link href="/privacy" _hover={{ textDecoration: "underline" }}>Privacy Policy</Link>
          </VStack>

        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
