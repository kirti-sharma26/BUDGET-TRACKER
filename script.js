document.addEventListener('DOMContentLoaded', function() {
    const balanceDisplay = document.getElementById('balance');
    const transactionList = document.getElementById('transactionList');
    const addTransactionBtn = document.getElementById('addTransaction');
    const categorySelect = document.getElementById('category');
    const categoriesContainer = document.getElementById('categories');
    

    let balance = 0;
    let income = 0;
    let transactions = [];
    let categories = {};

    function updateBalance() {
        let totalExpense = transactions.reduce((total, transaction) => {
            return transaction.type === 'expense' ? total + parseFloat(transaction.amount) : total;
        }, 0);
        balance = income - totalExpense;
        balanceDisplay.textContent = balance.toFixed(2);
    }

    function addTransaction() {
        const type = document.getElementById('type').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = categorySelect.value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        let transaction = {
            type: type,
            amount: amount.toFixed(2),
            category: category
        };

        transactions.push(transaction);

        if (type === 'income') {
            income += amount;
            balance += amount; // Add income to balance
        } else if (type === 'expense') {
            if (amount > balance) {
                alert('Expense cannot exceed the current balance.');
                transactions.pop(); // Remove the transaction added
                return;
            }
            balance -= amount;
            if (!categories[category]) {
                categories[category] = amount;
            } else {
                categories[category] += amount;
            }
        }

        updateBalance();
        displayTransactions();
        displayCategoryChart();
        clearInputs();
    }

    function displayTransactions() {
        transactionList.innerHTML = '';
        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = `$${transaction.amount} (${transaction.category})`;
            listItem.classList.add(transaction.type);
            transactionList.appendChild(listItem);
        });
    }

    

    function clearInputs() {
        document.getElementById('amount').value = '';
    }

    addTransactionBtn.addEventListener('click', addTransaction);
});
