import {useSelector} from 'react-redux';

import {View} from 'react-native';

function GroupExpenses() {
  const expenses = useSelector(state => state.expenseReducer.expenses);
  console.log(expenses);
  return (
    // <ExpensesOutput
    //     expensesPeriod="Total Expenses "
    //     expenses={expenses}
    //     fallbackText="No Expenses Registered"
    // />
    <View>
      <Text>Hello</Text>
    </View>
  );
}

export default GroupExpenses;
