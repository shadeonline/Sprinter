import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import { firebaseCreateSprint, firebaseFetchTask } from '../firebaseFunctions';
import TaskCard from '../components/TaskCard';

export default function CreateSprintScreenView() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [sprintName, setSprintName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleCreateSprint = async () => {
    if (!sprintName) {
      Alert.alert('Error', 'Please enter a sprint name.');
      return;
    }
    try {
      await firebaseCreateSprint(sprintName, selectedTasks);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating sprint:', error);
      Alert.alert('Error', 'Failed to create the sprint. Please try again.');
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

  const fetchTasks = async () => {
    const taskList = await firebaseFetchTask();
    setTasks(taskList);
    const backlog = taskList.filter((task) => task.status === '-');
    const inProgress = taskList.filter((task) => task.status === 'In Progress');
    setBacklogTasks(backlog);
    setInProgressTasks(inProgress);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused]);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Create New Sprint</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Sprint Name'
          value={sprintName}
          onChangeText={(text) => setSprintName(text)}
        />
        <ScrollView style={styles.taskList}>
          <Text style={styles.sectionHeader}>Tasks In Progress</Text>
          {inProgressTasks.map((task) => (
            <View key={task.id} style={styles.taskContainer}>
              <TaskCard task={task} />
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleTaskSelection(task.id)}
              >
                {selectedTasks.includes(task.id) ? (
                  <Text style={styles.checkboxText}>✓</Text>
                ) : (
                  <Text style={styles.checkboxText}>○</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.sectionHeader}>Tasks In Backlog</Text>
          {backlogTasks.map((task) => (
            <View key={task.id} style={styles.taskContainer}>
              <TaskCard task={task} />
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleTaskSelection(task.id)}
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
        <TouchableOpacity style={styles.createButton} onPress={handleCreateSprint}>
          <Text style={styles.createButtonText}>Create Sprint</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    height:'90%'
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
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
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
  createButton: {
    backgroundColor: '#0052cc',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
