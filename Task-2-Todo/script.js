// ==========================
// ELEMENTS
// ==========================

const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const addTaskBtn = document.getElementById("addTask");
const taskContainer = document.getElementById("taskContainer");

const searchTask = document.getElementById("searchTask");
const filterButtons = document.querySelectorAll(".filter");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const themeBtn = document.getElementById("themeBtn");

// ==========================
// VARIABLES
// ==========================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ==========================
// SAVE TASKS
// ==========================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==========================
// UPDATE COUNTERS
// ==========================

function updateStats() {

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;
}

// ==========================
// ADD TASK
// ==========================

function addTask() {

    const title = taskInput.value.trim();

    if (title === "") {

        alert("Please enter a task.");

        taskInput.focus();

        return;
    }

    const newTask = {

        id: Date.now(),

        title: title,

        category: category.value || "General",

        priority: priority.value || "Medium",

        dueDate: dueDate.value,

        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    clearForm();
}

// ==========================
// CLEAR FORM
// ==========================

function clearForm() {

    taskInput.value = "";
    category.selectedIndex = 0;
    priority.selectedIndex = 0;
    dueDate.value = "";

    taskInput.focus();
}

// ==========================
// ENTER KEY SUPPORT
// ==========================

taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTask();
    }

});

// ==========================
// ADD BUTTON
// ==========================

addTaskBtn.addEventListener("click", addTask);
// ==========================
// RENDER TASKS
// ==========================

function renderTasks() {

    taskContainer.innerHTML = "";

    let filteredTasks = [...tasks];

    // Filter Tasks
    if (currentFilter === "completed") {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    if (currentFilter === "pending") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    // Search
    const search = searchTask.value.toLowerCase().trim();

    if (search !== "") {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(search)
        );
    }

    // Empty Message
    if (filteredTasks.length === 0) {
        taskContainer.innerHTML = `
    <li class="empty-message">
        <i class="fa-solid fa-list-check"></i>
        <h3>No Tasks Found</h3>
        <p>Add a task to get started.</p>
    </li>
`;

        
        

        updateStats();
        return;
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = `task ${task.completed ? "completed" : ""} ${task.priority.toLowerCase()}`;

        li.innerHTML = `

        <div class="task-left">

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})">

            <div class="task-content">

                <h3 class="task-title">${task.title}</h3>

                <div class="task-info">

                    <span class="category">
                        ${task.category}
                    </span>

                    <span class="priority-${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>

                    <span class="due-date">
                        ${task.dueDate || "No Due Date"}
                    </span>

                </div>

            </div>

        </div>

        <div class="task-actions">

            <button
                class="edit-btn"
                onclick="editTask(${task.id})">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

        taskContainer.appendChild(li);

    });

    updateStats();
}

// ==========================
// DELETE TASK
// ==========================

function deleteTask(id) {

    if (!confirm("Delete this task?")) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

}

// ==========================
// COMPLETE / PENDING
// ==========================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

}

// ==========================
// EDIT TASK
// ==========================

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const newTitle = prompt("Edit Task", task.title);

    if (newTitle === null) return;

    if (newTitle.trim() === "") {

        alert("Task cannot be empty.");

        return;

    }

    task.title = newTitle.trim();

    saveTasks();

    renderTasks();

}
// ==========================
// SEARCH TASKS
// ==========================

searchTask.addEventListener("keyup", function () {

    renderTasks();

});

// ==========================
// FILTER TASKS
// ==========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});

// ==========================
// SORT BY DUE DATE (Optional)
// ==========================

function sortByDate() {

    tasks.sort((a, b) => {

        if (!a.dueDate) return 1;

        if (!b.dueDate) return -1;

        return new Date(a.dueDate) - new Date(b.dueDate);

    });

}

// ==========================
// SORT BY PRIORITY (Optional)
// ==========================

function sortByPriority() {

    const priorityValue = {

        High: 1,
        Medium: 2,
        Low: 3

    };

    tasks.sort((a, b) => {

        return priorityValue[a.priority] - priorityValue[b.priority];

    });

}

// ==========================
// REFRESH APPLICATION
// ==========================

function refreshApp() {

    saveTasks();

    renderTasks();

}

// ==========================
// AUTO SAVE
// ==========================

window.addEventListener("beforeunload", () => {

    saveTasks();

});

// ==========================
// UPDATE LOCAL STORAGE
// ==========================

window.addEventListener("storage", () => {

    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    renderTasks();

});
// ==========================
// DARK MODE
// ==========================

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

// Toggle theme
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

    renderTasks();

    updateStats();

}

init();

// ==========================
// OPTIONAL SHORTCUTS
// ==========================

// Ctrl + Enter = Add Task
document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key === "Enter") {

        addTask();

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

console.log("✅ TaskFlow To-Do List Loaded Successfully!");