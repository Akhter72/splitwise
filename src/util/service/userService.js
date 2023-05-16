import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchGroup} from './groupService';

export async function fetchUsers() {
  var users = [];
  await firestore()
    .collection('user')
    .get()
    .then(querySnapShot => {
      querySnapShot.forEach(documentSnapShot => {
        const user = documentSnapShot.data();
        user.id = documentSnapShot.id;
        users.push(documentSnapShot.data());
      });
    });
  return users;
}

export async function fetchUsersByIds(ids) {
  const users = [];
  for (var i = 0; i < ids.length; i++) {
    const user = await fetchUser(ids[i]);
    users.push(user);
  }
  return users;
}
export async function fetchUser(id) {
  const response = await firestore().collection('user').doc(id).get();
  const user = response.data();
  user.id = response.id;
  return user;
}

export async function addUser(user) {
  await firestore()
    .collection('user')
    .add(user)
    .then(() => {
      console.log('User Added');
    });
}

export async function updateUser(id, user) {
  await firestore()
    .collection('user')
    .doc(id)
    .update(user)
    .then(() => {
      console.log('User updated!');
    });
}

export async function addGroupToUser(userId, groupId) {
  console.log(userId, groupId);
  const user = await fetchUser(userId);
  user.groupIds.push(groupId);
  await firestore()
    .collection('user')
    .doc(userId)
    .update(user)
    .then(() => {
      console.log('User updated!');
    });
}

export async function fetchUserByName(name) {
  const users = await fetchUsers();
  const user = users.find(e => e.name === name);
  if (user === undefined) {
    return null;
  } else {
    return user;
  }
}

export async function fetchUserGroups() {
  const groups = [];
  const userId = await AsyncStorage.getItem('@loggedUser');
  const response = await firestore().collection('user').doc(userId).get();
  const groupIds = response.data().groupIds;
  for (var i = 0; i < groupIds.length; i++) {
    const group = await fetchGroup(groupIds[i]);
    groups.push(group);
  }
  return groups;
}

export async function addGroupToUsers(groupIds, uIds) {
  for (var i = 0; i < uIds.length; i++) {
    const user = await fetchUser(uIds[i]);
    console.log(user);
    const userIds = user.groupIds ? user.groupIds : [];
    console.log('end');
    const groupIdsOld = userIds.filter(e => {
      return e;
    });
    // groupIdsOld.push(groupIds[i])
    // if(!groupIdsOld.includes(groupIds[i])){
    //     user.groupIds.push(groupIds[i]);
    // }
    updateUser(user.id, {
      name: user.name ? user.name : '',
      lname: user.lname ? user.lname : '',
      groupIds: groupIdsOld,
    });
  }
}
