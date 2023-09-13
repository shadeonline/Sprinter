// SprintChart.test.js

import React from 'react';
import renderer from 'react-test-renderer';
import SprintChart from '../components/SprintChart'; // Adjust the path based on your project structure

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// Mock react-native-chart-kit
jest.mock('react-native-chart-kit', () => ({
  PieChart: 'View',
}));

describe('SprintChart', () => {
  it('matches snapshot', () => {
    const totalTasks = 10;
    const backlogTasks = [/* Array of tasks */];
    const inProgressTasks = [/* Array of tasks */];
    const completedTasks = [/* Array of tasks */];

    const tree = renderer.create(
      <SprintChart
        totalTasks={totalTasks}
        backlogTasks={backlogTasks}
        inProgressTasks={inProgressTasks}
        completedTasks={completedTasks}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
