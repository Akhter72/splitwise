import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyles} from '../constants/styles';
import Button from './UI/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setAuthentication} from '../redux/groupReducer';
import {useState} from 'react';
export default function HomepageDrawer({visible, invisible}) {
  const dispatch = useDispatch();
  async function logoutHandler() {
    console.log('logout');
    dispatch(setAuthentication(false));
    await AsyncStorage.removeItem('@loggedUser');
  }

  return (
    <View style={{width: 10}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        // style={styles.modal}
      >
        <View style={styles.modal}>
          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={invisible}>
            <Image
              style={styles.cancelIcon}
              source={require('../images/cancel-icon.png')}
            />
          </TouchableOpacity>
          <View style={styles.profile}>
            <Image
              style={styles.profileImage}
              source={require('../images/profile.png')}
            />
          </View>
          <View>
            <View style={styles.detailContainer}>
              {/* <Text style={styles.detailTitle}>Name</Text> */}
              <Text style={styles.detailTitle}>Akhter Hussain dar</Text>
            </View>
          </View>
          <Button style={styles.logoutButton} onPress={logoutHandler}>
            Logout
          </Button>
          {/* <Button onPress={logoutHandler}>Logout</Button> */}
        </View>
      </Modal>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    flex: 1,
  },
  profile: {
    borderBottomWidth: 2,
    justifyContent: 'center',
  },
  profileImage: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  cancelIcon: {
    width: 20,
    height: 20,
    margin: 20,
    padding: 10,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    color: GlobalStyles.colors.primary500
  },
});
