let transactions = [];

const transactionForm = document.getElementById('transactionform');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transactionList');
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = document.querySelector('input[name="type"]:checked')?.value;

    if (!description || isNaN(amount) || !type) {
        alert('Please fill in all fields');
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    updateUI();
    transactionForm.reset();
});

function updateUI() {
    transactionList.innerHTML = '';

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        transactionList.appendChild(li);

        if (transaction.type === 'income') {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    const balance = income - expense;

    totalBalance.textContent = `$${balance.toFixed(2)}`;
    totalIncome.textContent = `$${income.toFixed(2)}`;
    totalExpense.textContent = `$${expense.toFixed(2)}`;

    totalBalance.style.color = balance >= 0 ? '#28a745' : '#dc3545';
}

window.deleteTransaction = function (id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    updateUI();
};

updateUI();
