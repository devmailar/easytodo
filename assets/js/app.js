// DOM
const todoInput = document.querySelector(".todo-input");
const todoPen = document.querySelector(".todo-pen");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const errorTXT = document.querySelector("p");

// Event handlers
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", manageTodos);

// Functions
function createTask(event) {
  if (todoInput.value < 1) {
    errorTXT.textContent = "Your input is too short.";
    setTimeout(() => {
      errorTXT.textContent = "";
    }, 2000);
  } else {
    addTodo();
  }
}

function addTodo(event) {
  errorTXT.textContent = "Added to list: " + todoInput.value;

  setTimeout(() => {
    errorTXT.textContent = "";
  }, 4000);

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.classList.add("edit-btn");
  todoDiv.appendChild(editBtn);

  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.classList.add("complete-btn");
  todoDiv.appendChild(completeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(deleteBtn);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
  //console.log(todoList)
}

function manageTodos(e) {
  const item = e.target;

  // Delete Task
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    removeLocalTodos(todo);
    todo.classList.add("transition");
    todo.style.backgroundColor = "#b07a83";
    todo.style.color = "white";

    setTimeout(() => {
      todo.remove();
    }, 1000);
  }

  // Complete Task
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  // Edit Task
  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    // editLocalTodos(todo)
    errorTXT.textContent = "Rename task ...";

    todoInput.value = todo.innerText;
    todoButton.style.display = "none";
    todoPen.style.display = "block";

    todoPen.onclick = function () {
      todoPen.style.display = "none";
      todoButton.style.display = "block";

      let item = todo.children[0];

      errorTXT.textContent = "Name has been changed from " + item.textContent + " to " + todoInput.value;

      item.textContent = todoInput.value;

      setTimeout(() => {
        errorTXT.textContent = "";
        todoInput.value = "";
      }, 3000);
    };
  }
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    editBtn.classList.add("edit-btn");
    todoDiv.appendChild(editBtn);

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex, 1));

  localStorage.setItem("todos", JSON.stringify(todos));
}

/* function editLocalTodos(todo) {
    let todos;
  
    if (localStorage.getItem("todos") === null) {
      todos = [];
    }
    else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  
    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex)
  
    localStorage.setItem("todos", JSON.stringify(todoIndex));
    console.log(todoIndex)
  } 
*/