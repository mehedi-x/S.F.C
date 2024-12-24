let contributions = JSON.parse(localStorage.getItem("contributions")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalBalance = calculateTotalBalance();

function calculateTotalBalance() {
    const totalContributions = contributions.reduce((sum, c) => sum + c.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    return totalContributions - totalExpenses;
}

// নতুন অবদান যোগ করার ফাংশন
function addContribution() {
    const memberName = document.getElementById("member-name").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!memberName || amount <= 0) {
        alert("Please enter valid name and amount.");
        return;
    }

    contributions.push({ member: memberName, amount });
    localStorage.setItem("contributions", JSON.stringify(contributions)); // লোকাল স্টোরেজে সেভ

    totalBalance += amount;
    localStorage.setItem("totalBalance", totalBalance); // আপডেটেড ব্যালেন্স সেভ

    updateUI();
    document.getElementById("member-name").value = "";
    document.getElementById("amount").value = "";
}

// নতুন খরচ যোগ করার ফাংশন
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
    localStorage.setItem("expenses", JSON.stringify(expenses)); // লোকাল স্টোরেজে সেভ

    totalBalance -= expenseAmount;
    localStorage.setItem("totalBalance", totalBalance); // আপডেটেড ব্যালেন্স সেভ

    updateUI();
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-reason").value = "";
}

// UI আপডেট করার ফাংশন
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

// পেজ লোডের সময় UI আপডেট
updateUI();
