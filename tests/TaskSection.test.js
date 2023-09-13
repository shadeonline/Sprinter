import React from 'react';
import renderer from 'react-test-renderer';
import TaskSection from '../components/TaskSection';
import { NavigationContainer } from '@react-navigation/native';

// Mock React Navigation's useNavigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('TaskSection', () => {
  it('matches snapshot', () => {
    const tasks = [
      { id: 1, taskTitle: 'Task 1' },
      { id: 2, taskTitle: 'Task 2' },
    ];

    const tree = renderer
      .create(
        <NavigationContainer>
          <TaskSection title="Section Title" tasks={tasks} />
        </NavigationContainer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
