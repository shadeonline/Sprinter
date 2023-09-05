import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreenView from './screens/LoginScreenView';
import RegisterScreenView from './screens/RegisterScreenView';
import HomeScreenView from './screens/HomeScreenView';
import CreateTaskScreenView from './screens/CreateTaskScreenView';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreenView} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreenView} />
        <Stack.Screen name="Home" component={HomeScreenView} />
        <Stack.Screen name="New Task" component={CreateTaskScreenView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});



