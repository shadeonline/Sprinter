import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View } from 'react-native';
import { auth, firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { firebaseCreateTask } from '../firebaseFunctions';
import DateTimePicker from '@react-native-community/datetimepicker';

export default CreateTaskScreenView = () => {
  const navigation = useNavigation();

  const [taskDescription, setTaskDescription] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [useDeadline, setUseDeadline] = useState(false);
  const [hidePicker, setHidePicker] = useState(true);
  const [deadline, setDeadline] = useState(new Date(Date.now()));
  const [hoursToComplete, setHoursToComplete] = useState('');

  const handleCreateTask = async () => {
    if (useDeadline == false) {
      console.log('no deadline!');
      const success = await firebaseCreateTask(taskTitle, taskDescription, '', hoursToComplete);
      if (success) {
        navigation.goBack();
      }
    }
    else {
      const success = await firebaseCreateTask(taskTitle, taskDescription, deadline, hoursToComplete);
      if (success) {
        navigation.goBack();
      }
    }
  };

  const addDeadline = () => {
    setUseDeadline(true);
  };

  const removeDeadline = () => {
    setDeadline(new Date(Date.now()))
    setUseDeadline(false);
  };

  const saveDeadline = () => {
    setHidePicker(!hidePicker);
  };

  const onChange = (event, value) => {
    setDeadline(value);
  };

  return (
    <ScrollView style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">

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
              <View style={styles.input}>
                <Text >{deadline.toUTCString()}</Text>
              </View>
              {hidePicker && (
                <DateTimePicker
                  value={deadline}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
              <TouchableOpacity
                style={[styles.dateButton, { backgroundColor: '#0052CC' }]}
                onPress={saveDeadline}
              >
                <Text style={styles.dateButtonText}>{hidePicker ? 'Done' : 'Edit'}</Text>
              </TouchableOpacity>
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
            value={hoursToComplete}
            onChangeText={(text) => setHoursToComplete(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
            <Text style={styles.buttonText}>Create Task</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#4c4b63',
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
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
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
  datePicker: {
    width: '100%',
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


});
