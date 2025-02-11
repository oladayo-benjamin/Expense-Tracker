import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, Button, HStack, Box, Stack, useBreakpointValue } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { FaTruck, FaBolt, FaHome, FaWallet, FaBullhorn, FaShoppingCart } from "react-icons/fa";

const categoryIcons: Record<string, React.ElementType> = {
  Rent: FaHome,
  "Electricity Bill": FaBolt,
  Utilities: FaBolt,
  Logistics: FaTruck,
  Salary: FaWallet,
  Marketing: FaBullhorn,
  Miscellaneous: FaShoppingCart,
};

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
}

interface ExpenseTableProps {
  expenses: Expense[];
  updateExpense: (id: number, amount: number) => void;
  deleteExpense: (id: number) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, updateExpense, deleteExpense }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newAmount, setNewAmount] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleEdit = (id: number, amount: number) => {
    setEditingId(id);
    setNewAmount(amount.toString());
  };

  const handleSave = (id: number) => {
    if (!isNaN(Number(newAmount)) && newAmount !== "") {
      updateExpense(id, parseFloat(newAmount));
    }
    setEditingId(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box overflowX="auto">
      <Table variant="simple" minW={isMobile ? "100%" : "600px"}>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th isNumeric>Amount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentItems.map((expense) => {
            const CategoryIcon = categoryIcons[expense.category] || FaShoppingCart;

            return (
              <Tr key={expense.id}>
                {isMobile ? (
                  <Td colSpan={4}>
                    <Stack spacing={2}>
                      <Box>
                        <strong>Description:</strong> {expense.description}
                      </Box>
                      <Box>
                        <HStack spacing={2}>
                          <CategoryIcon />
                          <span><strong>Category:</strong> {expense.category}</span>
                        </HStack>
                      </Box>
                      <Box>
                        <strong>Amount:</strong>{" "}
                        {editingId === expense.id ? (
                          <HStack spacing={2}>
                            <Input
                              size="sm"
                              type="number"
                              value={newAmount}
                              onChange={(e) => setNewAmount(e.target.value)}
                              autoFocus
                            />
                            <Button size="sm" colorScheme="teal" onClick={() => handleSave(expense.id)}>
                              <CheckIcon />
                            </Button>
                          </HStack>
                        ) : (
                          <span onClick={() => handleEdit(expense.id, expense.amount)} style={{ cursor: "pointer" }}>
                            ${expense.amount.toFixed(2)}
                          </span>
                        )}
                      </Box>
                      <Box>
                        <IconButton
                          size="sm"
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={() => deleteExpense(expense.id)}
                          aria-label="Delete expense"
                        />
                      </Box>
                    </Stack>
                  </Td>
                ) : (
                  <>
                    <Td whiteSpace="nowrap">{expense.description}</Td>
                    <Td whiteSpace="nowrap">
                      <HStack spacing={2}>
                        <CategoryIcon />
                        <span>{expense.category}</span>
                      </HStack>
                    </Td>
                    <Td isNumeric whiteSpace="nowrap">
                      {editingId === expense.id ? (
                        <HStack spacing={2}>
                          <Input
                            size="sm"
                            type="number"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            autoFocus
                          />
                          <Button size="sm" colorScheme="teal" onClick={() => handleSave(expense.id)}>
                            <CheckIcon />
                          </Button>
                        </HStack>
                      ) : (
                        <span onClick={() => handleEdit(expense.id, expense.amount)} style={{ cursor: "pointer" }}>
                          ${expense.amount.toFixed(2)}
                        </span>
                      )}
                    </Td>
                    <Td whiteSpace="nowrap">
                      <IconButton
                        size="sm"
                        colorScheme="red"
                        icon={<DeleteIcon />}
                        onClick={() => deleteExpense(expense.id)}
                        aria-label="Delete expense"
                      />
                    </Td>
                  </>
                )}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <HStack mt={4} justifyContent="flex-end">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          isDisabled={indexOfLastItem >= expenses.length}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default ExpenseTable;
























