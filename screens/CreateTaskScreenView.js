import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'

export default CreateTaskScreenView = () => {
    const navigation = useNavigation(); 

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer} >
      </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
})