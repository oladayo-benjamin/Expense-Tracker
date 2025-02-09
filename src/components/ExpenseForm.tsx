import { FC, useState } from "react";
import { Input, Select, Button, Stack, Box, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
}

const categories = [
  "Logistics", "Electricity", "Rent", "Salary", "Marketing", "Miscellaneous", "Subscriptions", "Others"
];

const ExpenseForm: FC<ExpenseFormProps> = ({ addExpense }) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>(categories[0]);
  const [description, setDescription] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");

  const handleSubmit = () => {
    if (!amount || !description) return;
    const expenseCategory = customCategory || category;
    addExpense({ id: Date.now(), amount: parseFloat(amount), category: expenseCategory, description, date: new Date() });
    setAmount("");
    setDescription("");
    setCustomCategory("");
  };

  return (
    <Box p={4} bg="white" borderRadius="lg" boxShadow="md" mt={4} width="80%" maxWidth="600px" mx="auto">
      <FormControl isRequired mb={4}>
        <Stack spacing={4}>
          <HStack spacing={3}>
            <Box flex="1">
              <FormLabel>Amount</FormLabel>
              <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Box>
            <Box flex="1">
              <FormLabel>Category</FormLabel>
              <Select value={category} onChange={(e) => { setCategory(e.target.value); setCustomCategory(""); }}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Select>
            </Box>
          </HStack>
          {category === "Others" && <Input placeholder="Enter custom category" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} />}
          <Input placeholder="Describe the expense" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleSubmit}>Add Expense</Button>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default ExpenseForm;
