import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {getDebts} from '../../util/service/utilFunctions';

function Item(item) {
  const newItem = item.item;
  const amount = newItem.amount;
  const amountCondition = amount > 0 ? 'lent' : 'owe';
  var text = newItem.from +" "+amountCondition+" "+ newItem.to;
  return (
    <View style={styles.container}>
      <Text
        style={
          amountCondition === 'lent'
            ? [styles.period, {color: 'green'}]
            : [styles.period, {color: 'red'}]
        }>
        {text}
      </Text>
      <Text style={styles.sum}>{Math.abs(newItem.amount).toFixed(2)}</Text>
    </View>

    // return (
    //   <View style={styles.container}>
    //     <Text
    //       style={
    //         amountCondition === 'lent'
    //           ? [styles.period, {color: 'green'}]
    //           : [styles.period, {color: 'red'}]
    //       }>
    //       {text}
    //     </Text>
    //     <Text style={styles.sum}>{Math.abs(amount)}</Text>
    //   </View>
    // );
  );
}

function ExpensesSummary({periodName, expenses}) {
  const users = useSelector(state => state.groupReducer.selectedGroup.users);

  //     function expensesSum() {
  //         const newUsers = users.map(object => {
  //             return {...object, amount: 0};
  //         });
  //         for (let i = 0; i < expenses.length; i++) {
  //             const expenseAmount = parseInt(expenses[i].amount);

  //             //every expense
  //             for (let j = 0; j < newUsers.length; j++) {
  //                 // newArr[i].amount = newArr[i].amount ? newArr[i].amount : 0;
  //                 //every user
  //                 if(expenses[i].paidBy === newUsers[j].id ) {
  //                     newUsers[j].amount += expenseAmount;
  //                 }

  //                 if(expenses[i].userIds.includes(newUsers[j].id)) {
  //                     newUsers[j].amount -= (expenseAmount/expenses[i].userIds.length);
  //                 }
  //             }
  //         }
  //         return newUsers;
  //     }

  function expensesSum() {
    var newUsers = users.map(object => {
      var amountsObj = [];
      for (var i = 0; i < users.length; i++) {
        const b = {name: users[i].name, amount: 0};
        if (object.name != users[i].name) {
          amountsObj.push(b);
        }
      }
      return {...object, shares: amountsObj};
    });
    const debts = getDebts(expenses, newUsers);

    return debts;
  }
  return (
    <View>
      <FlatList
        data={expensesSum()}
        renderItem={({item}) => <Item item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: GlobalStyles.colors.primary50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 18,
    color: GlobalStyles.colors.primary400,
    fontWeight: 'bold',
  },
});

export default ExpensesSummary;
