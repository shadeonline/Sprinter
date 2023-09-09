import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const SprintChart = ({ totalTasks, backlogTasks, inProgressTasks, completedTasks }) => {
  const chartData = [
    {
      name: 'Backlog',
      population: backlogTasks.length,
      color: '#FF5733',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'In Progress',
      population: inProgressTasks.length,
      color: '#FFC300',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'Completed',
      population: completedTasks.length,
      color: '#36A2EB',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#4C4B63',
    backgroundGradientTo: '#4C4B63',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <View>
      <PieChart
        data={chartData}
        width={300}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <Text style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
        Total Tasks: {totalTasks}
      </Text>
    </View>
  );
};

export default SprintChart;
