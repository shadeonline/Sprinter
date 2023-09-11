import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebaseCompleteTutorial } from '../firebaseFunctions';

const TutorialScreenView = () => {
  const navigation = useNavigation(); // Get the navigation object

  const handleCompleteTutorial = async () => {
    navigation.goBack();
    const tutorialCompleted = await firebaseCompleteTutorial();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to the Sprinter App Tutorial</Text>
      <Text style={styles.subtitle}>Learn How to Get Started</Text>
      
      <View style={styles.stepContainer}>
        <Text style={styles.step}>Tasks</Text>
        <Image source={require('../assets/CreateTask.png')} style={styles.image} />
        <Text style={styles.description}>
          Click on the button on the top right of the header and start creating your first task! Tasks are used to keep track of tasks you need reminders to do.
        </Text>
        
        <Image source={require('../assets/EditStatus.png')} style={styles.image} />
        <Text style={styles.description}>
          Simply click on the task and then click on the status button above to edit the task's status.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.step}>Sprint</Text>
        <Image source={require('../assets/CreateSprint.png')} style={styles.image} />
        <Text style={styles.description}>
          Click on the icon at the bottom tab to start using the sprint functionality of Sprinter! You can create sprints and add tasks to them.
        </Text>
        
        <Image source={require('../assets/Dashboard.png')} style={styles.image} />
        <Text style={styles.description}>
          It's super easy to keep track of your sprints with our dashboard.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.step}>Congratulations!</Text>
        <Text style={styles.description}>
          You've completed the tutorial, you'll be ready to use Sprinter with confidence.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCompleteTutorial}
      >
        <Text style={styles.buttonText}>Complete Tutorial</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#F5F7F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#172B4D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B778D', 
    marginBottom: 20,
    textAlign: 'center',
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  step: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#172B4D', 
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#6B778D',
    textAlign: 'center',
  },
  image: {
    width: '90%', // Adjust image size
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop:20,
  },
  button: {
    backgroundColor: '#0052CC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default TutorialScreenView;
