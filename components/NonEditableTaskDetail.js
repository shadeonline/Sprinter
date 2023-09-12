import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons'; // You can choose any icon library you prefer
import SelectDropdown from 'react-native-select-dropdown'
import { firebaseEditTask } from "../firebaseFunctions";

const NonEditableTaskDetail = ({ task, setIsEditing, handleDeleteTask }) => {
    const navigation = useNavigation();

    const [editedTask, setEditedTask] = useState(task);
    // const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#999999');


    const [buttonBackgroundColor, setButtonBackgroundColor] = useState(() => {
        // Set the initial button background color based on task.status
        switch (task.status) {
            case 'Backlog':
                return '#999999'; // Grey for Backlog
            case 'In Progress':
                return '#0782F9'; // Blue for In Progress
            case 'Completed':
                return '#14A44D'; // Green for Completed
            default:
                return '#999999'; // Default to grey for unknown status
        }
    });

    const handleStatusChange = (selectedStatus) => {
        // Update the editedTask state with the new status
        setEditedTask((prevEditedTask) => ({
            ...prevEditedTask,
            status: selectedStatus,
        }));

        // Set the button background color based on the selected status
        switch (selectedStatus) {
            case 'Backlog':
                setButtonBackgroundColor('#999999'); // Grey for Backlog
                break;
            case 'In Progress':
                setButtonBackgroundColor('#0782F9'); // Blue for In Progress
                break;
            case 'Completed':
                setButtonBackgroundColor('#14A44D'); // Green for Completed
                break;
            default:
                setButtonBackgroundColor('#999999'); // Default to grey for unknown status
        }
    }

    useEffect(() => {
        // This effect will run whenever editedTask changes
        // Check if the status has changed and then update it in Firebase
        if (editedTask.status !== task.status) {
            // Call the function to edit the task in Firebase
            firebaseEditTask(editedTask)
                .then((success) => {
                    if (success) {
                        console.log("Task edited successfully");
                    } else {
                        console.log("Error editing task");
                    }
                })
                .catch((error) => {
                    console.error("Error editing task:", error);
                });
        }
    }, [editedTask]);


    // console.log(task.status);
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
            <Text style={styles.modalLabel}>Status:</Text>


            <SelectDropdown
                defaultValue={task.status}
                data={["Backlog", "In Progress", "Completed"]}
                onSelect={(selectedStatus) => {
                    handleStatusChange(selectedStatus)
                }}
                buttonStyle={{ ...styles.selectButton, backgroundColor: buttonBackgroundColor }}
                buttonTextStyle={styles.selectButtonText}

            />
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
        color: '#949396',
    },
    modalText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 16,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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

    selectButton: {
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
        width: '40%',
        height: '10%'
    },
    selectButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },

    statusDropdownContainer: {
        marginBottom: 16,
        borderColor: '#949396',
        borderWidth: 1,
        borderRadius: 4,
    },
    statusDropdown: {
        height: 40,
        width: '100%',
    },
});

export default NonEditableTaskDetail;
