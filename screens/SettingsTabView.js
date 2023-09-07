import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default SettingsComponent = () => {
    const navigation = useNavigation()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Signed out")
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    return (
        <ScrollView style={styles.background} >

            {/* Sign Out */}
            <View style={styles.container}>
                <Text style={styles.boxText}>Email: {auth.currentUser?.email}</Text>
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#4C4B63',
    },

    container: {
        backgroundColor: '#4C4B63',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
    },
    boxText: {
        color: 'white',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#5386E4',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})