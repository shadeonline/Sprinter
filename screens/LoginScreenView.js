import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import {firebaseLogin} from '../firebaseFunctions';

const LoginScreenView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const authState = auth.onAuthStateChanged(async user => {
      if (user) {
        navigation.replace("Home")
      }
    });

    return authState;
  }, []);

  const handleLogin = async () => {
    try {
      await firebaseLogin(email, password);
      // You can navigate to the Home screen or perform other actions upon successful login
      navigation.replace('Home');
    } catch (error) {
      alert(error.message);
    }
  };



  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FontAwesome5 name="running" size={100} color="white" style={styles.image} />
      <Text style={styles.imageText}>Sprinter</Text>
      <Text style={styles.subImageText}>Personal Agile Task Management Tool</Text>
      <View style={styles.inputContainer} >
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          autoCapitalize='none'
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.button, styles.buttonGreen]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Create new account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreenView

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize:20,
  },
  subImageText:{
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    fontSize:13,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c4b63',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#e8e9ed',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonGreen: {
    backgroundColor: '#14A44D',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})