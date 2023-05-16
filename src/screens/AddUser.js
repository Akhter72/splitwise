import {TextInput, View, StyleSheet, FlatList, Alert, Text} from 'react-native';
import {GlobalStyles} from '../constants/styles';
import Button from '../components/UI/Button';
import {useState, useLayoutEffect} from 'react';
import {
  addGroupToUsers,
  fetchUserByName,
  fetchUsers,
} from '../util/service/userService';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedGroup} from '../redux/groupReducer';
import {addUsersToGroup} from '../util/service/groupService';

export default function AddUser({route, navigation}) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const group = useSelector(state => state.groupReducer.selectedGroup);
  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState(group.users);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    async function loadData() {
      const allUsers = await fetchUsers();
      setUsers(allUsers);
      setLoading(false);
    }
    loadData();
  }, [loading]);

  async function addUserHandler() {
    const user = users.find(user => user.name === inputText);
    if (user === undefined) {
      Alert.alert("user of name '" + inputText + "' does not exist");
    } else if (
      selectedUsersToAdd.find(user => user.name === inputText) != undefined
    ) {
      Alert.alert('user already in this group');
    } else {
      const newUsers = selectedUsersToAdd.filter(n => {
        return n;
      });
      newUsers.push(user);
      setSelectedUsersToAdd(newUsers);
      setInputText('');
    }
  }

  function removeUserHandler(id) {
    const newUsers = selectedUsersToAdd.filter(user => user.id != id);
    setSelectedUsersToAdd(newUsers);
  }

  function submitHandler() {
    const userIds = selectedUsersToAdd.map(a => a.id);
    const newGroup = group;
    newGroup.users = selectedUsersToAdd;
    dispatch(setSelectedGroup(newGroup));
    addGroupToUsers(group.id, userIds);
    addUsersToGroup(group.id, userIds);
    navigation.goBack();
  }

  if (loading) {
    <LoadingOverlay />;
  }

  function Item({item}) {
    const id = item.id;
    return (
      <View style={styles.userItem}>
        <Text style={styles.username}>{item.name}</Text>
        <Button onPress={() => removeUserHandler(id)}>Remove</Button>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Add User</Text>
        <Button onPress={submitHandler}>Submit</Button>
      </View>
      <FlatList
        data={selectedUsersToAdd}
        // keyExtractor={item => item.item.id}
        renderItem={item => {
          return <Item item={item.item} />;
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Username"
          onChangeText={text => setInputText(text)}
          value={inputText}
        />
        <Button onPress={addUserHandler}>Add</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    backgroundColor: 'white',
    color: 'black',
    fontWeight: '400',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary200,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 40,
    flex: 1,
    flexDirection: 'row',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
    padding: 3,
    marginTop: 10,
  },
  username: {
    fontSize: 20,
    paddingLeft: 10,
    maxWidth: '70%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary100,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    marginLeft: 10,
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
