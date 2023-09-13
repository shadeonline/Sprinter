import React from 'react';
import renderer from 'react-test-renderer';
import NonEditableTaskDetail from '../components/NonEditableTaskDetail';
import { NavigationContainer } from '@react-navigation/native';


// Mock firebaseEditTask function
jest.mock('../firebaseFunctions', () => ({
  firebaseEditTask: jest.fn(),
}));


// Mock StackNavigator
jest.mock('@react-navigation/stack', () => {
  const actualStack = jest.requireActual('@react-navigation/stack');
  return {
    ...actualStack,
    createStackNavigator: () => ({
      Navigator: ({ children }) => <>{children}</>,
      Screen: ({ children }) => <>{children}</>,
    }),
  };
});

describe('NonEditableTaskDetail', () => {
  it('matches snapshot', () => {
    const task = {
      taskTitle: 'Sample Task',
      storyPoint: '3',
      taskDescription: 'This is a sample task description.',
      deadline: '30/09/23',
      status: 'Backlog',
    };
    const setIsEditing = jest.fn();
    const handleDeleteTask = jest.fn();

    const tree = renderer
      .create(
        <NavigationContainer>
          <NonEditableTaskDetail
            task={task}
            setIsEditing={setIsEditing}
            handleDeleteTask={handleDeleteTask}
          />
        </NavigationContainer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
