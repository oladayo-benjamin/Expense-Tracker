import React, { useState, useEffect } from "react";
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

// ✅ Define Theme with Global Styles
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50", // Off-white background
        color: "black",
      },
    },
  },
});

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Advert", category: "Marketing", amount: 50, date: "2025-02-07T10:00:00Z" },
    { id: 2, description: "Salaries Paid", category: "Salary", amount: 2000, date: "2025-02-01T10:00:00Z" },
    { id: 3, description: "Rent", category: "Rent", amount: 30, date: "2025-02-06T18:00:00Z" },
    { id: 4, description: "Dispatch", category: "Logistics", amount: 15, date: "2025-02-05T08:00:00Z" },
  ]);

  const [showScroll, setShowScroll] = useState(false);

  // ✅ Handle Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300); // Show button after scrolling 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Functions for Expense Management
  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const updateExpense = (id, newAmount) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...exp, amount: newAmount } : exp));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" bg="gray.50" pt="60px">
          <Navbar />
          <Box p={5} maxW="800px" mx="auto">
            <Heading mb={4} textAlign="left" size="sm" mt="3">
              Financial Overview
            </Heading>

            {/* Expense Stats */}
            <Box>
              <ExpenseStats expenses={expenses} />
            </Box>

            <Heading mb={4} textAlign="left" size="sm" mt="3">
              Recent Transactions
            </Heading>

            {/* Recent Transactions */}
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mt={4}>
              <RecentTransactions expenses={expenses} />
            </Box>

            {/* Routes */}
            <Routes>
              <Route path="/transactions" element={<TransactionsPage expenses={expenses} />} />
              <Route path="/report" element={<ReportPage expenses={expenses} />} />
            </Routes>

            {/* Expense Chart */}
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mt={4}>
              <ExpenseChart expenses={expenses} />
            </Box>

            {/* Expense Form */}
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mt={4}>
              <Stack spacing={4} mb={4}>
                <ExpenseForm addExpense={addExpense} />
              </Stack>
            </Box>

            {/* Expense Table */}
            <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mt={4}>
              <ExpenseTable 
                expenses={expenses} 
                updateExpense={updateExpense} 
                deleteExpense={deleteExpense} 
              />
            </Box>

            <Box minH="100vh" bg="gray.50" pt="70px">
              {/* Add Footer */}
              <Footer />
            </Box>
          </Box>
        </Box>

        {/* Floating "Back to Top" Button */}
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
      </Router>
    </ChakraProvider>
  );
};

export default App;
