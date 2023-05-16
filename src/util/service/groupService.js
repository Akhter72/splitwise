import firestore from '@react-native-firebase/firestore';
import {addGroupToUser, fetchUser, fetchUserByName} from './userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchUserGroups() {
  var groups = [];
  await firestore()
    .collection('group')
    .get()
    .then(querySnapShot => {
      querySnapShot.forEach(documentSnapShot => {
        const group = documentSnapShot.data();
        group.id = documentSnapShot.id;
        groups.push(documentSnapShot.data());
      });
    });
  return groups;
}
export async function fetchGroup(id) {
  const response = await firestore().collection('group').doc(id).get();
  const group = response.data();
  group.id = response.id;
  return group;
}

export async function addGroup(group) {
  const userId = await AsyncStorage.getItem('@loggedUser');
  group.userIds.push(userId);
  console.log(userId);
  await firestore()
    .collection('group')
    .add(group)
    .then(querySnapShot => {
      const groupId = querySnapShot.id;
      addGroupToUser(userId, groupId);
    });
}

export async function updateUserGroup(id, group) {
  await firestore()
    .collection('group')
    .doc(id)
    .update(group)
    .then(() => {
      console.log('group updated!');
    });
}

export async function addUsersToGroup(groupId, uIds) {
  const response = await firestore().collection('group').doc(groupId).get();
  const group = response.data();
  group.userIds = uIds;
  await firestore()
    .collection('group')
    .doc(groupId)
    .update(group)
    .then(() => {
      console.log('group updated!');
    });
}
