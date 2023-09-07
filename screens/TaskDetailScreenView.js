import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NonEditableTaskDetail from "../components/NonEditableTaskDetail";
import EditableTaskDetail from "../components/EditableTaskDetail";
import { useNavigation } from '@react-navigation/core';
import { firebaseEditTask, firebaseDeleteTask } from '../firebaseFunctions';


export default TaskDetailScreenView = ({ route }) => {
    const navigation = useNavigation();
    const { task } = route.params;
    const [editedTask, setEditedTask] = useState({ ...task });
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveChanges = () => {
        setIsEditing(false);
        // Call the firebaseEditTask function to save the changes to the database
        firebaseEditTask(editedTask);
    };

    const handleDeleteTask = () => {
        // Use Firebase to delete the task by its ID
        firebaseDeleteTask(editedTask.id);
        navigation.goBack()
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{editedTask.taskTitle}</Text>
            </View>
            <View style={styles.content}>
                {isEditing ? (
                    <EditableTaskDetail
                        task={task}
                        editedTask={editedTask}
                        setEditedTask={setEditedTask}
                        handleSaveChanges={handleSaveChanges}
                        setIsEditing={setIsEditing}
                    />
                ) : (
                    <NonEditableTaskDetail
                        task={editedTask}
                        setIsEditing={setIsEditing}
                        handleDeleteTask={handleDeleteTask}
                    />
                )}


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5386e4', 
    },
    header: {
        backgroundColor: '#4c4b63', 
        padding: 16,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },

});
