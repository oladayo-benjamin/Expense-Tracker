import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // For navigation

// Define types for the expense object and props
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface TransactionsPageProps {
  expenses: Expense[];
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ expenses }) => {
  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>All Transactions</Heading>
      {expenses.length > 0 ? (
        <Stack spacing={4}>
          {expenses.map((expense: Expense) => (
            <Box key={expense.id} p={4} border="1px solid #ddd" borderRadius="md" bg="white" boxShadow="sm">
              <Text fontSize="md">{expense.description}</Text>
              <Text fontSize="lg" fontWeight="bold">${expense.amount.toFixed(2)}</Text>
              <Text fontSize="sm" color="gray.500">{expense.category}</Text>
              <Text fontSize="sm" color="gray.400">{new Date(expense.date).toLocaleDateString()}</Text>
            </Box>
          ))}
        </Stack>
      ) : (
        <Text>No transactions found.</Text>
      )}
      {/* Back Link */}
      <Link to="/">
        <Text color="blue.500" mt={4}>Back to Overview</Text>
      </Link>
    </Box>
  );
};

export default TransactionsPage;
