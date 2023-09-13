// TaskCard.test.js

import React from 'react';
import renderer from 'react-test-renderer';
import TaskCard from '../components/TaskCard'; // Adjust the path based on your project structure
import { useNavigation } from '@react-navigation/core';

// Mock React Navigation
jest.mock('@react-navigation/core', () => ({
  useNavigation: jest.fn(),
}));

describe('TaskCard', () => {
  it('matches snapshot', () => {
    // Mock a task object for testing
    const task = {
      taskTitle: 'Sample Task',
      storyPoint: '3',
      deadline: '30/09/23',
      status: 'Backlog',
    };

    // Mock the useNavigation function
    useNavigation.mockReturnValue({ navigate: jest.fn() });

    const tree = renderer.create(<TaskCard task={task} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
