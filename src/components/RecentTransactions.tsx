import { Box, Text, Stack, HStack, Badge, Icon, Button } from "@chakra-ui/react";
import { FaShoppingCart, FaMoneyBillWave, FaUtensils, FaCar, FaRegFrown } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface RecentTransactionsProps {
  expenses: Expense[];
}

const categoryIcons: Record<string, React.ElementType> = {
  Entertainment: FaShoppingCart,
  Income: FaMoneyBillWave,
  Food: FaUtensils,
  Transport: FaCar,
  
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ expenses }) => {
  const safeExpenses = Array.isArray(expenses) ? expenses : [];
  const sortedExpenses = [...safeExpenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recentTransactions = sortedExpenses.slice(0, 3);

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getCategoryIcon = (category: string) => {
    const IconComponent = categoryIcons[category] || FaMoneyBillWave;
    return <Icon as={IconComponent} color="gray.500" />;
  };

  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="sm" mt={4}>
      {recentTransactions.length > 0 ? (
        <Stack spacing={3}>
          {recentTransactions.map((expense) => (
            <HStack key={expense.id} justify="flex-start" align="center" spacing={3}>
              {getCategoryIcon(expense.category)}
              <Text fontSize="md" flex="1" noOfLines={1}>
                {capitalizeFirstLetter(expense.description)}
              </Text>
              <HStack spacing={2}>
                <Badge colorScheme="green">{capitalizeFirstLetter(expense.category)}</Badge>
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
      <Link to="/transactions">
        <Box display="flex" justifyContent="center">
          <Button variant="solid" colorScheme="blue" mt={4} size="xs">
            View All
          </Button>
        </Box>
      </Link>
    </Box>
  );
};

export default RecentTransactions;















