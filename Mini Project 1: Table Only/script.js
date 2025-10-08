const budgetForm = document.getElementById("budgetForm");
const tableBody = document.getElementById("budgetTable").getElementsByTagName("tbody")[0];

function addRow(name, amount, category) {
  const row = tableBody.insertRow();
  
  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = amount.toFixed(2);
  row.insertCell(2).textContent = category;

  const deleteCell = row.insertCell(3);
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.addEventListener("click", () => row.remove());
  deleteCell.appendChild(deleteBtn);
}

budgetForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("itemName").value;
  const amount = parseFloat(document.getElementById("itemAmount").value);
  const category = document.getElementById("itemCategory").value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Enter valid values!");
    return;
  }

  addRow(name, amount, category);
  budgetForm.reset();
});
