import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default EditableTaskDetail = ({ task, editedTask, setEditedTask, handleSaveChanges, setIsEditing }) => {
    return (
        <View style={styles.editableForm}>
            <Text style={styles.modalText}>Title:</Text>
            <TextInput
                style={styles.editableText}
                value={editedTask.taskTitle}
                onChangeText={(text) =>
                    setEditedTask({ ...editedTask, taskTitle: text })
                }
            />
            <Text style={styles.modalText}>Storypoint:</Text>
            <TextInput
                style={styles.editableText}
                value={editedTask.storyPoint}
                onChangeText={(text) =>
                    setEditedTask({ ...editedTask, storyPoint: text })
                }
            />
            <Text style={styles.modalText}>Description:</Text>
            <TextInput
                style={[styles.editableText, styles.descriptionInput]}
                multiline={true}
                numberOfLines={4}
                value={editedTask.taskDescription}
                onChangeText={(text) =>
                    setEditedTask({ ...editedTask, taskDescription: text })
                }
            />
            <Text style={styles.modalText}>Deadline:</Text>
            <View style={styles.deadlineContainer}>
                <TextInput
                    style={styles.deadlineInput}
                    placeholder="dd"
                    value={editedTask.deadline.split('/')[0]}
                    onChangeText={(text) =>
                        setEditedTask({
                            ...editedTask,
                            deadline: `${text}/${editedTask.deadline.split('/')[1]}/${editedTask.deadline.split('/')[2]}`,
                        })
                    }
                />
                <Text style={styles.deadlineSeparator}>/</Text>
                <TextInput
                    style={styles.deadlineInput}
                    placeholder="mm"
                    value={editedTask.deadline.split('/')[1]}
                    onChangeText={(text) =>
                        setEditedTask({
                            ...editedTask,
                            deadline: `${editedTask.deadline.split('/')[0]}/${text}/${editedTask.deadline.split('/')[2]}`,
                        })
                    }
                />
                <Text style={styles.deadlineSeparator}>/</Text>
                <TextInput
                    style={styles.deadlineInput}
                    placeholder="yy"
                    value={editedTask.deadline.split('/')[2]}
                    onChangeText={(text) =>
                        setEditedTask({
                            ...editedTask,
                            deadline: `${editedTask.deadline.split('/')[0]}/${editedTask.deadline.split('/')[1]}/${text}`,
                        })
                    }
                />
            </View>

            <View style={styles.buttonContainer}>
                {/* CANCEL BUTTON */}
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                        setIsEditing(false);
                        setEditedTask(task);
                    }}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                {/* SAVE BUTTON */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveChanges}
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        marginTop:10,
        fontWeight: 'bold',
    },
    editableForm: {
        width: '100%',
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
        backgroundColor: '#5386e4',
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
    deadlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deadlineInput: {
        flex: 1,
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E1E3E8',
        borderRadius: 4,
        padding: 8,
    },
    deadlineSeparator: {
        fontSize: 14,
        color: 'gray',
        marginHorizontal: 4,
    },
});