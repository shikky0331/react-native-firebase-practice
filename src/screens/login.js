import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import Firebase from '../../config/Firebase';

const Login = ({...props}) => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')

  const handleSignin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => props.navigation.navigate('IssueList'))
      .catch(error => { console.log(error); alert('Your email address or password is incorrect.');} )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={email => updateEmail(email)}
        placeholder='Email'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={password => updatePassword(password)}
        placeholder='Password'
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button
        title="Don't have an account yet? Sign up"
        onPress={() => props.navigation.navigate('Signup')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonSignup: {
    fontSize: 12
  }
})

export default Login
