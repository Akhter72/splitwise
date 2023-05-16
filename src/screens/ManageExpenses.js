import {useContext, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {GlobalStyles} from '../constants/styles';
import {
  addExpense as addExpenseState,
  updateExpense as updateExpenseState,
  deleteExpense as deleteExpenseState,
} from '../redux/groupReducer';
import {useSelector, useDispatch} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../util/service/expensesService';
import Button from '../components/UI/Button';
function ManageExpense({route, navigation}) {
  const group = useSelector(state => state.groupReducer.selectedGroup);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenses = useSelector(state => state.groupReducer.expenses);
  const selectedExpense = expenses.find(
    expense => expense.id === editedExpenseId,
  );

  if (isEditing) {
    selectedExpense.amount = selectedExpense.amount.toString();
  }
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    dispatch(deleteExpenseState(editedExpenseId));
    deleteExpense(group.id, editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    if (isEditing) {
      setIsSubmitting(true);
      dispatch(updateExpenseState(editedExpenseId, expenseData));
      updateExpense(editedExpenseId, expenseData);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(true);
      const id = await addExpense(group.id, expenseData);
      expenseData.id = id;
      setIsSubmitting(false);
      dispatch(addExpenseState(expenseData));
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View>
        <ExpenseForm
          onCancel={cancelHandler}
          isEditing={isEditing}
          onSubmit={confirmHandler}
          defaultValues={selectedExpense}
        />
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <Button style={styles.button} onPress={deleteExpenseHandler}>
            Delete
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpense;
