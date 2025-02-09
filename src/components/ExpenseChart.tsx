import React, { useState } from "react";
import { Box, SimpleGrid, Input, Button, Text, HStack, VStack } from "@chakra-ui/react";
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";
import 'chart.js/auto';

const ExpenseChart = ({ expenses }) => {
  const [budget, setBudget] = useState(1000);
  const [newBudget, setNewBudget] = useState("");

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const availableBalance = budget - totalExpenses;

  const handleBudgetUpdate = () => {
    if (newBudget.trim() && !isNaN(newBudget)) {
      setBudget(parseFloat(newBudget));
      setNewBudget("");
    }
  };

  const handleBudgetDelete = () => {
    setBudget(0);
  };

  const isWithinDays = (date, days) => new Date(date) >= new Date(Date.now() - days * 86400000);

  const dailyExpenses = expenses.filter(e => isWithinDays(e.date, 1));
  const weeklyExpenses = expenses.filter(e => isWithinDays(e.date, 7));

  const groupByCategory = (data) => {
    return data.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  };

  const generateChartData = (expenseList) => {
    const categoryData = groupByCategory(expenseList);
    return {
      labels: Object.keys(categoryData),
      datasets: [{
        data: Object.values(categoryData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"],
      }],
    };
  };

  const dailyDoughnutData = generateChartData(dailyExpenses);
  const weeklyPolarAreaData = generateChartData(weeklyExpenses);

  const chartData = {
    labels: ["Daily", "Weekly", "Monthly", "Yearly"],
    datasets: [{
      label: "Expenses ($)",
      data: [
        dailyExpenses.reduce((sum, e) => sum + e.amount, 0),
        weeklyExpenses.reduce((sum, e) => sum + e.amount, 0),
        expenses.reduce((sum, e) => isWithinDays(e.date, 30) ? sum + e.amount : sum, 0),
        expenses.reduce((sum, e) => isWithinDays(e.date, 365) ? sum + e.amount : sum, 0),
      ],
      backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)", "rgba(75, 192, 192, 0.8)"],
      borderRadius: 10,
    }],
  };

  const barOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true, grid: { display: false } }, y: { grid: { display: false } } },
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
      <Box p={5} borderRadius="lg" boxShadow="md" bg="white" minHeight="300px" overflowX="auto">
        <Bar data={chartData} options={barOptions} />
      </Box>

      <Box p={5} borderRadius="lg" boxShadow="md" bg="white">
        <VStack spacing={4} align="stretch">
          <Text fontSize="lg" fontWeight="bold">Budget Management</Text>
          <Text>Budget: <strong>${budget.toFixed(2)}</strong></Text>
          <Text color="red.500">Total Expenses: <strong>${totalExpenses.toFixed(2)}</strong></Text>
          <Text color={availableBalance < 0 ? "red.600" : "green.500"}>Available Balance: <strong>${availableBalance.toFixed(2)}</strong></Text>
          <HStack>
            <Input placeholder="Enter new budget" value={newBudget} onChange={(e) => setNewBudget(e.target.value)} type="number" width="full" />
            <Button colorScheme="teal" onClick={handleBudgetUpdate} width="full">Update</Button>
          </HStack>
          <Button colorScheme="red" variant="outline" onClick={handleBudgetDelete} width="full">Delete Budget</Button>
        </VStack>
      </Box>

      <Box p={5} borderRadius="lg" boxShadow="md" bg="white" minHeight="300px" overflowX="auto">
        <Text fontSize="lg" fontWeight="bold" mb={3}>Daily Expenses Breakdown</Text>
        {dailyExpenses.length > 0 ? <Doughnut data={dailyDoughnutData} /> : <Text>No expenses today.</Text>}
      </Box>

      <Box p={5} borderRadius="lg" boxShadow="md" bg="white" minHeight="300px" overflowX="auto">
        <Text fontSize="lg" fontWeight="bold" mb={3}>Weekly Expenses Breakdown</Text>
        {weeklyExpenses.length > 0 ? <PolarArea data={weeklyPolarAreaData} /> : <Text>No expenses this week.</Text>}
      </Box>
    </SimpleGrid>
  );
};

export default ExpenseChart;
