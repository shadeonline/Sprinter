import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'

const CreateTaskButton = () => {
    const navigation = useNavigation();

    const handleCreateTask = () =>{
        navigation.navigate('New Task')
    }
    

    return (
        <TouchableOpacity onPress={handleCreateTask} style={{ marginRight: 20 }}>
            <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default CreateTaskButton;
