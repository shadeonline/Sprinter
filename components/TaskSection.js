import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TaskCard from '../components/TaskCard';
import { MaterialIcons } from '@expo/vector-icons';

const TaskSection = ({ title, tasks }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={toggleSection}>
          {isExpanded ? (
            <MaterialIcons name="expand-less" size={24} color="white" />
          ) : (
            <MaterialIcons name="expand-more" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
      {isExpanded && tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TaskSection;
