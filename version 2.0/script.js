// Get references to the table and button
const table = document.getElementById("budgetTable").getElementsByTagName("tbody")[0];
const addRowBtn = document.getElementById("addRowBtn");
const totalAmountCell = document.getElementById("totalAmount");

// Calculate and update total
function updateTotal() {
  let total = 0;

  // Loop through all rows in the table body
  for (let row of table.rows) {
    const amountCell = row.cells[1]; // Second cell is the amount
    const value = parseFloat(amountCell.textContent);

    // Add to total only if it's a valid number
    if (!isNaN(value)) {
      total += value;
    }
  }

  // Update the total in the footer
  totalAmountCell.textContent = `$${total.toFixed(2)}`;
}

// Add a new editable row
addRowBtn.addEventListener("click", () => {
  const newRow = table.insertRow();

  // Description cell (editable)
  const descCell = newRow.insertCell(0);
  descCell.contentEditable = "true";
  descCell.textContent = "New Item";

  // Amount cell (editable)
  const amountCell = newRow.insertCell(1);
  amountCell.contentEditable = "true";
  amountCell.classList.add("amount");
  amountCell.textContent = "0";

  // Delete button cell
  const deleteCell = newRow.insertCell(2);
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("deleteBtn");
  deleteCell.appendChild(deleteBtn);

  // Recalculate total when edited
  amountCell.addEventListener("input", updateTotal);

  // Handle delete
  deleteBtn.addEventListener("click", () => {
    newRow.remove();
    updateTotal();
  });

  updateTotal(); // Recalculate after adding new row
});

// Recalculate total when existing row is edited
for (let row of table.rows) {
  const amountCell = row.cells[1];
  amountCell.addEventListener("input", updateTotal);
}

// Handle delete on initial row
table.querySelectorAll(".deleteBtn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest("tr").remove();
    updateTotal();
  });
});

// Initial total calculation
updateTotal();
