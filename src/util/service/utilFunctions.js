

export function getDebts(expenses, users) {
  const totals = {};
  const owes = {};
  users.forEach(user => {
    totals[user.name] = 0;
    owes[user.name] = {};
    user.shares.forEach(share => {
      if (share.name !== user.name) {
        owes[share.name] = owes[share.name] || {};
        owes[share.name][user.name] = 0;
      }
    });
  });
  expenses.forEach(expense => {
    const share = expense.amount / expense.userIds.length;
    const paidByUser = getNameById(users, expense.paidBy);
    totals[paidByUser] += expense.amount;
    expense.userIds.forEach(person => {
      const personName = getNameById(users, person);
      if (person !== expense.paidBy) {
        owes[personName][paidByUser] -= share;
        owes[paidByUser][personName] += share;
      }
    });
  });

  const debts = [];
  Object.keys(owes).forEach(from => {
    Object.keys(owes[from]).forEach(to => {
      // console.log(owes[from][to])
      if (!isNaN(owes[from][to])) {
        if (owes[from][to] > 0) {
          debts.push({from, to, amount: owes[from][to]});
        } else if (owes[from][to] < 0) {
          debts.push({from, to, amount: owes[from][to]});
        }
      }
    });
  });

  return debts;
}

export function getNameById(users, id) {
  const user = users.find(user => user.id === id);
  return user.name;
}

