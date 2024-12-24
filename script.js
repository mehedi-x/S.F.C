let contributions = JSON.parse(localStorage.getItem("contributions")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {
    const tableBody = document.getElementById("summary-table");
    tableBody.innerHTML = "";
    let totalContribution = 0;
    let totalExpense = 0;

    contributions.forEach((contribution) => {
        totalContribution += contribution.amount;
        const row = `<tr>
                        <td>${contribution.name}</td>
                        <td>${contribution.amount}</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>`;
        tableBody.innerHTML += row;
    });

    expenses.forEach((expense) => {
        totalExpense += expense.amount;
        const row = `<tr>
                        <td>-</td>
                        <td>-</td>
                        <td>${expense.amount}</td>
                        <td>${expense.reason}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById("total-balance").textContent =
        totalContribution - totalExpense;

    localStorage.setItem("contributions", JSON.stringify(contributions));
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addContribution() {
    const name = document.getElementById("contributor-name").value;
    const amount = parseFloat(document.getElementById("contribution-amount").value);

    if (name && amount > 0) {
        contributions.push({ name, amount });
        updateUI();
    }
}

function addExpense() {
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const reason = document.getElementById("expense-reason").value;

    if (amount > 0 && reason) {
        expenses.push({ amount, reason });
        updateUI();
    }
}

function resetData() {
    if (confirm("Are you sure you want to reset all data?")) {
        contributions = [];
        expenses = [];
        localStorage.clear();
        updateUI();
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("TravelExpense Report", 10, 10);

    let y = 20;
    contributions.forEach((c) => {
        doc.text(`Contributor: ${c.name}, Amount: ${c.amount}`, 10, y);
        y += 10;
    });

    expenses.forEach((e) => {
        doc.text(`Expense: ${e.amount}, Reason: ${e.reason}`, 10, y);
        y += 10;
    });

    doc.save("TravelExpense_Report.pdf");
}

updateUI();
