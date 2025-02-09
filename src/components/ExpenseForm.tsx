import React, { useState } from "react";
import { Input, Select, Button, Stack, Box, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const categories = [  
  "Logistics", 
  "Electricity", 
  "Rent", 
  "Salary", 
  "Marketing", 
  "Miscellaneous", 
  "Subscriptions",
  "Others"
];

const ExpenseForm = ({ addExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [customCategory, setCustomCategory] = useState(""); // To handle custom category input

  const handleSubmit = () => {
    if (!amount || !description) return;
    const expenseCategory = customCategory ? customCategory : category;
    addExpense({ id: Date.now(), amount: parseFloat(amount), category: expenseCategory, description, date: new Date() });
    setAmount("");
    setDescription("");
    setCustomCategory(""); // Reset the custom category field after submit
  };

  return (
    <Box p={4} bg="white" borderRadius="lg" boxShadow="md" mt={4} width="80%" maxWidth="600px" mx="auto">
      <FormControl isRequired mb={4}>
        <Stack spacing={4}>
          <HStack spacing={3}>
            <Box flex="1">
              <FormLabel htmlFor="amount" fontWeight="bold" fontSize="sm">
                Amount
              </FormLabel>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                bg="gray.100"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "teal.400" }}
                size="lg"
              />
            </Box>
            <Box flex="1">
              <FormLabel htmlFor="category" fontWeight="bold" fontSize="sm">
                Category
              </FormLabel>
              <Select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCustomCategory(""); // Clear custom category when a predefined category is selected
                }}
                bg="gray.100"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "teal.400" }}
                size="lg"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </Box>
          </HStack>

          {/* Custom category input */}
          {category === "Others" && (
            <Box>
              <FormLabel htmlFor="customCategory" fontWeight="bold" fontSize="sm">
                Custom Category
              </FormLabel>
              <Input
                id="customCategory"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                bg="gray.100"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "teal.400" }}
                size="lg"
              />
            </Box>
          )}

          <Box>
            <FormLabel htmlFor="description" fontWeight="bold" fontSize="sm">
              Description
            </FormLabel>
            <Input
              id="description"
              placeholder="Describe the expense"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg="gray.100"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "teal.400" }}
              size="lg"
            />
          </Box>

          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleSubmit}
            size="lg"
            width="full"
            mt={4}
            _hover={{ bg: "teal.600" }}
            _active={{ bg: "teal.700" }}
          >
            Add Expense
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default ExpenseForm;
