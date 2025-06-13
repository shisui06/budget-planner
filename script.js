const expense = {
  name: "Rent",

};
const expenseDiv = document.getElementById("expense");
expenseDiv.textContent = `${expense.name}: $${expense.amount}`;