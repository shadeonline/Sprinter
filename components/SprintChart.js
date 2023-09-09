import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const SprintChart = ({ totalTasks, backlogTasks, inProgressTasks, completedTasks }) => {
  const chartData = [
    {
      name: 'Backlog',
      population: backlogTasks.length,
      color: '#c3c3c3',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'In Progress',
      population: inProgressTasks.length,
      color: '#5386e4',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'Completed',
      population: completedTasks.length,
      color: 'green',
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
