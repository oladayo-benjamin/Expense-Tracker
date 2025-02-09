import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, Button, HStack } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { FaTruck, FaBolt, FaHome, FaWallet, FaBullhorn, FaShoppingCart } from "react-icons/fa";

const categoryIcons = {
  Rent: FaHome,
  "Electricity Bill": FaBolt,
  Utilities: FaBolt,
  Logistics: FaTruck,
  Salary: FaWallet,
  Marketing: FaBullhorn,
  Miscellaneous: FaShoppingCart,
};

const ExpenseTable = ({ expenses, updateExpense, deleteExpense }) => {
  const [editingId, setEditingId] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  const handleEdit = (id, amount) => {
    setEditingId(id);
    setNewAmount(amount);
  };

  const handleSave = (id) => {
    if (!isNaN(newAmount) && newAmount !== "") {
      updateExpense(id, parseFloat(newAmount));
    }
    setEditingId(null);
  };

  // Function to capitalize the first letter of the first word in a string
  const capitalizeFirstLetter = (text) => {
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
