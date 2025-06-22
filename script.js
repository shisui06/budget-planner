const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseBtn = document.getElementById('add-expense');
const expensesList = document.getElementById('expenses-list');
const totalExpensesDisplay = document.getElementById('total-expenses');

let expenses = []; // stores all expenses

addExpenseBtn.addEventListener('click', () => {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name && !isNaN(amount)) {
    expenses.push({ name, amount });

    // Update UI
    const li = document.createElement('li');
    li.textContent = `${name}: $${amount.toFixed(2)}`;
    expensesList.appendChild(li);

    // Update total
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalExpensesDisplay.textContent = total.toFixed(2);

    // Clear input fields
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  }
});
