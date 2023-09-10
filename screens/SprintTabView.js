import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { firebaseFetchActiveSprint, firebaseFetchSprintTasks, firebaseCloseSprint } from '../firebaseFunctions'; // Import your functions for fetching sprints
import { useIsFocused } from '@react-navigation/native';
import TaskSection from '../components/TaskSection';
import SprintChart from "../components/SprintChart";

export default SprintComponent = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [sprintDetail, setSprintDetail] = useState([]);
    const [backlogTasks, setBacklogTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const fetchSprint = async () => {
        try {
            // Fetch the active sprint
            const activeSprint = await firebaseFetchActiveSprint();
            setSprintDetail(activeSprint);

            // If an active sprint is found, fetch its tasks
            if (activeSprint) {
                const sprintTaskIds = activeSprint.tasks || []; // Assuming tasks property exists
                const taskList = await firebaseFetchSprintTasks(sprintTaskIds);
                const backlog = taskList.filter((task) => task.status === '-');
                const inProgress = taskList.filter((task) => task.status === 'In Progress');
                const completetd = taskList.filter((task) => task.status === 'Completed');
                setBacklogTasks(backlog);
                setInProgressTasks(inProgress);
                setCompletedTasks(completetd)
            }
        } catch (error) {
            console.error('Error fetching sprint and tasks:', error);
        }
    };

    const closeSprint = async () => {
        try {
            if (sprintDetail) {
                // Check if there is an active sprint
                const result = await firebaseCloseSprint(sprintDetail.id); // Assuming you have a function to close the sprint
                if (result) {
                    Alert.alert('Success', 'Sprint closed successfully.');
                    fetchSprint(); // Refresh the sprint data after closing
                } else {
                    Alert.alert('Error', 'Failed to close the sprint.');
                }
            }
        } catch (error) {
            console.error('Error closing sprint:', error);
        }
    };

    useEffect(() => {
        // Call the fetchSprint function
        if (isFocused) {
            fetchSprint();
        }
    }, [isFocused]);

    return (
        <ScrollView style={styles.background}>
            {sprintDetail ? (
                // If sprints exist, display the sprint tasks
                <View style={styles.container}>
                    <Text style={styles.header}>{sprintDetail.sprintName}</Text>

                    {/* CREATE A DONUT CHART HERE */}
                    <Text style={styles.subheader}>Progress report</Text>
                    <SprintChart
                        totalTasks={backlogTasks.length + inProgressTasks.length + completedTasks.length}
                        backlogTasks={backlogTasks}
                        inProgressTasks={inProgressTasks}
                        completedTasks={completedTasks}
                    />

                    <TaskSection title="In Progress" tasks={inProgressTasks} />
                    <TaskSection title="Backlog" tasks={backlogTasks} />
                    <TaskSection title="Completed" tasks={completedTasks} />

                    <TouchableOpacity
                        style={styles.editSprintButton}
                        onPress={() => navigation.navigate('Edit Sprint', { sprint: sprintDetail })}
                    >
                        <Text style={styles.buttonText}>Edit Sprint</Text>
                    </TouchableOpacity>

                    {/* Add a "Close Sprint" button */}
                    <TouchableOpacity style={styles.closeSprintButton} onPress={closeSprint}>
                        <Text style={styles.buttonText}>Close Sprint</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // If no sprints exist, show the "Create new Sprint" button
                <View style={styles.emptyMessageContainer}>
                    <Text style={styles.text}>Looking empty! Create a new sprint to begin!</Text>
                    <TouchableOpacity style={styles.createSprintButton} onPress={() => navigation.navigate('New Sprint')}>
                        <Text style={styles.buttonText}>Create new Sprint</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#4C4B63',

    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    sprintName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    subheader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 24,
        marginBottom: 8,
    },
    noTasks: {
        fontSize: 16,
        color: 'white',
        marginBottom: 16,
    },

    createSprintButton: {
        backgroundColor: '#0052CC',
        padding: 16,
        borderRadius: 40,
        marginTop: 15,
        alignItems: 'center',
    },
    editSprintButton: {
        backgroundColor: '#949396',
        padding: 16,
        marginVertical: 0,
        borderRadius: 40,
        marginTop: 100,
        alignItems: 'center',
    },
    closeSprintButton: {
        backgroundColor: '#FF6B6B',
        padding: 16,
        marginVertical: 30,
        borderRadius: 40,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    text: {
        marginTop: '50%',
        color: 'white',
        fontSize: 15,
        padding: 15,
        textAlign:'center',
    },
});
