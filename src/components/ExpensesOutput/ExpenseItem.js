import {Pressable, View, Text, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getNameById} from '../../util/service/utilFunctions';

function ExpenseItem({description, date, amount, id, paidById}) {
  const navigation = useNavigation();
  const users = useSelector(state => state.groupReducer.selectedGroup).users;
  const paidBy = getNameById(users, paidById);
  function itemPressHandler() {
    navigation.navigate('ManageExpense', {
      expenseId: id,
    });
  }
  return (
    <Pressable
      onPress={itemPressHandler}
      style={({pressed}) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }>
      <View style={styles.itemBox}>
        <View>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Rs {amount}</Text>
        </View>
      </View>
      <Text style={styles.paidBy}>Paid By {paidBy}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5b597d',
    padding: 12,
    marginTop: 5,
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: GlobalStyles.colors.primary50,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: GlobalStyles.colors.primary50,
  },
  pressed: {
    opacity: 0.75,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paidBy: {
    fontSize: 14,
    color: GlobalStyles.colors.primary200,
    textAlign: 'center',
  },
});

export default ExpenseItem;
