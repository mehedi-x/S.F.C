let contributions = [];
let totalBalance = 0;

function addContribution() {
    const memberName = document.getElementById("member-name").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!memberName || amount <= 0) {
        alert("Please enter valid name and amount.");
        return;
    }

    contributions.push({ member: memberName, amount });
    totalBalance += amount;

    updateBalance();
    document.getElementById("member-name").value = "";
    document.getElementById("amount").value = "";
}

function updateBalance() {
    document.getElementById("balance").innerText = totalBalance;
}

function addExpense() {
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
    const expenseReason = document.getElementById("expense-reason").value;

    if (expenseAmount <= 0 || !expenseReason) {
        alert("Please enter valid expense amount and reason.");
        return;
    }

    if (expenseAmount > totalBalance) {
        alert("Not enough balance!");
        return;
    }

    const expenseTableBody = document.getElementById("expense-table-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>-</td>
        <td>${expenseAmount}</td>
        <td>${expenseReason}</td>
    `;
    expenseTableBody.appendChild(newRow);

    totalBalance -= expenseAmount;
    updateBalance();

    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-reason").value = "";
}
