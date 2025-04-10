import { Todo } from "./todo-interface";

export class TodoList {
  private todos: Todo[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  addTodo(task: string, priority: number): boolean {
    if (!task.trim() || priority < 1 || priority > 3) {
      return false;
    }

    const newTodo: Todo = {
      task,
      completed: false,
      priority
    };

    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return true;
  }

  markTodoCompleted(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos[todoIndex].completed = true;
      this.saveToLocalStorage();
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  loadFromLocalStorage(): void {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }
}
