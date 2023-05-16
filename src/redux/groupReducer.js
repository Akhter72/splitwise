const ADD = 'ADD';
const SET = 'SET';
const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
const SET_GROUP_USERS = 'SET_GROUP_USERS';
const SET_SELECTED_GROUP = 'SET_SELECTED_GROUP';
const SET_EXPENSES = 'SET_EXPENSES';
const ADD_EXPENSE = 'ADD_EXPENSE';
const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
const DELETE_EXPENSE = ' DELETE_EXPENSE';
const DELETE = 'DELETE';

export function setGroups(groups) {
  // console.log(expenses);
  return {
    type: SET,
    payload: groups,
  };
}

export function setGroupUsers(users) {
  // console.log(expenses);
  return {
    type: SET_GROUP_USERS,
    payload: users,
  };
}

export function setSelectedGroup(group) {
  // console.log(expenses);
  return {
    type: SET_SELECTED_GROUP,
    payload: group,
  };
}

export function setAuthentication(auth) {
  // console.log(expenses);
  return {
    type: SET_AUTHENTICATION,
    payload: auth,
  };
}

export function setExpenses(expenses) {
  // console.log(expenses);
  return {
    type: SET_EXPENSES,
    payload: expenses,
  };
}

export function addExpense(expense) {
  // console.log(expenses);
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
}

export function updateExpense(id, expense) {
  // console.log(expenses);
  return {
    type: UPDATE_EXPENSE,
    payload: {
      id: id,
      data: expense,
    },
  };
}

export function deleteExpense(id) {
  // console.log(expenses);
  return {
    type: DELETE_EXPENSE,
    payload: {
      id: id,
    },
  };
}

const initialState = {
  groups: [],
  selectedGroup: {},
  expenses: [],
  authenticated: false,
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        groups: action.payload,
      };
    case SET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
      };
    case SET_GROUP_USERS:
    // const inverted = action.payload.reverse();
    // const oldGroup = state.group;
    // oldGroup.users = action.payload;
    // console.log(oldGroup);
    // return {
    //     ...state,
    //     group:{ users: action.payload},
    // }
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };

    case ADD_EXPENSE:
      const newExpenses = [];
      for (var i = 0; i < state.expenses.length; i++) {
        newExpenses.push(state.expenses[i]);
      }
      newExpenses.push(action.payload);
      return {
        ...state,
        expenses: newExpenses,
      };

    case UPDATE_EXPENSE:
      const updatableExpenseIndex = state.expenses.findIndex(
        expense => expense.id === action.payload.id,
      );
      const updatableExpense = state.expenses[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state.expenses];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return {
        ...state,
        expenses: updatedExpenses,
      };
    case DELETE_EXPENSE:
      const deleteId = action.payload.id;
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id != deleteId),
      };

    case SET_AUTHENTICATION:
      return {
        ...state,
        authenticated: action.payload,
      };

    default:
      return state;
  }
}
