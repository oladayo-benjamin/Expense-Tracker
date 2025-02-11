import { FC, useState } from "react";
import { Input, Select, Button, Stack, Box, FormControl, FormLabel, HStack, FormErrorMessage, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
}

const ExpenseForm: FC<ExpenseFormProps> = ({ addExpense }) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("Logistics");
  const [description, setDescription] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [error, setError] = useState<string>("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!amount || !description) {
      setError("Please fill out all fields.");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    const expenseCategory = customCategory || category;
    addExpense({
      id: Date.now(),
      amount: parseFloat(amount),
      category: expenseCategory,
      description,
      date: new Date().toISOString(),
    });
    setAmount("");
    setDescription("");
    setCustomCategory("");
    setError("");
    toast({
      title: "Expense Added",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4} bg="white" borderRadius="lg" boxShadow="md" mt={4} width="80%" maxWidth="600px" mx="auto">
      <FormControl isInvalid={!!error}>
        <Stack spacing={4}>
          <HStack spacing={3}>
            <Box flex="1">
              <FormLabel>Amount</FormLabel>
              <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Box>
            <Box flex="1">
              <FormLabel>Category</FormLabel>
              <Select value={category} onChange={(e) => { setCategory(e.target.value); setCustomCategory(""); }}>
                <option value="Logistics">Logistics</option>
                <option value="Electricity">Electricity</option>
                <option value="Rent">Rent</option>
                <option value="Others">Others</option>
              </Select>
            </Box>
          </HStack>
          {category === "Others" && <Input placeholder="Enter custom category" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} />}
          <Input placeholder="Describe the expense" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleSubmit}>Add Expense</Button>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </Stack>
      </FormControl>
    </Box>
  );
};

export default ExpenseForm;





