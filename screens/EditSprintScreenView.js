import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import { firebaseEditSprint, firebaseFetchSprintTasks, firebaseFetchTask } from '../firebaseFunctions';
import TaskCard from '../components/TaskCard';

export default function EditSprintScreenView({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [sprintName, setSprintName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const { sprint } = route.params; // Get the sprint passed as a parameter

  const handleEditSprint = async () => {
    if (!sprintName) {
      Alert.alert('Error', 'Please enter a sprint name.');
      return;
    }
    try {
      await firebaseEditSprint(sprint.id, sprintName, selectedTasks);
      navigation.goBack();
    } catch (error) {
      console.error('Error editing sprint:', error);
      Alert.alert('Error', 'Failed to edit the sprint. Please try again.');
    }
  };

  const toggleTaskSelection = (taskId) => {
    const isTaskSelected = selectedTasks.includes(taskId);
    if (isTaskSelected) {
      setSelectedTasks((prevSelectedTasks) => prevSelectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, taskId]);
    }
  };

  const fetchSprintTasks = async () => {
    try {
      // Fetch all tasks in progress or backlog
      const allTasks = await firebaseFetchTask();

      // Filter out tasks that are already in the sprint
      const tasksNotInSprint = allTasks.filter(
        (task) => task.status === 'In Progress' || task.status === 'Backlog' || task.status === '-'
      );

      setTasks(tasksNotInSprint);
      setSelectedTasks(sprint.tasks || []); // Pre-select the tasks already in the sprint
    } catch (error) {
      console.error('Error fetching sprint tasks:', error);
    }
  };

  const addTaskToSprint = (taskId) => {
    setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, taskId]);
  };

  const removeTaskFromSprint = (taskId) => {
    setSelectedTasks((prevSelectedTasks) => prevSelectedTasks.filter((id) => id !== taskId));
  };

  useEffect(() => {
    if (isFocused) {
      fetchSprintTasks();
      setSprintName(sprint.sprintName); // Set the initial sprint name
    }
  }, [isFocused]);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Edit Sprint</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Sprint Name'
          value={sprintName}
          onChangeText={(text) => setSprintName(text)}
        />
        <ScrollView style={styles.taskList}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskContainer}>
              <TaskCard task={task} />
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => {
                  if (selectedTasks.includes(task.id)) {
                    removeTaskFromSprint(task.id);
                  } else {
                    addTaskToSprint(task.id);
                  }
                }}
              >
                {selectedTasks.includes(task.id) ? (
                  <Text style={styles.checkboxText}>✓</Text>
                ) : (
                  <Text style={styles.checkboxText}>○</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.editButton} onPress={handleEditSprint}>
          <Text style={styles.editButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={navigation.goBack}>
          <Text style={styles.editButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Rest of your styles and imports...

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#4c4b63',
    padding: 16,
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    height: '90%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskList: {
    maxHeight: 800,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    marginLeft: 'auto',
  },
  checkboxText: {
    fontSize: 20,
  },
  editButton: {
    backgroundColor: '#0052cc',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#aba8b2',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
});
