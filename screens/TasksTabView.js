import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { firebaseFetchTask } from '../firebaseFunctions';
import TaskSection from '../components/TaskSection';

export default TasksComponent = () => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);
    const [backlogTasks, setBacklogTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const fetchTasks = async () => {
        const taskList = await firebaseFetchTask();
        setTasks(taskList);

        const backlog = taskList.filter((task) => task.status === 'Backlog');
        const inProgress = taskList.filter((task) => task.status === 'In Progress');
        const completed = taskList.filter((task) => task.status === 'Completed');

        setBacklogTasks(backlog);
        setInProgressTasks(inProgress);
        setCompletedTasks(completed);
    };

    useEffect(() => {
        // Call the fetchTasks function
        if (isFocused) {
            fetchTasks();
        }
    }, [isFocused]);

    return (
        <ScrollView style={styles.background}>
            {(inProgressTasks.length > 0 || backlogTasks.length > 0 || completedTasks.length > 0) ? (
                <>
                    {inProgressTasks.length > 0 && (
                        <TaskSection title="In Progress" tasks={inProgressTasks} />
                    )}
                    {backlogTasks.length > 0 && (
                        <TaskSection title="Backlog" tasks={backlogTasks} />
                    )}
                    {completedTasks.length > 0 && (
                        <TaskSection title="Completed" tasks={completedTasks} />
                    )}
                </>
            ) : (
                <View style={styles.emptyMessageContainer}>
                    <Text style={styles.emptyMessageText}>
                        Looking empty! Click on the button below to create a new task!
                    </Text>
                    <TouchableOpacity
                        style={styles.createTaskButton}
                        onPress={() => navigation.navigate('New Task')}
                    >
                        <Text style={styles.createTaskButtonText}>Create New Task</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#4C4B63',
        paddingHorizontal: 16,
    },
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%',
    },
    emptyMessageText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    createTaskButton: {
        backgroundColor: '#0052CC',
        padding: 16,
        borderRadius: 40,
        marginTop: 15,
        alignSelf: 'center', // Center-align the button horizontally
    },
    createTaskButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
