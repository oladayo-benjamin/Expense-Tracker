import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, Button, HStack } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { FaTruck, FaBolt, FaHome, FaWallet, FaBullhorn, FaShoppingCart } from "react-icons/fa";

// Icons for categories
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

  // Function to capitalize the first letter of the first word in a string
  const capitalizeFirstLetter = (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Description</Th>
          <Th>Category</Th>
          <Th isNumeric>Amount</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenses.map((expense) => {
          const CategoryIcon = categoryIcons[expense.category] || FaShoppingCart;

          return (
            <Tr key={expense.id}>
              <Td>{capitalizeFirstLetter(expense.description)}</Td>
              <Td>
                <HStack spacing={2}>
                  <CategoryIcon />
                  <span>{capitalizeFirstLetter(expense.category)}</span>
                </HStack>
              </Td>
              <Td isNumeric>
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
              <Td>
                <IconButton
                  size="sm"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={() => deleteExpense(expense.id)}
                  aria-label="Delete expense" // Added aria-label here
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default ExpenseTable;
