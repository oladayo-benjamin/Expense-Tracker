import { Box, Heading, Stack, Text, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>All Transactions</Heading>
      {currentItems.length > 0 ? (
        <Stack spacing={4}>
          {currentItems.map((expense) => (
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
      <HStack mt={4} justifyContent="center">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={() => setCurrentPage((prev) => prev + 1)} isDisabled={indexOfLastItem >= expenses.length}>
          Next
        </Button>
      </HStack>
      <Link to="/">
        <Text color="blue.500" mt={4}>Back to Overview</Text>
      </Link>
    </Box>
  );
};

export default TransactionsPage;



