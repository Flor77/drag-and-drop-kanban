const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
    saveTodosToLocalStorage();
  });

  newTask.addEventListener("dblclick", () => {
    todoLane.removeChild(newTask);
    saveTodosToLocalStorage();
  });

  todoLane.appendChild(newTask);

  input.value = "";

  saveTodosToLocalStorage();
});

function saveTodosToLocalStorage() {
  const todos = document.querySelectorAll(".task");
  const todoArray = [];

  todos.forEach((task) => {
    todoArray.push(task.innerText);
  });

  localStorage.setItem("kanban-todos", JSON.stringify(todoArray));
}

function deleteTodos() {
  todoArray.splice(i, 1);
  localStorage.setItem("kanban-todos", JSON.stringify(todoArray));
}

window.addEventListener("load", () => {
  const storedTodos = localStorage.getItem("kanban-todos");

  if (storedTodos) {
    const todoArray = JSON.parse(storedTodos);

    todoArray.forEach((todoText) => {
      const newTask = document.createElement("p");
      newTask.classList.add("task");
      newTask.setAttribute("draggable", "true");
      newTask.innerText = todoText;

      newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
      });

      newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
        saveTodosToLocalStorage(); // Save todos when a task is dragged
      });

      todoLane.appendChild(newTask);
    });
  }
});
