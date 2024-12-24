let contributions = JSON.parse(localStorage.getItem("contributions")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalBalance = calculateTotalBalance();

function calculateTotalBalance() {
    const totalContributions = contributions.reduce((sum, c) => sum + c.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    return totalContributions - totalExpenses;
}

function addContribution() {
    const memberName = document.getElementById("member-name").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!memberName || amount <= 0) {
        alert("Please enter valid name and amount.");
        return;
    }

    contributions.push({ member: memberName, amount });
    localStorage.setItem("contributions", JSON.stringify(contributions));
    totalBalance += amount;
    updateUI();
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

    expenses.push({ amount: expenseAmount, reason: expenseReason });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    totalBalance -= expenseAmount;
    updateUI();
}

function updateUI() {
    document.getElementById("balance").innerText = totalBalance;

    const expenseTableBody = document.getElementById("expense-table-body");
    expenseTableBody.innerHTML = "";

    expenses.forEach((expense) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>-</td>
            <td>${expense.amount}</td>
            <td>${expense.reason}</td>
        `;
        expenseTableBody.appendChild(newRow);
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Expense Tracker Report", 10, 10);
    let y = 20;

    expenses.forEach((expense) => {
        doc.text(`Amount: ${expense.amount}, Reason: ${expense.reason}`, 10, y);
        y += 10;
    });

    doc.text(`Total Balance: ${totalBalance}`, 10, y + 10);
    doc.save("Expense_Report.pdf");
}

updateUI();
