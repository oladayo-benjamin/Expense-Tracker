import React from "react";
import { Box, Text, Stack, HStack, Badge, Icon, Button } from "@chakra-ui/react";
import { FaShoppingCart, FaMoneyBillWave, FaUtensils, FaCar, FaRegFrown } from "react-icons/fa"; // Importing relevant icons
import { Link } from "react-router-dom"; // Import Link for navigation

const RecentTransactions = ({ expenses }) => {
  // Ensure expenses is an array and fallback to an empty array if invalid
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // Sort expenses by date in descending order (latest first)
  const sortedExpenses = [...safeExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the 3 most recent transactions
  const recentTransactions = sortedExpenses.slice(0, 3);

  // Function to capitalize the first letter of the first word
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Function to get the appropriate icon based on category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Entertainment":
        return <Icon as={FaShoppingCart} color="blue.500" />;
      case "Income":
        return <Icon as={FaMoneyBillWave} color="green.500" />;
      case "Food":
        return <Icon as={FaUtensils} color="yellow.500" />;
      case "Transport":
        return <Icon as={FaCar} color="red.500" />;
      default:
        return <Icon as={FaMoneyBillWave} color="gray.500" />; // Default icon if no match
    }
  };

  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="sm" mt={4}>
      {recentTransactions.length > 0 ? (
        <Stack spacing={3}>
          {recentTransactions.map((expense) => (
            <HStack key={expense.id} justify="flex-start" align="center" spacing={3}>
              {/* Category Icon */}
              {getCategoryIcon(expense.category)}

              {/* Description and Amount */}
              <Text fontSize="md" flex="1" noOfLines={1}>
                {capitalizeFirstLetter(expense.description)} {/* Capitalizing description */}
              </Text>
              <HStack spacing={2}>
                <Badge colorScheme="green">{capitalizeFirstLetter(expense.category)}</Badge> {/* Capitalizing category */}
                <Text fontSize="lg" fontWeight="bold">${expense.amount.toFixed(2)}</Text>
              </HStack>
            </HStack>
          ))}
        </Stack>
      ) : (
        <HStack spacing={2} justify="center">
          <Icon as={FaRegFrown} color="gray.400" />
          <Text color="gray.500">No recent transactions. Start adding your expenses!</Text>
        </HStack>
      )}

      {/* View All Button */}
      <Link to="/transactions">
        <Button variant="link" colorScheme="blue" mt={4} width="full" textAlign="center">
          View All Transactions
        </Button>
      </Link>
    </Box>
  );
};

export default RecentTransactions;
