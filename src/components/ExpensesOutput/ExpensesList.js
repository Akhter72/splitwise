import { FlatList, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({expenses, group}) {
    const expenseComponent = (itemData) => {
        return (
            <ExpenseItem 
                description={itemData.item.description}
                date={itemData.item.date}
                amount={itemData.item.amount}
                id = {itemData.item.id}
                userIds={group}
                paidById={itemData.item.paidBy}
            /> 
        )
    }
    return (
    <FlatList 
        data={expenses}
        renderItem = {expenseComponent}
        key={item => item.id}
        style={styles.expense}
    />
    )
}

const styles = StyleSheet.create({
    expense: {
        padding: 8,
        borderRadius: 6,
    }
})

export default ExpensesList;