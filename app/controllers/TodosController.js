import { AppState } from "../AppState.js"
import { Todo } from "../models/Todo.js"
import { todosService } from "../services/TodosService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawTodos() {
  let todos = AppState.todos
  let template = ''
  let todosLeft = 0
  todos.forEach(t => {
    if (!t.completed) {
      todosLeft++
    }
    template += t.TodoTemplate
  })
  setHTML('todoList', template)
  setHTML('todo', Todo.TodoButtonTemplate(todosLeft))
}

export class TodosController {
  constructor() {
    console.log('Todos Controller Loaded')

    AppState.on('account', this.getTodos)
    AppState.on('todos', _drawTodos)
  }

  async getTodos() {
    try {
      await todosService.getTodos()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async createTodo(event) {
    try {
      event.preventDefault()
      let form = event.target
      await todosService.createTodo(getFormData(form))
      form.reset()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async editTodo(todoId) {
    try {
      await todosService.editTodo(todoId)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async deleteTodo(todoId) {
    try {
      let isSure = await Pop.confirm('Are you sure you want to delete this todo?')
      if (!isSure) {
        return
      }
      await todosService.deleteTodo(todoId)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}