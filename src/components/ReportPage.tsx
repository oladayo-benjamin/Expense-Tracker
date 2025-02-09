import { FC } from "react";
import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from "react-router-dom";

const ReportPage = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <Box p={5} textAlign="center">
        <Text fontSize="lg" color="gray.500">No data available for reporting.</Text>
      </Box>
    );
  }

  // Grouping expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: amounts,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#FF9F40"
        ],
      },
    ],
  };

  return (
    <Box p={5} maxW="800px" mx="auto">
      <Heading size="lg" mb={5} textAlign="center">Expense Report</Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {/* Pie Chart */}
        <Box p={4} bg="white" borderRadius="lg" boxShadow="md">
          <Heading size="sm" mb={3}>Category Breakdown</Heading>
          <Pie data={chartData} />
        </Box>

        {/* Bar Chart */}
        <Box p={4} bg="white" borderRadius="lg" boxShadow="md">
          <Heading size="sm" mb={3}>Spending Trends</Heading>
          <Bar data={chartData} />
        </Box>
      </SimpleGrid>
      <Link to="/">
      <Text color="blue.500" mt={4}>Back to Overview</Text>
    </Link>
    </Box>
    
  );
};

export default ReportPage;
