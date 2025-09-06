// ===============================
// 1. DOM REFERENCES
// ===============================
const budgetForm = document.getElementById("budgetForm");
const tableBody = document.getElementById("budgetTable").getElementsByTagName("tbody")[0];
const incomeCard = document.getElementById("incomeCard");
const expenseCard = document.getElementById("expenseCard");
const debtCard = document.getElementById("debtCard");
const savingCard = document.getElementById("savingCard");

// ===============================
// 2. STATE (to store totals)
// ===============================
let totals = {
  income: 0,
  expense: 0,
  debt: 0,
  saving: 0
};

// ===============================
// 3. CREATE TOTAL ROW
// ===============================
// Insert a footer row into the table (outside tbody, at the bottom)
const table = document.getElementById("budgetTable");
const tfoot = table.createTFoot(); // creates <tfoot>
const totalRow = tfoot.insertRow();

const totalLabelCell = totalRow.insertCell(0);
totalLabelCell.textContent = "💡 Net Balance";

const totalValueCell = totalRow.insertCell(1);
totalValueCell.colSpan = 3; // span across remaining columns
totalValueCell.id = "netBalance";
totalValueCell.textContent = "$0.00"; // default

// ===============================
// 4. FUNCTION: updateSummary()
// ===============================
function updateSummary() {
  incomeCard.textContent = `Income: $${totals.income.toFixed(2)}`;
  expenseCard.textContent = `Expenses: $${totals.expense.toFixed(2)}`;
  debtCard.textContent = `Debt: $${totals.debt.toFixed(2)}`;
  savingCard.textContent = `Savings: $${totals.saving.toFixed(2)}`;

  // Net balance = Income – Expenses – Debt + Savings
  const net = totals.income - totals.expense - totals.debt + totals.saving;
  document.getElementById("netBalance").textContent = `$${net.toFixed(2)}`;
}

// ===============================
// 5. FUNCTION: addRow()
// ===============================
function addRow(name, amount, category) {
  const newRow = tableBody.insertRow();

  const nameCell = newRow.insertCell(0);
  nameCell.textContent = name;

  const amountCell = newRow.insertCell(1);
  amountCell.textContent = amount.toFixed(2);

  const categoryCell = newRow.insertCell(2);
  categoryCell.textContent = category;

  const deleteCell = newRow.insertCell(3);
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.addEventListener("click", () => {
    totals[category] -= amount;
    updateSummary();
    newRow.remove();
  });
  deleteCell.appendChild(deleteBtn);
}

// ===============================
// 6. FORM SUBMISSION
// ===============================
budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("itemName").value;
  const amount = parseFloat(document.getElementById("itemAmount").value);
  const category = document.getElementById("itemCategory").value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  addRow(name, amount, category);

  totals[category] += amount;
  updateSummary();

  budgetForm.reset();
});

// Initialize summary once
updateSummary();
