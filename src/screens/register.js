import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import {GlobalStyles} from '../constants/styles';
import {addUser, fetchUserByName} from '../util/service/userService';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function validateEmail() {
    let reg = '/^w+([.-]?w+)*@w+([.-]?w+)*(.ww+)+$/';
    if (reg.test(username) === false) {
      return Alert.alert('Email not in valid Format');
    }
  }
  async function submitHandler() {
    const existingUser = await fetchUserByName(username);
    if (existingUser != null) {
      return Alert.alert("user with '" + username + "' already exists");
    } else {
      if (password.length < 6 || password.length > 10) {
        return Alert.alert('password must be between 6 to 9 letters long');
      } else if (username.length < 6 || username.length > 15) {
        return Alert.alert(' username must be 6 to 15 characters long');
      } else {
        const user = {
          name: username,
          password: password,
          groupIds: [],
        };
        await addUser(user);
        navigation.goBack();
      }
    }
  }

  return (
    // <ImageBackground source={require('../log.png')} style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#9e9e9e"
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9e9e9e"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#9e9e9e"
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.footerLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.primary800,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1e90ff',
    borderRadius: 5,
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#1e90ff',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },
  footerLink: {
    color: '#1e90ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default RegisterScreen;
