import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';


const TaskCard = ({ task, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.taskContainer}
            onPress={onPress} // Use the onPress prop here
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
