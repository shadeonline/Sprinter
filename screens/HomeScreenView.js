import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import SettingsComponent from './SettingsTabView';
import SprintComponent from './SprintTabView';
import TasksComponent from './TasksTabView';
import CreateTaskButton from '../components/CreateTaskButton';

const Tab = createBottomTabNavigator();

const HomeScreenView = () => {
  const navigation = useNavigation(); // Get the navigation object

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => <CreateTaskButton/>,
    });
  });

  // Function to update the screen title
  const updateScreenTitle = (newTitle) => {
    navigation.setOptions({
      title: newTitle,
    });
  };

  return (
    <Tab.Navigator
      independent={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'Settings') {
            icon = focused ? (
              <Ionicons name="settings" size={size} color={color} />
            ) : (
              <Ionicons name="settings" size={size} color={color} />
            );
          }
          if (route.name === 'Sprint') {
            icon = focused ? (
              <FontAwesome5 name="running" size={size} color={color} />
            ) : (
              <FontAwesome5 name="walking" size={size} color={color} />
            );
          } else if (route.name === 'Tasks') {
            icon = focused ? (
              <FontAwesome5 name="tasks" size={size} color={color} />
            ) : (
              <FontAwesome5 name="tasks" size={size} color={color} />
            );
          }
          return icon;
        },
        tabBarActiveTintColor: '#5386E4',
        tabBarInactiveTintColor: '#949396',
        tabBarStyle: { display: 'flex' },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Tasks"
        options={{
          tabBarLabel: 'Tasks', // Set a tab label
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                updateScreenTitle('Tasks'); // Update the stack title
                props.onPress();
              }}
            ></TouchableOpacity>
          ),
        }}
      >
        {() => <TasksComponent />}
      </Tab.Screen>
      <Tab.Screen
        name="Sprint"
        options={{
          tabBarLabel: 'Sprint', // Set a tab label
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                updateScreenTitle('Sprint'); // Update the stack title
                props.onPress();
              }}
            >
              {/* Render your tab icon here */}
            </TouchableOpacity>
          ),
        }}
      >
        {() => <SprintComponent />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          tabBarLabel: 'Settings', // Set a tab label
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                updateScreenTitle('Settings'); // Update the stack title
                props.onPress();
              }}
            ></TouchableOpacity>
          ),
        }}
      >
        {() => <SettingsComponent />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeScreenView;
