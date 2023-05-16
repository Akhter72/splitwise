import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useEffect, useState} from 'react';
import {fetchExpensesByIds} from '../util/service/expensesService';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {useDispatch, useSelector} from 'react-redux';
import {setReduxExpenses} from '../redux/expensesReducer';
import Button from '../components/UI/Button';
import {GlobalStyles} from '../constants/styles';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function Expenses() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const group = useSelector(state => state.groupReducer.selectedGroup);
  const expenses = useSelector(state => state.groupReducer.expenses);
  function addExpenseHandler() {
    navigation.navigate('ManageExpense', {
      group: group,
    });
  }
  function addMemberHandler() {
    navigation.navigate('AddUser', {
      groupId: group.id,
    });
  }

  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Expenses </Text>
        <Button onPress={addMemberHandler}>Add Member</Button>
      </View>
      <ExpensesOutput
        expensesPeriod="Total Expenses "
        expenses={expenses}
        fallbackText="No Expenses Registered"
        group={group}
      />
      <Button onPress={addExpenseHandler}>Add Expense</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary50,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    width: '60%',
    marginLeft: 10,
  },
});
