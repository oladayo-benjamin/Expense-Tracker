import React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText, Box, Stack, Icon } from "@chakra-ui/react";
import { FaMoneyBillWave, FaPiggyBank, FaArrowUp, FaArrowDown, FaDollarSign } from "react-icons/fa"; // Import icons

const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const calculateChange = (current, previous) => {
  if (previous === 0) return { change: "N/A", message: "No previous month data" };
  return { change: ((current - previous) / previous) * 100, message: null };
};

const getChangeIcon = (change) => {
  if (typeof change === "string") return null; // No icon for "N/A"
  return change > 0 ? <Icon as={FaArrowUp} color="green.500" /> : <Icon as={FaArrowDown} color="red.500" />;
};

// Reusable Stat Card Component
const StatCard = ({ label, icon, value, helpText, changeData }) => (
  <Stat bg="white" p={4} borderRadius="md" boxShadow="sm" w="full">
    <StatLabel display="flex" alignItems="center" justifyContent="space-between">
      {label} <Icon as={icon} color="blue.500" />
    </StatLabel>
    <StatNumber mt={3}>{formatCurrency(value)}</StatNumber>
    <StatHelpText>{helpText}</StatHelpText>
    <StatHelpText>
      {changeData.message ? (
        changeData.message
      ) : (
        <>
          {getChangeIcon(changeData.change)} {changeData.change.toFixed(2)}% from last month
        </>
      )}
    </StatHelpText>
  </Stat>
);

const ExpenseStats = ({ expenses = [], prevExpenses = [] }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const prevTotalExpenses = prevExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const monthlyExpenses = totalExpenses * 0.8;
  const monthlySavings = totalExpenses * 0.2;
  const prevMonthlyExpenses = prevTotalExpenses * 0.8;
  const prevMonthlySavings = prevTotalExpenses * 0.2;

  return (
    <Box>
      <Stack direction={{ base: "column", md: "row" }} spacing={4} wrap="wrap" align="stretch">
        <StatCard
          label="Total Balance"
          icon={FaDollarSign}
          value={totalExpenses}
          helpText="Sum of all expenses"
          changeData={calculateChange(totalExpenses, prevTotalExpenses)}
        />
        <StatCard
          label="Monthly Expenses"
          icon={FaMoneyBillWave}
          value={monthlyExpenses}
          helpText="Estimated monthly expenses"
          changeData={calculateChange(monthlyExpenses, prevMonthlyExpenses)}
        />
        <StatCard
          label="Monthly Savings"
          icon={FaPiggyBank}
          value={monthlySavings}
          helpText="Estimated monthly savings"
          changeData={calculateChange(monthlySavings, prevMonthlySavings)}
        />
      </Stack>
    </Box>
  );
};

export default ExpenseStats;
