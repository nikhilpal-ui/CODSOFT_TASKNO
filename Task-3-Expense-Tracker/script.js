// ==========================
// ELEMENTS
// ==========================

const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");
const date = document.getElementById("date");

const addTransactionBtn = document.getElementById("addTransaction");

const transactionList = document.getElementById("transactionList");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const search = document.getElementById("search");
const filterCategory = document.getElementById("filterCategory");

const themeBtn = document.getElementById("themeBtn");

// ==========================
// VARIABLES
// ==========================

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

// ==========================
// SAVE DATA
// ==========================

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

// ==========================
// CLEAR FORM
// ==========================

function clearForm() {

    description.value = "";
    amount.value = "";
    type.selectedIndex = 0;
    category.selectedIndex = 0;
    date.value = "";

    description.focus();

}

// ==========================
// ADD TRANSACTION
// ==========================

function addTransaction() {

    const desc = description.value.trim();
    const amt = Number(amount.value);

    if (
        desc === "" ||
        amt <= 0 ||
        type.value === "" ||
        category.value === "" ||
        date.value === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    const transaction = {

        id: Date.now(),

        description: desc,

        amount: amt,

        type: type.value,

        category: category.value,

        date: date.value

    };

    transactions.push(transaction);

    saveTransactions();

    renderTransactions();

    updateSummary();

    clearForm();

}

// ==========================
// BUTTON
// ==========================

addTransactionBtn.addEventListener(
    "click",
    addTransaction
);

// ==========================
// ENTER KEY
// ==========================

document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        addTransaction();

    }

});
// ==========================
// UPDATE SUMMARY
// ==========================

function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "Income") {

            totalIncome += transaction.amount;

        } else {

            totalExpense += transaction.amount;

        }

    });

    income.textContent =
        "₹" + totalIncome.toLocaleString();

    expense.textContent =
        "₹" + totalExpense.toLocaleString();

    balance.textContent =
        "₹" + (totalIncome - totalExpense).toLocaleString();

}

// ==========================
// RENDER TRANSACTIONS
// ==========================

function renderTransactions() {

    transactionList.innerHTML = "";

    let filtered = [...transactions];

    // Search
    const keyword =
        search.value.toLowerCase().trim();

    if (keyword !== "") {

        filtered = filtered.filter(transaction =>

            transaction.description
                .toLowerCase()
                .includes(keyword)

        );

    }

    // Category Filter
    if (filterCategory.value !== "All") {

        filtered = filtered.filter(transaction =>

            transaction.category ===
            filterCategory.value

        );

    }

    // Empty State
    if (filtered.length === 0) {

        transactionList.innerHTML = `

        <li class="empty">

            <i class="fa-solid fa-wallet"></i>

            <h3>No Transactions Found</h3>

            <p>Add your first transaction.</p>

        </li>

        `;

        return;

    }

    // Render List
    filtered.forEach(transaction => {

        const li =
            document.createElement("li");

        li.className =
            transaction.type.toLowerCase();

        li.innerHTML = `

        <div class="transaction-info">

            <h3>
                ${transaction.description}
            </h3>

            <p>

                ${transaction.category}
                •
                ${transaction.date}

            </p>

        </div>

        <div class="amount">

            ${transaction.type === "Income"
                ? "+"
                : "-"}

            ₹${transaction.amount}

        </div>

        <div class="actions">

            <button
                class="edit-btn"
                onclick="editTransaction(${transaction.id})">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="delete-btn"
                onclick="deleteTransaction(${transaction.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

        transactionList.appendChild(li);

    });

}
// ==========================
// DELETE TRANSACTION
// ==========================

function deleteTransaction(id) {

    if (!confirm("Delete this transaction?")) {

        return;

    }

    transactions = transactions.filter(transaction =>
        transaction.id !== id
    );

    saveTransactions();

    renderTransactions();

    updateSummary();

}

// ==========================
// EDIT TRANSACTION
// ==========================

function editTransaction(id) {

    const transaction =
        transactions.find(item => item.id === id);

    if (!transaction) return;

    const newDescription =
        prompt(
            "Edit Description",
            transaction.description
        );

    if (newDescription === null) return;

    if (newDescription.trim() === "") {

        alert("Description cannot be empty.");

        return;

    }

    const newAmount =
        prompt(
            "Edit Amount",
            transaction.amount
        );

    if (newAmount === null) return;

    if (
        isNaN(newAmount) ||
        Number(newAmount) <= 0
    ) {

        alert("Enter a valid amount.");

        return;

    }

    transaction.description =
        newDescription.trim();

    transaction.amount =
        Number(newAmount);

    saveTransactions();

    renderTransactions();

    updateSummary();

}

// ==========================
// SEARCH
// ==========================

search.addEventListener("keyup", () => {

    renderTransactions();

});

// ==========================
// CATEGORY FILTER
// ==========================

filterCategory.addEventListener("change", () => {

    renderTransactions();

});

// ==========================
// REFRESH APP
// ==========================

function refreshApp() {

    renderTransactions();

    updateSummary();

}

// ==========================
// WINDOW STORAGE
// ==========================

window.addEventListener("storage", () => {

    transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];

    refreshApp();

});

// ==========================
// BEFORE UNLOAD
// ==========================

window.addEventListener("beforeunload", () => {

    saveTransactions();

});
// ==========================
// DARK MODE
// ==========================

// Load Saved Theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

} else {

    themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

}

// Toggle Theme

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});

// ==========================
// INITIALIZE APP
// ==========================

function init() {

    renderTransactions();

    updateSummary();

}

init();

// ==========================
// KEYBOARD SHORTCUTS
// ==========================

// Ctrl + Enter = Add Transaction

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key === "Enter") {

        addTransaction();

    }

});

// Escape = Clear Form

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        clearForm();

    }

});

// ==========================
// CONSOLE MESSAGE
// ==========================

console.log(
    "💰 Expense Tracker Loaded Successfully!"
);