import React from 'react';
import { render } from 'react-native-testing-library';
import { NavigationContainer } from '@react-navigation/native';
import CreateTaskButton from '../components/CreateTaskButton';

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

describe('CreateTaskButton', () => {
  it('matches snapshot', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <CreateTaskButton />
      </NavigationContainer>
    );

    // Use Jest's expect to match the snapshot
    expect(toJSON()).toMatchSnapshot();
  });
});
