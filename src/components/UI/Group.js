import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setExpenses, setSelectedGroup} from '../../redux/groupReducer';
import {fetchExpensesByIds} from '../../util/service/expensesService';
import {setReduxExpenses} from '../../redux/expensesReducer';
import {useState} from 'react';
import LoadingOverlay from './LoadingOverlay';
import {fetchUsersByIds} from '../../util/service/userService';

export default function Group({group, loading}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function groupClickHandler() {
    loading(true);
    const groupExpenses = await fetchExpensesByIds(group.expenseIds);
    const groupUsers = await fetchUsersByIds(group.userIds);
    const groupData = {
      id: group.id,
      name: group.name,
      expenseIds: group.expenseIds,
      users: groupUsers,
    };
    dispatch(setSelectedGroup(groupData));
    dispatch(setExpenses(groupExpenses));
    navigation.navigate('Expenses');
  }
  return (
    <TouchableOpacity style={styles.container} onPress={groupClickHandler}>
      <Text style={styles.groupName}>{group.name}</Text>
      {/* <Text style={styles.overall}>{group.name}</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  groupName: {
    fontSize: 24,
    margin: 5,
    fontWeight: 'bold',
    padding: 12,
  },
  overall: {
    fontSize: 20,
    color: 'green',
    margin: 5,
  },
});
