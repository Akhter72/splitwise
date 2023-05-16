import { View, StyleSheet, Text } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";



function ExpensesOutput({expenses, expensesPeriod, group, fallbackText}) {
    var content = <Text style={styles.fallbackText}>{fallbackText}</Text>
    if(expenses.length >0){
        content = <ExpensesList  expenses={expenses} />
    }
    return (
        <View style={styles.container} >
            <ExpensesSummary 
                periodName={expensesPeriod} 
                expenses={expenses}
                group={group}
            />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: GlobalStyles.colors.primary200,
    },
    fallbackText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
        marginTop: 10,
        textAlign:"center"
    },
})
export default ExpensesOutput;