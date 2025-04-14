import { TodoList } from "./todolist";

const todoList = new TodoList();

const form = document.getElementById("todo-form") as HTMLFormElement;
const taskInput = document.getElementById("task") as HTMLInputElement;
const priorityInput = document.getElementById("priority") as HTMLInputElement;
const todoListContainer = document.getElementById("todo-list") as HTMLElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = taskInput.value;
  const priority = parseInt(priorityInput.value);

  const success = todoList.addTodo(task, priority);

  if (!success) {
    alert("Felaktig inmatning. kontrollera att uppgift inte är tom och prioritet är mellan 1 och 3.");
    return;
  }

  taskInput.value = "";
  priorityInput.value = "";
  renderTodos();
});

function renderTodos() {
  todoListContainer.innerHTML = "";

  todoList.getTodos().forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.className = `todo-item ${todo.completed ? "completed" : ""}`;
    todoItem.innerHTML = `
  <span>
    ${todo.task} (Prioritet: ${todo.priority})<br>
    <small>Skapad: ${new Date(todo.createdAt).toLocaleString()}</small>
  </span>
  ${!todo.completed ? `<button data-index="${index}">Markera klar</button>` : ""}
`;

    if (!todo.completed) {
      const button = todoItem.querySelector("button")!;
      button.addEventListener("click", () => {
        todoList.markTodoCompleted(index);
        renderTodos();
      });
    }

    todoListContainer.appendChild(todoItem);
  });
}


renderTodos();