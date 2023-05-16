import {
  View,
  StyleSheet,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect, useLayoutEffect} from 'react';
import Input from './input';
import Button from './UI/Button';
import CheckBox from '@react-native-community/checkbox';
import LoadingOverlay from './UI/LoadingOverlay';
import {useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import {GlobalStyles} from '../constants/styles';
import Calender from './Calender';

function ExpenseForm({onCancel, isEditing, onSubmit, defaultValues}) {
  const GroupUsers = useSelector(
    state => state.groupReducer.selectedGroup.users,
  );
  const [openCalendar, setOpenCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expenseUsers, setExpenseUsers] = useState(
    defaultValues ? defaultValues.userIds : [],
  );
  const [paidBy, setPaidBy] = useState(
    defaultValues ? defaultValues.paidBy : '',
  );
  const [date, setDate] = useState(
    defaultValues ? new Date(defaultValues.date) : new Date(),
  );

  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount : '',
    description: defaultValues ? defaultValues.description : '',
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues(curInputValues => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: inputValues.amount,
      date: date.toDateString(),
      description: inputValues.description,
      userIds: expenseUsers,
      paidBy: paidBy,
    };
    const isValidAmount =
      !isNaN(expenseData.amount) &&
      expenseData.amount > 0 &&
      expenseData.amount.toString().length < 20;
    const isValidDate =
      new Date(expenseData.date).toISOString() !== 'Invalid Date';
    const isValidDescription =
      expenseData.description.trim().length > 0 &&
      expenseData.description.trim().length < 100;
    if (!isValidAmount || !isValidDate || !isValidDescription) {
      Alert.alert('Invalid Input', 'Please Check your input Values');
      return;
    }
    if (paidBy.trim() === '') {
      Alert.alert('Select Payee');
      return;
    }
    if (expenseUsers.length < 1) {
      Alert.alert('Select users involved in Expense');
      return;
    }
    onSubmit(expenseData);
  }

  function InputCheckBox({item}) {
    const [checked, setChecked] = useState(expenseUsers.includes(item.item.id));

    function CheckBoxHandler(newValue, id) {
      setChecked(newValue);
      if (newValue) {
        const newExpenseUsers = expenseUsers;
        newExpenseUsers.push(id);
        setExpenseUsers(newExpenseUsers);
      } else {
        const newExpenseUsers = expenseUsers;
        newExpenseUsers.splice(newExpenseUsers.indexOf(id), 1);
        setExpenseUsers(newExpenseUsers);
      }
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.userName}>{item.item.name}</Text>
        <CheckBox
          disabled={false}
          value={checked}
          onValueChange={n => {
            CheckBoxHandler(n, item.item.id);
          }}
        />
      </View>
    );
  }

  function UserList() {
    return (
      <FlatList
        data={GroupUsers}
        renderItem={item => {
          return <InputCheckBox item={item} />;
        }}
      />
    );
  }

  function Payee() {
    return (
      <View style={styles.payeeContainer}>
        <Text style={styles.textTitle}>Paid By</Text>
        <SelectDropdown
          data={GroupUsers}
          onSelect={selectedItem => {
            setPaidBy(selectedItem.id);
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.name;
          }}
          rowTextForSelection={item => {
            return item.name;
          }}
          defaultButtonText="Select Payee"
          defaultValue={GroupUsers.find(user => user.id === paidBy)}
        />
      </View>
    );
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.form}>
      <Calender
        open={openCalendar}
        onCancel={() => setOpenCalendar(false)}
        onConfirm={date => {
          setDate(date);
          setOpenCalendar(false);
          }}
        perviousDate={date}
      />
      <Text style={styles.title}> Your Expense </Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount,
          }}
          style={styles.rowInput}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={() => setOpenCalendar(true)}>
            <Text style={styles.input}>{date.toDateString()}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          maxLength: 100,
          autoCorrect: false,
          // autoCapitalize: 'sentences' default
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
      <Payee />
      <Text style={styles.textTitle}>Lent By</Text>
      <UserList />
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel}>
          cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  form: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
    textAlign: 'center',
  },

  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    color: GlobalStyles.colors.accent500,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginTop: 5,
  },
  userName: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  payeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    width: '50%',
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    color: GlobalStyles.colors.primary700,
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 9,
    borderRadius: 6,
    fontSize: 16,
  },
});

export default ExpenseForm;
