import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View, Alert, } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { firebaseCreateTask } from '../firebaseFunctions';

export default function CreateTaskScreenView() {
  const navigation = useNavigation();

  const [taskDescription, setTaskDescription] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [useDeadline, setUseDeadline] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [storyPoint, setStoryPoint] = useState('');

  const handleCreateTask = async () => {
    if (taskTitle.trim() === '') {
      Alert.alert('Empty title', 'Please enter a valid task title.');
      return; // Prevent further execution
    } else if (useDeadline && (!isValidNumber(day) || !isValidNumber(month) || !isValidNumber(year))) {
      Alert.alert('Invalid Deadline', 'Please enter a valid deadline in dd/mm/yy format.');
      return;
    } else if (useDeadline == false) {
      console.log('no deadline!');
      const success = await firebaseCreateTask(taskTitle, taskDescription, '', storyPoint);
      if (success) {
        navigation.goBack();
      }
    } else {
      const deadline = `${day}/${month}/${year}`;
      const success = await firebaseCreateTask(taskTitle, taskDescription, deadline, storyPoint);
      if (success) {
        navigation.goBack();
      }
    }
  };

  const addDeadline = () => {
    setUseDeadline(true);
  };

  const removeDeadline = () => {
    setDay('');
    setMonth('');
    setYear('');
    setUseDeadline(false);
  };

  const isValidNumber = (text) => {
    return /^[0-9]+$/.test(text);
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.fieldDescription}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
          />
          <Text style={styles.fieldDescription}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="An objective description of the task"
            multiline
            value={taskDescription}
            onChangeText={(text) => setTaskDescription(text)}
          />

          <Text style={styles.fieldDescription}>Deadline</Text>

          {!useDeadline && (
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor: '#0052CC' }]}
              onPress={addDeadline}
            >
              <Text style={styles.dateButtonText}>Add Deadline</Text>
            </TouchableOpacity>
          )}

          {useDeadline && (
            <View>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={styles.dateInput}
                  placeholder="dd"
                  value={day}
                  onChangeText={(text) => setDay(text)}
                />
                <Text style={styles.dateSeparator}>/</Text>
                <TextInput
                  style={styles.dateInput}
                  placeholder="mm"
                  value={month}
                  onChangeText={(text) => setMonth(text)}
                />
                <Text style={styles.dateSeparator}>/</Text>
                <TextInput
                  style={styles.dateInput}
                  placeholder="yy"
                  value={year}
                  onChangeText={(text) => setYear(text)}
                />
              </View>
              <TouchableOpacity
                style={[styles.dateButton, { backgroundColor: '#DE350B' }]}
                onPress={removeDeadline}
              >
                <Text style={styles.dateButtonText}>Remove Deadline</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.fieldDescription}>Story Point</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of hours required to complete the task"
            value={storyPoint}
            onChangeText={(text) => setStoryPoint(text)}
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleCreateTask}>
            <Text style={styles.buttonText}>Create Task</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#4c4b63',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#4c4b63',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E3E8',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 300,
  },
  button: {

    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  fieldDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B778C',
    marginTop: 12,
  },
  btnContainer: {
    marginTop: 12,
  },
  dateButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  dateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#E1E3E8',
    borderRadius: 4,
    padding: 8,
    width: 50,
  },
  dateSeparator: {
    fontSize: 20,
    marginHorizontal: 4,
  },
});
