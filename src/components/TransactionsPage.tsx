import { Box, Heading, Stack, Text, HStack, Button, Input, Select, FormControl, FormErrorMessage, useToast, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface TransactionsPageProps {
  expenses: Expense[];
  updateExpense: (id: number, newAmount: number, newDescription: string, newCategory: string) => void;
  deleteExpense: (id: number) => void;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ expenses, updateExpense, deleteExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedAmount, setEditedAmount] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [editedCategory, setEditedCategory] = useState<string>("");
  const [error, setError] = useState<string>("");
  const toast = useToast();

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditedAmount(expense.amount.toString());
    setEditedDescription(expense.description);
    setEditedCategory(expense.category);
  };

  const handleSave = (id: number) => {
    if (!editedAmount || !editedDescription || !editedCategory) {
      setError("Please fill out all fields.");
      return;
    }
    if (parseFloat(editedAmount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    updateExpense(id, parseFloat(editedAmount), editedDescription, editedCategory);
    setEditingId(null);
    setError("");
    toast({
      title: "Expense Updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (id: number) => {
    deleteExpense(id);
    toast({
      title: "Expense Deleted",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>All Transactions</Heading>
      {currentItems.length > 0 ? (
        <Stack spacing={4}>
          {currentItems.map((expense) => (
            <Box key={expense.id} p={4} border="1px solid #ddd" borderRadius="md" bg="white" boxShadow="sm">
              {editingId === expense.id ? (
                <FormControl isInvalid={!!error}>
                  <Stack spacing={3}>
                    <Input
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                      placeholder="Amount"
                      type="number"
                      aria-label="Amount"
                    />
                    <Input
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      placeholder="Description"
                      aria-label="Description"
                    />
                    <Select
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                      aria-label="Category"
                    >
                      <option value="Logistics">Logistics</option>
                      <option value="Electricity">Electricity</option>
                      <option value="Rent">Rent</option>
                      <option value="Others">Others</option>
                    </Select>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                    <HStack>
                      <IconButton
                        aria-label="Save"
                        icon={<CheckIcon />}
                        onClick={() => handleSave(expense.id)}
                        colorScheme="green"
                      />
                      <IconButton
                        aria-label="Cancel"
                        icon={<CloseIcon />}
                        onClick={() => setEditingId(null)}
                        colorScheme="red"
                      />
                    </HStack>
                  </Stack>
                </FormControl>
              ) : (
                <>
                  <Text fontSize="md">{expense.description}</Text>
                  <Text fontSize="lg" fontWeight="bold">${expense.amount.toFixed(2)}</Text>
                  <Text fontSize="sm" color="gray.500">{expense.category}</Text>
                  <Text fontSize="sm" color="gray.400">{new Date(expense.date).toLocaleDateString()}</Text>
                  <HStack mt={2}>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      onClick={() => handleEdit(expense)}
                      colorScheme="blue"
                      size="sm"
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(expense.id)}
                      colorScheme="red"
                      size="sm"
                    />
                  </HStack>
                </>
              )}
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