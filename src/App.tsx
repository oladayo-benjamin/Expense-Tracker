import { FC, useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Stack,
  extendTheme,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ArrowUpIcon } from "@chakra-ui/icons";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseStats from "./components/ExpenseStats";
import ExpenseChart from "./components/ExpenseChart";
import RecentTransactions from "./components/RecentTransactions";
import TransactionsPage from "./components/TransactionsPage";
import ReportPage from "./components/ReportPage";
import Footer from "./components/Footer";

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

const ScrollToSection: FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/transactions") {
      window.scrollTo({ top: 800, behavior: "smooth" });
    } else if (location.pathname === "/report") {
      window.scrollTo({ top: 1200, behavior: "smooth" });
    }
  }, [location.pathname]);

  return null; // This component only handles scrolling behavior
};

const App: FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses
      ? JSON.parse(savedExpenses)
      : [
          { id: 1, description: "Advert", category: "Marketing", amount: 50, date: "2025-02-07T10:00:00Z" },
          { id: 2, description: "Salaries Paid", category: "Salary", amount: 2000, date: "2025-02-01T10:00:00Z" },
          { id: 3, description: "Rent", category: "Rent", amount: 30, date: "2025-02-06T18:00:00Z" },
          { id: 4, description: "Dispatch", category: "Logistics", amount: 15, date: "2025-02-05T08:00:00Z" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const prevExpenses = [{ amount: 2000 }, { amount: 45 }, { amount: 25 }, { amount: 10 }];

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

  const addExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  const updateExpense = (id: number, newAmount: number) => {
    setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, amount: newAmount } : exp)));
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const maxW = useBreakpointValue({ base: "100%", md: "800px" });

  const headingMarginTop = useBreakpointValue({ base: "70px", md: "10" });

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <ScrollToSection />
        <Box minH="100vh" display="flex" flexDirection="column">
          <Navbar />
          <Box p={{ base: 3, md: 5 }} maxW={maxW} mx="auto" mt={{ base: 5, md: 10 }}>
            <Heading mb={4} textAlign="left" size={{ base: "md", md: "lg" }} mt={headingMarginTop}>
              Financial Overview
            </Heading>
            <Box>
              <ExpenseStats expenses={expenses} prevExpenses={prevExpenses} />
            </Box>
            <Heading mb={4} textAlign="left" size={{ base: "md", md: "lg" }} mt="3">
              Recent Transactions
            </Heading>
            <Box bg="white" p={{ base: 3, md: 5 }} borderRadius="lg" boxShadow="md" mt={4}>
              <RecentTransactions expenses={expenses} />
            </Box>
            <Routes>
              <Route
                path="/transactions"
                element={<TransactionsPage expenses={expenses} updateExpense={updateExpense} deleteExpense={deleteExpense} />}
              />
              <Route path="/report" element={<ReportPage expenses={expenses} />} />
            </Routes>
            <Heading mb={4} textAlign="left" size={{ base: "md", md: "lg" }} mt="5">
              Budget & Stats
            </Heading>
            <Box bg="white" p={{ base: 3, md: 5 }} borderRadius="lg" boxShadow="md" mt={4}>
              <ExpenseChart expenses={expenses} />
            </Box>
            <Heading mb={4} textAlign="left" size={{ base: "md", md: "lg" }} mt="5">
              Add Expense
            </Heading>
            <Box bg="white" p={{ base: 3, md: 5 }} borderRadius="lg" boxShadow="md" mt={4}>
              <Stack spacing={4} mb={4}>
                <ExpenseForm addExpense={addExpense} />
              </Stack>
            </Box>
          </Box>
          <Box bg="gray.50" pt="30px" w="100%" p={{ base: "10px", md: "30px" }} mt="auto">
            <Footer />
          </Box>
        </Box>
        {showScroll && (
          <IconButton
            icon={<ArrowUpIcon />}
            position="fixed"
            bottom="20px"
            right="20px"
            onClick={scrollToTop}
            colorScheme="teal"
            boxShadow="md"
            borderRadius="full"
            size="lg"
            aria-label="Back to Top"
          />
        )}
      </ChakraProvider>
    </Router>
  );
};

export default App;
