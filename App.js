import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import the modal stack navigator

import LoginScreenView from './screens/LoginScreenView';
import RegisterScreenView from './screens/RegisterScreenView';
import HomeScreenView from './screens/HomeScreenView';
import CreateTaskScreenView from './screens/CreateTaskScreenView';

const Stack = createStackNavigator();
const ModalStack = createNativeStackNavigator(); // Create a modal stack navigator

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreenView} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreenView} />
        <Stack.Screen name="Home" component={HomeScreenView} />

        {/* Use the modal stack navigator for "New Task" screen */}
        <Stack.Screen
          name="New Task"
          options={{
            headerShown: false, // Hide the header for the modal screen
            presentation: 'modal', // Set the presentation to modal
          }}
        >
          {() => (
            <ModalStack.Navigator
              screenOptions={{
                headerShown: false, // Hide the header for modal screens
                animation: 'slide_from_bottom', // Set your desired animation here
              }}
            >
              <ModalStack.Screen
                name="New Task Modal"
                component={CreateTaskScreenView}
              />
            </ModalStack.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
