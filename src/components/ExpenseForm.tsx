import { FC, useState } from "react";
import { Input, Select, Button, Stack, Box, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

// Define the Expense interface with date as a string
interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string; // Update to string, as date is stored as a string
}

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
}

const categories = [
  "Logistics", "Electricity", "Rent", "Salary", "Marketing", "Miscellaneous", "Subscriptions", "Others"
];

const ExpenseForm: FC<ExpenseFormProps> = ({ addExpense }) => {
  const [amount, setAmount] = useState<string>(""); // amount as string for input handling
  const [category, setCategory] = useState<string>(categories[0]); // default category
  const [description, setDescription] = useState<string>(""); // description of the expense
  const [customCategory, setCustomCategory] = useState<string>(""); // custom category, if any

  const handleSubmit = () => {
    if (!amount || !description) return; // simple validation
    const expenseCategory = customCategory || category; // use custom category if provided, otherwise default
    addExpense({
      id: Date.now(), // generate a unique id using timestamp
      amount: parseFloat(amount), // convert the string input to number
      category: expenseCategory, 
      description,
      date: new Date().toISOString(), // store date as ISO string
    });
    setAmount(""); // reset input fields
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
