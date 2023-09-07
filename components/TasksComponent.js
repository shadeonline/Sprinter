import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { firebaseFetchTask } from '../firebaseFunctions';
import TaskCard from './TaskCard';
import TaskDetailModal from "./TaskDetailModal";

export default TasksComponent = () => {
    const isFocused = useIsFocused();
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskDetailsVisible, setIsTaskDetailsVisible] = useState(false);

    const fetchTasks = async () => {
        // Retreive data from firebase in a list format of
        // [{id: doc.id,
        // taskTitle: data.taskTitle || '-',
        // taskDescription: data.taskDescription || '-',
        // storyPoint: data.storyPoint || '-',
        // deadline: formattedDeadline}]
        const taskList = await firebaseFetchTask();
        setTasks(taskList);
    };

    const handleTaskPress = (task) => {
        setSelectedTask(task);
        console.log(task);
        setIsTaskDetailsVisible(true);
    };

    const handleCloseTaskDetails = () => {
        setIsTaskDetailsVisible(false);
    };

    useEffect(() => {
        // Call the fetchTasks function
        if (isFocused) {
            console.log("Task");
            fetchTasks();
        }
    }, [isFocused]);

    return (
        <ScrollView style={styles.background}>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onPress={() => handleTaskPress(task)} />
            ))}

            {/* Render the TaskDetailsPopup when visible */}
            {selectedTask && (
                <TaskDetailModal
                    task={selectedTask}
                    visible={isTaskDetailsVisible}
                    onClose={handleCloseTaskDetails}
                    onEdit={setTasks}
                    taskList={tasks}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#4C4B63',
    },
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
