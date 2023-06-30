import { AppState } from "../AppState.js"
import { generateId } from "../utils/generateId.js"

export class Todo {
  constructor(data) {
    this.id = data.id || generateId()
    this.description = data.description
    this.completed = data.completed || false
  }

  static TodoButtonTemplate(todosLeft) {
    if (!AppState.account) {
      return
    }
    return `
    <div class="py-1 px-3 d-flex justify-content-between banner selectable" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
      <p>></p>
      <p>${todosLeft} Todos remaining</p>
    </div>`
  }

  get TodoTemplate() {
    return `
    <div class="d-flex justify-content-between p-2">
      <div class="d-flex">
        <input onchange="app.TodosController.editTodo('${this.id}')" type="checkbox" ${this.completed ? 'checked' : ''}>
        <${this.completed ? 's' : 'p'} class="ps-3">${this.description}</${this.completed ? 's' : 'p'}>
      </div>
      <i onclick="app.TodosController.deleteTodo('${this.id}')" class="mdi mdi-trash-can selectable"></i>
    </div>`
  }
}