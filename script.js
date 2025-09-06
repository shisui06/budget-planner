// ===============================
// 1. DOM REFERENCES
// ===============================

// Grab the form element so we can listen for submit
const budgetForm = document.getElementById("budgetForm");

// Grab the table body where new rows will be inserted
const tableBody = document.getElementById("budgetTable").getElementsByTagName("tbody")[0];

// Grab the summary cards for each category
const incomeCard = document.getElementById("incomeCard");
const expenseCard = document.getElementById("expenseCard");
const debtCard = document.getElementById("debtCard");
const savingCard = document.getElementById("savingCard");

// ===============================
// 2. STATE (to store totals)
// ===============================
// We'll keep running totals for each category
let totals = {
  income: 0,
  expense: 0,
  debt: 0,
  saving: 0
};

// ===============================
// 3. FUNCTION: updateSummary()
// ===============================
// This updates the text of each summary card with the current totals
function updateSummary() {
  incomeCard.textContent = `Income: $${totals.income.toFixed(2)}`;
  expenseCard.textContent = `Expenses: $${totals.expense.toFixed(2)}`;
  debtCard.textContent = `Debt: $${totals.debt.toFixed(2)}`;
  savingCard.textContent = `Savings: $${totals.saving.toFixed(2)}`;
}

// ===============================
// 4. FUNCTION: addRow()
// ===============================
// This inserts a new row in the table with the given item, amount, and category
function addRow(name, amount, category) {
  const newRow = tableBody.insertRow(); // create new <tr>

  // 1st cell → Item name
  const nameCell = newRow.insertCell(0);
  nameCell.textContent = name;

  // 2nd cell → Amount
  const amountCell = newRow.insertCell(1);
  amountCell.textContent = amount.toFixed(2); // format to 2 decimals

  // 3rd cell → Category
  const categoryCell = newRow.insertCell(2);
  categoryCell.textContent = category;

  // 4th cell → Delete button
  const deleteCell = newRow.insertCell(3);
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️"; // trash icon
  deleteBtn.addEventListener("click", () => {
    // When deleting, subtract the row amount from totals
    totals[category] -= amount;
    updateSummary();
    newRow.remove();
  });
  deleteCell.appendChild(deleteBtn);
}

// ===============================
// 5. FORM SUBMISSION HANDLER
// ===============================
// This runs whenever the user submits the form
budgetForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the page from refreshing

  // Get values from the form
  const name = document.getElementById("itemName").value;
  const amount = parseFloat(document.getElementById("itemAmount").value);
  const category = document.getElementById("itemCategory").value;

  // Safety check: ignore invalid numbers
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  // Add row to the table
  addRow(name, amount, category);

  // Update totals for the chosen category
  totals[category] += amount;

  // Refresh the summary cards
  updateSummary();

  // Clear the form after adding
  budgetForm.reset();
});
