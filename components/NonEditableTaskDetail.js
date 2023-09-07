import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons'; // You can choose any icon library you prefer

const NonEditableTaskDetail = ({ task, setIsEditing, handleDeleteTask }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.modalDetails}>
            {/* Add icons for Edit and Delete buttons */}
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                    <Icon name="pencil-outline" size={24} color="#0052CC" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteTask}>
                    <Icon name="trash-outline" size={24} color="#DD2C00" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={styles.modalLabel}>Storypoint:</Text>
            <Text style={styles.modalText}>{task.storyPoint}</Text>
            <Text style={styles.modalLabel}>Description:</Text>
            <Text style={styles.modalText}>{task.taskDescription}</Text>
            <Text style={styles.modalLabel}>Deadline:</Text>
            <Text style={styles.modalText}>{task.deadline}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    modalDetails: {
        padding: 16,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#949396', // Jira-like label color
    },
    modalText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 16,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align icons to the right
        marginBottom: 16,
    },
    icon: {
        marginHorizontal: 8,
    },
    button: {
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'grey'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default NonEditableTaskDetail;
