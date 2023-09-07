import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import NonEditableTaskDetail from "./NonEditableTaskDetail";
import EditableTaskDetail from "./EditableTaskDetail";
import { firebaseEditTask, firebaseDeleteTask } from '../firebaseFunctions';

const TaskDetailModal = ({ task, visible, onClose, onEdit, taskList }) => {
    const [editedTask, setEditedTask] = useState({ ...task });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Update the editedTask state when the task prop changes
        setEditedTask({ ...task });
    }, [task]);

    const handleSaveChanges = () => {
        setIsEditing(false);
        // Call the firebaseEditTask function to save the changes to the database
        firebaseEditTask(editedTask)
            .then(() => {
                // Update the tasks list in the parent component (TasksComponent)
                const updatedTasks = taskList.map((taskItem) => {
                    if (taskItem.id === editedTask.id) {
                        // Replace the edited task with the updated one
                        return editedTask;
                    }
                    return taskItem;
                });
    
                // Call the onEdit function with the updated tasks list
                onEdit(updatedTasks);
            })
            .catch((error) => {
                console.error('Error editing task: ', error);
            });
    };

    const handleDeleteTask = () => {
        // Use Firebase to delete the task by its ID
        firebaseDeleteTask(editedTask.id)
            .then(() => {
                // Remove the deleted task from the task list
                const updatedTasks = taskList.filter((taskItem) => taskItem.id !== editedTask.id);
                onEdit(updatedTasks);
                onClose(); // Close the modal after deletion
            })
            .catch((error) => {
                console.error('Error deleting task: ', error);
            });
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{editedTask.taskTitle}</Text>
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
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        width: '90%',
        alignItems: 'center',
        position: 'relative',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalText: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
    editableForm: {
        width: '100%',
        alignItems: 'center', // Center the content horizontally.
    },
    modalDetails: {
        width: '100%',
    },
    editableText: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E1E3E8',
        borderRadius: 4,
        padding: 8,
        width: '100%',
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
        padding: 10,
        zIndex: 1,
    },
    closeButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'center', // Center the buttons horizontally.
    },
    editButton: {
        flex: 1,
        backgroundColor: '#0052CC',
        padding: 10,
        borderRadius: 4,
        marginRight: 8,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#DD2C00',
        padding: 10,
        borderRadius: 4,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveButton: {
        flex: 1,
        margin: 5,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 4,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelButton: {
        flex: 1,
        margin: 5,
        backgroundColor: '#DD2C00',
        padding: 10,
        borderRadius: 4,
    },
    cancelButtonText: {

        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default TaskDetailModal;
