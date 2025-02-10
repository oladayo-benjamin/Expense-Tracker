import { FC, useState, useEffect } from "react";
import { ChakraProvider, Box, Heading, Stack, extendTheme, IconButton } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ArrowUpIcon } from "@chakra-ui/icons";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseStats from "./components/ExpenseStats";
import ExpenseChart from "./components/ExpenseChart";
import RecentTransactions from "./components/RecentTransactions";
import TransactionsPage from "./components/TransactionsPage";
import ReportPage from "./components/ReportPage";
import Footer from "./components/Footer";

// Define Expense type consistently with `date` as a string
interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "black",
      },
    },
  },
});

const App: FC = () => {
  // Initialize expenses state with consistent Expense type
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "Advert", category: "Marketing", amount: 50, date: "2025-02-07T10:00:00Z" },
    { id: 2, description: "Salaries Paid", category: "Salary", amount: 2000, date: "2025-02-01T10:00:00Z" },
    { id: 3, description: "Rent", category: "Rent", amount: 30, date: "2025-02-06T18:00:00Z" },
    { id: 4, description: "Dispatch", category: "Logistics", amount: 15, date: "2025-02-05T08:00:00Z" },
  ]);

  // For demonstration, I'll assume `prevExpenses` is a hardcoded or fetched value
  const prevExpenses = [
    { amount: 2000 }, // Example data for previous expenses
    { amount: 45 },
    { amount: 25 },
    { amount: 10 },
  ];

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to add a new expense
  const addExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  // Function to update an existing expense
  const updateExpense = (id: number, newAmount: number) => {
    setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, amount: newAmount } : exp)));
  };

  // Function to delete an expense
  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" bg="gray.50" pt="60px">
          <Navbar />
          <Box p={5} maxW="800px" mx="auto">
            <Heading mb={4} textAlign="left" size="sm" mt="3">Financial Overview</Heading>
            {/* Pass both expenses and prevExpenses to ExpenseStats */}
            <Box><ExpenseStats expenses={expenses} prevExpenses={prevExpenses} /></Box>
            <Heading mb={4} textAlign="left" size="sm" mt="3">Recent Transactions</Heading>
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mt={4}><RecentTransactions expenses={expenses} /></Box>
            <Routes>
              <Route path="/transactions" element={<TransactionsPage expenses={expenses} />} />
              <Route path="/report" element={<ReportPage expenses={expenses} />} />
            </Routes>
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mt={4}><ExpenseChart expenses={expenses} /></Box>
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mt={4}><Stack spacing={4} mb={4}><ExpenseForm addExpense={addExpense} /></Stack></Box>
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mt={4}><ExpenseTable expenses={expenses} updateExpense={updateExpense} deleteExpense={deleteExpense} /></Box>
            <Box minH="100vh" bg="gray.50" pt="70px"><Footer /></Box>
          </Box>
        </Box>
        {showScroll && (
          <IconButton icon={<ArrowUpIcon />} position="fixed" bottom="20px" right="20px" onClick={scrollToTop} colorScheme="teal" boxShadow="md" borderRadius="full" size="lg" aria-label="Back to Top" />
        )}
      </Router>
    </ChakraProvider>
  );
};

export default App;
