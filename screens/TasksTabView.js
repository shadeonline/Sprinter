import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { firebaseFetchTask } from '../firebaseFunctions';
import TaskSection from '../components/TaskSection';

export default TasksComponent = () => {
    const isFocused = useIsFocused();
    const [tasks, setTasks] = useState([]);

    const [backlogTasks, setBacklogTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const fetchTasks = async () => {
        // Retreive data from firebase in a list format of
        // [{id: doc.id,
        // taskTitle: data.taskTitle || '-',
        // taskDescription: data.taskDescription || '-',
        // storyPoint: data.storyPoint || '-',
        // deadline: dd/mm/yy
        // status: -
        // }]
        const taskList = await firebaseFetchTask();
        setTasks(taskList);
        // Separate tasks based on progress
        const backlog = taskList.filter((task) => task.status === '-');
        const inProgress = taskList.filter((task) => task.status === 'In Progress');
        const completed = taskList.filter((task) => task.status === 'Completed');
        setBacklogTasks(backlog)
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
            {inProgressTasks.length > 0 && (
                <TaskSection title="In Progress" tasks={inProgressTasks} />
            )}
            {backlogTasks.length > 0 && (
                <TaskSection title="Backlog" tasks={backlogTasks} />
            )}
            {completedTasks.length > 0 && (
                <TaskSection title="Completed" tasks={completedTasks} />
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    background: {
        backgroundColor: '#4C4B63',
        paddingHorizontal: 16,
    },
});
