import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreenView from './screens/LoginScreenView';
import RegisterScreenView from './screens/RegisterScreenView';
import HomeScreenView from './screens/HomeScreenView';
import CreateTaskScreenView from './screens/CreateTaskScreenView';
import TaskDetailScreenView from './screens/TaskDetailScreenView';

const Stack = createStackNavigator();
const ModalStack = createNativeStackNavigator();

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
        >
        </Stack.Screen>

        <Stack.Screen
          name="Task Detail"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
          component={TaskDetailScreenView}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});