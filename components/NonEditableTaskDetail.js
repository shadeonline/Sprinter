import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';


const NonEditableTaskDetail = ({ task, setIsEditing, onDelete }) => {
    return (
        <View style={styles.modalDetails}>
            <Text style={styles.modalText}>Storypoint: {task.storyPoint}</Text>
            <Text style={styles.modalText}>Description: {task.taskDescription}</Text>
            <Text style={styles.modalText}>Deadline: {task.deadline}</Text>
            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={onDelete}
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditing(true)}
                >
                    <Text style={styles.editButtonText}>Edit</Text>
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
        marginHorizontal: 8,
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
        marginHorizontal: 8,
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

export default NonEditableTaskDetail;
