import React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText, Box, Stack, Icon } from "@chakra-ui/react";
import { FaMoneyBillWave, FaPiggyBank, FaArrowUp, FaArrowDown, FaDollarSign } from "react-icons/fa"; // Import icons

// Format currency function
const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

// Calculate percentage change from previous value
const calculateChange = (current: number, previous: number) => {
  if (previous === 0) return { change: "N/A", message: "No previous data" };
  return { change: ((current - previous) / previous) * 100, message: null };
};

// Get the change icon based on the percentage change
const getChangeIcon = (change: number | string) => {
  if (typeof change === "string") return null; // No icon for "N/A"
  return change > 0 ? <Icon as={FaArrowUp} color="green.500" /> : <Icon as={FaArrowDown} color="red.500" />;
};

// Reusable Stat Card Component
interface StatCardProps {
  label: string;
  icon: React.ElementType;
  value: number;
  helpText: string;
  changeData: { change: number | string; message: string | null };
}

const StatCard: React.FC<StatCardProps> = ({ label, icon, value, helpText, changeData }) => (
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
          {getChangeIcon(changeData.change)}{" "}
          {typeof changeData.change === "number" ? changeData.change.toFixed(2) : "N/A"}% from last month
        </>
      )}
    </StatHelpText>
  </Stat>
);

interface ExpenseStatsProps {
  expenses: { amount: number }[];
  prevExpenses: { amount: number }[];
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ expenses = [], prevExpenses = [] }) => {
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
