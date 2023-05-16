import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGroup} from './groupService';
import groupReducer from '../../redux/groupReducer';
import {useState} from 'react';
import {addExpense as addExpenseState} from '../../redux/groupReducer';

export async function fetchExpense(expenseId) {
  const response = await firestore()
    .collection('expenses')
    .doc(expenseId)
    .get();
  const expense = response.data();
  expense.id = expenseId;
  const exp = {
    id: expenseId,
    amount: expense.amount,
    description: expense.description,
    date: expense.date,
    userIds: expense.userIds,
    paidBy: expense.paidBy,
  };
  return exp;
}

export async function fetchExpensesByIds(expenseIds) {
  const expenses = [];
  for (var i = 0; i < expenseIds.length; i++) {
    const expense = await fetchExpense(expenseIds[i]);
    expenses.push(expense);
  }
  return expenses;
}

export async function addExpense(groupId, expense) {
  var id = '';
  const a = await firestore()
    .collection('expenses')
    .add(expense)
    .then(querySnapShot => {
      console.log('expense Added');
      expense.id = querySnapShot.id;
      addExpenseToGroup(groupId, querySnapShot.id);
      id = querySnapShot.id;
    });
  return id;
}

export async function updateExpense(id, expense) {
  await firestore()
    .collection('expenses')
    .doc(id)
    .update(expense)
    .then(() => {
      console.log('expense updated!');
    });
}

async function addExpenseToGroup(groupId, expenseId) {
  const group = await fetchGroup(groupId);
  group.expenseIds.push(expenseId);
  await firestore()
    .collection('group')
    .doc(groupId)
    .update(group)
    .then(() => {
      console.log('group updated!');
    });
}

async function deleteExpenseFromGroup(groupId, expenseId) {
  const group = await fetchGroup(groupId);
  group.expenseIds.splice(group.expenseIds.indexOf(expenseId), 1);
  await firestore()
    .collection('group')
    .doc(groupId)
    .update(group)
    .then(() => {
      console.log('group updated!');
    });
}

export async function deleteExpense(groupId, expenseId) {
  await firestore()
    .collection('expenses')
    .doc(expenseId)
    .delete()
    .then(() => {
      console.log('expense deleted!');
      deleteExpenseFromGroup(groupId, expenseId);
    });
}
