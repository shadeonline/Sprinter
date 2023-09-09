import React, { useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const TaskCard = ({ task }) => {
    const navigation = useNavigation();
    // Function to determine border color based on task status
    const getStatusBorderColor = (status) => {
        switch (status) {
            case 'In Progress':
                return '#5386e4';
            case 'Completed':
                return 'green';
            default:
                return 'gray';
        }
    };

    const taskContainerStyle = {
        ...styles.taskContainer,
        borderColor: getStatusBorderColor(task.status),
        borderWidth: 3,
    };

    useEffect(() => {
        getStatusBorderColor(task.status)
      }, []);



    return (
        <TouchableOpacity
            style={taskContainerStyle}
            onPress={() => navigation.navigate('Task Detail', { task })} // Use the onPress prop here
        >
            <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{task.taskTitle}</Text>
                <View style={styles.storyPointContainer}>
                    <Text style={styles.storyPoint}>{task.storyPoint ? task.storyPoint : '-'}</Text>
                </View>
            </View>
            <Text style={styles.deadline}>Deadline: {task.deadline}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: 'white',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        elevation: 2,
        width:'85%'
        
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    storyPointContainer: {
        fontSize: 14,
        color: 'gray',
        backgroundColor: '#DCE0E8',
        paddingHorizontal: 20,
        paddingVertical: 2,
        borderRadius: 10,
    },
    storyPoint: {
        fontSize: 14,
        color: 'gray',
    },
    deadline: {
        fontSize: 14,
        color: 'gray',
    },
});

export default TaskCard;
