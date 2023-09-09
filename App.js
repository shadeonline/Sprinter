import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

import LoginScreenView from './screens/LoginScreenView';
import RegisterScreenView from './screens/RegisterScreenView';
import HomeScreenView from './screens/HomeScreenView';
import CreateTaskScreenView from './screens/CreateTaskScreenView';
import TaskDetailScreenView from './screens/TaskDetailScreenView';
import CreateSprintScreenView from './screens/CreateSprintScreenView';


LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreenView} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreenView} />
        <Stack.Screen name="Home" component={HomeScreenView} />

        <Stack.Screen
          name="New Task"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          component={CreateTaskScreenView}
        />

        <Stack.Screen
          name="New Sprint"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          component={CreateSprintScreenView}
        />

        <Stack.Screen
          name="Task Detail"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          component={TaskDetailScreenView}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});